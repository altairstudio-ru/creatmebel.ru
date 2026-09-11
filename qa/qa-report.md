# QA Evidence-Based Report — Креат Мебель v2.0

**QA Agent**: EvidenceQA · **Дата**: 11.09.2026 · **Окружение**: Node v22.23.2 + Playwright Chromium 153 (headless shell)
**Объект**: https://altairstudio-ru.github.io/creatmebel.ru/ (10 страниц, вьюпорты 1280×800 и 390×844 mobile)
**Скриншоты**: `K:\creatmebel-ru-20\prototype\qa-screenshots\` (48 PNG)
**Данные запусков**: `qa-results.json`, `qa-dom-evidence.json` (в `K:\creatmebel-ru-20\prototype\qa\`)

---

## 🔍 Reality Check Results

**Команды**: запуск 5 Playwright-сборек (capture/interactions/verify/deep/dom) + вспомогательные скрипты (overflow, images, styles); проверка HTTP-доступности picsum-ресурсов средствами Node.

**Ключевой факт о среде**: `picsum.photos` в этой сети возвращает **HTTP 403** (проверено и с узким, и с браузерным User-Agent). Все 38 демо-изображений сайта (`naturalWidth === 0`) не загрузились в тестовом окружении. **Это НЕ дефект разметки сайта** — URL сформированы верно (redirect/формирование стандартное), но прототип жёстко зависит от внешнего CDN-заглушки. На скриншотах вместо фото — плейсхолдеры. Рекомендация: самохостить изображения перед продакшеном.

---

## 📸 Visual Evidence Analysis

**Desktop (1280px)**: ширина контента, сетка каталога 3 колонки, карточки товара с ценой/надписью, терракотовые CTA `#C25E3C` на кремовом фоне `#F8F5F0`, радиусы-«пилюли» 999px, шрифты Manrope/Unbounded — соответствуют `design-system.md`.

**Mobile (390px)**: бургер-меню, таббар 65px, body-pad-bottom 80px, sticky-карточка «45 200 ₽ · 5–7 дней · В корзину · ✆» — присутствуют на всех страницах. **2 страницы имеют горизонтальный overflow**: production (+15px), contacts (+40px).

**Specification Compliance**:
- ✅ «Цена 45 200 ₽, старая 50 200 ₽» → карточка отображает.
- ✅ «Табы каталога Мягкая/Корпусная» → «Найдено 6/9 товаров», переключение работает.
- ✅ «Валидация телефона» → невалидный номер отклоняется с понятной подсказкой.
- ❌ «product.html?id=richards» (адрес из ТЗ) → «Товар не найден»; код ищет товар по `id`, а в `data.js` товар записан как `slug: 'divan-uglovoy-richards'`.
- ❌ «Выбор опций: размер/ткань/механизм меняет цену» → клик по чипу не меняет цену и не активирует чип.
- ❌ «Промокод KD20» (подсказка в cart.html) → реально работает только `KB20`.

---

## 🔄 Round 2 — Результаты повторного тестирования (после фиксов)

**Дата**: 11.09.2026 · **Коммит**: `a85013f` · **Инструмент**: Playwright headless, проверка живого деплоя

### Внесённые фиксы
1. `main.js`: убраны `arguments.callee` (запрещён в strict mode) → именованные обработчики `onFabric/onMech/onSize`
2. `data.js`: `getProduct()` принимает короткий `id` (`richards`, `sku-003`) в дополнение к slug
3. `input.css`: `.mobile-menu` закрыт через `display:none` + `overflow-x:hidden` на `html,body`
4. `cart.html`: подсказка промокода `KD20` → `KB20`

### Результаты (7/7 PASS)

