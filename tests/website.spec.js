const { test, expect } = require('@playwright/test');
const path = require('path');

const websiteUrl = 'file://' + path.join(__dirname, '..', 'index.html');

test.describe('Rong Birthday Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Loading screen appears and completes', async ({ page }) => {
    console.log('🔄 Testing loading screen...');

    await page.goto(websiteUrl);

    // Loading screen should be visible
    const loadingScreen = page.locator('#loading-screen');
    await expect(loadingScreen).toBeVisible();

    // Take screenshot of loading screen
    await page.screenshot({
      path: 'test-results/01-loading-screen.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 01-loading-screen.png');

    // Wait for loading to complete (should hide)
    await loadingScreen.waitFor({ state: 'hidden', timeout: 10000 });
    console.log('✅ Loading screen completed');

    // Landing scene should now be visible
    const landingScene = page.locator('#landing-scene');
    await expect(landingScene).toBeVisible();
    console.log('✅ Landing scene visible');
  });

  test('3D Dog and landing scene elements', async ({ page }) => {
    console.log('🐕 Testing 3D dog and landing scene...');

    await page.goto(websiteUrl);

    // Wait for loading to complete
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });

    // Wait a moment for 3D dog to render
    await page.waitForTimeout(2000);

    // Check dog character container exists
    const dogCharacter = page.locator('.dog-character');
    await expect(dogCharacter).toBeVisible();

    // Check orbiting elements
    const orbitingContainer = page.locator('.orbiting-container');
    await expect(orbitingContainer).toBeVisible();

    // Check envelope
    const envelope = page.locator('#envelope');
    await expect(envelope).toBeVisible();

    // Take screenshot of landing scene with 3D dog
    await page.screenshot({
      path: 'test-results/02-landing-scene-with-3d-dog.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 02-landing-scene-with-3d-dog.png');
  });

  test('Envelope click triggers particle effects and opens', async ({ page }) => {
    console.log('💌 Testing envelope opening with particles...');

    await page.goto(websiteUrl);

    // Wait for loading
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });
    await page.waitForTimeout(2000);

    // Take screenshot before click
    await page.screenshot({
      path: 'test-results/03-before-envelope-click.png',
      fullPage: false
    });

    // Check if particle canvas will be created
    const envelope = page.locator('#envelope');

    // Click envelope
    await envelope.click();
    console.log('✅ Clicked envelope');

    // Wait a moment for particle effects
    await page.waitForTimeout(500);

    // Take screenshot during particle effect
    await page.screenshot({
      path: 'test-results/04-particle-explosion.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 04-particle-explosion.png');

    // Check particle canvas exists
    const particleCanvas = page.locator('#particle-canvas');
    await expect(particleCanvas).toBeVisible();
    console.log('✅ Particle canvas created');

    // Wait for envelope opening animation
    await page.waitForTimeout(2000);

    // Landing scene should fade out
    const landingScene = page.locator('#landing-scene');
    await expect(landingScene).toHaveClass(/hidden/);
    console.log('✅ Landing scene hidden after envelope opens');

    // Letter content should appear
    const letterContent = page.locator('#letter-content');
    await expect(letterContent).toHaveClass(/active/);
    console.log('✅ Letter content revealed');

    // Take screenshot of opened letter
    await page.screenshot({
      path: 'test-results/05-letter-opened.png',
      fullPage: true
    });
    console.log('✅ Screenshot: 05-letter-opened.png');
  });

  test('Letter sections and scroll animations', async ({ page }) => {
    console.log('📜 Testing letter sections...');

    await page.goto(websiteUrl);

    // Wait for loading and open envelope
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });
    await page.waitForTimeout(2000);
    await page.locator('#envelope').click();
    await page.waitForTimeout(3000);

    // Check header section
    const headerSection = page.locator('.header-section');
    await expect(headerSection).toBeVisible();

    await page.screenshot({
      path: 'test-results/06-header-section.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 06-header-section.png');

    // Scroll to message section
    await page.locator('.message-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/07-message-section.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 07-message-section.png');

    // Scroll to vinyl section
    await page.locator('.vinyl-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/08-vinyl-section.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 08-vinyl-section.png');

    // Scroll to gallery
    await page.locator('.gallery-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/09-gallery-section.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 09-gallery-section.png');

    // Scroll to closing
    await page.locator('.closing-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/10-closing-section.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 10-closing-section.png');
  });

  test('Vinyl player interaction', async ({ page }) => {
    console.log('💿 Testing vinyl player...');

    await page.goto(websiteUrl);

    // Navigate to vinyl section
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });
    await page.waitForTimeout(2000);
    await page.locator('#envelope').click();
    await page.waitForTimeout(3000);
    await page.locator('.vinyl-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const vinylRecord = page.locator('#vinyl-record');

    // Take screenshot before spinning
    await page.screenshot({
      path: 'test-results/11-vinyl-before-spin.png',
      fullPage: false
    });

    // Click vinyl to start spinning
    await vinylRecord.click();
    await page.waitForTimeout(500);

    // Check if spinning class is added
    await expect(vinylRecord).toHaveClass(/spinning/);
    console.log('✅ Vinyl is spinning');

    // Take screenshot while spinning
    await page.screenshot({
      path: 'test-results/12-vinyl-spinning.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 12-vinyl-spinning.png');

    // Click again to stop
    await vinylRecord.click();
    await page.waitForTimeout(500);

    // Should not have spinning class
    await expect(vinylRecord).not.toHaveClass(/spinning/);
    console.log('✅ Vinyl stopped');
  });

  test('Mobile responsive view', async ({ page }) => {
    console.log('📱 Testing mobile view...');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(websiteUrl);

    // Loading screen
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/13-mobile-loading.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 13-mobile-loading.png');

    // Wait for loading
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });
    await page.waitForTimeout(2000);

    // Landing scene
    await page.screenshot({
      path: 'test-results/14-mobile-landing.png',
      fullPage: false
    });
    console.log('✅ Screenshot: 14-mobile-landing.png');

    // Open envelope
    await page.locator('#envelope').click();
    await page.waitForTimeout(3000);

    // Letter sections
    await page.screenshot({
      path: 'test-results/15-mobile-letter.png',
      fullPage: true
    });
    console.log('✅ Screenshot: 15-mobile-letter.png');

    console.log('✅ Mobile view tested');
  });

  test('Check for console errors', async ({ page }) => {
    console.log('🔍 Checking for console errors...');

    const consoleErrors = [];
    const consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });

    await page.goto(websiteUrl);

    // Wait for loading
    await page.locator('#loading-screen').waitFor({ state: 'hidden', timeout: 10000 });
    await page.waitForTimeout(2000);

    // Click envelope
    await page.locator('#envelope').click();
    await page.waitForTimeout(3000);

    // Scroll through sections
    await page.locator('.vinyl-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    console.log('\n📊 Console Error Report:');
    console.log(`  Errors: ${consoleErrors.length}`);
    console.log(`  Warnings: ${consoleWarnings.length}`);

    if (consoleErrors.length > 0) {
      console.log('\n❌ Errors found:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('  ✅ No errors!');
    }

    if (consoleWarnings.length > 0) {
      console.log('\n⚠️  Warnings found:');
      consoleWarnings.forEach(warn => console.log(`  - ${warn}`));
    }

    // Don't fail test on warnings, only errors
    expect(consoleErrors.length).toBe(0);
  });
});
