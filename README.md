# Value Unbound Solutions

**Value Unbound Solutions** is a consulting company focused on freeing business value from unnecessary software, Salesforce cost optimization, automation, integrations, and AI-driven process improvement.

This repository contains the source code for the company's official website.

## Tech Stack

- **Core**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/) (Version 6+)
- **Architecture**: Multi-Page Application (MPA)
- **Deployment**: Static site (Ready for GitHub Pages, Netlify, Vercel)

## Project Structure

```bash
├── public/                 # Static assets
├── src/
│   ├── components/         # JS Components (Future use)
│   ├── styles/             # CSS Modules
│   │   ├── variables.css   # Design tokens (Colors, Fonts)
│   │   ├── global.css      # Reset and Base styles
│   │   └── layout.css      # Component styles (Header, Footer, Grid)
│   ├── scripts/            # JS Utility scripts
│   └── main.js             # Global JS entry point
├── index.html              # Home Page
├── about.html              # About Page
├── services.html           # Services Page
├── approach.html           # Approach Page
├── contact.html            # Contact Page
├── vite.config.js          # Vite Configuration
└── package.json            # Dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (installed with Node.js)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd ValueUnboundSolutions
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`. Changes will hot-reload automatically.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

### Deployment

This project is configured as a static site and can be deployed anywhere.

#### GitHub Pages
1. Push the code to a GitHub repository.
2. Go to **Settings > Pages**.
3. Set the source to **GitHub Actions** (recommended for Vite) or deploy the `dist` folder manually.

## License

All rights reserved © 2026 Value Unbound Solutions.