| # | Проверка | Статус | Доказательство |
|---|----------|--------|----------------|
| 1 | `product.html?id=richards` рендерит «Диван угловой „Ричардс"» | ✅ PASS | титул в DOM |
| 2 | Клик по чипу меняет цену (45 200 → 47 600 ₽) | ✅ PASS | пересчёт до/после |
| 3 | Нет JS-ошибок на карточке | ✅ PASS | pageerror/console пусты |
| 4 | production.html: нет горизонтального скролла (390px) | ✅ PASS | scrollWidth=390 |
| 5 | contacts.html: нет горизонтального скролла (390px) | ✅ PASS | scrollWidth=390 |
| 6 | «В корзину» добавляет и обновляет бейдж (→1) | ✅ PASS | cart-count=1 |
| 7 | Подсказка промокода KB20 | ✅ PASS | текст в DOM |

### Оценка Round 2
**Производственная готовность: C+ → B+** · Все критичные (critical) дефекты закрыты. Остаются только известные демо-ограничения: внешний CDN картинок (picsum.photos 403 в этой сети), визуальная полировка и бизнес-данные (тарифы, банк рассрочки, ИНН/ОГРН).

<picam></p>
- ⚠️ «Рассрочка 0-0-4 / 11 300 ₽» (вайрфрейм) → на сайте 0-0-12 / 3 767 ₽/мес (в репозитории помечено как вопрос к клиенту).

---

## 🧪 Interactive Testing Results

| Сценарий | Результат | Доказательство |
|---|---|---|
| Модалка «по вашим размерам» открывается | ✅ PASS | home-modal-size-desktop.png |
| Форма модалки успешно отправляется | ✅ PASS | home-form-success-mobile.png |
| Мобильное меню открывается | ✅ PASS | home-mobile-menu.png |
| Скелетон каталога → 6 карточек | ✅ PASS | catalog-skeleton-mobile.png |
| Таб Корпусная → 9 карточек | ✅ PASS | catalog-tab-corpus-desktop.png |
| Ценовой фильтр → «Найдено 3 товара» | ✅ PASS | catalog-price-filter-real.png |
| Шторка фильтров mobile | ✅ PASS | catalog-filter-sheet-mobile.png |
| Sticky-бар карточки mobile | ✅ PASS | product-sticky-mobile.png |
| Товар с опциями → пересчёт цены | ❌ FAIL | product-chip-click-debug.png, product-options-recalc-desktop.png |
| Добавление в корзину | ✅ PASS | product-toast-added-desktop.png |
| Корзина empty → filled → промокод | ⚠️ WARN (KD20 ≠ KB20) | cart-empty-desktop.png, cart-filled-desktop.png, cart-promo-kb20-desktop.png |
| Валидация телефона (контакты) | ✅ PASS | contacts-form-error-invalid-phone.png |
| Калькулятор доставки | ✅ PASS | delivery-calc-beyond-mkad.png |

**Консоль**: при загрузке всех 10 страниц ошибок нет (`consoleErrors: []`). Единственная runtime-ошибка — по клику на опции товара.

---

## 📊 Issues Found

### 🔴 Критично

**1. Адрес из ТЗ `product.html?id=richards` → «Товар не найден»**
- **Доказательство**: product-richards-not-found-desktop.png (заголовок stock «Товар не найден»; H1 отсутствует), DOM: `h1Count: 0` на этой странице.
- **Первопричина**: `main.js ≈ стр. 694` — товар ищется по параметру `id`, тогда как в `data.js` товар: `id/code: 'richards'`, `slug: 'divan-uglovoy-richards'` (стр. 92). Работает только `product.html?id=divan-uglovoy-richards`.
- **Приоритет**: Critical.

**2. Опции-чипы карточки не работают (цена/выбор размера, ткани, механизма)**
- **Доказательство**: qa-deep: до клика цена 45 200 ₽, после клика по «240 см +3 000 ₽» — цена без изменений, чип остаётся неактивным; в консоли `PageError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions…`. Скриншоты: product-chip-click-debug.png, product-options-recalc-desktop.png.
- **Первопричина**: `main.js` стр. 4 `'use strict'`, но стр. 883, 889, 899 используют `arguments.callee`. Код обрывается до пересчёта.
- **Приоритет**: Critical.

### 🟠 Высокий

