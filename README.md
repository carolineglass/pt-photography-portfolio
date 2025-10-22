# Paul Taylor Photography Portfolio

A modern, full-stack photography portfolio website built with React, Vite, and Sanity CMS. Features dynamic content management, responsive masonry galleries, and an elegant lightbox slideshow.

🔗 **Live Site:** [thisispaultaylor.com](https://thisispaultaylor.com)

## ✨ Features

- **Headless CMS Integration** - Sanity.io for client-managed content
- **Masonry Layout** - Pinterest-style grid that preserves image aspect ratios
- **Lightbox Slideshow** - Full-screen image viewer with keyboard navigation
- **Lazy Loading** - Optimized image loading with fade-in animations
- **Responsive Design** - Mobile-first approach with breakpoint-specific layouts
- **Custom Typography** - Locally hosted Linotype Didot fonts

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- React Router
- Tailwind CSS v4
- React Masonry CSS
- Sanity Client

**Backend/CMS:**
- Sanity.io (Headless CMS)
- [Sanity Studio Repository](https://github.com/carolineglass/pt-photography-portfolio-cms)

**Deployment:**
- Vercel (Frontend)
- Sanity Cloud (CMS)

## 📁 Project Structure
```
photographer-portfolio/
├── public/
│   └── fonts/               # Custom typography
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Dynamic navigation
│   │   ├── Footer.jsx       # Responsive footer
│   │   ├── FadeInImage.jsx  # Lazy-loaded images
│   │   ├── Lightbox.jsx     # Full-screen viewer
│   │   └── LoadingSpinner.jsx # Loading state indicator
│   ├── pages/
│   │   ├── CategoryPage.jsx # Dynamic galleries
│   │   ├── About.jsx        # Rich text content
│   │   └── Contact.jsx      # Contact form
│   ├── hooks/
│   │   ├── usePhotos.js     # Sanity data hooks for photos
│   │   └── useAbout.js      # Sanity data hooks for about page
│   ├── lib/
│   │   └── sanity.js        # Sanity configuration
│   └── App.jsx              # Root component
└── package.json
```

## 🎨 Key Features

### Masonry Gallery
- Responsive columns (1-4 based on viewport)
- Preserves natural image aspect ratios
- Smooth animations

### Lazy Loading
- Intersection Observer API
- Images load as they enter viewport
- Staggered fade-in effects

### Dynamic Routing
- Category pages generated from CMS data
- Active link highlighting
- Automatic homepage routing

## 📦 Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio sites.

## 👤 Developer

**Caroline Glass**
- GitHub: [@carolineglass](https://github.com/carolineglass)

---

**Project Status:** ✅ Live and actively maintained
