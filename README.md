# Anjani Decorator

Premium, GitHub Pages-ready website for Anjani Decorator in Mumbai. Built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

Production builds automatically refresh the gallery manifest:

```bash
npm run build
```

## Add gallery photographs

No component or HTML changes are required. Add a photo to the appropriate folder under `public/images/` and push it.

```text
public/images/
  hero/
  mandap-decoration/
  wedding-decoration/
  stage-lighting/
  party-decoration/
  birthday-decoration/
  catering-service/
```

For example, add `public/images/mandap-decoration/2026-09-10-mandap-at-venue.jpg`. Supported formats are JPG, JPEG, PNG, WEBP and AVIF (upper-case extensions are also accepted). Hidden files and unsupported formats are ignored.

Use `YYYY-MM-DD-description.ext` at the start of each filename. Images are sorted by this date in descending order; ties are sorted by filename descending. The newest image appears first in that service’s gallery, and the home page uses the first two images from every service with photos.

Hero photographs use the same naming convention in `public/images/hero/`; the newest one is the homepage hero.

## Configure services

Service titles and copy live only in `src/data/services.js`. To add a service, add its entry there and create a matching folder under `public/images/`. The manifest generator reads the configuration and discovers the folder during each build.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` installs dependencies, generates `src/data/gallery-manifest.json`, builds Vite, and deploys the `dist` folder to GitHub Pages whenever `main` changes. Enable **Settings → Pages → GitHub Actions** once in the repository.

This project is configured for the root domain `https://anjanidecorators.github.io/`. If it moves to a project repository, change Vite’s `base` in `vite.config.js` to `/repository-name/`.
