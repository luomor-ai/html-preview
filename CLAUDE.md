# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HTML 在线预览器 (HTML Online Previewer) - A Vue 3 + Vite application for editing and previewing HTML code with live preview.

## Tech Stack

- **Vue 3** - Composition API with `<script>` setup pattern
- **Vite** - Build tool and dev server
- **CSS Variables** - Custom theme system for dark mode UI

## Commands

```bash
npm run dev      # Start development server on port 5173
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
html-preview/
├── src/
│   ├── main.js              # App entry point
│   ├── App.vue              # Root component
│   ├── composables/
│   │   └── useAppLogic.js   # Core application logic
│   ├── components/
│   │   ├── TopBar.vue       # Top navigation bar
│   │   ├── Sidebar.vue      # Left sidebar
│   │   ├── ApiPanel.vue     # API fetch panel
│   │   ├── EditorPane.vue   # Code editor with line numbers
│   │   ├── PreviewPane.vue  # Preview iframe
│   │   ├── StatusBar.vue    # Bottom status bar
│   │   ├── ExamplesModal.vue # Example templates modal
│   │   └── Toast.vue        # Toast notifications
│   └── styles/
│       └── global.css       # Font definitions and CSS variables
├── public/                  # Static assets (fonts)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
└── package.json
```

## Architecture

### State Management
All application state is managed in `src/composables/useAppLogic.js`:
- `code` - Editor content (reactive)
- `activeTab` - Layout mode: 'editor', 'split', 'preview'
- `device` - Preview device: 'desktop', 'tablet', 'mobile'
- API state: `apiUrl`, `apiMethod`, `apiHeaders`, `apiBody`, `apiFieldPath`
- UI state: `showExamples`, `toasts`, `hasErrors`, `autoRunEnabled`

### Component Communication
- Parent (App.vue) holds all state via `useAppLogic`
- Children receive props and emit events for updates
- Two-way binding via `v-model` pattern for inputs

### Key Features
- **Live Preview**: Auto-renders HTML to iframe on code change (debounced 600ms)
- **API Fetch**: Fetch HTML from any URL, supports JSON path extraction
- **XLab Integration**: Load articles via `?xlab=<id>` query param
- **Code Editor**: Tab indentation, line numbers, cursor tracking
- **Responsive Preview**: Desktop/Tablet/Mobile device modes

## Adding Features

1. **New state**: Add to `useAppLogic.js` and expose in return statement
2. **New component**: Create in `src/components/`, import in App.vue
3. **New styles**: Add CSS variables to `src/styles/global.css`

## Legacy Files

The original `html-preview.html` single-file version is kept for reference but is no longer the source of truth.
