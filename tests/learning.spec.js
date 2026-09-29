import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, watchErrors, open } from './helpers.js';
import { loadTopic, quizFor } from '../js/data/topics/index.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

/** Answers every question correctly by matching the right option text from the topic data. */
async function finishQuiz(page, questions) {
  const byQuestion = new Map(questions.map(q => [q.q[0], q.options[q.answer][0]]));
  for (let i = 0; i < questions.length; i++) {
    const text = (await page.locator('.quiz-q').textContent()).trim();
    const answer = byQuestion.get(text);
    await page.locator('.quiz-option', { hasText: answer }).first().click();
    await page.getByRole('button', { name: 'Periksa jawaban' }).click();
    await expect(page.locator('.feedback.ok')).toBeVisible();
    await page.locator('.quiz-actions button').click();
  }
}

test('lesson: level versions, glossary links and a perfect quiz', async ({ page }) => {
  await prefs(page, { level: 'smp' });
  const errors = watchErrors(page);
  await open(page, 'learn/asam-basa');
  await expect(page.locator('[data-lv="smp"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.lesson-body a.term').first()).toBeVisible();
  await page.locator('[data-lv="sd"]').click();
  await expect(page.locator('.lesson-body')).toContainText('kol ungu');
  await expect(page).toHaveURL(/lv=sd/);

  const topic = await loadTopic('asam-basa');
  await finishQuiz(page, quizFor(topic, 'sd'));
  await expect(page.locator('.quiz-score')).toContainText(
    `${quizFor(topic, 'sd').length} dari ${quizFor(topic, 'sd').length}`
  );
  await open(page, 'saved');
  await expect(page.locator('main')).toContainText('Asam, basa, garam, dan pH');
  expect(errors).toEqual([]);
});

test('teacher mode shows lesson-plan notes on topic pages', async ({ page }) => {
  await prefs(page, { level: 'guru' });
  await open(page, 'learn/ikatan');
  await expect(page.locator('.teacher-notes')).toContainText('Capaian pembelajaran');
});

test('generated quizzes are built from the data', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  for (const id of [
    'structure',
    'formula',
    'symbols',
    'category',
    'classes',
    'places',
    'ions',
    'reactions',
    'mixed',
  ]) {
    await open(page, `quiz/${id}`);
    await expect(page.locator('.quiz-option')).not.toHaveCount(0);
  }
  await open(page, 'quiz/structure');
  await expect(page.locator('.quiz-img svg.depict')).toBeVisible();
});

test('glossary search and term pages', async ({ page }) => {
  await prefs(page);
  await open(page, 'glossary?q=ikatan');
  await expect(page.locator('.term-card').first()).toBeVisible();
  await page.locator('.term-card h2 a', { hasText: 'Ikatan hidrogen' }).click();
  await expect(page.locator('h1')).toHaveText('Ikatan hidrogen');
  await expect(page.locator('.term-card')).toContainText('Air');
});

test('class pages explain the class and list real members', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  await open(page, 'classes/asam-karboksilat');
  await expect(page.locator('.class-facts')).toContainText('R–COOH');
  await expect(page.locator('.mol-card', { hasText: 'Asam asetat' })).toBeVisible();
  await expect(page.locator('[data-members] .mol-card.live').first()).toBeVisible();
});

test('periodic table has 118 elements and heat maps', async ({ page }) => {
  await prefs(page);
  await open(page, 'table');
  await expect(page.locator('.el-tile')).toHaveCount(118);
  await page.locator('#pt-by').selectOption('eneg');
  await expect(page.locator('.el-tile[data-z="9"] [data-val]')).toHaveText('3,98');
  await expect(page).toHaveURL(/by=eneg/);
  await page.locator('#pt-find').fill('emas');
  await expect(page.locator('.el-tile:not(.is-dim)')).toHaveCount(1);
  await page.locator('.el-tile[data-z="79"]').click();
  await expect(page.locator('h1')).toContainText('Emas');
});
