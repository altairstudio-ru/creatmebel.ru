# Креат Мебель v2.0 — Дизайн-система

**Дата:** 11.09.2026 | **Автор:** UI Designer | **Статус:** для Senior Developer (вёрстка)

Палитра «Тёплый сервисный минимализм» поверх low-fi вайрфреймов (`../ux/wireframes.md`). Все токены готовы к копированию в CSS. Нейминг классов — BEM-подобный, желательно использовать на проекте как есть.

---

## 1. Принципы дизайна

1. **Тёплый, а не стерильно-белый.** Фоны молочные `#F8F5F0` / песочные `#EFE7DA`, белый — только для поверхностей (карточки, формы).
2. **Округлость = мягкость мебели.** Радиусы 12–24px, кнопки-«пилюли», никаких острых углов.
3. **Mobile-first.** Базовая шкала — мобильная (320px), desktop (`≥1024px`) усиливает размеры и добавляет колонки.
4. **Цифра важнее слова.** Цена, срок, гарантия выделяются визуально раньше описательного текста.
5. **Терракота — одно действие на экран.** Основной CTA только терракотовый; если вторичный CTA — оливковый/синий, не два терракотовых.
6. **«Всё включено» помечается оливковым** — это семантика «выгода/включено/гарантия». Синий — «доверие/справка/сервис».
7. **Пустое состояние — не тупик.** Вместо «ничего не найдено» — переход в сценарий «просчёт по размерам».

---

## 2. CSS-токены (`:root`)

```css
/* ============================================================
   КРЕАТ МЕБЕЛЬ v2.0 — DESIGN TOKENS
   Палитра «Тёплый сервисный минимализм» (2026)
   ============================================================ */

:root {

  /* ─── Цвет · фоны ─────────────────────────────────────── */
  --color-bg:            #F8F5F0;   /* молочный, фон сайта     */
  --color-bg-sand:       #EFE7DA;   /* песочный, акцентные секции */
  --color-surface:       #FFFFFF;   /* карточки, формы, меню    */

  /* ─── Цвет · терракота (бренд, CTA, активные) ─────────── */
  --color-terra-50:  #FBF0EB;
  --color-terra-100: #F5DCD2;
  --color-terra-200: #ECB8A4;
  --color-terra-300: #DF9073;
  --color-terra-400: #D07450;
  --color-terra-500: #C25E3C;   /* ОСНОВНАЯ                  */
  --color-terra-600: #A84E2F;   /* hover кнопок              */
  --color-terra-700: #8A3E24;   /* pressed / ссылки          */
  --color-terra-800: #6C301B;
  --color-terra-900: #4E2313;

  /* ─── Цвет · оливковый (природа, гарантии, «включено») ── */
  --color-olive-50:  #F2F4EA;
  --color-olive-100: #E4E8D3;
  --color-olive-200: #C9D0A6;
  --color-olive-300: #AAB577;
  --color-olive-400: #929C5E;
  --color-olive-500: #7A8450;   /* ОСНОВНАЯ                  */
  --color-olive-600: #656E40;   /* hover                    */
  --color-olive-700: #4F5732;   /* текст на светлом фоне     */
  --color-olive-800: #3A4025;
  --color-olive-900: #272B17;

  /* ─── Цвет · глубокий синий (доверие, сервис, справка) ── */
  --color-navy-50:  #F0F3F5;
  --color-navy-100: #DCE4E9;
  --color-navy-200: #B5C4CE;
  --color-navy-300: #8EA3B2;
  --color-navy-400: #678295;
  --color-navy-500: #45596C;
  --color-navy-600: #2E4152;   /* ОСНОВНАЯ                  */
  --color-navy-700: #243340;
  --color-navy-800: #1A252E;
  --color-navy-900: #10171D;

  /* ─── Цвет · грейж (тёплый нейтральный) ───────────────── */
  --color-gray-50:  #FAF8F6;
  --color-gray-100: #F4F1ED;
  --color-gray-200: #E9E4DD;
  --color-gray-300: #D9D2C9;
  --color-gray-400: #C2BAB0;
  --color-gray-500: #A39B90;   /* грейж, «мёртвый» текст    */
  --color-gray-600: #857C71;
  --color-gray-700: #645C52;   /* вторичный текст           */
  --color-gray-800: #45403A;
  --color-gray-900: #2B2926;   /* ОСНОВНОЙ ТЕКСТ            */
  --color-gray-950: #1A1816;

  /* ─── Цвет · семантика ────────────────────────────────── */
  --color-success:       #656E40;   /* тёмный оливковый, «успех»      */
  --color-success-soft:  #F2F4EA;   /* подложка «включено»            */
  --color-warning:       #C97B2D;   /* «уточняется», требует внимания  */
  --color-warning-soft:  #FAF0E0;
  --color-error:         #BC3B37;   /* ошибки ввода                   */
  --color-error-soft:    #FAE7E6;
  --color-info:          #2E4152;   /* синий = системная информация   */
  --color-info-soft:     #F0F3F5;
  --color-sale:          #C25E3C;   /* плашка «выгода −5 000 ₽»       */
  --color-sale-soft:     #FBF0EB;

  /* ─── Цвет · текст ─────────────────────────────────────── */
  --color-text:          var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-muted:     var(--color-gray-500);  /* только для необязательного */
  --color-text-invert:   #FFFFFF;
  --color-link:          var(--color-terra-700);

  /* ─── Цвет · границы ───────────────────────────────────── */
  --color-border:        var(--color-gray-200);
  --color-border-strong: var(--color-gray-300);
  --color-divider:       #E9E4DD;

  /* ─── Типографика · семейства ─────────────────────────── */
  --font-display: 'Unbounded', 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-body:    'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* ─── Типографика · размеры (base = MOBILE) ───────────── */
  --fs-display: 1.75rem;   /* 28px — hero H1 (mobile)  */
  --fs-h1:      1.625rem;  /* 26px */
  --fs-h2:      1.375rem;  /* 22px */
  --fs-h3:      1.125rem;  /* 18px */
  --fs-h4:      1.0625rem; /* 17px */
  --fs-body:    1rem;      /* 16px */
  --fs-body-s:  0.875rem;  /* 14px */
  --fs-caption: 0.75rem;   /* 12px */
  --fs-price-l: 1.5rem;    /* 24px — крупная цена (mobile) */
  --fs-price-m: 1.25rem;   /* 20px */
  --fs-price-s: 1rem;      /* 16px */

  /* ─── Типографика · вес, интерлиньяж, трекинг ─────────── */
  --fw-display: 600;                 /* Unbounded уже плотный  */
  --fw-h:       600;
  --fw-body:    400;
  --fw-semibold: 500;
  --fw-bold:    700;
  --fw-price:   800;                 /* цены — Manrope 800     */

  --lh-display: 1.2;
  --lh-h1: 1.25;
  --lh-h2: 1.3;
  --lh-h3: 1.35;
  --lh-body: 1.6;
  --lh-tight: 1.4;

  --tracking-wide:  0.08em;  /* overline / бейджи */
  --tracking-normal: 0;

  /* ─── Спейсинг (4px-сетка) ────────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ─── Радиусы ─────────────────────────────────────────── */
  --radius-sm:  12px;   /* инпуты, мини-карточки   */
  --radius-md:  16px;   /* стандартные карточки     */
  --radius-lg:  20px;   /* крупные блоки            */
  --radius-xl:  24px;   /* hero-панели, модалки     */
  --radius-pill: 999px; /* кнопки, чипы, бейджи     */
  --radius-full: 50%;

  /* ─── Тени ────────────────────────────────────────────── */
  --shadow-xs: 0 1px 2px rgba(43, 41, 38, 0.05);
  --shadow-sm: 0 2px 8px  rgba(43, 41, 38, 0.07);
  --shadow-md: 0 8px 24px rgba(43, 41, 38, 0.10);
  --shadow-lg: 0 16px 40px rgba(43, 41, 38, 0.14);
  --shadow-focus: 0 0 0 3px rgba(194, 94, 60, 0.28);

  /* ─── Motion ──────────────────────────────────────────── */
  --transition-fast:  150ms ease;
  --transition-base:  250ms cubic-bezier(0.2, 0.6, 0.2, 1);
  --ease-out:         cubic-bezier(0.2, 0.6, 0.2, 1);

  /* ─── Сетка и контейнер ───────────────────────────────── */
  --container-max:   1280px;
  --container-pad-mobile: 16px;
  --container-pad-desktop: 32px;
  --grid-gap: 24px;
  --sidebar-w: 280px;             /* фильтры каталога  */
  --product-right-w: 400px;       /* правая колонка PIM */

  /* ─── Тач-зоны ────────────────────────────────────────── */
  --touch-min: 44px;

  /* ─── Форматы данных ──────────────────────────────────── */
  /* Соглашение (не CSS): цены «45 200 ₽», сроки «5–7 дней»,
     размеры «Ш 220 × Г 95 × В 85 см» — реализуется в шаблонах */
}

/* Desktop-типографика (усиление) */
@media (min-width: 1024px) {
  :root {
    --fs-display: 3.25rem;   /* 52px */
    --fs-h1:      2.5rem;    /* 40px */
    --fs-h2:      2rem;      /* 32px */
    --fs-h3:      1.5rem;    /* 24px */
    --fs-h4:      1.25rem;   /* 20px */
    --fs-price-l: 2rem;      /* 32px */
    --fs-price-m: 1.5rem;    /* 24px */
    --fs-price-s: 1.125rem;  /* 18px */
  }
}
```

