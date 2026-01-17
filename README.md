# Value Unbound Solutions

A modern, static, multilingual website for Value Unbound Solutions, hosted on GitHub Pages.

## Project Overview

- **Stack**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Design**: Dark mode primary, Glassmorphism, Mobile-first responsive.
- **Languages**: English, German, French, Italian, Spanish.

## Setup & Development

No build steps required. This is a static site.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/arunksaini/ValueUnboundSolutions.git
    ```
## Local Development

Since this project uses ES Modules and Fetch API for JSON files, you **cannot** simply open `index.html` file in the browser directly (due to CORS policy). You must run a local server.

### Using Python (Pre-installed on macOS)
1. Open Terminal in the project folder.
2. Run:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### Using VS Code
1. Install "Live Server" extension.
2. Click "Go Live" at the bottom right.

## Directory Structure

```
/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── main.js         # UI interactions & animations
│   └── i18n.js         # Language detection & switching
├── lang/               # Translation JSON files
│   ├── en.json
│   └── ...
└── assets/
    └── images/         # Optimized images
```

## Deployment

Simply push to the `main` (or `gh-pages`) branch. Ensure GitHub Pages is enabled in the repository settings.
