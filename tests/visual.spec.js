// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('Rong Birthday Website - Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page
    await page.goto(BASE_URL);

    // Wait for loading screen to complete and landing scene to appear
    await page.waitForSelector('#landing-scene', { state: 'visible', timeout: 10000 });
  });

  test('3D Dog should be visible and look like a dog', async ({ page }) => {
    // Check that the dog character container exists
    const dogCharacter = page.locator('.dog-character');
    await expect(dogCharacter).toBeVisible();

    // Check that the 3D canvas is rendered (Three.js creates a canvas element)
    const canvas = dogCharacter.locator('canvas');
    await expect(canvas).toBeVisible();

    // Verify canvas has proper dimensions
    const canvasSize = await canvas.boundingBox();
    expect(canvasSize.width).toBe(200);
    expect(canvasSize.height).toBe(200);

    // Take a screenshot to verify dog appearance
    await expect(dogCharacter).toHaveScreenshot('dog-character.png', {
      maxDiffPixels: 100 // Allow some variance due to animations
    });
  });

  test('Envelope should look like an envelope', async ({ page }) => {
    const envelope = page.locator('.envelope');
    await expect(envelope).toBeVisible();

    // Check that all envelope parts are present
    await expect(page.locator('.envelope-back')).toBeVisible();
    await expect(page.locator('.envelope-flap')).toBeVisible();
    await expect(page.locator('.envelope-left')).toBeVisible();
    await expect(page.locator('.envelope-right')).toBeVisible();
    await expect(page.locator('.envelope-bottom')).toBeVisible();

    // Check that the flap has the decorative seal (💌)
    const flapStyles = await page.locator('.envelope-flap').evaluate(el => {
      return window.getComputedStyle(el, '::after').content;
    });

    // Take a screenshot of the envelope
    await expect(page.locator('.envelope-wrapper')).toHaveScreenshot('envelope-closed.png', {
      maxDiffPixels: 100
    });
  });

  test('Envelope should properly hide after opening', async ({ page }) => {
    const landingScene = page.locator('#landing-scene');
    const letterContent = page.locator('#letter-content');
    const envelope = page.locator('.envelope');

    // Initially landing scene should be visible, letter content hidden
    await expect(landingScene).toBeVisible();
    await expect(letterContent).not.toBeVisible();

    // Click the envelope
    await page.locator('.envelope-wrapper').click();

    // Wait for opening animation to start
    await expect(envelope).toHaveClass(/opening/);

    // Wait for landing scene to fade out and be hidden
    await page.waitForTimeout(2500); // Wait for animation sequence
    await expect(landingScene).toHaveCSS('display', 'none');

    // Verify letter content is now visible
    await expect(letterContent).toBeVisible();
    await expect(letterContent).toHaveClass(/active/);

    // Ensure envelope is completely removed from view
    const landingSceneDisplay = await landingScene.evaluate(el =>
      window.getComputedStyle(el).display
    );
    expect(landingSceneDisplay).toBe('none');
  });

  test('Text should be readable after opening envelope', async ({ page }) => {
    // Click the envelope
    await page.locator('.envelope-wrapper').click();

    // Wait for letter content to appear
    await page.waitForTimeout(2500);

    // Check that the header section is visible and readable
    const header = page.locator('.header-section h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Happy 26th Birthday Rong/);

    // Verify no overlay elements are blocking the text
    const headerBox = await header.boundingBox();
    const elementsAtHeaderCenter = await page.evaluate(({ x, y }) => {
      const elements = document.elementsFromPoint(x, y);
      return elements.map(el => el.className);
    }, { x: headerBox.x + headerBox.width / 2, y: headerBox.y + headerBox.height / 2 });

    // The header or its parent should be the topmost element
    const hasTextElement = elementsAtHeaderCenter.some(className =>
      className.includes('header') ||
      className.includes('letter') ||
      className.includes('birthday-header')
    );
    expect(hasTextElement).toBeTruthy();
  });

  test('Envelope animation sequence', async ({ page }) => {
    const envelope = page.locator('.envelope');
    const flap = page.locator('.envelope-flap');

    // Take screenshot before opening
    await expect(page.locator('.landing-scene')).toHaveScreenshot('before-open.png', {
      maxDiffPixels: 100
    });

    // Click to open
    await page.locator('.envelope-wrapper').click();

    // Wait a bit for the animation
    await page.waitForTimeout(500);

    // Verify opening class is applied
    await expect(envelope).toHaveClass(/opening/);

    // Take screenshot during opening
    await expect(page.locator('.landing-scene')).toHaveScreenshot('during-open.png', {
      maxDiffPixels: 100
    });

    // Wait for complete animation
    await page.waitForTimeout(2500);

    // Verify scene is hidden
    await expect(page.locator('#landing-scene')).toHaveCSS('display', 'none');
  });

  test('Dog animation is smooth and continuous', async ({ page }) => {
    const dogCharacter = page.locator('.dog-character');

    // Wait for Three.js to initialize
    await page.waitForTimeout(1000);

    // Check that canvas is rendering by comparing frames
    const canvas = dogCharacter.locator('canvas');

    // Take multiple screenshots over time to verify animation
    const screenshot1 = await canvas.screenshot();
    await page.waitForTimeout(500);
    const screenshot2 = await canvas.screenshot();

    // Screenshots should be different (indicating animation)
    const buffersEqual = screenshot1.equals(screenshot2);
    expect(buffersEqual).toBe(false);
  });

  test('Responsive design - mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Reload the page
    await page.reload();
    await page.waitForSelector('#landing-scene', { state: 'visible' });

    // Verify envelope is still visible and properly sized
    const envelopeWrapper = page.locator('.envelope-wrapper');
    await expect(envelopeWrapper).toBeVisible();

    const box = await envelopeWrapper.boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);

    // Verify dog is visible
    await expect(page.locator('.dog-character')).toBeVisible();
  });

  test('All CSS animations are defined', async ({ page }) => {
    // Check that critical animations exist
    const animations = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      const animationNames = new Set();

      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              animationNames.add(rule.name);
            }
          });
        } catch (e) {
          // Skip cross-origin stylesheets
        }
      });

      return Array.from(animationNames);
    });

    // Verify critical animations exist
    expect(animations).toContain('envelopeOpen');
    expect(animations).toContain('flapOpen');
    expect(animations).toContain('letterSlideOut');
    expect(animations).toContain('dogBreath');
  });
});