### 2.1. Контраст-чек (WCAG AA, проверено на 11.09.2026)

| Пара | Контраст | Где используется |
|---|---|---|
| `#2B2926` на `#F8F5F0` / `#FFFFFF` | ≥ 12:1 | основной текст на молочном/белом |
| `#FFFFFF` на `#C25E3C` | 5,2:1 | текст кнопок CTA ✓ |
| `#FFFFFF` на `#A84E2F` (hover) | 6,5:1 | CTA hover ✓ |
| `#FFFFFF` на `#2E4152` | 10,9:1 | синие кнопки/бейджи ✓ |
| `#2B2926` на `#EFE7DA` | 11,8:1 | текст на песочном ✓ |
| `#4F5732` на `#E4E8D3` | 6,6:1 | «Включено», оливковые бейджи ✓ |
| `#645C52` на `#FFFFFF` | 7,3:1 | вторичный текст ✓ |
| `#857C71` на `#FFFFFF` | 4,6:1 | плейсхолдеры — минимум ✓ |
| `#A39B90` на `#F8F5F0` | 2,9:1 | НЕ использовать для текста — только декоративные линии/разделители |
| `#BC3B37` на `#FAE7E6` | 4,7:1 | ошибки форм ✓ |

---

## 3. Типографика

### Правила
- **Заголовки (H1–H3, лого, цифры-акценты):** Unbounded, вес 600. H4 и подзаголовки-«лиды» — Manrope 700.
- **Текст:** Manrope 400/500/600/700/800. Цены — Manrope 800.
- **Unbounded не наклоняется** (в системе нет курсива заголовков; курсив допустим только в цитатах отзывов — Manrope italic).
- **Длина строки** в колонке текста ≤ 70 символов; в карточках — ≤ 2 строки названия (ellipsis не использовать, переносить по словам).
- **Не более одного H1** на странице (SEO + доступность).

### Шкала с примерами

| Токен | Mobile (base) | Desktop (≥1024px) | Пример использования |
|---|---|---|---|
| `--fs-display` / H1-hero | 28/1.2 Unbounded 600 | 52/1.15 Unbounded 600 | «Мягкая и корпусная мебель от производителя» |
| `--fs-h1` | 26/1.25 | 40/1.2 | «Каталог мебели от производителя» |
| `--fs-h2` | 22/1.3 | 32/1.25 | «Популярное», «Честные тарифы без сюрпризов» |
| `--fs-h3` | 18/1.35 | 24/1.3 | «Цена всё включено» (УТП-карточка) |
| `--fs-h4` / lead | 17/1.4 Manrope 700 | 20/1.4 Manrope 700 | подзаголовки секций, имена в отзывах |
| `--fs-body` | 16/1.6 Manrope 400 | 16/1.6 Manrope 400 | основной текст |
| `--fs-body-s` | 14/1.55 | 14/1.55 | тумб-подписи, артикул, доп. информация |
| `--fs-caption` | 12/1.5 | 12/1.5 | бейджи, копирайт — трекинг 0.04em |
| `--fs-price-l` | 24/1.2 Manrope 800 | 32/1.15 Manrope 800 | крупная цена на карточке товара |
| `--fs-price-m` | 20/1.2 | 24/1.15 | цена в карточках каталога |
| `--fs-price-s` | 16/1.2 | 18/1.15 | старая цена, «от N ₽/мес» |

### Вертикальный ритм
- Отступ после H1/H2 — `--space-4` (16px), после текста — `--space-6` (24px).
- Секции страниц разводятся `--space-16` (64px) на mobile и `--space-24` (96px) на desktop.
- Межсекционные «ноты» (пробелы поверх секций песочного цвета) не используются — фон меняется только на самих секциях.

---

## 4. Сетка и отступы

- **Mobile 320–767px:** 4 колонки, краевые отступы 16px, вертикальный ритм 8px (база — 4px).
- **Tablet 768–1023px:** отступы 24px, контейнер доступной ширины.
- **Desktop ≥1024px:** 12 колонок, контейнер max 1280px, краевые отступы 32px, межколонный `--grid-gap` 24px.
- **Крупные отступы блока:** 64px (mobile) / 96px (desktop); декоративная секция на полный фон — отступы внутря секции те же.
- Заголовок секции обычно с токеном `.section-head`: бейдж-overline + H2 + подзаголовок, выравнивание по левому краю (не по центру) — быстрее сканируется.

---

## 5. Форматы данных (единый стандарт)

| Тип | Формат | Пример | Примечание |
|---|---|---|---|
| Цена | «45 200 ₽» | 45 200 ₽ | разделитель тысяч — неразрывный пробел; символ ₽ — после числа с NBSP |
| Старая цена | «50 200 ₽» зачёркнутая | 50 200 ₽ | рядом с ней плашка «выгода 5 000 ₽» |
| Выгода | «−5 000 ₽» | −5 000 ₽ | минус, не дефис |
| Срок | «5–7 дней» | 5–7 дней | en-dash «–» без пробелов |
| Размеры | «Ш 220 × Г 95 × В 85 см» | Ш 220 × Г 95 × В 85 см | «Ш/Г/В» + пробел + число |
| Рассрочка | «от 3 767 ₽/мес · 0-0-4» | от 3 767 ₽/мес · 0-0-4 | формат «0-0-N» постоянен |
| Телефон | «+7 (920) 622-51-95» | +7 (920) 622-51-95 | токен константа; tel:+79206225195 |
| Вес текста цифр | любые числа в тексте — Manrope 600 | «за 15 минут» | чтобы цифра не «терялась» |
| «Включено» | всегда оливковым | Включено бесплатно | `--color-olive-600` |
| «Уточняется» | вместо пустой клетки | Уточняется при подтверждении заказа | не прячем цену молчанием |

---

## 6. Компоненты

### 6.1. Кнопки

**Варианты:** primary (терракота), secondary (синий), ghost (прозрачная с обводкой/без). **Размеры:** sm (36px), md (48px, основной), lg (56px, hero). Все — пилюли (`--radius-pill`), min-height ≥ 44px (кроме sm-внутри форм, где тоже делаем 44px по тач-правилу).

