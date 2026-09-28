import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, open } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
  await prefs(page);
});

test('desktop sidebar stays at the viewport edge and marks the current workspace', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open(page, '');
  const sidebar = page.locator('.learning-sidebar');
  const box = await sidebar.boundingBox();
  expect(box.x).toBe(0);
  expect(box.height).toBe(1000);
  await sidebar.locator('[data-nav="lab"]').click();
  await expect(page.locator('main h1')).toHaveText('Laboratorium virtual');
  await expect(sidebar.locator('[data-nav="lab"]')).toHaveAttribute('aria-current', 'page');
  await sidebar.locator('[data-nav="teacher"]').click();
  await expect(sidebar.locator('[data-nav="teacher"]')).toHaveAttribute('aria-current', 'page');
});

test('phone shortcuts stay at the bottom while the complete menu remains available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, '');
  const dock = page.locator('.mobile-dock');
  const box = await dock.boundingBox();
  expect(Math.round(box.y + box.height)).toBe(844);
  await dock.locator('[data-nav="saved"]').click();
  await expect(page.locator('main')).toHaveAttribute('data-page', 'saved');
  await expect(dock.locator('[data-nav="saved"]')).toHaveAttribute('aria-current', 'page');
  await page.locator('[data-toggle="drawer"]').click();
  await expect(page.locator('#drawer a')).toHaveCount(14);
});

test('home learning path resumes after a completed lesson and persists after reload', async ({ page }) => {
  await open(page, '');
  const first = await page.locator('.path-step').first().getAttribute('href');
  const second = await page.locator('.path-step').nth(1).getAttribute('href');
  await page.locator('.hero-actions .btn').click();
  await expect(page).toHaveURL(new RegExp(first.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  await page.locator('[data-read]').click();
  await open(page, '');
  await expect(page.locator('.path-step').first()).toHaveClass(/is-complete/);
  await expect(page.locator('.progress-card progress')).toHaveAttribute('value', '1');
  await expect(page.locator('.hero-actions .btn')).toHaveAttribute('href', second);
  await page.reload();
  await expect(page.locator('.progress-card progress')).toHaveAttribute('value', '1');
});

test('local brand and typography load and reduced motion stops the decorative model', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await open(page, '');
  const fontCount = await page.evaluate(async () => {
    const fonts = await document.fonts.load('400 16px "Plus Jakarta Sans"');
    return fonts.filter(font => font.status === 'loaded').length;
  });
  expect(fontCount).toBeGreaterThan(0);
  expect(
    await page
      .locator('.brand img')
      .first()
      .evaluate(img => img.complete && img.naturalWidth > 0)
  ).toBe(true);
  await expect(page.locator('.water-model')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
});
