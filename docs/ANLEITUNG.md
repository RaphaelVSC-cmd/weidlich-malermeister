# Übergabe- & Bedienungsanleitung — Weidlich Malermeister GmbH

Herzlich willkommen zu Ihrem neuen digitalen Webauftritt! Diese Dokumentation führt Sie Schritt für Schritt durch die Funktionen Ihrer neuen Website und zeigt Ihnen, wie Sie das System aktivieren und verwalten.

---

## 1. Was wurde für Sie gebaut?

Ihre neue Website ist kein standardisiertes Baukastensystem, sondern eine maßgeschneiderte Handwerks-Plattform auf Agenturniveau.

- **Das Augsburger Farb- & Textur-Atelier:** Ein interaktiver Raumsimulator, auf dem Ihre Kunden 4 hochwertige Farbwelten (vom historischen Sumpfkalk bis zur modernen Seidenlackierung) unter verschiedenem Sonnen- und Kunstlicht (Morgen, Tag, Abend) interaktiv testen können.
- **Der Urlaubs-Renovierungs-Rechner:** Ein intuitiver Planer für Ihren beliebten Urlaubs- und Seniorenservice, der Kunden die Hemmschwelle vor Renovierungen nimmt.
- **Showroom-Inszenierung Bäckergasse 12a:** Ihr Ladengeschäft und Ihre Großflächen-Musterplatten stehen im Zentrum der Kundenführung.
- **Rechtssicherheit nach deutschem Recht:** Vollständig abmahnsicher nach neuem § 5 DDG (ersetzt das alte TMG), DSGVO Art. 13 und TDDDG-konformer Two-Click-Standortkarte.

---

## 2. Kontaktformular aktivieren (Formspree — 4 einfache Schritte)

Das Kontaktformular ist technisch bereits voll funktionsfähig. Um Anfragen direkt an Ihre gewünschte E-Mail-Adresse zu erhalten:

1. Gehen Sie auf [https://formspree.io](https://formspree.io) und erstellen Sie ein kostenloses Konto.
2. Klicken Sie auf **„+ New Form“**, vergeben Sie den Namen *„Weidlich Anfragen“* und tragen Sie als Empfänger `info@malerweidlich.de` ein.
3. Kopieren Sie die generierte Endpoint-ID (z.B. `xpz...`).
4. Öffnen Sie `index.html` und ersetzen Sie im Tag `<form id="contactForm" action="https://formspree.io/f/DEINE_ID" ...>` die ID. Fertig!
*(Hinweis: Bis zur Eintragung ist automatisch ein WhatsApp- und Anruf-Fallback aktiv, sodass Ihnen kein Kunde verloren geht).*

---

## 3. Web-Analyse aktivieren (DSGVO-konform ohne Cookie-Banner)

Wir empfehlen **Plausible Analytics** (100% datenschutzkonform, keine Cookies, keine Einwilligung erforderlich):

1. Erstellen Sie ein Konto auf [https://plausible.io](https://plausible.io).
2. Fügen Sie Ihre Domain hinzu (z.B. `malerweidlich.de`).
3. Entfernen Sie in `index.html` im `<head>`-Bereich die Kommentarzeichen (`<!-- ... -->`) um das Skript:
   ```html
   <script defer data-domain="malerweidlich.de" src="https://plausible.io/js/script.js"></script>
   ```

---

## 4. Eigene Domain aufschalten (z.B. www.malerweidlich.de)

1. Loggen Sie sich bei Ihrem Domain-Provider (z.B. Strato, 1&1 IONOS, All-Inkl) ein.
2. Gehen Sie in die DNS-Verwaltung Ihrer Domain `malerweidlich.de`.
3. Fügen Sie folgenden CNAME-Eintrag hinzu:
   - **Typ:** CNAME
   - **Subdomain:** `www`
   - **Zielwert:** `cname.vercel-dns.com`
4. Tragen Sie die Domain in Ihrem Vercel-Dashboard unter *Settings &rarr; Domains* ein. Das SSL-Zertifikat wird innerhalb weniger Minuten vollautomatisch und kostenfrei aktiviert.

---

## 5. Was Sie selbst anpassen können

Alle Inhalte liegen in verständlichem, sauber strukturiertem HTML vor:
- **Telefonnummer / E-Mail:** In `index.html` nach `+49 821 517718` suchen und bei Bedarf anpassen.
- **Öffnungszeiten:** In der Sektion `#standort` und im Schema.org-Block in `index.html`.
- **Texte & Leistungen:** Direkt im Textbereich der jeweiligen `<section>` in `index.html`.

---

## 6. Persönlicher Support & Wartung

Haben Sie Änderungswünsche, neue Bilder Ihrer Arbeiten oder möchten Sie ein neues Farbkonzept einpflegen?
Senden Sie Ihre Wünsche einfach unkompliziert per WhatsApp oder Mail an:

**Raphael Neumeier**  
Webdesign &amp; Digitale Exzellenz für das Handwerk  
Telefon / WhatsApp: +49 176 47034559  
E-Mail: raphael.m.neumeier@gmail.com  
*Reaktionszeit im Rundum-Sorglos-Service: innerhalb von 24 Stunden.*