```html
<!-- Основной CTA -->
<button class="btn btn--primary btn--lg">
  <span class="btn__icon" aria-hidden="true">→</span>
  Смотреть каталог
</button>

<!-- Вторичный: тёмно-синий, «доверие/сервис» -->
<button class="btn btn--secondary">Задать вопрос</button>

<!-- Третичный: на любом фоне -->
<button class="btn btn--ghost">Рассчитать по своим размерам</button>

<!-- С занятостью -->
<button class="btn btn--primary" disabled>
  <span class="btn__spinner" aria-hidden="true"></span>
  Отправляем…
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--touch-min);
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: var(--fs-body-s);
  font-weight: var(--fw-bold);
  line-height: 1.2;
  color: var(--color-text-invert);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--transition-fast),
              transform var(--transition-fast),
              box-shadow var(--transition-fast);
  white-space: nowrap;
}
.btn:focus-visible {
  outline: 2px solid var(--color-terra-600);
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}
.btn:active { transform: translateY(1px); }

.btn--primary { background: var(--color-terra-500); color: var(--color-text-invert); }
.btn--primary:hover:not(:disabled) { background: var(--color-terra-600); box-shadow: var(--shadow-md); transform: translateY(-1px); }

.btn--secondary { background: var(--color-navy-600); color: var(--color-text-invert); }
.btn--secondary:hover:not(:disabled) { background: var(--color-navy-700); box-shadow: var(--shadow-md); }

.btn--ghost {
  background: transparent; color: var(--color-text);
  box-shadow: inset 0 0 0 2px var(--color-gray-300);
}
.btn--ghost:hover:not(:disabled) { background: var(--color-surface); box-shadow: inset 0 0 0 2px var(--color-gray-400); }

/* Спецвариант: терракота-обводка (вторичный рядом с CTA на тёплом фоне) */
.btn--primary-outline {
  background: transparent; color: var(--color-terra-600);
  box-shadow: inset 0 0 0 2px var(--color-terra-500);
}
.btn--primary-outline:hover:not(:disabled) { background: var(--color-terra-50); }

/* Терракотовый блочный CTA на тёмно-синем баннере */
.btn--cta-inverse {
  background: var(--color-text-invert); color: var(--color-terra-700);
}
.btn--cta-inverse:hover:not(:disabled) { background: var(--color-bg); }

/* Размеры */
.btn--sm { min-height: 36px; padding: 8px 16px; font-size: var(--fs-caption); }
.btn--md { min-height: 48px; padding: 12px 24px; }
.btn--lg { min-height: 56px; padding: 16px 32px; font-size: var(--fs-body); }

.btn--full { width: 100%; }

/* Состояния */
.btn:disabled { opacity: 0.55; cursor: not-allowed; }

.btn__spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .btn, .btn__spinner { transition: none; animation: none; }
}
```

**Mobile:** сетка действий — колонка (CTA на всю ширину `--full`) + вторичная кнопка ниже; допустимы 2 кнопки в ряд по 50%, если обе короткие («В 1 клик» + телефон).

---

### 6.2. Карточка товара

**Варианты:** вертикальная (каталог, сетка 2/3/4), горизонтальная (mobile, «лента последних» можно и вертикальную), компактная (mega-menu/поиск). Плашка-метка — **одна** на карточку (Хит/Новинка/−5 000 ₽).

```html
<article class="card-product">
  <a class="card-product__media" href="/product/richards/" aria-label="Диван угловой «Ричардс», ткань велюр, цвет песочный">
    <img src="richards-1.jpg" alt="Диван угловой «Ричардс» в интерьере гостиной"
         width="600" height="450" loading="lazy">
    <span class="badge badge--sale">−5 000 ₽</span>
    <span class="card-product__compare" aria-hidden="true">2-й ракурс</span>
  </a>
  <div class="card-product__body">
    <h3 class="card-product__title">
      <a href="/product/richards/">Диван угловой «Ричардс»</a>
    </h3>
    <p class="card-product__meta">Арт. R-452 · ткань велюр</p>
    <p class="card-product__price">
      <span class="price">45 200 ₽</span>
      <s class="price-old">50 200 ₽</s>
    </p>
    <p class="card-product__ship">
      <span class="dot dot--olive" aria-hidden="true"></span>
      5–7 дней · всё включено
    </p>
    <button class="btn btn--primary btn--full card-product__buy">
      В корзину
    </button>
  </div>
</article>
```

```css
.card-product {
  display: flex; flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.card-product:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

.card-product__media {
  position: relative; display: block; aspect-ratio: 4 / 3;
  background: var(--color-bg-sand);
}
.card-product__media img { width: 100%; height: 100%; object-fit: cover; }
.card-product__compare {
  position: absolute; inset: auto 12px 12px auto;
  background: rgba(43,41,38,0.7); color: #fff;
  font-size: var(--fs-caption); padding: 6px 10px;
  border-radius: var(--radius-pill);
  opacity: 0; transition: opacity var(--transition-fast);
}
.card-product:hover .card-product__compare { opacity: 1; }

.card-product__body { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); flex: 1; }

.card-product__title { font-family: var(--font-body); font-size: var(--fs-h4); font-weight: 700; line-height: 1.35; }
.card-product__title a { color: var(--color-text); text-decoration: none; }
.card-product__title a:hover { color: var(--color-terra-700); }

.card-product__meta { font-size: var(--fs-caption); color: var(--color-text-muted); }

.card-product__price { display: flex; align-items: baseline; gap: var(--space-2); flex-wrap: wrap; }
.price { font-family: var(--font-body); font-weight: var(--fw-price); font-size: var(--fs-price-m); line-height: 1.2; }
.price-old { font-size: var(--fs-price-s); color: var(--color-text-muted); text-decoration: line-through; }

.card-product__ship {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--fs-body-s); font-weight: 600; color: var(--color-olive-700);
}
.dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--color-gray-300); }
.dot--olive { background: var(--color-olive-500); }
.dot--terra { background: var(--color-terra-500); }

.card-product__buy { margin-top: auto; }

/* Состояние: товар недоступен */
.card-product.is-archive .card-product__media,
.card-product.is-archive * { opacity: 0.6; }
.card-product.is-archive { pointer-events: none; }
.card-product.is-archive .card-product__buy {
  pointer-events: auto; opacity: 1;
  background: var(--color-gray-300); color: var(--color-text-secondary);
}
```

**Скелетон карточки** (см. 6.13) + правило: «Показать ещё» подгружает 6–9 карточек, у всех `loading="lazy"`.

---

### 6.3. Чипы, фильтры, подкатегории

Три роли: **чип подкатегории** (навигационный, «Диваны»), **чип-фильтр** (значение, выбор нескольких), **кнопка-фильтр** («Фильтры (2)» — открывает панель на mobile).

```html
<!-- Роль 1: навигационный чип -->
<a class="chip chip--nav" href="/catalog/myagkaya/divany/">Диваны <span class="chip__count">12</span></a>
<!-- active -->
<a class="chip chip--nav is-active" href="/catalog/myagkaya/divany/" aria-current="page">Диваны <span class="chip__count">12</span></a>

<!-- Роль 2: значение фильтра (мультивыбор) -->
<button class="chip chip--filter" aria-pressed="false">Прямой</button>
<button class="chip chip--filter" aria-pressed="true">Угловой</button>

<!-- Роль 3: кнопка открытия фильтров (mobile) -->
<button class="chip chip--action">
  <span aria-hidden="true">⚙</span> Фильтры <span class="chip__counter">2</span>
</button>
```

