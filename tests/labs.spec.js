import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, watchErrors, open } from './helpers.js';
import { LABS } from '../js/data/curriculum.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
  await prefs(page, { level: 'kuliah' });
});

test('every lab mounts without errors', async ({ page }) => {
  const errors = watchErrors(page);
  for (const lab of LABS) {
    await open(page, `lab/${lab.id}`);
    await expect(page.locator('[data-lab] .lab-grid')).toBeVisible();
    await page.waitForTimeout(150);
  }
  expect(errors).toEqual([]);
});

test('balancing lab balances any equation', async ({ page }) => {
  await open(page, 'lab/setara');
  await page.locator('#own-eq').fill('C3H8 + O2 -> CO2 + H2O');
  await page.getByRole('button', { name: 'Setarakan' }).click();
  await expect(page.locator('[data-own-out] .equation')).toHaveText('C3H8 + 5O2 → 3CO2 + 4H2O');
  // Practice: fill the right coefficients for H2 + O2 → H2O.
  await page.locator('#c0').fill('2');
  await page.locator('#c2').fill('2');
  await page.locator('[data-check]').click();
  await expect(page.locator('[data-feedback]')).toHaveText(/Setara!/);
});

test('molar mass lab computes Mr and converts moles', async ({ page }) => {
  await open(page, 'lab/stoikiometri');
  await page.locator('#st-f').fill('H2O');
  await expect(page.locator('[data-mr]')).toContainText('18,015');
  await page.locator('#cv-mass').fill('36.03');
  await expect(page.locator('#cv-mol')).toHaveValue('2');
});

test('pH lab, titration and voltaic cell give textbook numbers', async ({ page }) => {
  await open(page, 'lab/ph');
  await page.locator('[data-i]', { hasText: 'Air murni' }).click();
  await expect(page.locator('[data-ph]')).toContainText('pH 7');
  await open(page, 'lab/titrasi');
  await page.locator('#t-v').fill('25');
  await expect(page.locator('[data-ph]')).toContainText('pH 7');
  await open(page, 'lab/volta');
  await expect(page.locator('[data-out]')).toContainText('1,1 V');
});

test('VSEPR lab builds shapes from pairs', async ({ page }) => {
  await open(page, 'lab/vsepr');
  await page.locator('[data-bonds] [data-n="2"]').click();
  await page.locator('[data-lone] [data-n="2"]').click();
  await expect(page.locator('[data-info] h3')).toHaveText('Bengkok (V)');
  await expect(page.locator('[data-info]')).toContainText('Air');
  await expect(page).toHaveURL(/shape=bent/);
});

test('molecule builder checks valence and finds isomers in PubChem', async ({ page }) => {
  await open(page, 'lab/rakit');
  await expect(page.locator('[data-summary] .formula')).toHaveText('C2H6O');
  await page.locator('[data-find]').click();
  await expect(page.locator('[data-results]')).toContainText('Etanol');
  await page.locator('[data-inc="H"]').click();
  await expect(page.locator('[data-summary] .notice-warn')).toBeVisible();
});
