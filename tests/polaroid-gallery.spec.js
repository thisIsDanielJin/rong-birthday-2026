// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('Polaroid Photo Gallery Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForSelector('#landing-scene', { state: 'visible', timeout: 10000 });

    // Open the envelope
    await page.locator('.envelope-wrapper').click();
    await page.waitForTimeout(3000);

    // Scroll to gallery
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('8 photos should be displayed in Polaroid style', async ({ page }) => {
    const polaroidFrames = page.locator('.polaroid-frame');
    const count = await polaroidFrames.count();

    expect(count).toBe(8);
    console.log(`✅ Found ${count} Polaroid frames`);

    // Check each frame has an image
    for (let i = 0; i < count; i++) {
      const frame = polaroidFrames.nth(i);
      const img = frame.locator('img');
      await expect(img).toBeVisible();

      const src = await img.getAttribute('src');
      expect(src).toMatch(/images\/photo\d+\.(png|jpg)/);
      console.log(`  Photo ${i + 1}: ${src}`);
    }
  });

  test('Polaroid frames have white background and padding', async ({ page }) => {
    const frame = page.locator('.polaroid-frame').first();

    const styles = await frame.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.backgroundColor,
        padding: computed.padding,
        boxShadow: computed.boxShadow
      };
    });

    // Should have white background
    expect(styles.background).toBe('rgb(255, 255, 255)');

    // Should have padding (Polaroid border effect)
    expect(styles.padding).toContain('20px');

    console.log('✅ Polaroid styling verified');
  });

  test('Each photo has an editable caption input', async ({ page }) => {
    const captionInputs = page.locator('.caption-input');
    const count = await captionInputs.count();

    expect(count).toBe(8);

    // Check first input is editable
    const firstInput = captionInputs.first();
    await expect(firstInput).toBeVisible();
    await expect(firstInput).toBeEditable();

    const placeholder = await firstInput.getAttribute('placeholder');
    expect(placeholder).toContain('Füge hier eine Beschriftung hinzu');

    console.log(`✅ Found ${count} editable caption inputs`);
  });

  test('Caption input saves and loads from localStorage', async ({ page }) => {
    const testCaption = 'Schöner Moment! 🎉';

    // Type in first caption
    const firstInput = page.locator('.caption-input').first();
    await firstInput.click();
    await firstInput.fill(testCaption);

    // Wait for save
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForSelector('#landing-scene', { state: 'visible', timeout: 10000 });

    // Open envelope again
    await page.locator('.envelope-wrapper').click();
    await page.waitForTimeout(3000);

    // Scroll to gallery
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();

    // Check caption is restored
    const firstInputAfterReload = page.locator('.caption-input').first();
    const value = await firstInputAfterReload.inputValue();

    expect(value).toBe(testCaption);
    console.log(`✅ Caption persisted: "${value}"`);
  });

  test('Polaroid frames have slight rotation (authentic look)', async ({ page }) => {
    const frames = page.locator('.polaroid-frame');

    for (let i = 0; i < 3; i++) {
      const frame = frames.nth(i);
      const transform = await frame.evaluate(el => {
        return window.getComputedStyle(el).transform;
      });

      // Should have rotation (matrix transform)
      expect(transform).not.toBe('none');
      console.log(`  Frame ${i + 1} transform: ${transform}`);
    }

    console.log('✅ Polaroid rotation effect verified');
  });

  test('Hover effect on Polaroid frames', async ({ page }) => {
    const frame = page.locator('.polaroid-frame').first();

    // Hover over frame
    await frame.hover();
    await page.waitForTimeout(500);

    // Check z-index increases on hover
    const zIndex = await frame.evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });

    expect(parseInt(zIndex)).toBeGreaterThan(0);
    console.log('✅ Hover effect working');
  });

  test('Caption input styling (handwritten font)', async ({ page }) => {
    const input = page.locator('.caption-input').first();

    const styles = await input.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        textAlign: computed.textAlign
      };
    });

    // Should have handwritten/cursive font
    expect(styles.fontFamily.toLowerCase()).toMatch(/caveat|pacifico|cursive/);

    // Should be centered
    expect(styles.textAlign).toBe('center');

    console.log('✅ Caption styling verified');
    console.log(`  Font: ${styles.fontFamily}`);
    console.log(`  Size: ${styles.fontSize}`);
  });

  test('Photos are displayed with correct aspect ratio', async ({ page }) => {
    const polaroidPhoto = page.locator('.polaroid-photo').first();

    const dimensions = await polaroidPhoto.boundingBox();

    // Should be square (aspect-ratio: 1)
    const ratio = dimensions.width / dimensions.height;
    expect(Math.abs(ratio - 1)).toBeLessThan(0.1); // Allow small variance

    console.log(`✅ Photo aspect ratio: ${ratio.toFixed(2)} (square)`);
  });

  test('Gallery note is displayed in German', async ({ page }) => {
    const galleryNote = page.locator('.gallery-note');
    const text = await galleryNote.textContent();

    expect(text).toContain('Klicke');
    expect(text).toContain('Beschriftungen');

    console.log('✅ Gallery note in German');
  });

  test('Multiple captions can be added independently', async ({ page }) => {
    const captions = [
      'Erster Moment',
      'Zweite Erinnerung',
      'Dritter Tag'
    ];

    // Add three different captions
    for (let i = 0; i < 3; i++) {
      const input = page.locator('.caption-input').nth(i);
      await input.click();
      await input.fill(captions[i]);
    }

    await page.waitForTimeout(500);

    // Verify all captions are set
    for (let i = 0; i < 3; i++) {
      const input = page.locator('.caption-input').nth(i);
      const value = await input.inputValue();
      expect(value).toBe(captions[i]);
    }

    console.log('✅ Multiple independent captions working');
  });

  test('Visual screenshot of Polaroid gallery', async ({ page }) => {
    // Add sample captions
    const inputs = page.locator('.caption-input');
    await inputs.nth(0).fill('Schöner Wintermoment ❄️');
    await inputs.nth(1).fill('Unvergesslich! 💖');
    await inputs.nth(2).fill('Zusammen');

    await page.waitForTimeout(500);

    // Take screenshot
    await expect(page.locator('.photo-grid')).toHaveScreenshot('polaroid-gallery.png', {
      maxDiffPixels: 100
    });

    console.log('✅ Gallery screenshot captured');
  });

  test('Tape effect pseudo-element is present', async ({ page }) => {
    const frame = page.locator('.polaroid-frame').first();

    // Check for ::before pseudo-element (tape effect)
    const hasTape = await frame.evaluate(el => {
      const before = window.getComputedStyle(el, '::before');
      return before.content !== 'none' && before.width !== '0px';
    });

    expect(hasTape).toBe(true);
    console.log('✅ Tape decoration effect present');
  });

  test('Mobile responsive view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();

    await page.waitForSelector('#landing-scene', { state: 'visible', timeout: 10000 });
    await page.locator('.envelope-wrapper').click();
    await page.waitForTimeout(3000);

    await page.locator('.gallery-section').scrollIntoViewIfNeeded();

    const frame = page.locator('.polaroid-frame').first();
    const box = await frame.boundingBox();

    // Should fit in mobile viewport
    expect(box.width).toBeLessThanOrEqual(375);

    console.log('✅ Mobile responsive gallery');
  });
});