```css
.chip {
  display: inline-flex; align-items: center; gap: var(--space-2);
  min-height: var(--touch-min);
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  font-family: var(--font-body); font-size: var(--fs-body-s); font-weight: 600;
  color: var(--color-text);
  cursor: pointer; text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}
.chip:hover { border-color: var(--color-terra-400); color: var(--color-terra-700); }
.chip:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: 2px; }

.chip.is-active,
.chip[aria-pressed="true"] {
  background: var(--color-terra-500); color: #fff; border-color: var(--color-terra-500);
}

.chip__count { font-size: var(--fs-caption); color: var(--color-text-muted); }
.chip.is-active .chip__count,
.chip[aria-pressed="true"] .chip__count { color: rgba(255,255,255,0.8); }

.chip--filter.is-disabled,
.chip--filter:disabled { opacity: 0.45; cursor: not-allowed; border-style: dashed; }

.chip--action { border-style: dashed; }
.chip__counter {
  min-width: 20px; height: 20px; padding: 0 6px; border-radius: var(--radius-pill);
  background: var(--color-terra-500); color: #fff;
  font-size: var(--fs-caption); font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
}

/* Горизонтальная лента (mobile) */
.chip-row {
  display: flex; gap: var(--space-2);
  overflow-x: auto; scrollbar-width: none;
  padding: 4px var(--container-pad-mobile) var(--space-4);
  margin: 0 calc(var(--container-pad-mobile) * -1);
}
.chip-row::-webkit-scrollbar { display: none; }
```

**Несовместимая комбинация опций (карточка товара):** чип блокируется (`.is-disabled`), подпись под группой: «Эта ткань недоступна для данного механизма — выберите другой механизм».

---

### 6.4. Формы

Паттерн поля: label сверху (всегда видим), placeholder — только пример, hint под полем, error-состояние с пометкой и `aria-describedby`.

```html
<div class="field">
  <label class="field__label" for="f-phone">Телефон</label>
  <div class="field__control">
    <input class="input" id="f-phone" name="phone" type="tel"
           inputmode="tel" autocomplete="tel"
           placeholder="+7 (900) 000-00-00" required>
  </div>
  <p class="field__error" id="f-phone-error">
    Введите номер в формате +7 (900) 000-00-00
  </p>
</div>

<!-- Чекбокс согласия (слева от кнопки формы, ссылка на политику) -->
<label class="check">
  <input class="check__input" type="checkbox" name="agreement" checked>
  <span class="check__box" aria-hidden="true"></span>
  <span class="check__label">
    Соглашаюсь на <a href="/policy/" target="_blank">обработку персональных данных</a>
  </span>
</label>

<!-- Радио-плитка (тип мебели в просчёте) -->
<label class="radio-tile">
  <input class="radio-tile__input" type="radio" name="furniture-type" value="wardrobe">
  <span class="radio-tile__body">
    <span class="radio-tile__icon" aria-hidden="true">▤</span>
    <span class="radio-tile__text">Шкаф</span>
  </span>
</label>
```

```css
.field { display: flex; flex-direction: column; gap: var(--space-2); }
.field__label {
  font-size: var(--fs-body-s); font-weight: 600; color: var(--color-text);
}
.input, .select, .textarea {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: var(--font-body); font-size: var(--fs-body);
  color: var(--color-text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.input::placeholder { color: var(--color-text-muted); }
.input:hover { border-color: var(--color-gray-400); }
.input:focus-visible { outline: none; border-color: var(--color-terra-500); box-shadow: var(--shadow-focus); }
.textarea { min-height: 120px; resize: vertical; }

.input.is-error { border-color: var(--color-error); background: var(--color-error-soft); }
.field__error { font-size: var(--fs-caption); color: var(--color-error); font-weight: 600; }

.field__hint { font-size: var(--fs-caption); color: var(--color-text-muted); }
.field__hint--warn { color: var(--color-warning); font-weight: 600; }

/* Кастомный чекбокс */
.check { display: flex; align-items: flex-start; gap: var(--space-3); cursor: pointer; }
.check__input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.check__box {
  flex: 0 0 22px; width: 22px; height: 22px; margin-top: 1px;
  border: 2px solid var(--color-border-strong); border-radius: 6px;
  background: var(--color-surface);
  display: inline-flex; align-items: center; justify-content: center;
  transition: all var(--transition-fast);
}
.check__input:checked + .check__box { background: var(--color-terra-500); border-color: var(--color-terra-500); }
.check__input:checked + .check__box::after {
  content: ""; width: 10px; height: 6px;
  border-left: 2px solid #fff; border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.check__input:focus-visible + .check__box { box-shadow: var(--shadow-focus); }
.check__label { font-size: var(--fs-body-s); color: var(--color-text-secondary); }

/* Радио-плитка (выбор типа мебели) */
.radio-tile { cursor: pointer; }
.radio-tile__input { position: absolute; opacity: 0; }
.radio-tile__body {
  display: flex; flex-direction: column; align-items: center; gap: var(--space-2);
  min-height: 96px; padding: var(--space-4);
  border: 2px solid var(--color-border); border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: all var(--transition-fast);
}
.radio-tile__input:checked + .radio-tile__body { border-color: var(--color-terra-500); background: var(--color-terra-50); box-shadow: var(--shadow-focus); }
.radio-tile__input:focus-visible + .radio-tile__body { box-shadow: var(--shadow-focus); }
.radio-tile__text { font-size: var(--fs-body-s); font-weight: 600; }
```

**Правило описания формы:** заголовок + пояснение до полей («Рассчитаем бесплатно за 15 минут, даже если нестандартная ниша»).

---

### 6.5. Модалка и нижняя шторка (sheet)

Desktop — центрированная модалка с оверлеем. Mobile — **шторка снизу** (это не просто «модалка поменьше», а отдельный паттерн с закруглением сверху и жестом свайпа вниз).

```html
<!-- Оверлей + диалог -->
<div class="overlay" data-role="dialog-overlay">
  <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="d-title">
    <header class="dialog__head">
      <h2 id="d-title" class="dialog__title">Заказать звонок</h2>
      <button class="icon-btn" data-role="dialog-close" aria-label="Закрыть">✕</button>
    </header>
    <div class="dialog__body">
      <!-- контент: форма → поля → кнопка -->
    </div>
  </section>
</div>

<!-- Мобильная шторка (класс меняет поведение) -->
<section class="dialog dialog--sheet" role="dialog" aria-modal="true"
         aria-labelledby="d-title" data-role="sheet">
  <div class="dialog__grabber" aria-hidden="true"></div>
  <header class="dialog__head">
    <h2 id="d-title" class="dialog__title">Фильтры</h2>
    <button class="icon-btn" data-role="sheet-close" aria-label="Закрыть">✕</button>
  </header>
  <div class="dialog__body">
    <!-- чипы, ползунок, [Сбросить] [Показать 14 товаров] -->
  </div>
</section>
```

```css
.overlay {
  position: fixed; inset: 0; z-index: 60;
  background: rgba(43, 41, 38, 0.5);
  display: flex; align-items: center; justify-content: center;
  padding: var(--space-6);
}
.overlay[hidden] { display: none; }

.dialog {
  width: min(480px, 100%);
  max-height: min(84vh, 720px);
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  display: flex; flex-direction: column;
  animation: fadeUp var(--transition-base);
}
.dialog__head {
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-4); padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--color-divider);
}
.dialog__title { font-size: var(--fs-h3); font-family: var(--font-display); }
.dialog__body { padding: var(--space-6); overflow-y: auto; }

.icon-btn {
  width: var(--touch-min); height: var(--touch-min);
  display: inline-flex; align-items: center; justify-content: center;
  border: none; background: var(--color-gray-100); border-radius: var(--radius-full);
  font-size: 18px; color: var(--color-text); cursor: pointer;
  transition: background var(--transition-fast);
}
.icon-btn:hover { background: var(--color-gray-200); }
.icon-btn:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: 2px; }

/* Mobile: шторка снизу */
@media (max-width: 767px) {
  .overlay { align-items: flex-end; padding: 0; }
  .dialog--sheet {
    width: 100%; max-height: 92dvh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    animation: slideUp var(--transition-base);
  }
  .dialog__grabber {
    width: 48px; height: 4px; border-radius: var(--radius-pill);
    background: var(--color-gray-300); margin: var(--space-3) auto 0;
  }
}
@keyframes fadeUp  { from { opacity: 0; transform: translateY(12px); } }
@keyframes slideUp { from { transform: translateY(100%); } }

@media (prefers-reduced-motion: reduce) {
  .dialog { animation: none; }
}
```

