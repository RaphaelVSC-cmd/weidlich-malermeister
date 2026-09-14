# Product Requirements Document (PRD) - Weidlich Malermeister GmbH
Tier: 1 - GOLD | Slug: weidlich-malermeister | Datum: 2026-09-14

## 1.1 Grammatik
**Grammatik 3: The Craft Editorial (Tradition, Werte & Meisterliche Handschrift seit 1921)**
- *Begründung:* Weidlich Malermeister blickt auf 105 Jahre ununterbrochene Firmenhistorie (1921–2026, 4. Generation) und betreibt einen exklusiven Altstadt-Showroom in der Bäckergasse 12a. Diese Identität verlangt nach meisterlicher Ruhe, typografischer Eleganz und haptischer Wertigkeit statt reißerischer Notdienst-Sirenen oder kühler Krypto-Bentos.
- *Verbotene Schablonen:* Keine grellen Neon-Glows, keine hektischen Ticker, keine billigen Bento-Grids, keine Kitsch-Emojis.

## 1.2 Generatives Farb- & Typografie-System
### Farbsystem (HSL-basiert aus der Werkstoff- & Altstadt-DNA):
- `--sc-canvas`: `#f8f6f0` (Warmes Alabaster-Leinen, mineralischer Grund)
- `--sc-surface`: `#ffffff` (Reinweißes Trägermaterial)
- `--sc-surface-warm`: `#f2eee4` (Warme Sandstein-Papiertönung)
- `--sc-ink`: `#1a1917` (Tiefes Ruß-Anthrazit, 12:1 Kontrast zu Canvas, WCAG AAA)
- `--sc-ink-muted`: `hsl(38, 12%, 44%)` (`#7a7366`, getöntes Altstadt-Schiefer, 4.8:1 Kontrast)
- `--sc-accent`: `hsl(36, 78%, 42%)` (`#be7b17`, edles Meister-Bernsteingold für primäre CTAs)
- `--sc-accent-hover`: `hsl(36, 85%, 36%)` (`#aa680d`)
- `--sc-accent-subtle`: `hsl(36, 40%, 94%)` (`#f8f2e7`, zarter Goldpergament-Hintergrund)
- `--sc-border`: `rgba(26, 25, 23, 0.08)`
- `--sc-border-gold`: `rgba(190, 123, 23, 0.22)`

### Typografie (Typ A — Tradition, Manufaktur & Denkmal):
- **Display:** `'Fraunces', Georgia, serif` (Variable Font mit optischer Größe, 600/700, meisterlicher Charakter)
- **Body:** `'Plus Jakarta Sans', system-ui, sans-serif` (moderne humanistische Grotesk, 400/500/600/700)
- **Headlines:** `letter-spacing: -0.025em`, `text-wrap: balance`
- **Fließtext:** `max-width: 65ch`, `line-height: 1.65`

## 1.3 Motion- & Interaktions-System (6 aktive Primitiven)
1. **Primitiv 1: Hero Kinetic Typography (Perspective SplitType)**
   - Headline teilt sich in Worte/Zeichen und rotiert gestaffelt aus dem Raum (`rotateX: -25deg`, Stagger 0.02s, `ease: 'power3.out'`).
2. **Primitiv 2: Editorial Text-Scrubbing / Dim-to-Reveal (Apple-Style)**
   - Das 105-Jahre-Handwerksversprechen in der Unternehmens-Sektion entfaltet sich beim Scrollen von `opacity: 0.2` stufenlos zu `1.0`.
3. **Primitiv 6: Native CSS-3D Perspective Tilt & Parallax (0 KB Payload)**
   - Showroom-Karten und Atelier-Cards neigen sich im 3D-Raum (`perspective: 1200px`) zur Maus mit `translateZ(25px)` für Siegel und Badges.
4. **Primitiv 4: Dynamic Stat & Rating Counters**
   - Zähler beim Scroll-Eintritt: 105 Jahre Tradition, 5.0 Google-Sterne, 42 verifizierte Bewertungen, 100% Staubschutz-Versprechen.
5. **Primitiv 12: Continuous Rotating Seal / Stamp**
   - Das runde Archiv-Qualitätssiegel („105 JAHRE MEISTERBETRIEB • SEIT 1921 • WEIDLICH AUGSBURG“) dreht sich kontinuierlich synchron zum Scrollen.
6. **Primitiv 8: Navbar Micro-Interactions & Dynamic Scroll Morph**
   - Header schrumpft ab 20px Scroll zu einer edlen Glasmorphismus-Pille mit zarten Gleit-Unterstrichen.

## 1.4 Signature Feature
**Augsburger Farb- & Textur-Atelier mit Licht-Simulator & Urlaubsservice-Konfigurator**
- Interaktiver Showroom-Explorer mit 4 meisterhaften Farbwelten:
  1. *Altstadt-Kalk & Leinen* (Warmes Sanftweiß, mineralischer Sumpfkalk)
  2. *Maximilian-Salbei* (Atmungsaktive Silikat-Farbe, dezentes Grün)
  3. *Fugger-Ocker & Sandstein* (Warme Erdpigmente, handwerklicher Feinputz)
  4. *Modernes Graphit & Seide* (Kühles Seidengrau, samtmatte Lackierung)
- Dynamischer 3-Stufen-Lichtsimulator:
  - *Morgenlicht (Kühleres Ostlicht)*
  - *Mittagslicht (Neutrales 5500K Tageslicht)*
  - *Abendlicht (Warmes 2700K Kunstlicht)*
- Integrierter **Urlaubs-Renovierungs-Planer**:
  - Kunden wählen Zimmeranzahl, Wunschzeitraum (z.B. Pfingst- oder Sommerurlaub) und erhalten eine schlüsselfertige Vorab-Einschätzung mit 100% Staubschutz-Garantie.

## 1.5 Tageszeit-Personalisierung
- Morgen (06–12h): „Guten Morgen aus der Bäckergasse — Meisterberatung & Showroom geöffnet.“
- Tag (12–18h): „Guten Tag — Ihr Augsburger Malermeisterbetrieb seit 1921.“
- Abend/Nacht (18–06h): „Guten Abend — Lassen Sie sich inspirieren. Showroom-Termin online reservieren.“

## 1.6 Full-Canvas Raumnutzung (Anti-Insel-Architektur)
- Container: `max-width: 1440px` mit fluidem Innenabstand `clamp(1.25rem, 4vw, 3.5rem)`.
- Hero: 2-Spalten-Layout (55% redaktioneller Text & CTA, 45% interaktives 3D-Showroom-Modul).
- 4-Spalten-Raster für Showroom-Leistungen und Ablauf.
