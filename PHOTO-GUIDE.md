# 📸 Photo Preparation Guide

Quick guide to prepare your photos for the birthday website.

## Quick Steps

1. **Choose 5-10 photos** of you and Rong
2. **Resize** them to reasonable dimensions
3. **Compress** to reduce file size
4. **Rename** them for easy reference
5. **Add to project** and update HTML

---

## Option 1: Using macOS Preview (Built-in)

### Resize Photos

1. Open photo in **Preview**
2. Go to **Tools → Adjust Size...**
3. Set width to **1000 pixels**
4. Keep "Scale proportionally" checked
5. Click **OK**
6. Save: **File → Export...**
   - Format: JPEG
   - Quality: 75-85%

### Batch Process Multiple Photos

1. Select all photos in Finder
2. Right-click → **Open With → Preview**
3. Select all thumbnails (Cmd+A)
4. **Tools → Adjust Size...**
5. Set width to **1000 pixels**
6. Click **OK**
7. **File → Export Selected Images...**
8. Choose format: JPEG, Quality: 80

---

## Option 2: Using Command Line (Fast!)

If you're comfortable with terminal:

```bash
# Navigate to your photos folder
cd ~/path/to/your/photos

# Install ImageMagick (one-time setup)
brew install imagemagick

# Resize and compress all JPG files
for file in *.jpg; do
    convert "$file" -resize 1000x -quality 80 "optimized_$file"
done

# Move optimized photos to project
mv optimized_*.jpg /Users/I750579/Documents/rong-birthday-2026/assets/images/photos/

# Rename them
cd /Users/I750579/Documents/rong-birthday-2026/assets/images/photos/
mv optimized_photo1.jpg photo1.jpg
mv optimized_photo2.jpg photo2.jpg
# etc...
```

---

## Option 3: Online Tools (No Software)

### TinyPNG (Recommended for compression)
1. Go to https://tinypng.com
2. Drop up to 20 images
3. Wait for compression (usually 50-70% reduction!)
4. Download all as ZIP
5. Extract and rename

### Squoosh (Google's tool)
1. Go to https://squoosh.app
2. Drop image
3. Adjust quality slider (aim for 70-80)
4. Compare before/after
5. Download

### Bulk Resize Photos
1. Go to https://bulkresizephotos.com
2. Upload photos
3. Choose width: 1000px
4. Download

---

## Recommended Settings

| Setting | Value | Why |
|---------|-------|-----|
| Max width | 1000px | Sharp on all screens |
| Format | JPEG | Best for photos |
| Quality | 75-85% | Good balance |
| Target size | <200KB | Fast loading |

---

## Naming Convention

Rename your photos for easy management:

```
photo1.jpg  → Main photo (you two together)
photo2.jpg  → Fun moment
photo3.jpg  → Special occasion
photo4.jpg  → Candid shot
photo5.jpg  → Happy memory
photo6.jpg  → Adventure together
photo7.jpg  → Cute moment
photo8.jpg  → Recent photo
photo9.jpg  → Favorite memory
photo10.jpg → Extra special
```

---

## After Preparing Photos

1. **Place in folder**:
   ```bash
   /Users/I750579/Documents/rong-birthday-2026/assets/images/photos/
   ```

2. **Update index.html** (starting around line 128):
   ```html
   <div class="photo-frame croissant-border">
       <img src="assets/images/photos/photo1.jpg"
            alt="Our favorite moment together"
            loading="lazy">
   </div>
   ```

3. **Test locally**:
   ```bash
   cd /Users/I750579/Documents/rong-birthday-2026
   open index.html
   ```

4. **Commit and push**:
   ```bash
   git add assets/images/photos/
   git add index.html
   git commit -m "Add photos to gallery"
   git push origin main
   ```

---

## Check Photo Quality

Before finalizing, make sure:

- [ ] Photos are clear and not pixelated
- [ ] Each photo is under 200KB (check in Finder: Cmd+I)
- [ ] All photos have loaded in local preview
- [ ] Alt text is meaningful for each photo
- [ ] Photos look good on mobile (test in responsive view)

---

## Pro Tips

### Aspect Ratios
The photo frames are square (1:1 ratio). For best results:
- Crop photos to square before adding
- Or let CSS `object-fit: cover` handle it (may crop edges)

### Portrait vs Landscape
- Both work fine
- CSS will crop to fit square frames
- Important content should be centered

### Photo Selection
Choose photos that:
- Show happy moments together
- Have good lighting
- Are in focus
- Tell a story of your relationship
- Make both of you smile when you see them

### File Size Check
```bash
# Check file sizes (should be <200KB each)
ls -lh assets/images/photos/

# If too large, re-compress with lower quality
```

---

## Example Workflow

```bash
# 1. Create photo folder if needed
mkdir -p assets/images/photos

# 2. Copy your photos
cp ~/Desktop/favorite_photos/*.jpg assets/images/photos/

# 3. Navigate to folder
cd assets/images/photos

# 4. Check current sizes
ls -lh

# 5. If needed, compress with ImageMagick
for file in *.jpg; do
    convert "$file" -resize 1000x -quality 80 "temp_$file"
    mv "temp_$file" "$file"
done

# 6. Rename to photo1.jpg, photo2.jpg, etc.
# (or use a script)

# 7. Go back to project root
cd ../../../

# 8. Test
open index.html

# 9. Commit
git add assets/images/photos/
git commit -m "Add birthday photos"
```

---

## Need Help?

If photos aren't showing:
1. Check file paths are correct (case-sensitive!)
2. Verify files are actually in `assets/images/photos/`
3. Open browser console (F12) to check for errors
4. Make sure filenames match in HTML and filesystem

The website should display your beautiful memories perfectly! 📸💖
