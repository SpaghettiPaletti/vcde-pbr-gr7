(function () {
  function decodeEmbedded(filename) {
    const b64 = window.__EMBED_GLB__ && window.__EMBED_GLB__[filename];
    if (!b64) return null;
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function embedAssetRoot() {
    const url = new URL(window.location.href);
    const path = url.pathname.replace(/\\/g, "/");
    const embedMarker = "/assets/embeds/";
    const embedIdx = path.indexOf(embedMarker);
    if (embedIdx !== -1) {
      url.pathname = path.slice(0, embedIdx) + "/assets/";
      return url.href;
    }
    const pagesIdx = path.indexOf("/pages/");
    if (pagesIdx !== -1) {
      url.pathname = path.slice(0, pagesIdx) + "/assets/";
      return url.href;
    }
    const lastSlash = path.lastIndexOf("/");
    url.pathname = path.slice(0, lastSlash + 1) + "assets/";
    return url.href;
  }

  function importFromBytes(scene, filename, bytes) {
    const file = new File([bytes], filename, { type: "model/gltf-binary" });
    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "model/gltf-binary" }));

    function cleanup() {
      URL.revokeObjectURL(blobUrl);
    }

    // File + .glb extension: works offline (blob URLs have no extension otherwise).
    const attempts = [
      () => BABYLON.SceneLoader.ImportMeshAsync("", "", file, scene, undefined, ".glb"),
      () => BABYLON.SceneLoader.ImportMeshAsync("", "", blobUrl, scene, undefined, ".glb"),
    ];

    if (BABYLON.LoadAssetContainerAsync) {
      attempts.push(() =>
        BABYLON.LoadAssetContainerAsync(file, scene, { pluginExtension: ".glb" }).then((container) => {
          container.addAllToScene();
          return {
            meshes: container.meshes,
            particleSystems: container.particleSystems,
            skeletons: container.skeletons,
            animationGroups: container.animationGroups,
            transformNodes: container.transformNodes,
            geometries: container.geometries,
            lights: container.lights,
          };
        })
      );
    }

    let chain = Promise.reject(new Error("loader unavailable"));
    attempts.forEach((attempt) => {
      chain = chain.catch(() => attempt());
    });
    return chain.finally(cleanup);
  }

  function loadFromEmbedded(scene, filename) {
    const bytes = decodeEmbedded(filename);
    if (!bytes) {
      return Promise.reject(new Error("Kein eingebettetes GLB: " + filename));
    }
    return importFromBytes(scene, filename, bytes);
  }

  window.embedAssetRoot = embedAssetRoot;

  window.loadEmbedGlb = function (scene, filename) {
    const hasEmbed = !!(window.__EMBED_GLB__ && window.__EMBED_GLB__[filename]);
    const offline = window.location.protocol === "file:";

    if (offline) {
      if (!hasEmbed) {
        return Promise.reject(
          new Error("Offline: glb_embedded.js fehlt oder ist veraltet (" + filename + ")")
        );
      }
      return loadFromEmbedded(scene, filename);
    }

    if (hasEmbed) {
      return loadFromEmbedded(scene, filename).catch((err) => {
        console.warn("Eingebettetes GLB fehlgeschlagen, versuche HTTP:", filename, err);
        return BABYLON.SceneLoader.ImportMeshAsync("", embedAssetRoot(), filename, scene);
      });
    }

    return BABYLON.SceneLoader.ImportMeshAsync("", embedAssetRoot(), filename, scene);
  };
})();
