# QA-чеклист: Креат Мебель v2.0 (прототип)

Дата проверки: 11.09.2026 · Адрес: https://altairstudio-ru.github.io/creatmebel.ru/
Вьюпорты: desktop 1280×800, mobile 390×844 (isMobile+hasTouch)
Скриншоты: `../qa-screenshots/` · Результаты интеракций: `qa-results.json`

## Статусы
- ✅ PASS — соответствует ТЗ, проверено на скриншоте/DOM
- ⚠️ WARN — работает, но есть риск/расхождение
- ❌ FAIL — не работает

---

## 1. Мобильная вёрстка (нет горизонтального скролла)
| Страница | scrollWidth/390 | Статус | Скриншот |
|---|---|---|---|
| index | 390 | ✅ | index-mobile.png |
| catalog-soft | 390 | ✅ | catalog-soft-mobile.png |
| catalog-corpus | 390 | ✅ | catalog-corpus-mobile.png |
| product-richards (ТЗ-id) | 390 | ✅* | product-richards-mobile.png |
| product-full (slug) | 390 | ✅ | product-richards-full-mobile.png |
| production | **405** | ❌ | production-overflow-top.png |
| delivery | 390 | ✅ | delivery-mobile.png |
| contacts | **430** | ❌ | contacts-overflow-top.png |
| cart | 390 | ✅ | cart-mobile.png |
| 404 | 390 | ✅ | 404-mobile.png |

**Причина overflow:** off-canvas панель мобильного меню `.mobile-menu-panel` на `position:absolute; transform:translate(100%)` внутри `.mobile-menu{visibility:hidden}` (а не `display:none`) — при скрытом меню панель всё равно расширяет scrollWidth документа на 15–40 px.
\* на product-richards (страница «Товар не найден») скролла нет — но сама страница не соответствует ТЗ, см. п.8.

**Вывод: ❌ FAIL** на 2 страницах (production, contacts).

---

## 2. Карточка товара (product-full)
| Требование | Факт | Статус | Скриншот |
|---|---|---|---|
| Цена актуальная | 45 200 ₽ | ✅ | product-richards-full-desktop.png |
| Старая цена | 50 200 ₽ | ✅ | product-card-details-desktop.png |
| Рассрочка | 3 767 ₽/мес, 0-0-12 (в макете 0-0-4 — вопрос клиенту) | ⚠️ | product-card-details-desktop.png |
| Срок изготовления | 7–9 дней | ✅ | product-card-details-desktop.png |
| Кнопка «В корзину» desktop | видна | ✅ | product-richards-full-desktop.png |
| Кнопка «В корзину» mobile | #sticky-buy видна | ✅ | product-sticky-mobile.png |
| Галерея (таббар фото) | 4 фото, переключение работает | ✅ | product-richards-full-desktop.png |
| Табы (характеристики/доставка/…) | 5 табов, контент переключается | ✅ | product-tab-delivery-desktop.png |
| Добавление в корзину | toast + бейдж «1» | ✅ | product-toast-added-desktop.png |
| **Опции-чипы (размер/ткань/механизм)** | **клик не меняет цену и не активирует чип** | ❌ | product-chip-click-debug.png, product-options-recalc-desktop.png |

**Первопричина FAIL:** в `assets/js/main.js` строки 883/889/899 используют `arguments.callee` внутри функций, объявленных при `'use strict'` (строка 4) → браузерное `PageError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions…`. Обработчик обрывается до пересчёта цены.

**Вывод: ❌ FAIL** (критический сценарий «цена под опции» не работает).

---

## 3. Каталог
| Требование | Факт | Статус | Скриншот |
|---|---|---|---|
| Таб «Мягкая» по умолчанию | «Найдено 6 товаров» | ✅ | catalog-soft-desktop.png |
| Таб «Корпусная» | «Найдено 9 товаров», corpusActive | ✅ | catalog-tab-corpus-desktop.png |
| Переключение soft→corpus | 6 → 9 карточек | ✅ | catalog-tab-corpus-desktop.png |
| Скелетон/прелоадер | отображается при загрузке | ✅ | catalog-skeleton-mobile.png |
| Фильтр по цене | «Найдено 3 товара» при цене от 30 000 | ✅ | catalog-price-filter-real.png |
| Счётчик выбранных фильтров | «Фильтры (1)» | ✅ | catalog-filters-applied-desktop.png |
| Шторка фильтров mobile | открывается | ✅ | catalog-filter-sheet-mobile.png |

**Вывод: ✅ PASS**

---

