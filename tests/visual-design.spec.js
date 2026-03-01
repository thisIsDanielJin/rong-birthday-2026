// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('Birthday Card Visual Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForSelector('#landing-scene', { state: 'visible', timeout: 10000 });

    // Open the envelope
    await page.locator('.envelope-wrapper').click();
    await page.waitForTimeout(3000); // Wait for opening animation
  });

  test('Message card should look like a physical card', async ({ page }) => {
    const messageSection = page.locator('.message-section');
    await expect(messageSection).toBeVisible();

    // Check card styling
    const styles = await messageSection.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        border: computed.border,
        padding: computed.padding
      };
    });

    // Should have white/light background (card-like)
    expect(styles.background).toContain('rgb(255, 255, 255)');

    // Should have border
    expect(styles.border).toContain('3px');

    // Should have rounded corners
    expect(parseInt(styles.borderRadius)).toBeGreaterThan(15);

    // Take screenshot of card
    await expect(messageSection).toHaveScreenshot('message-card.png', {
      maxDiffPixels: 100
    });
  });

  test('Text should be bigger and more readable', async ({ page }) => {
    // Check header size
    const header = page.locator('.birthday-header');
    const headerSize = await header.evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(headerSize).toBeGreaterThan(40); // Should be large

    // Check message text size
    const messageLines = page.locator('.message-line');
    const firstLineSize = await messageLines.first().evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(firstLineSize).toBeGreaterThan(20); // Should be readable

    // Check closing text size
    await page.locator('.closing-section').scrollIntoViewIfNeeded();
    const closingMessage = page.locator('.closing-message').first();
    const closingSize = await closingMessage.evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(closingSize).toBeGreaterThan(20);

    console.log('✅ Text sizes verified:');
    console.log(`  - Header: ${headerSize}px`);
    console.log(`  - Message: ${firstLineSize}px`);
    console.log(`  - Closing: ${closingSize}px`);
  });

  test('Photo frames should be bigger', async ({ page }) => {
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();

    const photoFrame = page.locator('.photo-frame').first();
    await expect(photoFrame).toBeVisible();

    const dimensions = await photoFrame.boundingBox();

    // Should be at least 350px (bigger than before which was ~280px min)
    expect(dimensions.width).toBeGreaterThan(340);
    expect(dimensions.height).toBeGreaterThan(340);

    // Check thicker borders
    const borderWidth = await photoFrame.evaluate(el => {
      return parseInt(window.getComputedStyle(el).borderWidth);
    });
    expect(borderWidth).toBe(12); // Should be 12px (thicker)

    console.log('✅ Photo frame dimensions:');
    console.log(`  - Width: ${dimensions.width}px`);
    console.log(`  - Height: ${dimensions.height}px`);
    console.log(`  - Border: ${borderWidth}px`);

    // Take screenshot
    await expect(page.locator('.photo-grid')).toHaveScreenshot('photo-grid.png', {
      maxDiffPixels: 100
    });
  });

  test('Card has decorative corners', async ({ page }) => {
    const messageSection = page.locator('.message-section');

    // Check for decorative elements via pseudo-elements
    const hasDecorations = await messageSection.evaluate(el => {
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');
      return {
        beforeContent: before.content,
        afterContent: after.content,
        beforeFontSize: before.fontSize,
        afterFontSize: after.fontSize
      };
    });

    expect(hasDecorations.beforeContent).toContain('✨');
    expect(hasDecorations.afterContent).toContain('✨');

    console.log('✅ Decorative corners present');
  });

  test('Vinyl player should be bigger', async ({ page }) => {
    await page.locator('.vinyl-section').scrollIntoViewIfNeeded();

    const vinylRecord = page.locator('.vinyl-record');
    await expect(vinylRecord).toBeVisible();

    const dimensions = await vinylRecord.boundingBox();

    // Should be 350px (bigger than before which was 300px)
    expect(dimensions.width).toBeGreaterThanOrEqual(340);
    expect(dimensions.height).toBeGreaterThanOrEqual(340);

    // Check button size
    const playButton = page.locator('.play-button');
    const buttonSize = await playButton.evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(buttonSize).toBeGreaterThanOrEqual(22); // Should be ~1.5rem

    console.log('✅ Vinyl player dimensions:');
    console.log(`  - Vinyl: ${dimensions.width}px × ${dimensions.height}px`);
    console.log(`  - Button font: ${buttonSize}px`);
  });

  test('Card sections have proper spacing and layout', async ({ page }) => {
    // Check message container layout
    const messageContainer = page.locator('.message-container');
    const flexDirection = await messageContainer.evaluate(el => {
      return window.getComputedStyle(el).flexDirection;
    });

    // Should be column layout for card-like appearance
    expect(flexDirection).toBe('column');

    // Check illustrations are visible
    const illustrations = page.locator('.message-illustration');
    const illustrationCount = await illustrations.count();
    expect(illustrationCount).toBeGreaterThan(0);

    const illustrationSize = await illustrations.first().evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(illustrationSize).toBeGreaterThanOrEqual(75); // Should be ~5rem

    console.log('✅ Card layout verified');
  });

  test('Gallery note has bigger text', async ({ page }) => {
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();

    const galleryNote = page.locator('.gallery-note');
    const fontSize = await galleryNote.evaluate(el => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });

    expect(fontSize).toBeGreaterThanOrEqual(17); // Should be ~1.1rem

    console.log(`✅ Gallery note font size: ${fontSize}px`);
  });

  test('Closing section looks like a card', async ({ page }) => {
    await page.locator('.closing-section').scrollIntoViewIfNeeded();

    const closingContainer = page.locator('.closing-container');
    await expect(closingContainer).toBeVisible();

    const styles = await closingContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        border: computed.border,
        padding: computed.padding
      };
    });

    // Should have white background
    expect(styles.background).toContain('rgb(255, 255, 255)');

    // Should have border
    expect(styles.border).toContain('3px');

    // Take screenshot
    await expect(closingContainer).toHaveScreenshot('closing-card.png', {
      maxDiffPixels: 100
    });
  });

  test('Signature is prominent and large', async ({ page }) => {
    await page.locator('.closing-section').scrollIntoViewIfNeeded();

    const signatureName = page.locator('.signature-name');
    const fontSize = await signatureName.evaluate(el => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });

    expect(fontSize).toBeGreaterThanOrEqual(38); // Should be ~2.5rem

    console.log(`✅ Signature font size: ${fontSize}px`);
  });

  test('Overall visual consistency', async ({ page }) => {
    console.log('📸 Taking full page screenshots for visual verification...');

    // Header section
    await page.locator('.header-section').scrollIntoViewIfNeeded();
    await expect(page.locator('.header-section')).toHaveScreenshot('header-section-improved.png', {
      maxDiffPixels: 100
    });

    // Message card
    await page.locator('.message-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.message-section')).toHaveScreenshot('message-card-improved.png', {
      maxDiffPixels: 100
    });

    // Vinyl section
    await page.locator('.vinyl-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.vinyl-section')).toHaveScreenshot('vinyl-section-improved.png', {
      maxDiffPixels: 100
    });

    // Gallery
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.gallery-section')).toHaveScreenshot('gallery-section-improved.png', {
      maxDiffPixels: 100
    });

    // Closing
    await page.locator('.closing-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.closing-section')).toHaveScreenshot('closing-section-improved.png', {
      maxDiffPixels: 100
    });

    console.log('✅ All visual screenshots captured');
  });

  test('Mobile responsiveness with bigger elements', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.waitForSelector('#landing-scene', { state: 'visible' });

    // Open envelope
    await page.locator('.envelope-wrapper').click();
    await page.waitForTimeout(3000);

    // Check message card adapts
    const messageSection = page.locator('.message-section');
    await expect(messageSection).toBeVisible();

    const messageBox = await messageSection.boundingBox();
    expect(messageBox.width).toBeLessThanOrEqual(375);

    // Check photo frames adapt
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();
    const photoFrame = page.locator('.photo-frame').first();
    const photoBox = await photoFrame.boundingBox();
    expect(photoBox.width).toBeLessThanOrEqual(375);

    console.log('✅ Mobile responsiveness verified');
  });

  test('Print layout comparison', async ({ page }) => {
    // Generate a comparison of before/after text sizes
    const measurements = await page.evaluate(() => {
      const getSize = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return 0;
        return parseFloat(window.getComputedStyle(el).fontSize);
      };

      return {
        header: getSize('.birthday-header'),
        h2: getSize('h2'),
        messageLine: getSize('.message-line'),
        closingMessage: getSize('.closing-message'),
        signature: getSize('.signature'),
        signatureName: getSize('.signature-name'),
        galleryNote: getSize('.gallery-note'),
        photoPlaceholder: getSize('.photo-placeholder'),
        vinylCaption: getSize('.vinyl-caption')
      };
    });

    console.log('\n📊 Typography Measurements:');
    console.log('═══════════════════════════════════════');
    Object.entries(measurements).forEach(([key, value]) => {
      console.log(`  ${key.padEnd(20)}: ${value}px`);
    });
    console.log('═══════════════════════════════════════\n');

    // Verify all are reasonable sizes
    Object.values(measurements).forEach(size => {
      expect(size).toBeGreaterThan(0);
    });
  });
});
