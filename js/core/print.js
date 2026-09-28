// Prints a single generated sheet (lesson plan, worksheet, flashcards) instead of the whole page.
export function printSheet(html) {
  let sheet = document.getElementById('print-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'print-sheet';
    document.body.append(sheet);
  }
  sheet.innerHTML = html;
  document.body.classList.add('printing-sheet');
  const done = () => {
    document.body.classList.remove('printing-sheet');
    sheet.innerHTML = '';
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
  // Browsers without afterprint (or when print is cancelled instantly) still get cleaned up.
  setTimeout(
    () => document.body.classList.contains('printing-sheet') && !matchMedia('print').matches && done(),
    1500
  );
}
