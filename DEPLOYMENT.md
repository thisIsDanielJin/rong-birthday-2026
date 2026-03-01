# 🚀 Deployment Instructions

## Before You Deploy

### 1. Add Your Photos

The website currently has placeholder photos. Replace them with your actual photos:

1. **Prepare your photos**:
   - Choose 5-10 photos of you and Rong
   - Resize them to max 1000px width (use Preview, Photoshop, or online tools)
   - Compress them to under 200KB each (use https://tinypng.com or ImageOptim)
   - Name them: `photo1.jpg`, `photo2.jpg`, etc.

2. **Add photos to the project**:
   ```bash
   # Place your photos here:
   /Users/I750579/Documents/rong-birthday-2026/assets/images/photos/
   ```

3. **Update index.html** (around line 128):
   Replace the placeholder divs with:
   ```html
   <div class="photo-frame croissant-border">
       <img src="assets/images/photos/photo1.jpg" alt="Beautiful moment together" loading="lazy">
   </div>
   <div class="photo-frame dog-border">
       <img src="assets/images/photos/photo2.jpg" alt="Happy memories" loading="lazy">
   </div>
   <!-- ... add more photos ... -->
   ```

### 2. Customize the Message

Edit `index.html` to personalize:

- **Birthday message** (lines 91-106): Your heartfelt words
- **Signature** (line 177): Replace `[Your Name]` with your actual name
- **Vinyl caption** (line 137): Optional song description

### 3. Optional: Add Audio

To add music to the vinyl player:

1. Add your song file:
   ```bash
   # Place MP3 here:
   /Users/I750579/Documents/rong-birthday-2026/assets/audio/vinyl-song.mp3
   ```

2. Enable audio in `scripts/vinyl-player.js`:
   - Uncomment lines 19-24
   - The vinyl will play music when clicked!

---

## Deploy to GitHub Pages

### Step 1: Create GitHub Repository

```bash
cd /Users/I750579/Documents/rong-birthday-2026

# If you made changes, commit them:
git add .
git commit -m "Add photos and customize message"

# Create repository on GitHub:
# 1. Go to https://github.com/new
# 2. Name it: rong-birthday-2026
# 3. Keep it PUBLIC (required for GitHub Pages free tier)
# 4. Don't initialize with README (we already have one)
# 5. Click "Create repository"
```

### Step 2: Push to GitHub

**Replace `YOUR_USERNAME` with your actual GitHub username!**

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/rong-birthday-2026.git

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to use a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Use the token as your password when pushing

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/rong-birthday-2026`
2. Click **Settings** tab (top right)
3. Scroll down and click **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes...

### Step 4: Get Your URL

After a minute, refresh the Pages settings page. You'll see:

```
✅ Your site is live at https://YOUR_USERNAME.github.io/rong-birthday-2026/
```

**This is the link you'll share with Rong!** 💝

---

## Testing Checklist

Before sharing with Rong, test everything:

### Desktop Testing
- [ ] Open the site in your browser
- [ ] Click the envelope - does it open smoothly?
- [ ] Scroll through all sections - do they fade in?
- [ ] Click the vinyl player - does it spin?
- [ ] Check all photos loaded correctly
- [ ] Try typing "rong" for the easter egg
- [ ] Triple-click the vinyl for turbo mode

### Mobile Testing
- [ ] Open on your phone
- [ ] Tap the envelope
- [ ] Check photos display properly
- [ ] Test vinyl player on mobile
- [ ] Verify text is readable
- [ ] Check scrolling is smooth

### Final Checks
- [ ] All photos show (no broken images)
- [ ] Message is personalized with your name
- [ ] No typos in the birthday message
- [ ] Site works on different browsers
- [ ] URL is saved and ready to share

---

## Quick Commands Reference

```bash
# Navigate to project
cd /Users/I750579/Documents/rong-birthday-2026

# Add new photos
cp ~/path/to/photo.jpg assets/images/photos/

# Commit changes
git add .
git commit -m "Update photos and message"

# Push updates to GitHub
git push origin main

# Test locally
open index.html
# or
python3 -m http.server 8000
```

---

## Troubleshooting

### "Repository not found" error
- Make sure you created the repository on GitHub first
- Check your username is correct in the remote URL
- Verify the repository name matches exactly

### Photos not showing on GitHub Pages
- Check file paths use forward slashes: `assets/images/photos/photo1.jpg`
- Ensure photo files were committed: `git status`
- Wait 2-3 minutes after pushing changes
- Clear browser cache and refresh

### Changes not appearing on live site
- After pushing to GitHub, wait 2-3 minutes
- Clear browser cache (Cmd+Shift+R on Mac)
- Check GitHub Actions tab for deployment status
- Try opening in incognito/private window

### Audio not playing
- Make sure file is MP3 format
- Check file path in vinyl-player.js is correct
- Audio auto-play may be blocked by browser
- User must interact first (click vinyl) to play

---

## Sharing with Rong 🎁

Ideas for sharing:

1. **Direct link**: Text or email the GitHub Pages URL
2. **QR code**: Generate a QR code from the URL using https://www.qr-code-generator.com
3. **Short URL**: Use https://bit.ly to create a memorable link
4. **Custom domain** (advanced): Point your own domain to GitHub Pages

Example message:
```
Happy Birthday Rong! 🎂

I made something special for you.
Open this link when you're ready for a surprise:

https://YOUR_USERNAME.github.io/rong-birthday-2026/

🥐💖✨
```

---

## Need Help?

If something goes wrong:

1. Check the browser console (press F12)
2. Review the README.md for detailed instructions
3. Look for errors in the GitHub Actions tab
4. Test locally first: `open index.html`

The site is pure HTML/CSS/JavaScript with no dependencies, so it should just work! ✨

---

**Remember**: The goal is to make Rong smile. Even if everything isn't perfect, the thought and effort you put into this will shine through! 💖

Good luck, and Happy Birthday to Rong! 🎉