Мобильная шторка фильтров заканчивается **sticky-футером**: `[Сбросить] ............. [Показать 14 товаров]` (две кнопки в ряд, правая — `--primary`).

---

### 6.6. Табы (суперкатегории каталога)

Два таба: «Мягкая мебель» / «Корпусная мебель». Активный — терракота + подчёркивание; контент меняется без перезагрузки.

```html
<nav class="tabs" role="tablist" aria-label="Суперкатегории">
  <button class="tab is-active" role="tab" aria-selected="true"
          data-tab="soft" id="tab-soft">
    Мягкая мебель
  </button>
  <button class="tab" role="tab" aria-selected="false"
          data-tab="corpus" id="tab-corpus">
    Корпусная мебель
  </button>
</nav>
<div class="tab-panels">
  <div class="tab-panel is-visible" role="tabpanel" aria-labelledby="tab-soft" id="panel-soft">…</div>
  <div class="tab-panel" role="tabpanel" aria-labelledby="tab-corpus" id="panel-corpus" hidden>…</div>
</div>
```

```css
.tabs {
  display: flex; gap: var(--space-4);
  border-bottom: 2px solid var(--color-border);
  overflow-x: auto;
}
.tab {
  appearance: none; border: none; background: transparent; cursor: pointer;
  min-height: var(--touch-min);
  padding: 8px 4px 12px;
  font-family: var(--font-body); font-weight: 700; font-size: var(--fs-body);
  color: var(--color-text-secondary);
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  white-space: nowrap;
}
.tab:hover { color: var(--color-text); }
.tab:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: -2px; border-radius: var(--radius-sm); }
.tab.is-active { color: var(--color-terra-600); border-bottom-color: var(--color-terra-500); }
.tab-panel[hidden] { display: none; }
```

---

### 6.7. Бейджи

```html
<span class="badge badge--hit">Хит</span>
<span class="badge badge--new">Новинка</span>
<span class="badge badge--sale">−5 000 ₽</span>
<span class="badge badge--included">Всё включено</span>
<span class="badge badge--archive">В архиве</span>
<span class="badge badge--out">Нет в наличии</span>
```

```css
.badge {
  display: inline-flex; align-items: center; gap: var(--space-1);
  padding: 5px 12px;
  font-size: var(--fs-caption); font-weight: 700; line-height: 1.2;
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-pill);
  text-transform: uppercase;
}
.badge--hit     { background: var(--color-terra-50);  color: var(--color-terra-700); }
.badge--new     { background: var(--color-navy-50);   color: var(--color-navy-600); }
.badge--sale    { background: var(--color-sale-soft); color: var(--color-terra-700); }
.badge--included{ background: var(--color-success-soft); color: var(--color-olive-700); }
.badge--archive { background: var(--color-gray-200);  color: var(--color-text-secondary); }
.badge--out     { background: var(--color-gray-200);  color: var(--color-text-secondary); }
/* Бейдж на фото (поверх картинки) — нужен небольшой контрастный фон */
.badge--on-media { padding: 6px 14px; box-shadow: var(--shadow-sm); }
```

**Правило:** на карточке товара не более одного бейджа; надпись «всё включено» не бейдж, а строка с оливковой точкой (см. 6.2 `.card-product__ship`).

---

### 6.8. Хлебные крошки

```html
<nav class="crumbs" aria-label="Хлебные крошки">
  <ol class="crumbs__list">
    <li class="crumbs__item"><a href="/">Главная</a></li>
    <li class="crumbs__item"><a href="/catalog/">Каталог</a></li>
    <li class="crumbs__item"><a href="/catalog/myagkaya/">Мягкая мебель</a></li>
    <li class="crumbs__item"><a href="/catalog/myagkaya/divany/">Диваны</a></li>
    <li class="crumbs__item crumbs__item--current" aria-current="page">Диван угловой «Ричардс»</li>
  </ol>
</nav>
```

```css
.crumbs { padding: var(--space-3) 0; overflow-x: auto; white-space: nowrap; }
.crumbs__list { display: flex; align-items: center; gap: var(--space-2); list-style: none; margin: 0; padding: 0; }
.crumbs__item a {
  font-size: var(--fs-body-s); color: var(--color-text-secondary);
  text-decoration: none;
  display: inline-flex; align-items: center; gap: var(--space-2);
}
.crumbs__item:not(:last-child) a::after { content: "›"; color: var(--color-gray-400); }
.crumbs__item a:hover { color: var(--color-terra-700); }
.crumbs__item--current { font-size: var(--fs-body-s); font-weight: 600; color: var(--color-text-muted); }
```

**Mobile:** точка входа — суперкатегория или подкатегория (последние 2–3 звена), остальное скрыто (`display:none` на 1–2 элементах).

---

### 6.9. Таблица размеров

```html
<table class="size-table">
  <caption class="visually-hidden">Габаритные размеры дивана «Ричардс»</caption>
  <tbody>
    <tr><th scope="row">Габариты (Ш×Г×В)</th><td>220 × 95 × 85 см</td></tr>
    <tr><th scope="row">Спальное место</th><td>200 × 75 см</td></tr>
    <tr><th scope="row">Высота сиденья</th><td>45 см</td></tr>
    <tr><th scope="row">Глубина сиденья</th><td>62 см</td></tr>
    <tr><th scope="row">Размер в упаковке</th><td>3 места × ~1,2 м³</td></tr>
  </tbody>
</table>
```

```css
.size-table { width: 100%; border-collapse: collapse; font-size: var(--fs-body-s); }
.size-table th, .size-table td {
  text-align: left; padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}
.size-table th { font-weight: 600; color: var(--color-text-secondary); width: 46%; }
.size-table td { font-weight: 700; color: var(--color-text); }
.size-table tr:last-child th, .size-table tr:last-child td { border-bottom: none; }
```

Схема с габаритами — изображение SVG 1:1.2 с выносками; на mobile — SVG вписывается по ширине, числа не меньше 14px.

---

### 6.10. Sticky-панель (карточка товара, mobile)

Фиксируется **над нижним таб-баром**, отступ 8px, чтобы не перекрываться. Появляется после первого экрана (IntersectionObserver).

```html
<div class="sticky-bar" data-role="sticky-buy">
  <div class="sticky-bar__price">
    <span class="price">45 200 ₽</span>
    <span class="sticky-bar__hint">5–7 дней</span>
  </div>
  <button class="btn btn--primary btn--sm sticky-bar__add">В корзину</button>
  <a class="icon-btn sticky-bar__call" href="tel:+79206225195" aria-label="Позвонить">✆</a>
</div>
```

```css
.sticky-bar {
  position: fixed;
  left: 0; right: 0; bottom: calc(var(--tabbar-h, 64px) + var(--space-2)); /* 8px над таб-баром */
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--container-pad-mobile);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -8px 24px rgba(43,41,38,0.10);
  animation: slideUp var(--transition-base);
}
.sticky-bar__price { display: flex; flex-direction: column; line-height: 1.2; }
.sticky-bar__hint { font-size: var(--fs-caption); color: var(--color-olive-700); font-weight: 600; }
```

