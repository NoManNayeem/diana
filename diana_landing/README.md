# Diana Landing Page

A modern, responsive landing page for Diana AI Assistant, designed for GitHub Pages deployment.

## Features

- 🎨 Modern, clean design with dark/light theme support
- 📱 Fully responsive across all devices
- ⚡ Fast loading with optimized assets
- 🌙 Dark mode toggle with system preference detection
- 🎯 SEO optimized with proper meta tags
- 🚀 Automatic deployment via GitHub Actions

## Design Patterns

This landing page incorporates modern AI chat interface design patterns inspired by:

- **ChatGPT**: Clean, minimal design with focus on conversation
- **Claude**: Professional typography and spacing
- **Grok**: Modern gradient effects and animations
- **DeepSeek**: Clean feature cards and statistics

## Key UI/UX Elements

### Navigation
- Fixed header with backdrop blur effect
- Smooth scroll navigation
- Theme toggle with system preference detection

### Hero Section
- Floating logo animation
- Gradient text effects
- Call-to-action buttons with hover effects
- Floating background elements

### Features Section
- Card-based layout with hover effects
- Icon-based feature representation
- Consistent spacing and typography

### Statistics
- Large, bold numbers
- Hover animations
- Clean, professional presentation

## Deployment

This landing page is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy
3. The site will be available at `https://nomanayeem.github.io/diana/`

### Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Make changes and refresh to see updates

## Customization

### Colors
The color scheme can be customized by modifying the Tailwind CSS configuration in the `<script>` tag:

```javascript
colors: {
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',  // Main primary color
        600: '#2563eb',
        700: '#1d4ed8',
        900: '#1e3a8a',
    }
}
```

### Content
- Update the hero section text in the HTML
- Modify feature descriptions in the features section
- Change statistics in the stats section
- Update footer links and information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Diana AI Assistant project. All rights reserved.
