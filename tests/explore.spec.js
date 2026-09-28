import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, open, LIVE } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
  await prefs(page);
});

test('catalogue search works in Indonesian, English and by formula', async ({ page }) => {
  await open(page, 'explore');
  const q = page.locator('#f-q');
  await q.fill('garam dapur');
  await expect(page.locator('[data-results] .mol-card').first()).toContainText('Natrium klorida');
  await q.fill('vinegar');
  await expect(page.locator('[data-results] .mol-card').first()).toContainText('Asam asetat');
  await q.fill('C6H12O6');
  await expect(page.locator('[data-results] .mol-card')).toHaveCount(3);
  await expect(page).toHaveURL(/q=C6H12O6/);
});

test('filters by class, level and place', async ({ page }) => {
  await open(page, 'explore');
  await page.locator('#f-cls').selectOption('logam');
  const count = await page.locator('[data-results] .mol-card').count();
  expect(count).toBeGreaterThan(8);
  await page.locator('#f-lv').selectOption('sd');
  await expect(page).toHaveURL(/lv=sd/);
  for (const badge of await page.locator('[data-results] .badge').allTextContents()) expect(badge).toBe('SD');
  await page.locator('[data-reset]').click();
  await page.locator('#f-ctx').selectOption('gawai');
  await expect(page.locator('[data-results] .mol-card').first()).toBeVisible();
});

test('searches beyond the catalogue return live PubChem compounds', async ({ page }) => {
  await open(page, 'explore?q=testium');
  const live = page.locator('[data-live]');
  await expect(live.locator('.mol-card.live')).toContainText(LIVE.title);
  await expect(live.locator('.suggest-list')).toContainText('testiumol');
  await live.locator('.mol-card.live a').first().click();
  await expect(page.locator('h1')).toHaveText(LIVE.title);
});

test('element names in the search suggest the element page', async ({ page }) => {
  await open(page, 'explore?q=Fe');
  await page.locator('[data-element-hit] a').click();
  await expect(page.locator('h1')).toContainText('Besi');
  await expect(page.locator('svg.bohr')).toBeVisible();
});