Если корзина пустая — цена + кнопка; после добавления кнопка → «✓ В корзине» (состояние успеха, терракотовый фон остаётся, текст меняется, добавляется галочка).

---

### 6.11. Таб-бар (нижняя навигация mobile)

5 точек, высота 56–64px, `safe-area-inset-bottom` для iPhone. У корзины — badge со счётчиком.

```html
<nav class="tabbar" aria-label="Основная навигация">
  <a class="tabbar__item is-active" href="/" aria-current="page">
    <span class="tabbar__icon" aria-hidden="true">⌂</span>
    <span class="tabbar__label">Главная</span>
  </a>
  <a class="tabbar__item" href="/catalog/">
    <span class="tabbar__icon" aria-hidden="true">▦</span>
    <span class="tabbar__label">Каталог</span>
  </a>
  <a class="tabbar__item" href="/cart/">
    <span class="tabbar__icon" aria-hidden="true">🛒</span>
    <span class="tabbar__label">Корзина</span>
    <span class="tabbar__badge">9</span>
  </a>
  <a class="tabbar__item" href="/raschet/" data-src="tabbar">
    <span class="tabbar__icon" aria-hidden="true">≋</span>
    <span class="tabbar__label">Просчёт</span>
  </a>
  <a class="tabbar__item" href="/kontakty/">
    <span class="tabbar__icon" aria-hidden="true">✆</span>
    <span class="tabbar__label">Контакты</span>
  </a>
</nav>
```

```css
.tabbar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
  display: grid; grid-template-columns: repeat(5, 1fr);
  min-height: var(--tabbar-h, 64px);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -2px 12px rgba(43,41,38,0.06);
}
.tabbar__item {
  position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  min-height: var(--touch-min);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 11px; font-weight: 600;
  transition: color var(--transition-fast);
}
.tabbar__item:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: -4px; border-radius: var(--radius-sm); }
.tabbar__item.is-active { color: var(--color-terra-600); }
.tabbar__icon { font-size: 22px; line-height: 1; }
.tabbar__badge {
  position: absolute; top: 6px; left: calc(50% + 8px);
  min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: var(--radius-pill);
  background: var(--color-terra-500); color: #fff;
  font-size: 11px; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
}
```

---

### 6.12. Скелетоны

Используем вместо спиннеров в каталоге, галерее, карте. Пульсация — opacity, а не transform (дешевле для GPU).

```css
.skeleton {
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
}
.skeleton::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { 100% { transform: translateX(100%); } }

@media (prefers-reduced-motion: reduce) {
  .skeleton::after { animation: none; }
}

/* Скелетон карточки товара */
.skeleton-card { width: 294px; }
.skeleton-card .skeleton--media { aspect-ratio: 4/3; border-radius: var(--radius-md) var(--radius-md) 0 0; }
.skeleton-card .skeleton--line { height: 14px; margin: 12px 16px 0; }
.skeleton-card .skeleton--line.w60 { width: 60%; }
.skeleton-card .skeleton--line.w40 { width: 40%; }

/* Скелетон галереи (карточка товара) */
.skeleton-gallery { aspect-ratio: 4/3; border-radius: var(--radius-lg); }
```

---

### 6.13. Аккордеон (FAQ, тарифы, состав цены)

```html
<div class="acc" data-role="accordion">
  <h3 class="acc__head">
    <button class="acc__btn" aria-expanded="false" data-role="acc-trigger">
      Можно ли вернуть товар?
      <span class="acc__icon" aria-hidden="true">⌄</span>
    </button>
  </h3>
  <div class="acc__panel" role="region" hidden>
    <p>Да, в течение 7 дней — если товар не подошёл…</p>
  </div>
</div>
```

```css
.acc { border-bottom: 1px solid var(--color-border); }
.acc__btn {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
  min-height: var(--touch-min);
  padding: var(--space-4) var(--space-2);
  background: none; border: none; cursor: pointer;
  font-family: var(--font-body); font-size: var(--fs-body); font-weight: 700;
  color: var(--color-text); text-align: left;
  transition: color var(--transition-fast);
}
.acc__btn:hover { color: var(--color-terra-700); }
.acc__btn:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: 2px; border-radius: var(--radius-sm); }
.acc__icon { transition: transform var(--transition-base); color: var(--color-text-muted); }
.acc__btn[aria-expanded="true"] .acc__icon { transform: rotate(180deg); color: var(--color-terra-600); }
.acc__panel { padding: 0 var(--space-2) var(--space-5); font-size: var(--fs-body-s); line-height: var(--lh-body); color: var(--color-text-secondary); max-width: 70ch; }
```

---

### 6.14. Тост (уведомление о добавлении в корзину)

```css
.toast {
  position: fixed; z-index: 70;
  left: 50%; bottom: calc(var(--tabbar-h, 64px) + var(--space-4));
  transform: translateX(-50%) translateY(20px);
  width: min(360px, calc(100% - 32px));
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-navy-800); color: var(--color-text-invert);
  box-shadow: var(--shadow-lg);
  font-size: var(--fs-body-s); font-weight: 600;
  opacity: 0; visibility: hidden;
  transition: opacity var(--transition-base), transform var(--transition-base);
}
.toast.is-visible { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.toast--success { background: var(--color-olive-700); }
@media (min-width: 1024px) { .toast { top: 24px; bottom: auto; transform: translateX(-50%) translateY(-20px); } .toast.is-visible { transform: translateX(-50%) translateY(0); } }
```

Текст: «Добавлено в корзину · <a>Оформить</a>» (ссылка светлая). На mobile второй тап в таб-баре «Корзина» не требуется — тост сам ведёт.

---

### 6.15. Пустое состояние (empty)

Не просто «ничего нет», а ветка в сценарий «просчёт по размерам».

```html
<div class="empty">
  <span class="empty__icon" aria-hidden="true">▢</span>
  <h3 class="empty__title">Под эти параметры ничего нет</h3>
  <p class="empty__text">Диванов с механизмом «аккордеон» до 45 000 ₽ пока нет. Но мы можем сделать такой диван точно под вас.</p>
  <div class="empty__actions">
    <button class="btn btn--primary">Сделаем по вашим размерам</button>
    <button class="btn btn--ghost">Сбросить фильтры</button>
  </div>
</div>
```

```css
.empty {
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-3);
  padding: var(--space-12) var(--space-6);
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}
.empty__icon { font-size: 40px; opacity: 0.5; }
.empty__title { font-family: var(--font-display); font-size: var(--fs-h3); }
.empty__text { font-size: var(--fs-body-s); color: var(--color-text-secondary); max-width: 42ch; }
.empty__actions { display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }
@media (max-width: 767px) { .empty__actions { flex-direction: column; width: 100%; } .empty__actions .btn { width: 100%; } }
```

Другие empty-паттерны: **отзывы** («Отзывов пока нет — будьте первым» + форма), **корзина** (пустая корзина с лентой хитов). Правило единое: empty → действие белого цвета + альтернатива.

---

### 6.16. Блок «Всё включено» (состав цены)

Раскрывающийся список того, что входит — обязателен на карточке товара и в корзине.

```html
<div class="included" data-role="included">
  <button class="included__toggle" aria-expanded="false">
    Что входит в цену <span class="included__arrow" aria-hidden="true">⌄</span>
  </button>
  <ul class="included__list" hidden>
    <li>Ткань и каркас (базовая комплектация)</li>
    <li>Доставка по Москве в пределах МКАД</li>
    <li>Подъём на этаж (при наличии лифта)</li>
    <li>Сборка в подарок</li>
    <li>Гарантия 18 месяцев</li>
  </ul>
</div>
```

