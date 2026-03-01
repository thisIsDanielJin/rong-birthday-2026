# Testing Guide

## Quick Start

### View the Website
```bash
# Option 1: Direct file
open index.html

# Option 2: Using the helper script
./view-improvements.sh

# Option 3: Development server
npm run serve
# Then open http://localhost:8080
```

### Run Tests
```bash
# Run all tests (headless)
npm test

# Run tests with visible browser
npm run test:headed

# Debug a specific test
npm run test:debug

# View test report
npm run test:report
```

## Test Coverage

Our Playwright tests verify:

### ✅ Visual Tests
- **3D Dog Appearance**: Verifies the dog looks realistic with proper 3D rendering
- **Envelope Styling**: Checks realistic paper colors and textures
- **Envelope Opening**: Ensures envelope disappears completely after clicking
- **Text Readability**: Verifies content is readable with no overlays
- **Animation Sequences**: Tests smooth transitions
- **Mobile Responsiveness**: Checks proper display on mobile devices

### ✅ Functional Tests
- Loading screen behavior
- Landing scene elements
- Particle effects on opening
- Letter sections and scrolling
- Vinyl player interaction
- Console error detection

## Test Files

- `tests/visual.spec.js` - Visual appearance and interaction tests
- `tests/website.spec.js` - Functional tests (already existed)
- `playwright.config.js` - Playwright configuration
- `server.js` - Local development server

## Known Limitations

### WebGL in Headless Chrome
The 3D dog uses Three.js which requires WebGL. Headless Chrome has limited WebGL support, so you may see errors like:
```
THREE.WebGLRenderer: Error creating WebGL context
```

**Solution:** Run tests in headed mode to see the 3D dog:
```bash
npm run test:headed
```

Or view the website directly in a browser:
```bash
open index.html
```

## What to Look For

### 1. The 3D Dog 🐕
- **Color**: Brown/tan fur with darker accents
- **Features**:
  - Expressive eyes with highlights
  - Prominent snout and black nose
  - Floppy ears
  - Red collar with gold tag
  - Fluffy tail
- **Animation**:
  - Breathing motion
  - Head movements (looking around)
  - Tail wagging
  - Ears fluttering
  - Occasional eye blinks

### 2. The Envelope 💌
- **Color**: Beige/cream (like real paper), not pink/orange
- **Texture**: Visible paper texture
- **Details**:
  - Darker borders
  - 3D depth with shadows
  - Heart emoji (💌) seal on the flap
- **Opening**: Should completely disappear after clicking

### 3. Text Readability 📖
After clicking the envelope:
- Landing scene should fade out completely
- Envelope should disappear (`display: none`)
- Birthday message should be fully visible
- No overlays blocking the text

## Troubleshooting

### Tests timeout or fail
- Increase timeout in `playwright.config.js`
- Check that `npm run serve` works manually
- View browser console for errors

### Dog doesn't appear
- Check WebGL support in your browser
- Try a different browser (Chrome, Firefox, Safari)
- Open browser console to see Three.js errors

### Envelope still visible after opening
- Check browser console for JavaScript errors
- Verify `envelope.js` changes are loaded
- Hard refresh the page (Cmd+Shift+R)

## Development Workflow

1. **Make changes** to HTML/CSS/JS files
2. **View changes**: `open index.html` or `npm run serve`
3. **Run tests**: `npm test` or `npm run test:headed`
4. **Check results**: Look at screenshots in `test-results/`
5. **View report**: `npm run test:report`

## Screenshot Comparison

Tests take screenshots for visual regression testing. Find them in:
```
test-results/
  └── [test-name]/
      ├── test-failed-1.png (if test failed)
      └── video.webm (test recording)
```

## CI/CD Ready

The test suite is ready for CI/CD pipelines:
- Uses webServer to start local server automatically
- Generates HTML reports
- Captures screenshots and videos on failure
- Configurable for different browsers
