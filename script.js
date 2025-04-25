// Инициализация i18next
i18next
.use(i18nextHttpBackend)
.init({
  lng: localStorage.getItem('preferredLanguage') || 'en',
  fallbackLng: 'en',
  debug: false,
  backend: {
    loadPath: 'lang/{{lng}}.json'
  }
})
.then(() => {
  updateContent();
  initTheme();
})
.catch(err => {
  console.error('Ошибка загрузки переводов:', err);
});

// Обновление контента
function updateContent() {
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (key) el.textContent = i18next.t(key);
});

// Обновляем выбранный язык
const langSelector = document.getElementById('language-selector');
if (langSelector) langSelector.value = i18next.language;
}

// Переключение языка
document.getElementById('language-selector')?.addEventListener('change', (e) => {
const newLang = e.target.value;
i18next.changeLanguage(newLang)
  .then(() => {
    updateContent();
    localStorage.setItem('preferredLanguage', newLang);
  })
  .catch(err => {
    console.error('Ошибка при смене языка:', err);
  });
});

// Управление темой
function initTheme() {
const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
applyTheme(savedTheme === 'light');
}

function applyTheme(isLight) {
document.body.classList.toggle('light', isLight);
document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) themeBtn.textContent = isLight ? '🌙' : '☀️';
localStorage.setItem('preferredTheme', isLight ? 'light' : 'dark');
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
const isLight = document.body.classList.contains('light');
applyTheme(!isLight);
});

// Проверка видеофона
document.addEventListener('DOMContentLoaded', () => {
const video = document.getElementById('bg-video');
if (video) {
  video.play().catch(e => console.log('Автовоспроизведение видео заблокировано:', e));
}
});
// Обработка ошибок видеофона
function fallbackVideo() {
  console.log("Видео не загрузилось, активируем fallback");
  document.getElementById('bg-video').style.display = 'none';
  document.querySelector('.video-container').style.background = "#0a192f";
}

// Проверка загрузки видео
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  if (video) {
    video.play().catch(e => {
      console.log("Автовоспроизведение запрещено:", e);
      fallbackVideo();
    });
  }
});
// Обработка ошибок видео
function fallbackVideo() {
  console.log("Активирован fallback для видео");
  const video = document.getElementById('bg-video');
  if (video) {
    video.style.display = 'none';
  }
}

// Проверка при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  if (video) {
    video.play().catch(e => {
      console.log("Ошибка видео:", e);
      fallbackVideo();
    });
  }
});
// Автопроверка видео
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('bg-video');
  if (video) {
    video.play().catch(e => {
      console.log("Видео не загрузилось, ошибка:", e);
      video.style.display = 'none';
    });
  }
});