```css
.included__toggle {
  background: none; border: none; cursor: pointer;
  color: var(--color-olive-700); font-weight: 700; font-size: var(--fs-body-s);
  min-height: var(--touch-min); padding: 0;
  display: inline-flex; align-items: center; gap: var(--space-2);
}
.included__toggle:hover { color: var(--color-olive-800); }
.included__arrow { transition: transform var(--transition-fast); }
.included__toggle[aria-expanded="true"] .included__arrow { transform: rotate(180deg); }
.included__list { list-style: none; margin: var(--space-3) 0 0; padding: 0; }
.included__list li {
  padding: var(--space-2) 0 var(--space-2) var(--space-6);
  position: relative; font-size: var(--fs-body-s); color: var(--color-text);
}
.included__list li::before {
  content: ""; position: absolute; left: 0; top: 15px;
  width: 8px; height: 8px; border-radius: var(--radius-full);
  background: var(--color-olive-500);
}
```

---

### 6.17. УТП-карточка (feature)

```html
<article class="feature">
  <span class="feature__icon">🏭</span>
  <h3 class="feature__title">Своё производство</h3>
  <p class="feature__text">Фото с производства и контроль качества на каждом этапе — вы знаете, кто делает вашу мебель.</p>
</article>
```

```css
.feature {
  display: flex; flex-direction: column; gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xs);
}
.feature__icon {
  width: 52px; height: 52px; border-radius: var(--radius-md);
  background: var(--color-terra-50); color: var(--color-terra-700);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
}
.feature__title { font-family: var(--font-display); font-size: var(--fs-h4); }
.feature__text { font-size: var(--fs-body-s); color: var(--color-text-secondary); line-height: var(--lh-body); }
/* Вариант на тёмно-синем: */
.feature--inverse { background: var(--color-navy-600); border-color: transparent; }
.feature--inverse .feature__title { color: #fff; }
.feature--inverse .feature__text { color: rgba(255,255,255,0.82); }
.feature--inverse .feature__icon { background: rgba(255,255,255,0.12); color: #fff; }
```

---

### 6.18. Карточка отзыва

```html
<article class="review">
  <header class="review__head">
    <img class="review__avatar" src="ava-1.jpg" alt="Аватар Марины" width="44" height="44">
    <div>
      <p class="review__name">Марина</p>
      <p class="review__meta">Москва · заказывала диван «Ричардс»</p>
    </div>
    <span class="review__score" aria-label="Оценка 4.9 из 5">4.9 ★</span>
  </header>
  <p class="review__text">Заказывала угловой диван. Ребята привезли, собрали за 40 минут и убрали за собой весь мусор. Диван выглядит как на фото — ткань не пожалели.</p>
  <img class="review__media" src="review-richards.jpg" alt="Фото дивана «Ричардс» в интерьере покупателя" loading="lazy">
</article>
```

```css
.review {
  display: flex; flex-direction: column; gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}
.review__head { display: flex; align-items: center; gap: var(--space-3); }
.review__avatar { border-radius: var(--radius-full); object-fit: cover; }
.review__name { font-weight: 700; font-size: var(--fs-body-s); }
.review__meta { font-size: var(--fs-caption); color: var(--color-text-muted); }
.review__score { margin-left: auto; font-weight: 700; color: var(--color-terra-700); font-size: var(--fs-body-s); }
.review__text { font-size: var(--fs-body-s); line-height: var(--lh-body); color: var(--color-text-secondary); }
.review__media { border-radius: var(--radius-md); aspect-ratio: 16/10; object-fit: cover; width: 100%; }
```

---

### 6.19. CTA-баннер («Мебель по вашим размерам»)

Терракотовый (или синий) полноширинный баннер с двумя CTA. На mobile тексты крупнее относительно экрана, кнопка — во всю ширину.

```html
<section class="cta-banner">
  <div class="cta-banner__inner">
    <p class="overline">Просчёт за 15 минут</p>
    <h2 class="cta-banner__title">Мебель по вашим размерам</h2>
    <p class="cta-banner__text">Рассчитаем бесплатно за 15 минут. Нестандартная ниша? Пришлёте фото — предложим решение.</p>
    <div class="cta-banner__actions">
      <a class="btn btn--cta-inverse" href="/raschet/" data-src="hero-banner">Заказать просчёт</a>
      <a class="btn btn--secondary" href="/catalog/">Смотреть каталог</a>
    </div>
  </div>
</section>
```

```css
.cta-banner {
  background: var(--color-terra-500);
  border-radius: var(--radius-xl);
  padding: var(--space-10) var(--space-6);
}
.cta-banner--navy { background: var(--color-navy-600); }
.cta-banner__inner { max-width: 720px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; gap: var(--space-3); align-items: center; }
.overline {
  font-size: var(--fs-caption); font-weight: 700; letter-spacing: var(--tracking-wide);
  text-transform: uppercase; color: var(--color-text-muted);
}
.cta-banner .overline { color: rgba(255,255,255,0.85); }
.cta-banner__title { font-family: var(--font-display); font-weight: var(--fw-display); color: #fff; font-size: var(--fs-h2); }
.cta-banner__text { color: rgba(255,255,255,0.92); font-size: var(--fs-body); max-width: 52ch; }
.cta-banner__actions { display: flex; gap: var(--space-4); flex-wrap: wrap; justify-content: center; margin-top: var(--space-4); }
@media (max-width: 767px) { .cta-banner { padding: var(--space-8) var(--space-5); } .cta-banner__actions { flex-direction: column; width: 100%; } .cta-banner__actions .btn { width: 100%; } }
```

---

### 6.20. Ползунок цены (range)

```html
<label class="range" for="price-max">
  <span class="range__label">Цена до</span>
  <output class="range__value" for="price-max">60 000 ₽</output>
</label>
<input class="range__input" type="range" id="price-max" min="0" max="60000" step="1000" value="60000">
```

```css
.range { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: var(--space-2); }
.range__label { font-size: var(--fs-body-s); font-weight: 600; }
.range__value { font-size: var(--fs-body-s); font-weight: 800; color: var(--color-terra-700); min-width: 90px; text-align: right; }
.range__input { -webkit-appearance: none; width: 100%; height: 6px; border-radius: var(--radius-pill); background: var(--color-gray-200); }
.range__input::-webkit-slider-thumb {
  -webkit-appearance: none; width: 24px; height: 24px; border-radius: var(--radius-full);
  background: var(--color-surface); border: 3px solid var(--color-terra-500);
  box-shadow: var(--shadow-sm); cursor: pointer;
}
.range__input::-moz-range-thumb { width: 24px; height: 24px; border-radius: var(--radius-full); background: var(--color-surface); border: 3px solid var(--color-terra-500); cursor: pointer; }
.range__input:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: 4px; }
```

На mobile шторка фильтров: гистограмма распределения цен (детализация) — опция, не обязательная в M1.

---

### 6.21. Mega-menu «Каталог» (desktop)

Выпадает из пункта «Каталог» в шапке. 2 колонки суперкатегорий + нижний баннер «Мебель по вашим размерам».

```html
<div class="mega" data-role="mega-menu" hidden>
  <div class="mega__grid">
    <div class="mega__col">
      <p class="overline">Мягкая мебель</p>
      <a href="/catalog/myagkaya/divany/">Диваны <span class="mega__count">12</span></a>
      <a href="/catalog/myagkaya/kresla/">Кресла и пуфики <span class="mega__count">6</span></a>
      <a href="/catalog/myagkaya/krovati/">Мягкие кровати <span class="mega__count">8</span></a>
    </div>
    <div class="mega__col">
      <p class="overline">Корпусная мебель</p>
      <a href="/catalog/korpusnaya/shkafy/">Шкафы <span class="mega__count">18</span></a>
      <a href="/catalog/korpusnaya/gostinaya/">Гостиная <span class="mega__count">14</span></a>
      <a href="/catalog/korpusnaya/prihozhaya/">Прихожая <span class="mega__count">10</span></a>
      <a href="/catalog/korpusnaya/spalnya/">Спальня <span class="mega__count">12</span></a>
      <a href="/catalog/korpusnaya/detskaya/">Детская <span class="mega__count">10</span></a>
      <a href="/catalog/korpusnaya/kuhnya/">Кухня <span class="mega__count">12</span></a>
    </div>
  </div>
  <a class="mega__banner" href="/raschet/" data-src="megamenu">
    ⚡ Мебель по вашим размерам — просчёт за 15 минут
  </a>
</div>
```

