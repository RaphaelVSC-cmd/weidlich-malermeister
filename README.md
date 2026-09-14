# Weidlich Malermeister GmbH — Bespoke Handwerks-Plattform (Augsburg)

> **105 Jahre Meisterhandwerk in vierter Generation seit 1921**  
> Showroom in der Bäckergasse 12a, 86150 Augsburg  
> Tier 1 Gold-Standard • Bespoke Unikat-Engine v7.0

---

## 🏛️ Über das Projekt

Diese digitale Plattform inszeniert die 105-jährige Handwerkstradition der **Weidlich Malermeister GmbH** im Herzen Augsburgs. Statt generischer Web-Templates verbindet die Website redaktionelle Magazin-Eleganz (Grammatik 3: The Craft Editorial) mit dem physischen Showroom-Erlebnis in der Bäckergasse 12a.

### ✨ Highlights & Signature Features

1. **Augsburger Farb- & Textur-Atelier mit Live-Lichtsimulator:**
   - 4 kuratierte mineralische Farbwelten (Altstadt-Kalk, Maximilian-Salbei, Fugger-Ocker, Modernes Graphit).
   - Dynamischer 3-Stufen-Lichtwechsel (Morgenlicht / neutrales 5500K Tageslicht / warmes 2700K Abendlicht).
2. **Der Weidlich Urlaubs-Renovierungs-Rechner:**
   - Interaktive Planung für die beliebte schlüsselfertige Komplettrenovierung während Kunden verreist sind (inklusive Möbelschutz, Staubschutz-Einhausung und Endreinigung).
3. **105-Jahre Archiv-Siegel & 3D Perspective Stage:**
   - Kontinuierlich rotierendes Qualitätssiegel („WEIDLICH MALERMEISTER • SEIT 1921 • AUGSBURG“) mit haptischer 3D-Kartenneigung.
4. **Editorial Dim-to-Reveal:**
   - Apple-Style Text-Scrubbing des Handwerksversprechens synchron zum Scrollen.
5. **Erlebnis-Kontaktpunkt mit 3-Schritte-Triage:**
   - Formspree Engine mit ausfallsicherem WhatsApp- und Telefon-Fallback.
6. **100% Rechts- & Datenschutz-Konformität:**
   - Anbieterkennzeichnung nach neuem § 5 DDG (ersetzt TMG).
   - Two-Click Google Maps (blockiert vor Einwilligung via `data-src`).
   - DSGVO Art. 13 Datenschutzerklärung.
   - Physisches `favicon.svg` und PWA `manifest.webmanifest`.

---

## 🛠️ Technologie-Stack

- **Core:** Semantisches HTML5 & modulares Vanilla CSS3 (Custom Design System).
- **Animationen & Physik:** GSAP Core 3.12, ScrollTrigger, SplitType.
- **Scroll-Engine:** Lenis 1.0.42 (Touchpad-sicher gekoppelt, kein CSS `scroll-behavior: smooth`).
- **Typografie:** `Fraunces` (High-Contrast Variable Serif) + `Plus Jakarta Sans` (Humanist Grotesk).
- **Deployment:** Vercel Global Edge Network (1-Click Pipeline via `deploy_to_vercel.py`).
- **Demo-Radar:** Integriertes Live-Alarm-Modul `initDemoTracker()` mit Telegram- und E-Mail-Push.

---

## 🚀 Lokale Vorschau

```bash
# Lokalen Webserver starten:
python -m http.server 8088

# Im Browser öffnen:
http://localhost:8088/
```