## 4. CSS loader / сборка стилей (фактически Tailwind v4 локальная сборка)
- `assets/css/main.css` собрана: 44 580 байт, содержит кремовый bg, терракотовые кнопки, пульки-радиусы.
- Проверено вычисляемыми стилями в браузере:
  - `body { background: #F8F5F0 }` (крем) — совпадает с design-system;
  - `.btn-primary { background: #C25E3C (rgb(194,94,60)); color:#fff; border-radius:999px }` — терракота;
  - `.btn-ghost { background:transparent; color:#C25E3C }`;
  - заголовки секций — `Unbounded` (подгружен);
  - `<meta name="theme-color" content="#F8F5F0">` присутствует.

**Вывод: ✅ PASS**

---

## 5. Единая шапка/футер
- Проверено на 10 страницах (desktop): телефон `+7 (920) 622-51-95`, логотип, меню, футер с навигацией, таббар на mobile (65px, с паддингом body-pad-bottom 80px) — единообразно.
- Мобильное бургер-меню открывается (home-mobile-menu.png).
- Все внутренние ссылки (21 шт.) резолвятся: `missing: []`.

**Вывод: ✅ PASS**

---

## 6. Модалка «По вашим размерам» и формы
| Сценарий | Факт | Статус | Скриншот |
|---|---|---|---|
| Открытие модалки (desktop, индекс) | открывается | ✅ | home-modal-size-desktop.png |
| Отправка формы с валидным номером | success-блок показывается | ✅ | home-form-success-mobile.png |
| Валидация телефона на контактах | `123` → ошибка «Введите номер в формате +7 (900) 000-00-00» | ✅ | contacts-form-error-invalid-phone.png |
| Калькулятор доставки | считает; за МКАД (>25 км) появляется аннотация | ✅ | delivery-calc-beyond-mkad.png |

**Вывод: ✅ PASS**

---

## 7. Корзина
| Требование | Факт | Статус | Скриншот |
|---|---|---|---|
| Empty-состояние | отображается | ✅ | cart-empty-desktop.png |
| Заполненное состояние | товар + итог + промокод-строка | ✅ | cart-filled-desktop.png |
| localStorage | ключ `cm_cart_v2` (не `cm-cart` из старых версий) | ✅ | — |
| Промокод из подсказки | подсказка «KD20 — скидка 5%», а работает **KB20**; KD20 → «Промокод не найден» | ❌ | cart-promo-kb20-desktop.png |

**Вывод: ⚠️ WARN** (рассинхрон промокода в UI и data.js)

---

## 8. Рабочие URL из ТЗ
| URL из ТЗ | Факт | Статус | Скриншот |
|---|---|---|---|
| `product.html?id=richards` | **«Товар не найден»** (slug в data.js — `divan-uglovoy-richards`; код ищет по `id`) | ❌ | product-richards-not-found-desktop.png |
| Рабочий адрес (slug) | `product.html?id=divan-uglovoy-richards` | ✅ | product-richards-full-desktop.png |

**Вывод: ❌ FAIL** — критично для ТЗ-адреса.

---

## 9. 404
- 404 отображается корректно, есть ссылка «На главную», таббар.
- Недочёт: отсутствует `<meta name="description">` (на остальных 9 страницах он есть).
- Внутренние ссылки `href="#"` (мега-меню CTA и «Политика конфиденциальности») — мёртвые с точки зрения навигации (действие вешается только JS-обработчиками).

**Вывод: ✅ PASS** с замечанием (meta description).

---

## 10. Консоль/ошибки JS
- При загрузке всех 10 страниц — `consoleErrors: []` (0 ошибок).
- Единственная runtime-ошибка — **cluster чипов опций** (п.2), воспроизводится по клику.

**Вывод: ⚠️ WARN**

---

## Итоговая оценка
| № | Блок | Статус |
|---|---|---|
| 1 | Мобильная вёрстка (h-scroll) | ❌ FAIL (2/10) |
| 2 | Карточка товара | ❌ FAIL (опции) |
| 3 | Каталог | ✅ PASS |
| 4 | CSS loader | ✅ PASS |
| 5 | Шапка/футер | ✅ PASS |
| 6 | Модалки и формы | ✅ PASS |
| 7 | Корзина | ⚠️ WARN |
| 8 | URL из ТЗ | ❌ FAIL |
| 9 | 404 | ✅ PASS |
| 10 | Консоль | ⚠️ WARN |

**Вердикт: требуется исправление 3 критичных дефектов перед приёмкой** (см. qa-report.md).