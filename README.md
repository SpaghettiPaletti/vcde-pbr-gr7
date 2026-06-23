# Physically Based Rendering (PBR) & Image Based Lighting (IBL)

Interaktive Lernseite zu **Physically Based Rendering** und **Image Based Lighting**, erstellt als Modularbeit im Kurs *Visual Computing* an der Hochschule München (MUC.DAI, B.Sc. Digital Engineering).

Die Seite knüpft an das aus der Vorlesung bekannte **Phong-Beleuchtungsmodell** an und entwickelt von dort einen durchgängigen roten Faden hin zu physikalisch motivierten Materialmodellen und realistischer Umgebungsbeleuchtung. Alle zentralen Konzepte werden mit **interaktiven 3D-Demos** (Babylon.js) direkt im Browser erfahrbar gemacht.

**Live-Version:** https://spaghettipaletti.github.io/vcde-pbr-gr7/

## Worum geht es?

Klassische lokale Beleuchtungsmodelle wie Phong schätzen Licht nur ab und verletzen dabei grundlegende physikalische Gesetze – etwa die Energieerhaltung. PBR beschreibt Materialien stattdessen über physikalisch motivierte BRDFs und liefert dadurch unter wechselnden Beleuchtungsbedingungen konsistente, realistische Ergebnisse. Image Based Lighting liefert das dafür nötige Umgebungslicht aus allen Richtungen.

Die Seite führt schrittweise durch diesen Zusammenhang: von den Grenzen von Phong über die theoretischen PBR-Prinzipien und die praktische Materialsteuerung bis hin zu IBL und einer Vertiefung zur Materialalterung.

## Kapitelübersicht

| # | Kapitel | Inhalt | Autor:in |
|---|---------|--------|----------|
| 1 | **Die Grenzen von Phong** | Direkter visueller Vergleich Phong ↔ PBR, fehlende Energieerhaltung, interaktive Analyse der Phong-Komponenten | Stefan Jordan |
| 2 | **PBR-Prinzipien** | Rendering-Gleichung, BRDF, Mikrofacettentheorie, Cook-Torrance, Fresnel-Term, NDF (GGX), Geometry-Term, Energieerhaltung | Celia Baumann |
| 3 | **Materialmodell & Mapping** | Base Color, Metallic, Roughness, Texture Maps; globale Werte vs. Maps; Exkurs OpenPBR / MaterialX | Alexander Kohl |
| 4 | **Image Based Lighting** | HDRI-Umgebungslicht, Pre-Filtering, Split-Sum-Ansatz, BRDF-LUT, interaktiver Umgebungswechsel | Stefan Jordan |
| 5 | **Vertiefung: Materialalterung** | Maskengesteuerte Alterung über mehrere PBR-Maps an einem Buckler-Schild (Stahl, Messing, Gold, Leder, Edelsteine) | Alexander Kohl |

Der didaktische Bogen: **Problem (Phong)** → **Theorie (PBR-Prinzipien)** → **Praxis (Materialmodell)** → **Vollständigkeit (IBL)** → **Anwendung (Alterung)**.

Zusätzlich gibt es einen begleitenden Foliensatz (`slides.qmd`).

## Technik

- **[Quarto](https://quarto.org)** – Static-Site-Generierung aus `.qmd`-Dateien
- **[Babylon.js](https://www.babylonjs.com)** – interaktive Echtzeit-3D-Demos, als eingebettetes HTML in die Seiten integriert (via CDN)

## Lokal bauen & Vorschau

Voraussetzung: [Quarto](https://quarto.org/docs/get-started/) installiert.

```bash
# Live-Vorschau mit automatischem Reload
quarto preview

# Statische Seite ins _site/ rendern
quarto render
```

## Repo-Struktur

```
.
├── _quarto.yml              # Website-Konfiguration & Navigation
├── index.qmd                # Einstiegsseite (Aufbau & Disclaimer)
├── slides.qmd               # begleitender Foliensatz
├── pages/                   # die einzelnen Kapitel
│   ├── 1_phong_grenzen.qmd
│   ├── 2_pbr_prinzipien.qmd
│   ├── 3_materialmodell.qmd
│   ├── 4_ibl.qmd
│   ├── 6_X.qmd              # Vertiefung: Materialalterung
│   └── images/              # SVG-Diagramme, Abbildungen
├── assets/                  # GLB-Modelle (Fass, Buckler), HDRIs (.env), Embeds, GIFs
├── scripts/                 # Hilfsskripte (z.B. zum Erzeugen der Vorschaubilder)
├── .github/                 # CI-/Deployment-Workflow
├── LICENSE
└── README.md
```

## Quellen & Credits

- **HDRI-Umgebungen** für die IBL- und Alterungs-Demos: Babylon.js-Playground-Texturen (`environment.env`, `country.env`, `forest.env`, `night.env`, `room.env`)
- **OpenPBR / MaterialX**: [Academy Software Foundation](https://academysoftwarefoundation.github.io/OpenPBR/) (Exkurs in Kapitel 3)
- **3D-Modelle** (Holzfass, Buckler-Schild): eigene Erstellung in Blender

## Team

| Mitglied | Beiträge |
|----------|----------|
| Stefan Jordan | Kapitel 1 (Grenzen von Phong), Kapitel 4 (IBL) |
| Celia Baumann | Einstieg, Kapitel 2 (PBR-Prinzipien) |
| Alexander Kohl | Kapitel 3 (Materialmodell), Vertiefung (Materialalterung) |

## Lizenz

Siehe [LICENSE](LICENSE).

---

*Erstellt im Rahmen des Kurses Visual Computing, Hochschule München.*