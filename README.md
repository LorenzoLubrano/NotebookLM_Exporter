# 📝 NotebookLM Chat Exporter Pro

![Version](https://img.shields.io/badge/version-1.1-blue.svg)
![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Brave-success.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**NotebookLM Chat Exporter Pro** è un'estensione leggera (Manifest V3) per browser basati su Chromium. Nasce per risolvere un problema noto di Google NotebookLM: quando le sessioni di studio diventano molto lunghe, il DOM si sovraccarica e la chat inizia ad andare a scatti (lag estremo). 

Questa estensione estrae l'intera conversazione, la ripulisce chirurgicamente dall'interfaccia di Google e la converte in un file **Markdown (.md)** perfetto per l'importazione su Obsidian, Notion o Logseq. Una volta esportata la chat, puoi svuotare la cronologia di NotebookLM e far tornare il browser velocissimo.

## ✨ Funzionalità (Features)

- **Estrazione Intelligente HTML -> Markdown:** Converte i nodi del DOM preservando la formattazione originale del testo (grassetti, corsivi, elenchi puntati e blocchi di codice).
- **Filtro Anti-Spazzatura (Garbage Collector):** Rimuove automaticamente tutti gli elementi dell'interfaccia utente (bottoni "Copia", "Salva", menu a tendina invisibili, nomi dei file PDF, conteggio fonti).
- **La "Ghigliottina Testuale":** Taglia via in automatico le sezioni inutili all'inizio e alla fine della pagina (menu "Fonti" e menu "Studio").
- **Correttore di Punteggiatura:** Rimuove i numeri di citazione isolati (es. `1`, `2`) che NotebookLM inserisce in mezzo alle frasi, e ricuce gli spazi vuoti prima della punteggiatura.
- **Compattatore di Spazi:** Trasforma gli abissi di righe vuote in paragrafi puliti e distanziati correttamente.

## 🚀 Installazione (Modalità Sviluppatore)

Poiché l'estensione non è ancora sul Chrome Web Store, puoi installarla in 10 secondi tramite la modalità sviluppatore:

1. Scarica o clona questa repository sul tuo computer in una cartella dedicata (es. `NotebookLM_Exporter`).
2. Apri il tuo browser (Brave o Chrome) e digita nella barra degli indirizzi: `brave://extensions/` (oppure `chrome://extensions/`).
3. Attiva l'interruttore **"Modalità sviluppatore"** (Developer mode) in alto a destra.
4. Clicca sul bottone **"Carica estensione non pacchettizzata"** (Load unpacked) in alto a sinistra.
5. Seleziona la cartella `NotebookLM_Exporter`.

L'icona viola dell'estensione apparirà nella tua barra degli strumenti!

## 💡 Come si usa

1. Vai su [Google NotebookLM](https://notebooklm.google.com/) e apri il tuo notebook.
2. Troverai un bottone viola flottante in basso a destra: **"Esporta"**.
3. Cliccalo. L'estensione analizzerà la pagina, pulirà il testo e scaricherà automaticamente un file `.md` datato (es. `NotebookLM_Pro_2026-03-10.md`).
4. Ora puoi cliccare sul "Cestino" nativo di NotebookLM per svuotare la chat e rimuovere i rallentamenti senza aver perso una sola riga di appunti.

## 📁 Struttura del Progetto

- `manifest.json`: Regole dell'estensione (Manifest V3).
- `content.js`: Il "cervello" dell'estensione. Contiene il traduttore DOM-to-Markdown e le espressioni regolari (Regex) per la pulizia del testo.
- `icon.svg`: Icona del Programma

## ⚠️ Disclaimer

Google aggiorna frequentemente l'interfaccia web di NotebookLM (classi CSS, tag invisibili). Il convertitore è stato progettato per leggere i nodi di testo di base per essere il più robusto possibile, ma aggiornamenti futuri di Google potrebbero richiedere un aggiornamento della "Lista Nera" (`garbageWords`) all'interno di `content.js`.

---
*Sviluppato per migliorare il flusso di lavoro di studenti e ricercatori.*
