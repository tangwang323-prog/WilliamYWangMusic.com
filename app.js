const order = ['home', 'compositions', 'awards', 'biography', 'contact'];
const track = document.getElementById('track');
const navButtons = [...document.querySelectorAll('[data-go]')];

const calendarIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M3.5 10h17"></path></svg>';
const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5v5l3.2 2"></path></svg>';

const compositions = {
  original: [
    { title: 'Invasion from the Deep', year: '2023', duration: '2:26', type: 'Solo Piano', description: 'A dramatic, turbulent work evoking the relentless surge of dark waters rising from below — thunderous bass clusters give way to frantic, cascading runs in the upper register.', tags: ['Solo Piano', 'Programmatic'] },
    { title: 'Waltz on the Moon', year: '2026', duration: '6:53', type: 'Solo Piano', description: 'A weightless, lilting waltz imagining a dance in low gravity — the melody floats with an unhurried elegance, each phrase drifting gently before settling back to earth.', tags: ['Solo Piano', 'Waltz'] },
    { title: 'Last Stand', year: '2025', duration: '3:02', type: 'Solo Piano', description: 'A fierce, defiant piece built on a relentless rhythmic drive — moments of quiet resolve interrupted by surging, fortissimo outbursts that refuse to yield.', tags: ['Solo Piano', 'Contemporary'] },
    { title: 'Nocturnal Reverie', year: '2025', duration: '5:15', type: 'Solo Piano', description: 'A late-night meditation drifting between wakefulness and dream — soft, luminous harmonies dissolve into one another beneath a singing, improvisatory melody.', tags: ['Solo Piano', 'Nocturne'] },
    { title: 'Long Lost Land', year: '2024', duration: '2:30', type: 'Solo Piano', description: 'A sweeping, nostalgic journey through a landscape half-remembered and half-imagined — wide, open harmonies and a yearning melodic line evoking distance and longing.', tags: ['Solo Piano', 'Lyrical'] }
  ],
  remix: [
    { title: 'Inferno', year: '2026', duration: '2:36', type: 'Solo Piano', description: "A fiery piano arrangement of Mrs. Green Apple's Fire Force theme, capturing the blazing intensity of the original with cascading runs and a thunderous left-hand ostinato.", tags: ['Mrs. Green Apple', 'Anime', 'J-Rock'] },
    { title: 'Gurenge', year: '2026', duration: '4:30', type: 'Solo Piano', description: "LiSA's Demon Slayer opening reimagined for solo piano — the soaring vocal melody transformed into a singing cantabile line over a turbulent, storm-like accompaniment.", tags: ['LiSA', 'Demon Slayer', 'Anime'] },
    { title: 'You Say Run', year: '2026', duration: '3:55', type: 'Solo Piano', description: "Yuki Hayashi's legendary My Hero Academia track arranged for piano, building from a quiet, determined opening to an overwhelming, triumphant climax.", tags: ['Yuki Hayashi', 'My Hero Academia', 'Anime'] },
    { title: 'Boom Boom Boom Boom', year: '2025', duration: '3:45', type: 'Solo Piano', description: "A piano reimagining of the Vengaboys' iconic Eurodance anthem, recast as a driving, rhythmically charged solo piece that balances playful energy with harmonic richness.", tags: ['Vengaboys', 'Pop', 'Dance'] },
    { title: 'Stargazing', year: '2025', duration: '4:05', type: 'Solo Piano', description: "Myles Smith's introspective indie ballad reinterpreted for solo piano — sparse, luminous, and unhurried, with the melody floating above a gentle, open-voiced accompaniment.", tags: ['Myles Smith', 'Indie', 'Pop'] },
    { title: '起风了 (Qi Feng Le)', year: '2024', duration: '5:20', type: 'Solo Piano', description: "A lyrical piano arrangement of Yu Takahashi and Mi Guo's beloved ballad, preserving the wistful, windswept emotion of the original through delicate voicing and expressive rubato.", tags: ['Yu Takahashi', 'Mi Guo', 'Chinese Pop'] }
  ]
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function renderList(kind) {
  const list = document.querySelector(`[data-list="${kind}"]`);
  list.innerHTML = compositions[kind].map((piece, index) => `
    <article class="piece">
      <div class="piece-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="piece-main">
        <h2>${escapeHtml(piece.title)}</h2>
        <p class="type">${escapeHtml(piece.type)}</p>
        <p class="desc">${escapeHtml(piece.description)}</p>
        <div class="tags">${piece.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
      <div class="meta">
        <span>${calendarIcon}${escapeHtml(piece.year)}</span>
        <span>${clockIcon}${escapeHtml(piece.duration)}</span>
      </div>
    </article>`).join('');
}
renderList('original');
renderList('remix');

document.querySelectorAll('[data-list-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.listToggle;
    document.querySelectorAll('[data-list-toggle]').forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.piece-list').forEach(list => list.classList.toggle('active', list.dataset.list === key));
  });
});

function currentSlideName() {
  const hash = location.hash.replace('#', '');
  return order.includes(hash) ? hash : 'home';
}

function goTo(name, push = true) {
  if (!order.includes(name)) name = 'home';
  const index = order.indexOf(name);
  track.style.transform = `translate3d(${-index * 100}vw,0,0)`;
  document.querySelectorAll('.topbar nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.go === name));
  document.querySelectorAll('.slide').forEach(slide => {
    if (slide.id !== name) slide.scrollTop = 0;
  });
  if (push) history.replaceState(null, '', `#${name}`);
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-go]');
  if (!button) return;
  event.preventDefault();
  goTo(button.dataset.go);
});

window.addEventListener('hashchange', () => goTo(currentSlideName(), false));

document.addEventListener('keydown', event => {
  const active = currentSlideName();
  const index = order.indexOf(active);
  if (event.key === 'ArrowRight') goTo(order[Math.min(order.length - 1, index + 1)]);
  if (event.key === 'ArrowLeft') goTo(order[Math.max(0, index - 1)]);
});

document.querySelectorAll('.year-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

goTo(currentSlideName(), false);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
