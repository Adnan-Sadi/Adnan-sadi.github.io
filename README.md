# Personal Website

This repository hosts the source code for my personal website, built with **React + Vite + Tailwind CSS**, and deployed via **GitHub Pages** at: **[adnan-sadi.github.io](https://adnan-sadi.github.io/)**

---

## Features

- **Light/Dark Mode** with toggle (default dark)
- **Responsive design** using Tailwind CSS
- **About Page**  
  – Photo, introduction, profile links (Email, LinkedIn, Scholar, ResearchGate, GitHub, etc.)  
  – Recent updates / news section.  
  – Selected publications
- **Publications Page**  
  – Publication cards with preview image, metadata, author highlighting  
  – Customizable buttons for abstract, BibTeX, PDF, code/demo links, etc.
  – Google Scholar citation badge (clickable → opens article on Scholar)  
  – Fullscreen view for preview image (on click)
- **News Page** with full archive of updates
- **CV Page** with in-browser PDF viewer and download option
- **Projects Page** Coming Soon!
- Easy to modify **JSON data files** for updating website data.
- **Deployment** via GitHub Actions → GitHub Pages

---

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/) 

---

## Development

### Prerequisites
- Node.js (Version Userd=23.6.0)
- npm (Version Used=10.9.2)

### Setup
```bash
git clone https://github.com/Adnan-Sadi/Adnan-sadi.github.io.git
cd Adnan-sadi.github.io
npm install
```

### Run locally
```bash
npm run dev
```

---

## Deployment

This repo is deployed automatically to GitHub Pages via Actions. Any push to `main` triggers the `.github/deploy.yaml` workflow.

---

## Repository Structure

```
├── .github/
│   ├── deploy.yaml   
├── public/                # Static assets
├── src/
│   ├── components/        # Shared React components
│   ├── data/              # JSON data (news, publications, profile)
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── index.css          # Tailwind entry
│   └── main.tsx           # App entry point
├── tailwind.config.js     # Tailwind config
├── postcss.config.cjs     # PostCSS config
├── postbuild.cjs
├── vite.config.ts         # Vite config
├── package-lock.json
└── package.json
```

---

## License

This repository is open-sourced under the MIT license.  
Feel free to use this as a template for your own site (attribution is appreciated).

---
