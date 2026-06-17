# Kara

Kara is a responsive digital marketing agency website built with Bootstrap 5, Sass, Vite, and Tiny Slider. It includes landing-page sections for services, work, results, testimonials, FAQs, and contact information.

[View live demo](https://ewacuna.github.io/kara/)

## Features

- Responsive Bootstrap 5 layout
- Hero, services, work, results, references, FAQ, and contact sections
- Smooth in-page navigation
- Mobile navbar collapse behavior
- Animated results section triggered on scroll
- Testimonial and brand carousels powered by Tiny Slider
- Sass-based styling and Vite asset bundling

## Tech Stack

- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Tiny Slider](https://github.com/ganlanyuan/tiny-slider)
- [Font Awesome](https://fontawesome.com/)

## Getting Started

### Prerequisites

- Node.js 24 or newer
- npm

### Installation

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print the local URL in your terminal, usually `http://localhost:5173/`.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server with hot reloading.

```bash
npm run build
```

Builds the production site into the `docs/` directory for GitHub Pages.

```bash
npm run preview
```

Serves the production build locally so you can review it before publishing.

## Project Structure

```text
.
├── docs/                # Production build output for GitHub Pages
├── src/
│   ├── images/          # Site images and icons
│   ├── js/script.js     # Navigation, scroll behavior, and carousels
│   ├── index.js         # App entry point
│   └── styles.scss      # Main Sass stylesheet
├── index.html           # Main HTML document
├── package.json         # Dependencies and npm scripts
└── README.md
```

## Deployment

This project deploys to GitHub Pages through the workflow in `.github/workflows/deployment.yml`.
The workflow builds the site with Node.js 24, uploads the generated `docs/` directory as an
artifact, and publishes it to Pages when changes land on `main`.

To verify the production build locally:

```bash
npm run build
```

## Customization

- Update page content in `index.html`.
- Update styles in `src/styles.scss`.
- Replace images in `src/images/`.
- Adjust navigation and carousel behavior in `src/js/script.js`.

## License

This project is licensed under the MIT License.
