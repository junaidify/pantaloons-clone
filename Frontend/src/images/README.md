# Image Assets

This directory contains local image assets for the application.

## Current Images

The application currently uses a mix of local and external images. This document helps track which images should be localized.

## Images to Replace with Local Assets

### Logo
- **Current**: External URL from pantaloons.com
- **Location in code**: `Frontend/src/landingPage/Navbar.jsx`
- **Recommended**: Add `logo.svg` or `logo.png` to this directory
- **Usage**: Main navbar logo

### Product Images
- **Current**: External URLs from various CDNs
- **Location in code**: Throughout product components
- **Recommended**: Add product images to `images/products/` subdirectory
- **Note**: Product images are typically fetched from API/database

### Carousel Images
- **Current**: Local files (img_1.avif, etc.)
- **Location**: `images/carousal/` subdirectory
- **Status**: Already localized ✓

### Footer Icons
- **Current**: Local PNG files
- **Files**: footer_1.png through footer_5.png
- **Status**: Already localized ✓

## Adding New Images

1. Place image files in this directory or appropriate subdirectory
2. Import in your component:
   ```jsx
   import myImage from '../images/my-image.png';
   ```
3. Use in JSX:
   ```jsx
   <img src={myImage} alt="Description" />
   ```

## Image Optimization Tips

- Use WebP format for better compression
- Compress images before adding (use tools like TinyPNG, ImageOptim)
- Use appropriate dimensions (don't use 4K images for thumbnails)
- Consider lazy loading for images below the fold
- Add alt text for accessibility

## Recommended Structure

```
images/
├── logo.svg
├── products/
│   ├── mens/
│   ├── women/
│   ├── kids/
│   ├── home/
│   └── beauty/
├── carousal/
│   └── (existing carousel images)
├── footer/
│   └── (footer icons)
├── placeholders/
│   └── (placeholder images)
└── icons/
    └── (UI icons if not using icon library)
```

## External Image Optimization

When using external images, consider:
1. **CDN**: Use a CDN for faster loading
2. **Lazy Loading**: Implement lazy loading for below-fold images
3. **Responsive Images**: Use srcset for different screen sizes
4. **Caching**: Set appropriate cache headers
5. **Preloading**: Preload critical images

## Example: Converting External to Local

Before:
```jsx
<img src="https://example.com/image.jpg" alt="Product" />
```

After:
```jsx
import productImage from '../images/products/product.jpg';
<img src={productImage} alt="Product" />
```

## Note on Copyright

Ensure you have rights to use any images you add to this directory. For production:
- Use your own images
- Purchase stock photos
- Use properly licensed images
- Give attribution where required
