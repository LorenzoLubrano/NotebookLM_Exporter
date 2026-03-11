// Crea un bottone flottante
const btn = document.createElement("button");
btn.innerText = "Esporta Chat";

// Stili blindati
Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "999999",
    padding: "16px 24px",
    backgroundColor: "transparent",
    color: "#8a2be2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto"
});

// Effetti hover
btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "transparent";
    btn.style.transform = "scale(1.05)";
});
btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "transparent";
    btn.style.transform = "scale(1)";
});

// Lista nera
const garbageWords = [
    "add", "Crea notebook", "trending_up", "Analisi", "share", "Condividi",
    "settings", "Impostazioni", "PRO", "Fonti", "dock_to_right", "Aggiungi fonti",
    "search", "language", "Web", "keyboard_arrow_down", "search_spark",
    "Ricerca rapida", "arrow_forward", "Seleziona tutte le fonti", "drive_pdf",
    "video_youtube", "Chat", "tune", "more_vert", "💻", "keep_pin", "Salva nella nota",
    "copy_all", "thumb_up", "thumb_down", "Studio", "dock_to_left",
    "audio_magic_eraser", "Overview audio", "edit", "tablet", "Presentazione",
    "subscriptions", "Overview video", "flowchart", "Mappa mentale",
    "auto_tab_group", "Report", "cards_star", "Flashcard", "quiz", "Quiz",
    "stacked_bar_chart", "Infografica", "table_view", "Tabella di dati",
    "sticky_note_2", "Aggiungi nota", "NotebookLM potrebbe essere impreciso; verifica le sue risposte.",
    "Esporta", "Risultati di ricerca", "Nessuna emoji trovata", "Usati di recente", "Caricamento in corso…",
    "keep", "App Google", "Account Google"
];

// Traduttore HTML -> Markdown
function convertNodeToMarkdown(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const tag = node.tagName.toUpperCase();

    // Filtri fisici
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG', 'IMG'].includes(tag)) return "";
    if (tag === 'BUTTON') return "";

    try {
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return "";
    } catch (e) {}

    let md = "";
    for (let child of node.childNodes) {
        md += convertNodeToMarkdown(child);
    }

    switch (tag) {
        case 'STRONG':
        case 'B': return `**${md.trim()}** `;
        case 'EM':
        case 'I': return `*${md.trim()}* `;
        case 'CODE':
            if (node.parentNode && node.parentNode.tagName === 'PRE') return md;
            return ` \`${md.trim()}\` `;
        case 'PRE': return `\n\n\`\`\`\n${md.trim()}\n\`\`\`\n\n`;
        case 'P': return `\n\n${md.trim()}\n\n`;
        case 'DIV': return `\n${md}\n`; 
        case 'LI': return `\n* ${md.trim()}`;
        case 'UL':
        case 'OL': return `\n\n${md}\n\n`;
        case 'H1': return `\n\n# ${md.trim()}\n\n`;
        case 'H2': return `\n\n## ${md.trim()}\n\n`;
        case 'H3': return `\n\n### ${md.trim()}\n\n`;
        default: return md;
    }
}

// Cosa succede quando clicchi il bottone
btn.addEventListener("click", () => {
    let rawMarkdown = convertNodeToMarkdown(document.body);

    if (!rawMarkdown || rawMarkdown.trim() === "") {
        alert("⚠️ Impossibile trovare il testo!");
        return;
    }

    let cleanedMd = rawMarkdown;

    // --- LA GHIGLIOTTINA TESTUALE ---
    // 1. Taglia via tutto il blocco finale a partire da "## Studio" fino alla fine del file
    cleanedMd = cleanedMd.replace(/## Studio[\s\S]*$/i, '');
    
    // 2. Taglia via tutto il blocco iniziale delle "Fonti" fino all'inizio della "Chat"
    cleanedMd = cleanedMd.replace(/## Fonti[\s\S]*?## Chat/i, '');
    // --------------------------------

    // Pulizia dalle parole della lista nera
    garbageWords.forEach(word => {
        let regex = new RegExp(`^\\s*${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gm');
        cleanedMd = cleanedMd.replace(regex, '');
    });

    cleanedMd = cleanedMd.replace(/^.*\.pdf\s*$/gmi, '');
    cleanedMd = cleanedMd.replace(/^\s*\d+\s+font[ei].*$/gmi, '');
    cleanedMd = cleanedMd.replace(/^\s*\d{1,2}\s*$/gm, '');

    // Ottimizzazione formattazione
    cleanedMd = cleanedMd.replace(/\s+\./g, '.');
    cleanedMd = cleanedMd.replace(/\s+\?/g, '?');
    cleanedMd = cleanedMd.replace(/\s+,/g, ',');
    
    // Rimuove la data spuria che a volte rimane isolata all'inizio
    cleanedMd = cleanedMd.replace(/^\s*(lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica)\s+\d+\s+[a-z]+\s*$/gmi, '');

    // Compattatore spazi vuoti
    cleanedMd = cleanedMd.replace(/\n\s*\n/g, '\n\n');

    let finalMarkdown = "# Appunti: Network and Infrastructures\n\n" + cleanedMd.trim();

    // Download
    const date = new Date().toISOString().split('T')[0];
    const blob = new Blob([finalMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `NotebookLM_Pro_${date}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 2000);

    alert("Ho esportato la chat in un file Markdown pulito! Adesso puoi cancellare la cronologia della Chat");
});

document.body.appendChild(btn);