**3. Горизонтальный скролл на мобильных (production +15px, contacts +40px)**
- **Доказательство**: DOM `scrollWidth=405/430` при `clientWidth=390`; виновник — `.mobile-menu-panel` c `position:absolute; transform:translate(100%)` внутри `.mobile-menu{visibility:hidden}` (панель скрыта, но расширяет scrollWidth). Скриншоты: production-overflow-top.png, contacts-overflow-top.png.
- **Приоритет**: Major. Исправление: `display:none` при закрытом меню или `overflow-x:clip` на `.mobile-menu`.

### 🟡 Средний / замечания

**4. Рассинхрон промокода**: cart.html подсказывает «KD20 — скидка 5%», `data.js` PROMOCODES — `KB20`. Пользователь по подсказке получит «Промокод не найден». Скриншот: cart-promo-kb20-desktop.png.
- **Приоритет**: Medium.

**5. Зависимость от внешнего CDN-заглушки** (picsum.photos): в ряде сетей отдаёт 403; все 38 изображений в прототипе не загрузились в тестовой среде. На скриншотах демо-фото отсутствуют.
- **Приоритет**: Medium (для продакшена — обязательно self-host).

**6. `href="#"` мёртвые ссылки**: мега-меню CTA «Мебель по вашим размерам» и «Политика конфиденциальности» в футере — без JS-обработчика клик никуда не ведёт (detected: `deadLinks: 2` на 9/10 страниц).
- **Приоритет**: Low.

**7. 404.html**: отсутствует `<meta name="description">` (на остальных страницах есть). SEO-мелочь, видна в DOM (`metaDesc: 0`).
- **Приоритет**: Low.

**8. Рассрочка**: в вайрфреймах 0-0-4 / 11 300 ₽/мес, на сайте 0-0-12 / 3 767 ₽/мес. Зафиксировано в README макетов как вопрос к клиенту — не дефект, но требует подтверждения.
- **Приоритет**: Info.

---

## 🎯 Honest Quality Assessment

**Реалистичная оценка**: **C+**
**Уровень дизайна**: Good — дизайн-система реализована (крем/терракота, типографика Manrope+Unbounded, радиусы, таббар), вёрстка на 8/10 страницах без оверфлоу. Но визуально «вживую» не финален: требовался самохостинг демо-фото.
**Production readiness**: **NEEDS WORK** — три критичных блока: URL из ТЗ, опции товара, мобильный overflow на 2 страницах. Функционал блока «Каталог», форм и навигации — рабочий.

---

## 🔄 Required Next Steps

**Статус**: FAILED (требуется доработка перед повторной приёмкой)

**Что исправить (в порядке приоритета)**:
1. **Опции товара**: заменить `arguments.callee` (стр. 883/889/899 `main.js`) на именованные функции/стрелки → чипы активируются, цена пересчитывается.
2. **URL из ТЗ**: добавить в `productInit` поиск и по `slug` (`divan-uglovoy-richards`), чтобы `?id=richards` и `?id=divan-uglovoy-richards` оба вели на товар; исключить страницу «Товар не найден» без H1.
3. **Мобильный overflow**: скрывать `.mobile-menu` через `display:none` (не только `visibility:hidden`) или `overflow-x:clip` → проверить production и contacts на 390px.
4. **Промокод**: привести подсказку в cart.html к `KB20` или добавить `KD20` в `data.js`.
5. **Картинки**: заменить picsum на локальные файлы (или хотя бы добавить `loading` + атрибуты w/h).
6. **Мелкие**: meta description на 404, ссылку «Политика конфиденциальности» сделать осмысленной, подтвердить условия рассрочки 0-0-12 у клиента.

**Пере-тест**: ОБЯЗАТЕЛЕН после исправлений, по тем же сценариям (qa-dom.js + qa-interactions.js).

---

**QA Agent**: EvidenceQA
**Evidence Date**: 11.09.2026
**Screenshots**: `K:\creatmebel-ru-20\prototype\qa-screenshots\`
**Artefacts**: `checklist.md` (в этой же папке), `qa-results.json`, `qa-dom-evidence.json`