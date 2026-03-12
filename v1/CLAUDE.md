# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HTML 在线预览器 (HTML Online Previewer) - A single-page Vue.js application for previewing and editing HTML code with live preview.

## Architecture

- **Single HTML file application**: `html-preview.html` contains all HTML, CSS, and JavaScript
- **Vue.js 3**: Uses global build (`vue.global.prod.min.js`) loaded via script tag
- **No build system**: Static files served directly, no npm/package.json
- **Fonts**: JetBrains Mono (code) and Space Grotesk (UI) from local woff2 files

## File Structure

```
html-preview/
├── html-preview.html    # Main application (Vue.js SPA, ~50KB)
├── style.css            # Font definitions (JetBrains Mono, Space Grotesk)
├── vue.global.prod.min.js  # Vue 3 production build
├── images/              # Screenshots
└── README.md            # Project readme with screenshot
```

## Key Features

- **Code Editor**: Custom textarea-based editor with line numbers and syntax highlighting overlay
- **Live Preview**: Renders HTML in iframe with injected responsive styles
- **API Fetch Panel**: Fetch content from arbitrary URLs or XLab article API
- **Template System**: Pre-built HTML/CSS/JS example templates
- **Dark Theme UI**: VS Code-inspired design with custom CSS variables

## Vue Application Structure (in html-preview.html)

Main reactive state:
- `code` - Editor content
- `activeTab` - Layout mode ('editor-preview', 'editor', 'preview')
- `codePath` - Current file path for download naming
- `apiUrl`, `apiMethod`, `apiHeaders` - API fetch configuration
- `fetchStatus` - Loading/success/error states

Core functions:
- `runCode()` - Renders code to preview iframe
- `syncLineNumbers()` / `syncScroll()` - Editor UX
- `fetchFromApi()` - Generic HTTP client
- `fetchXlabArticle(id)` - XLab CMS article loader

## Common Operations

**Preview locally**: Open `html-preview.html` in a browser (no server required)

**Edit the app**: Modify `html-preview.html` directly - Vue template and logic are inline

**Add features**: All code is in the single HTML file under `<script>` tag
