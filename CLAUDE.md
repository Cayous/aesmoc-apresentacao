# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a modular Reveal.js presentation system for AESMOC's benefits card presentation. The architecture consists of:

- **Main Entry Point**: `index.html` loads all dependencies and initializes the loader
- **Dynamic Slide Loading**: `js/loader.js` dynamically loads 19 individual slide modules
- **Modular Slides**: Each slide in `slides/slide-XX-name/` contains its own HTML, CSS, and JavaScript
- **Global Systems**: Shared utilities, animations, and configurations

## Key Components

### Slide System
- Each slide is self-contained in `slides/slide-XX-name/` with:
  - `index.html`: Slide content
  - `style.css`: Slide-specific styles  
  - `script.js`: Slide-specific JavaScript and animations
- Slides are loaded sequentially by `js/loader.js` based on the `slidesList` array
- Slide initialization functions follow naming pattern: `init{slidename}` (e.g., `initslide01titulo`)

### Core JavaScript Files
- `js/loader.js`: Handles dynamic loading of slides, CSS, and JS files
- `js/utils.js`: Shared utility functions across slides
- `js/animations.js`: Global animation systems
- `config/reveal-config.js`: Reveal.js configuration and event handling

### External Dependencies
- Reveal.js 4.3.1 (presentation framework)
- Chart.js (for data visualizations)
- Leaflet (for maps)
- Lottie (for animations)
- Canvas Confetti (for effects)
- Swiper (for carousels)

## Development Commands

Since this is a client-side only presentation, no build process is required:

- **Run locally**: Serve files with any HTTP server (e.g., `python -m http.server 8000`)
- **View presentation**: Open `index.html` in browser or navigate to `http://localhost:8000`

## Keyboard Controls
- F: Toggle fullscreen
- S: Open speaker notes
- ESC: Toggle overview mode
- Arrow keys: Navigate slides
- H: Toggle help

## Adding New Slides

1. Create new directory: `slides/slide-XX-name/`
2. Add three files: `index.html`, `style.css`, `script.js`
3. Update `slidesList` array in `js/loader.js`
4. Follow naming convention for init function: `init{slidename}`
5. Use `templates/slide-template.html` as starting point

## Data and Assets

- Partner data: `assets/data/partners.json`
- Images organized by category in `assets/images/`
- Audio and video files in respective `assets/` subdirectories
- External assets loaded via CDN (Cloudinary for logos)