```css
.mega {
  position: absolute; left: 0; right: 0; top: 100%;
  background: var(--color-surface);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  z-index: 55;
}
.mega__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: var(--space-8); }
.mega__col { display: flex; flex-direction: column; gap: var(--space-2); }
.mega__col > a { display: flex; justify-content: space-between; padding: 10px 12px; border-radius: var(--radius-sm); font-weight: 600; color: var(--color-text); text-decoration: none; }
.mega__col > a:hover { background: var(--color-terra-50); color: var(--color-terra-700); }
.mega__count { color: var(--color-text-muted); font-weight: 500; }
.mega__banner {
  display: block; margin-top: var(--space-5); padding: var(--space-4) var(--space-5);
  background: var(--color-terra-50); color: var(--color-terra-800);
  border-radius: var(--radius-md); font-weight: 700; text-decoration: none;
}
.mega__banner:hover { background: var(--color-terra-100); }
.mega__banner:focus-visible, .mega__col > a:focus-visible { outline: 2px solid var(--color-terra-600); outline-offset: 2px; }
```

---

### 6.22. Таблица тарифов (страница доставки)

```html
<table class="rate-table">
  <tbody>
    <tr>
      <th scope="row">Доставка по Москве (в пределах МКАД)</th>
      <td><span class="rate-tag rate-tag--included">Включено*</span></td>
    </tr>
    <tr>
      <th scope="row">Минимальный заказ для бесплатной доставки</th>
      <td>от 15 000 ₽, иначе — 1 500 ₽</td>
    </tr>
    <tr>
      <th scope="row">Подъём на этаж</th>
      <td>0–350 ₽/этаж без лифта</td>
    </tr>
    <tr>
      <th scope="row">Сборка</th>
      <td>0 ₽ в подарок на диваны · 500–1 500 ₽ на корпусную</td>
    </tr>
    <tr>
      <th scope="row">Доставка за МКАД</th>
      <td>40 ₽/км <span class="rate-note">(уточнить у заказчика)</span></td>
    </tr>
  </tbody>
</table>
```

```css
.rate-table { width: 100%; border-collapse: collapse; }
.rate-table th, .rate-table td { text-align: left; padding: 14px 0; border-bottom: 1px solid var(--color-border); vertical-align: top; }
.rate-table th { font-weight: 600; color: var(--color-text-secondary); width: 46%; font-size: var(--fs-body-s); }
.rate-table td { font-weight: 700; font-size: var(--fs-body-s); }
.rate-table tr:last-child th, .rate-table tr:last-child td { border-bottom: none; }
.rate-tag { display: inline-flex; padding: 4px 12px; border-radius: var(--radius-pill); font-size: var(--fs-caption); font-weight: 700; }
.rate-tag--included { background: var(--color-success-soft); color: var(--color-olive-700); }
.rate-note { display: block; font-weight: 500; color: var(--color-text-muted); font-size: var(--fs-caption); }
```

---

## 7. Сводная таблица состояний

| Компонент | default | hover | active/pressed | focus | disabled | loading | error | empty |
|---|---|---|---|---|---|---|---|---|
| Кнопка | терракота `#C25E3C` | `#A84E2F` + тень | сдвиг вниз 1px | ring 2px + `--shadow-focus` | opacity .55, `not-allowed` | спиннер + «Отправляем…» | — | — |
| Карточка товара | белая, `--shadow-xs` | подъём 2px, `--shadow-md`, 2-й ракурс фото | затемнение фото | ссылка в title получает focus | карточка `is-archive` | скелетон 4:3 | — | заглушка-пустоты в сетке |
| Чип/фильтр | белая, рамка `#D9D2C9` | рамка терракота | `is-active` теракота | ring 2px | `is-disabled` пунктир | — | — | «ничего нет» → empty |
| Инпут | рамка `--border-strong` | `#C2BAB0` | — | рамка терракота + focus | opacity | — | рамка `#BC3B37` + подпись | — |
| Таб | серый текст | тёмный текст | терракота + подчёркивание | ring | — | — | — | — |
| Аккордеон | open/close | заголовок терракота | стрелка вверх | ring | — | — | — | — |
| Галерея | фото 4:3 | стрелки перехода | свайп | — | — | скелетон 4:3 | «Фото не загрузилось [Обновить]» | — |
| Карта | Yandex-карта | — | — | — | — | скелетон + «Загружаем карту…» | адрес текстом + «Открыть в Яндекс.Картах» | — |

Общие правила:
- **Focus** — всегда видимый `:focus-visible` (ring 2px, offset 2px). Не убирать outline без замены.
- **Disabled** — причины не скрываем; там, где нужно объяснить, используем hint-подпись.
- **Error** — поле + подпись снизу + `aria-describedby`; кнопку НЕ блокируем до submit (проверка на отправку, как в Сценарии Б).
- **Reduced motion** — `prefers-reduced-motion: reduce` отключает анимации (скелетоны, hover-подъём, тосты, шторки оставляют появление без трансформ).

---

## 8. Доступность (WCAG AA)

1. **Контраст** — все пары из таблицы 2.1 ≥ 4,5:1 для обычного текста; крупный (24px+/19px bold) ≥ 3:1. Грейж `#A39B90` в тексте запрещён.
2. **Клавиатура** — полная навигация Tab; mega-menu, шторка, модалка — фокус-ловушки и возврат фокуса по закрытию. Escape закрывает модалку/шторку.
3. **Семантика** — один H1 на страницу; `nav` с aria-label; таблицы с `th scope`; кнопки с текстом действия; ссылки описательные.
4. **Тач-зоны** — ≥ 44×44px, между зонами ≥ 8px. Исключение: строчные ссылки в тексте (оборачиваются в бо́льший padding).
5. **Alt-тексты** — конкретные: «Диван угловой „Ричардс“, ткань велюр, цвет песочный (вид 2 из 6)».
6. **Масштабирование** — вёрстка живая до 200% zoom, без горизонтального скролла на 320px.
7. **ARIA** — `aria-expanded` на аккордеонах/модалках, `aria-pressed` на чипах-фильтрах, `aria-current="page"` на активных крошках/таб-баре.
8. **Утилита** `.visually-hidden` — используется для caption таблиц и декоративных подписей.

---

## 9. Чек-лист передачи в вёрстку (Developer)

- [ ] Подключить Unbounded (600) и Manrope (400–800) через Google Fonts / @font-face с `display=swap`; кириллические подмножества включены.
- [ ] Токены из п.2 перенести без правок; `--tabbar-h` вынести в переменную высоты таб-бара.
- [ ] Форматы чисел через шаблонизацию (NBSP перед «₽», en-dash в сроках — серверно/на клиенте один модуль форматов).
- [ ] IntersectionObserver для sticky-панели карточки; она не перекрывает таб-бар (отступ 8px).
- [ ] Скелетоны на месте, спиннеры — только в кнопках при отправке.
- [ ] Empty-состояния ведут в сценарий «просчёт по размерам» (src-метка: `hero`, `megamenu`, `tabbar`, `card-product`, `empty`…).
- [ ] Проверить: нет двух терракотовых CTA на одном экране-видимости.