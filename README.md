# BahnRecht PWA

**Fahrgastrechte leicht gemacht** — Verspätungen erfassen, Anschreiben generieren, Geld zurückholen.

---

## Installation als App (für Nutzer)

### Android
1. Seite in Chrome öffnen
2. Unten erscheint automatisch **„Zum Startbildschirm hinzufügen"**
3. Tippen → Fertig ✅

### iPhone / iPad
1. Seite in **Safari** öffnen
2. Teilen-Button tippen (Viereck mit Pfeil)
3. **„Zum Home-Bildschirm"** wählen
4. „Hinzufügen" → Fertig ✅

---

## GitHub Pages einrichten (für Betreiber)

### Schritt 1 — Repository erstellen
1. github.com aufrufen und einloggen
2. **„New repository"** klicken
3. Name: `bahnrecht` (oder beliebig)
4. **Public** auswählen
5. **„Create repository"** klicken

### Schritt 2 — Dateien hochladen
1. Im Repository auf **„uploading an existing file"** klicken
2. Alle 6 Dateien hochladen:
   - `bahnrecht.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`
3. **„Commit changes"** klicken

### Schritt 3 — GitHub Pages aktivieren
1. Im Repository auf **„Settings"** klicken
2. Links auf **„Pages"** klicken
3. Bei „Source": **„Deploy from a branch"** auswählen
4. Branch: **„main"**, Ordner: **„/ (root)"**
5. **„Save"** klicken

### Schritt 4 — Fertig!
Nach 1-2 Minuten ist die App erreichbar unter:
```
https://DEIN-GITHUB-NAME.github.io/bahnrecht/bahnrecht.html
```

Diese URL kannst du teilen — jeder kann die App sofort nutzen und installieren.

---

## Updates veröffentlichen

1. Neue `bahnrecht.html` auf GitHub hochladen (gleicher Dateiname)
2. In `sw.js` die Cache-Version hochzählen: `bahnrecht-v1` → `bahnrecht-v2`
3. Nutzer bekommen das Update automatisch beim nächsten Start

---

## Datenschutz

- Alle Nutzerdaten bleiben auf dem Gerät des Nutzers (localStorage)
- Kein Server, keine Datenbank, keine Tracking
- GitHub hostet nur die statischen Dateien

---

## Lizenz

**Creative Commons BY-NC-ND 4.0**

Copyright © 2026 Thomas [Nachname] — BahnRecht

[![CC BY-NC-ND 4.0](https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de)

✅ Kostenlose Nutzung durch Endnutzer erlaubt  
✅ Teilen des Links erlaubt  
✅ Presse & Berichterstattung erlaubt  
❌ Kein kommerzieller Einsatz ohne Genehmigung  
❌ Keine veränderten Versionen veröffentlichen  
❌ Keine Umbenennung oder eigene Veröffentlichung  

„BahnRecht" und das BR-Logo sind urheberrechtlich geschützt.  
Vollständige Lizenz: siehe [LICENSE.txt](./LICENSE.txt)  
Lizenzanfragen: [Deine E-Mail]
