# START Milan - Immagini da Inserire

Questo file contiene la lista di tutte le immagini placeholder che devono essere sostituite con immagini reali.

## 📸 Immagini Necessarie

### Hero Section (Homepage)
- **hero-background.jpg** - Immagine di sfondo per la sezione hero (1920x1080px)

### Team/Board Members
- **giorgia-giustizieri.jpg** - Foto di Giorgia Giustizieri (400x400px)
- **austeja-lazar.jpg** - Foto di Austeja Lazar (400x400px)
- **gabriele-marmo.jpg** - Foto di Gabriele Marmo (400x400px)
- **maciej-wojcie.jpg** - Foto di Maciej Wojcie (400x400px)
- **antonio-dantoni.jpg** - Foto di Antonio D'Antoni (400x400px)
- **felix-nies.jpg** - Foto di Felix Nies (400x400px)
- **alexandra-dumitache.jpg** - Foto di Alexandra Dumitache (400x400px)

### Events
- **road-to-start-summit.jpg** - Immagine evento Road to START Summit (800x600px)
- **founder-insights.jpg** - Immagine per Founder Insights (600x400px)
- **vc-visits.jpg** - Immagine per VC Visits (600x400px)
- **international-retreats.jpg** - Immagine per International Retreats (600x400px)
- **startup-workshops.jpg** - Immagine per Startup Workshops (600x400px)
- **projects-sprints.jpg** - Immagine per Projects & Sprints (600x400px)

### For Partners
- **inspiring-events.jpg** - Immagine per Inspiring Events (600x400px)
- **active-community.jpg** - Immagine per Active Community (600x400px)
- **accelerating-network.jpg** - Immagine per Accelerating Network (600x400px)

### Favicon & Logo
- **favicon.svg** - Logo SVG per favicon
- **Logo_white.pngte.png** - Logo PNG principale (200x60px)

## 🎨 Linee Guida per le Immagini

### Stile
- **Colori**: Preferibilmente neutri (bianco, nero, grigi) per mantenere il design pulito
- **Stile**: Moderno, professionale, minimale
- **Qualità**: Alta risoluzione, minimo 300 DPI per stampa

### Foto del Team
- **Formato**: Ritratti professionali
- **Background**: Preferibilmente sfondo neutro
- **Espressione**: Sorriso naturale, sguardo verso la camera
- **Abbigliamento**: Business casual o professionale

### Foto Eventi
- **Contenuto**: Persone che interagiscono, presentazioni, networking
- **Atmosfera**: Energica, professionale, innovativa
- **Angolazione**: Varietà di prospettive (wide shots, dettagli, group shots)

### Icone e Grafiche
- **Stile**: Lineare, minimale
- **Colori**: Nero o grigio scuro
- **Formato**: SVG preferito per scalabilità

## 📁 Struttura Cartelle Consigliata

```
assets/
├── images/
│   ├── team/
│   │   ├── giorgia-giustizieri.jpg
│   │   ├── austeja-lazar.jpg
│   │   └── ...
│   ├── events/
│   │   ├── road-to-start-summit.jpg
│   │   ├── founder-insights.jpg
│   │   └── ...
│   ├── partners/
│   │   ├── inspiring-events.jpg
│   │   └── ...
│   └── hero/
│       └── hero-background.jpg
├── icons/
│   ├── favicon.svg
│   └── Logo_white.pngte.png
└── videos/ (opzionale)
    └── hero-video.mp4
```

## 🔄 Come Sostituire le Immagini

1. **Salvare le immagini** nella cartella `assets/images/` seguendo la struttura sopra
2. **Aggiornare l'HTML** sostituendo i placeholder:
   ```html
   <!-- Da questo -->
   <div class="image-placeholder">
       <span>Giorgia's Photo</span>
   </div>
   
   <!-- A questo -->
   <img src="assets/images/team/giorgia-giustizieri.jpg" alt="Giorgia Giustizieri">
   ```

3. **Aggiornare il CSS** se necessario per le dimensioni delle immagini

## 🎯 Priorità di Sostituzione

### Alta Priorità
1. Logo e favicon
2. Foto del team/board
3. Immagine principale Road to START Summit

### Media Priorità
4. Immagini eventi principali
5. Immagini sezioni For Students/Partners

### Bassa Priorità
6. Immagini di background decorative
7. Icone personalizzate

## 📞 Note

- Tutte le immagini devono essere ottimizzate per il web (formato WebP consigliato)
- Assicurarsi di avere i diritti d'uso per tutte le immagini
- Mantenere backup delle immagini originali
- Considerare varianti per dispositivi mobile (immagini più piccole)

## 🚀 Alternative Gratuite

Se non hai immagini proprie, puoi usare:
- **Unsplash** (unsplash.com) - foto professionali gratuite
- **Pexels** (pexels.com) - stock photos gratuite
- **Pixabay** (pixabay.com) - immagini e icone gratuite

Cerca termini come: "business meeting", "startup", "team", "conference", "networking", "entrepreneurs"