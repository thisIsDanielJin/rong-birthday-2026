# 🎉 Magical 3D Birthday Website for Rong

A beautiful, interactive birthday website featuring a 3D envelope animation, orbiting elements, vinyl player, and photo gallery.

## ✨ Features

- **3D Envelope Landing Page**: Dramatic opening animation with orbiting croissants and vinyl records
- **Animated Dog Character**: Breathing and floating beside the envelope
- **Multi-Section Letter**: Birthday wishes with scroll-triggered animations
- **Interactive Vinyl Player**: Click to spin the record (supports audio playback)
- **Photo Gallery**: Showcase 5-10 photos with themed borders
- **Warm Pastel Design**: Peach, cream, and soft pink color palette
- **Fully Responsive**: Works beautifully on desktop and mobile
- **Easter Eggs**: Hidden surprises (try typing "rong" or triple-clicking the vinyl!)

## 🚀 Quick Start

### Local Testing

1. **Open the website locally**:
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python3 -m http.server 8000

     # Then visit http://localhost:8000
     ```

2. **Add Your Photos**:
   - Place 5-10 photos in `assets/images/photos/`
   - Optimize them: resize to max 1000px width, compress to <200KB each
   - Update `index.html` line 128+ to replace placeholders:
     ```html
     <div class="photo-frame croissant-border">
         <img src="assets/images/photos/photo1.jpg" alt="Description" loading="lazy">
     </div>
     ```

3. **Customize the Message**:
   - Edit the birthday message in `index.html` (lines 91-106)
   - Update the signature at line 177 with your name

4. **Optional Audio**:
   - Add an MP3 file to `assets/audio/vinyl-song.mp3`
   - Uncomment lines 19-24 in `scripts/vinyl-player.js`

## 🌐 Deploy to GitHub Pages

### Step 1: Create GitHub Repository

```bash
cd /Users/I750579/Documents/rong-birthday-2026

# Make sure you're in the project directory
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: Magical 3D birthday website for Rong"

# Create repository on GitHub (replace YOUR_USERNAME with your GitHub username)
# Visit https://github.com/new and create a new repository named "rong-birthday-2026"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/rong-birthday-2026.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/rong-birthday-2026`
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 3: Access Your Site

Your website will be live at:
```
https://YOUR_USERNAME.github.io/rong-birthday-2026/
```

Share this link with Rong! 🎂

## 📁 Project Structure

```
rong-birthday-2026/
├── index.html              # Main HTML structure
├── styles/
│   ├── main.css           # Variables, base styles
│   ├── envelope.css       # 3D envelope animations
│   ├── orbiting.css       # Orbiting croissants/vinyls
│   ├── letter.css         # Letter sections styling
│   └── responsive.css     # Mobile optimization
├── scripts/
│   ├── main.js            # Core initialization
│   ├── envelope.js        # Opening animation logic
│   ├── vinyl-player.js    # Vinyl interaction
│   └── animations.js      # Scroll-triggered animations
├── assets/
│   ├── images/
│   │   └── photos/        # Your birthday photos (add here!)
│   └── audio/
│       └── vinyl-song.mp3 # Optional audio file
└── README.md
```

## 🎨 Customization Guide

### Colors

Edit `styles/main.css` variables (lines 8-12):
```css
:root {
    --peach: #FFD4B2;
    --cream: #FFF5E9;
    --soft-pink: #FFC6D3;
    --warm-orange: #FFB88C;
}
```

### Fonts

The site uses Google Fonts (Pacifico + Poppins). To change:
1. Visit [Google Fonts](https://fonts.google.com)
2. Replace the `<link>` in `index.html` line 14
3. Update CSS variables in `styles/main.css`:
   ```css
   --font-heading: 'YourFont', cursive;
   --font-body: 'YourFont', sans-serif;
   ```

### Animations

To disable specific animations (for performance):
- **Orbiting elements**: Comment out `styles/orbiting.css` import
- **Vinyl auto-play**: Comment out lines 76-83 in `scripts/vinyl-player.js`
- **Floating elements**: Remove `.floating-elements` from `index.html`

### Content

- **Birthday message**: `index.html` lines 91-106
- **Vinyl caption**: `index.html` line 137
- **Closing message**: `index.html` lines 169-178
- **Signature**: `index.html` line 177

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Photos not showing?
- Check file paths are correct
- Ensure images are in `assets/images/photos/`
- Use relative paths: `assets/images/photos/photo1.jpg`

### Animations choppy on mobile?
- The site automatically reduces animations on mobile
- For better performance, disable `prefers-reduced-motion` animations

### Envelope not opening?
- Check browser console (F12) for errors
- Ensure all JavaScript files are loaded
- Try refreshing the page

### GitHub Pages not updating?
- Clear your browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Wait 2-3 minutes after pushing changes
- Check GitHub Actions for build status

## 🎁 Final Checklist Before Sharing

- [ ] Add 5-10 photos to `assets/images/photos/`
- [ ] Update photos in `index.html` (replace placeholders)
- [ ] Customize the birthday message
- [ ] Add your name to the signature
- [ ] Optional: Add audio file and enable in vinyl-player.js
- [ ] Test locally in browser
- [ ] Test on mobile device
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Verify live site works
- [ ] Share link with Rong! 💖

## 🎉 Easter Eggs

- **Type "rong"** anywhere on the page for a surprise
- **Triple-click** the vinyl record for turbo mode
- **Watch** the floating hearts in the closing section

## 💝 Made with Love

This website was built with care and attention to detail. Every animation, every color choice, and every interaction was designed to make Rong's 26th birthday extra special.

Happy Birthday, Rong! 🎂🥐💖

---

**Technology**: Pure HTML/CSS/JavaScript (no frameworks)
**Animations**: CSS3 transforms and transitions
**Fonts**: Google Fonts (Pacifico, Poppins)
**Hosting**: GitHub Pages (free!)

For questions or issues, check the browser console or review the code comments.
