# Mega Bags - Enhanced Visuals, Animations & Payment

## Current State
- 5 products in AppContext with single generic Unsplash images
- ProductDetails has a basic 3-image gallery with static images (not product-specific)
- Products grid has basic hover effects
- Razorpay is already integrated in PlaceOrder.tsx
- No smooth page transitions or loading animations

## Requested Changes (Diff)

### Add
- `images` array (3 images) to each Product in AppContext
- Smooth fade transition between gallery images in ProductDetails
- Hover zoom effect on main product image
- CSS page fade-in transition on route change
- Loading spinner component
- Animated success/failure states in PlaceOrder (already present, enhance animation)
- Smooth scroll CSS

### Modify
- AppContext: Add `images: string[]` field to Product interface; update all 5 DEFAULT_PRODUCTS with 3 realistic product-specific generated images each
- ProductDetails: Use `product.images` array; add fade transition on image change; add hover zoom on main image; animate thumbnail selection
- Products: Enhance card hover (scale + shadow + border color change)
- App.tsx / Layout: Add fade-in page transition
- PlaceOrder: Animate success checkmark with scale bounce

### Remove
- Hardcoded generic image URLs in ProductDetails

## Implementation Plan
1. Generate 3 realistic images per product (15 total) using generate_image
2. Update AppContext.tsx: add `images[]` to Product, populate all 5 products with generated image paths
3. Update ProductDetails.tsx: use product.images, add CSS fade transition, hover zoom on main image
4. Update Products.tsx: improve card hover states
5. Add global smooth scroll and page fade-in animations to index.css
6. Enhance PlaceOrder success animation
