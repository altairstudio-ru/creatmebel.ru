/* ============================================================
   Креат Мебель v2.0 — сценарии прототипа (vanilla JS)
   ============================================================ */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var C = window.CM;

  /* ---------- Утилиты ---------- */
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function formatNumber(n) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(n));
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, ms || 200);
    };
  }

  function validPhone(v) {
    var digits = String(v || '').replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 12;
  }

  function setInputError(input, message) {
    var wrap = input.closest('.field-wrap');
    if (input.classList.contains('field')) input.classList.add('field-error');
    if (wrap) {
      var hint = wrap.querySelector('.field-hint');
      if (hint) { hint.textContent = message || ''; hint.classList.remove('hidden'); }
    }
  }

  function clearInputError(input) {
    input.classList.remove('field-error');
    var wrap = input.closest('.field-wrap');
    if (wrap) {
      var hint = wrap.querySelector('.field-hint');
      if (hint) hint.classList.add('hidden');
    }
  }

  /* ---------- Тост ---------- */
  var toastBox = null;
  function showToast(message, actionLabel, actionUrl) {
    if (!toastBox) {
      toastBox = document.createElement('div');
      toastBox.className = 'toast-box';
      document.body.appendChild(toastBox);
    }
    var el = document.createElement('div');
    el.className = 'toast';
    var html = '<span class="toast-msg">' + escapeHtml(message) + '</span>';
    if (actionLabel && actionUrl) {
      html += '<a class="toast-link" href="' + escapeHtml(actionUrl) + '">' + escapeHtml(actionLabel) + '</a>';
    }
    el.innerHTML = html;
    toastBox.appendChild(el);
    setTimeout(function () {
      el.classList.add('toast-hide');
      setTimeout(function () { el.remove(); }, 400);
    }, 3200);
    requestAnimationFrame(function () { el.classList.add('toast-show'); });
  }

  window.CM.showToast = showToast;

  /* ---------- Корзина ---------- */
  function updateBadges() {
    var count = C.cartCount();
    $$('.cart-count').forEach(function (b) {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });
  }
  C.updateBadges = updateBadges;

  function addToCart(slug, qty, label) {
    var cart = C.getCart();
    var found = cart.find(function (it) { return it.slug === slug; });
    if (found) { found.qty = (found.qty || 1) + (qty || 1); }
    else { cart.push({ slug: slug, qty: qty || 1 }); }
    C.setCart(cart);
    var p = C.getProduct(slug);
    showToast('Добавлено в корзину · ' + (label || (p ? p.name : '')), 'В корзину', 'cart.html');
    return cart;
  }
  C.addToCart = addToCart;

  /* ---------- Карточка товара (универсальный рендер) ---------- */
  function badgeClass(badge) {
    if (!badge) return '';
    if (badge.indexOf('−') === 0 || badge.indexOf('-') === 0) return 'badge-sale';
    if (badge === 'Новинка') return 'badge-new';
    return 'badge-stock';
  }

  function productCard(p) {
    if (!p) return '';
    var old = parseInt(p.oldPrice, 10) > parseInt(p.price, 10)
      ? '<span class="text-sm text-greige line-through">' + formatNumber(p.oldPrice) + ' ₽</span>'
      : '';
    var badge = p.badge ? '<span class="badge ' + badgeClass(p.badge) + '">' + escapeHtml(p.badge) + '</span>' : '';
    var stockLine = p.inStock
      ? '<span class="flex items-center gap-1.5 text-sm font-semibold text-olive">' +
        '<span class="inline-block w-2 h-2 rounded-full bg-olive"></span>' +
        escapeHtml(p.productionDays + (p.productionDays > 4 ? '–' + (p.productionDays + 2) : '') + ' дней') +
        ' · всё включено</span>'
      : '<span class="text-sm text-greige">Нет в наличии · сделаем под заказ</span>';
    var btn = p.inStock
      ? '<button type="button" class="btn btn-primary btn-sm w-full add-to-cart" data-slug="' + escapeHtml(p.slug) + '" aria-label="Добавить в корзину">В корзину</button>'
      : '<a class="btn btn-outline btn-sm w-full" data-open-modal="size">Сообщить о поступлении</a>';

    return '<article class="card card-hover product-card flex flex-col" data-slug="' + escapeHtml(p.slug) + '">' +
      '<a href="product.html?id=' + encodeURIComponent(p.slug) + '" class="product-card-media relative block" aria-label="' + escapeHtml(p.name) + '">' +
      '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" loading="lazy" class="w-full aspect-[3/2] object-cover">' +
      (badge ? '<span class="absolute top-3 left-3">' + badge + '</span>' : '') +
      '</a>' +
      '<div class="flex flex-col gap-2 p-4 grow">' +
      '<a href="product.html?id=' + encodeURIComponent(p.slug) + '" class="font-semibold leading-snug text-ink hover:text-terracotta">' + escapeHtml(p.name) + '</a>' +
      '<span class="text-xs text-greige">Артикул ' + escapeHtml(p.id || '') + '</span>' +
      '<div class="mt-auto flex flex-col gap-2 pt-2">' +
      stockLine +
      '<div class="flex items-end justify-between gap-2">' +
      '<span class="font-display text-xl font-semibold text-ink">' + formatNumber(p.price) + ' ₽</span>' +
      old +
      '</div>' +
      btn +
      '</div></div></article>';
  }

  window.CM.productCard = productCard;

  /* ---------- Хиты на главной ---------- */
  function renderHits() {
    var grid = $('#hits-grid');
    if (!grid) return;
    var slugs = ['divan-uglovoy-richards', 'divan-akkordeon-space-2', 'komod-street-3', 'krovat-fokus'];
    grid.innerHTML = '';
    for (var i = 0; i < 4; i++) {
      var s = document.createElement('div');
      s.className = 'skeleton-card';
      grid.appendChild(s);
    }
    setTimeout(function () {
      grid.innerHTML = '';
      slugs.forEach(function (slug) {
        var p = C.getProduct(slug);
        if (p) {
          var wrap = document.createElement('div');
          wrap.innerHTML = productCard(p);
          grid.appendChild(wrap.firstChild);
        }
      });
    }, 400);
  }

  /* ---------- Табы категорий (главная) ---------- */
  function initHomeCategoryTiles() {
    var wrap = $('#category-panel');
    if (!wrap) return;
    var soft = $('#panel-soft'), corpus = $('#panel-corpus');
    var btnSoft = $('#cat-tab-soft'), btnCorpus = $('#cat-tab-corpus');
    if (!btnSoft || !btnCorpus) return;
    function setPanel(panel) {
      soft.classList.toggle('hidden', panel !== 'soft');
      corpus.classList.toggle('hidden', panel !== 'corpus');
      btnSoft.classList.toggle('tab-active', panel === 'soft');
      btnCorpus.classList.toggle('tab-active', panel === 'corpus');
    }
    btnSoft.addEventListener('click', function () { setPanel('soft'); });
    btnCorpus.addEventListener('click', function () { setPanel('corpus'); });
  }

  /* ============================================================
     КАТАЛОГ
     ============================================================ */
  var CAT = {
    soft: {
      label: 'Мягкая мебель',
      subs: [
        { id: 'all', label: 'Все' },
        { id: 'divany', label: 'Диваны' },
        { id: 'kresla', label: 'Кресла и пуфики' }
      ],
      subMatch: function (p, sub) {
        if (sub === 'all') return true;
        if (sub === 'divany') return p.category.indexOf('Диваны') === 0;
        if (sub === 'kresla') return p.category.indexOf('Кресла') === 0;
        return true;
      },
      fabricOptions: function () {
        var set = {};
        window.PRODUCTS.forEach(function (p) {
          if (p.category.indexOf('Мягкая') !== 0) return;
          var t = (p.materials && p.materials['Ткань']) || '';
          if (t) set[t] = (set[t] || 0) + 1;
        });
        return set;
      }
    },
    corpus: {
      label: 'Корпусная мебель',
      subs: [
        { id: 'all', label: 'Все' },
        { id: 'shkafy', label: 'Шкафы' },
        { id: 'gostinaya', label: 'Гостиная' },
        { id: 'prihozhaya', label: 'Прихожая' },
        { id: 'spalnya', label: 'Спальня' },
        { id: 'detskaya', label: 'Детская' },
        { id: 'kuhnya', label: 'Кухня' }
      ],
      subMatch: function (p, sub) {
        if (sub === 'all') return true;
        var map = {
          shkafy: 'Шкафы',
          gostinaya: 'Гостиная',
          prihozhaya: 'Прихожая',
          spalnya: 'Спальня',
          detskaya: 'Детская',
          kuhnya: 'Кухня'
        };
        return p.category.indexOf(map[sub]) === 0;
      }
    }
  };

  function catalogInit() {
    var root = $('#catalog-app');
    if (!root) return;

    var state = {
      cat: 'soft',
      sub: 'all',
      filters: { type: [], mech: [], material: [], color: [] },
      priceMax: 60000,
      sort: 'popular',
      shown: 6
    };

    var params = new URLSearchParams(location.search);
    if (params.get('cat') === 'corpus') state.cat = 'corpus';
    if (params.get('sub')) state.sub = params.get('sub');

    /* --- чипы подкатегорий --- */
    var subRow = $('#catalog-subchips');
    function renderSubchips() {
      var cat = CAT[state.cat];
      subRow.innerHTML = '';
      cat.subs.forEach(function (s) {
        var count = 0;
        window.PRODUCTS.forEach(function (p) {
          if (isSoft(p) === (state.cat === 'soft') && cat.subMatch(p, s.id)) count++;
        });
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip ' + (state.sub === s.id ? 'chip-active' : 'chip-idle');
        chip.textContent = s.label + ' · ' + count;
        chip.setAttribute('aria-pressed', state.sub === s.id ? 'true' : 'false');
        chip.addEventListener('click', function () {
          state.sub = s.id;
          state.shown = 6;
          updateUrl();
          renderSubchips();
          applyFilters();
        });
        subRow.appendChild(chip);
      });
    }

    function isSoft(p) { return p.category.indexOf('Мягкая') === 0; }

    function productMatches(p) {
      if (state.cat === 'soft' && !isSoft(p)) return false;
      if (state.cat === 'corpus' && isSoft(p)) return false;
      if (!CAT[state.cat].subMatch(p, state.sub)) return false;

      var f = state.filters;
      var name = p.name.toLowerCase();
      var desc = p.shortDescription.toLowerCase();
      var feats = (p.features || []).join(' ').toLowerCase();
      var matText = (p.materials ? Object.values(p.materials).join(' ').toLowerCase() : '');
      var all = name + ' ' + desc + ' ' + feats + ' ' + matText;

      if (f.type.length) {
        var typeOk = f.type.some(function (t) {
          if (t === 'pryamye') return all.indexOf('углов') === -1 && all.indexOf('детск') === -1;
          if (t === 'uglovye') return all.indexOf('углов') !== -1;
          if (t === 'detskie') return all.indexOf('детск') !== -1;
          return false;
        });
        if (!typeOk) return false;
      }
      if (f.mech.length) {
        var mechOk = f.mech.some(function (m) {
          if (m === 'evroknizhka') return all.indexOf('еврокниж') !== -1;
          if (m === 'akkordeon') return all.indexOf('аккордеон') !== -1;
          if (m === 'vykatnoy') return all.indexOf('выкат') !== -1;
          if (m === 'delfin') return all.indexOf('дельфин') !== -1;
          return false;
        });
        if (!mechOk) return false;
      }
      if (f.material.length) {
        var matOk = f.material.some(function (m) {
          return all.indexOf(m.toLowerCase()) !== -1;
        });
        if (!matOk) return false;
      }
      if (f.color.length) {
        var colOk = f.color.some(function (c) {
          return (p.colorOptions || []).some(function (o) {
            return o.toLowerCase().indexOf(c.toLowerCase()) !== -1;
          });
        });
        if (!colOk) return false;
      }
      if (parseInt(p.price, 10) > state.priceMax) return false;
      return true;
    }

    function getProducts() {
      var list = window.PRODUCTS.filter(productMatches);
      if (state.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === 'news') {
        list.sort(function (a, b) {
          var na = a.badge === 'Новинка' ? 0 : 1;
          var nb = b.badge === 'Новинка' ? 0 : 1;
          return na - nb;
        });
      }
      return list;
    }

    var grid = $('#catalog-grid');
    var summary = $('#catalog-summary');
    var moreBtn = $('#catalog-more');
    var emptyBlock = $('#catalog-empty');

    function renderGrid(list, withSkeleton) {
      emptyBlock.classList.add('hidden');
      moreBtn.classList.add('hidden');
      grid.classList.remove('hidden');
      var apply = function () {
        grid.innerHTML = '';
        var visible = list.slice(0, state.shown);
        visible.forEach(function (p, i) {
          var wrap = document.createElement('div');
          wrap.style.animationDelay = (i * 40) + 'ms';
          wrap.className = 'card-anim';
          wrap.innerHTML = productCard(p);
          grid.appendChild(wrap.firstChild);
        });
        if (visible.length < list.length) {
          moreBtn.classList.remove('hidden');
          moreBtn.textContent = 'Показать ещё (' + (list.length - visible.length) + ')';
        }
        if (summary) {
          var subTitle = state.sub === 'all' ? '' : CAT[state.cat].subs.filter(function (s) { return s.id === state.sub; })[0].label.toLowerCase();
          summary.textContent = 'Найдено ' + list.length + ' ' + declension(list.length, ['товар', 'товара', 'товаров']);
          if (subTitle) summary.textContent = 'Найдено ' + list.length + ' ' + declension(list.length, ['позиции', 'позиций', 'позиций']) + ' · ' + subTitle;
        }
        if (list.length === 0) {
          grid.classList.add('hidden');
          emptyBlock.classList.remove('hidden');
        }
      };
      if (withSkeleton) {
        grid.innerHTML = '';
        for (var i = 0; i < 6; i++) {
          var s = document.createElement('div');
          s.className = 'skeleton-card';
          grid.appendChild(s);
        }
        setTimeout(apply, 400);
      } else {
        apply();
      }
    }

    function declension(n, forms) {
      n = Math.abs(n) % 100; var n1 = n % 10;
      if (n > 10 && n < 20) return forms[2];
      if (n1 > 1 && n1 < 5) return forms[1];
      if (n1 === 1) return forms[0];
      return forms[2];
    }

    function applyFilters(withSkeleton) {
      var list = getProducts();
      renderGrid(list, withSkeleton !== false);
      updateFilterCount();
    }

    /* --- табы --- */
    var tabSoft = $('#cat-tab-soft'), tabCorpus = $('#cat-tab-corpus');
    function renderTabs() {
      tabSoft.classList.toggle('tab-active', state.cat === 'soft');
      tabCorpus.classList.toggle('tab-active', state.cat === 'corpus');
    }
    function switchCat(cat) {
      state.cat = cat;
      state.sub = 'all';
      state.shown = 6;
      state.filters = { type: [], mech: [], material: [], color: [] };
      state.priceMax = 60000;
      syncPriceInput();
      updateUrl();
      renderTabs();
      renderSubchips();
      renderFilters();
      applyFilters();
    }
    tabSoft.addEventListener('click', function () { if (state.cat !== 'soft') switchCat('soft'); });
    tabCorpus.addEventListener('click', function () { if (state.cat !== 'corpus') switchCat('corpus'); });

    /* --- фильтры (чипы в сайдбаре и шторке одновременно) --- */
    var filterGroupEls = {
      type: $$('.js-filter-type'),
      mech: $$('.js-filter-mech'),
      material: $$('.js-filter-material'),
      color: $$('.js-filter-color')
    };
    var priceRanges = $$('.js-filter-price');
    var priceOuts = $$('.js-filter-price-out');
    var priceGroups = $$('.js-filter-price-group');
    var filterCountEls = $$('.filter-count');

    function makeFilterGroup(els, options, key, single) {
      if (!els.length) return;
      els.forEach(function (el) {
        el.innerHTML = '';
        options.forEach(function (opt) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'chip chip-tiny ' + (state.filters[key].indexOf(opt.id) !== -1 ? 'chip-active' : 'chip-idle');
          b.innerHTML = escapeHtml(opt.label) + ' <span class="opacity-60">' + opt.count + '</span>';
          b.setAttribute('aria-pressed', state.filters[key].indexOf(opt.id) !== -1 ? 'true' : 'false');
          b.addEventListener('click', function () {
            if (single) state.filters[key] = [opt.id];
            else {
              var i = state.filters[key].indexOf(opt.id);
              if (i === -1) state.filters[key].push(opt.id);
              else state.filters[key].splice(i, 1);
            }
            renderFilterGroups(key);
            applyFilters();
          });
          el.appendChild(b);
        });
      });
    }

    function renderFilterGroups(key) {
      if (key === 'type') makeFilterGroup(filterGroupEls.type, buildTypeOptions(), 'type', false);
      if (key === 'mech') makeFilterGroup(filterGroupEls.mech, buildMechOptions(), 'mech', false);
      if (key === 'material') makeFilterGroup(filterGroupEls.material, buildMaterialOptions(), 'material', false);
      if (key === 'color') makeFilterGroup(filterGroupEls.color, buildColorOptions(), 'color', false);
    }

    function countByKey(key, valueFn) {
      var cat = state.cat;
      var counts = {};
      window.PRODUCTS.forEach(function (p) {
        if (cat === 'soft' && !isSoft(p)) return;
        if (cat === 'corpus' && isSoft(p)) return;
        if (!CAT[cat].subMatch(p, state.sub)) return;
        valueFn(p).forEach(function (v) {
          if (v) counts[v.toLowerCase()] = (counts[v.toLowerCase()] || 0) + 1;
        });
      });
      return counts;
    }

    function buildTypeOptions() {
      var counts = countByKey('type', function (p) {
        var n = p.name.toLowerCase();
        if (n.indexOf('углов') !== -1) return ['Угловые'];
        if (n.indexOf('детск') !== -1) return ['Детские'];
        return ['Прямые'];
      });
      return [
        { id: 'pryamye', label: 'Прямые', count: counts['прямые'] || 0 },
        { id: 'uglovye', label: 'Угловые', count: counts['угловые'] || 0 },
        { id: 'detskie', label: 'Детские', count: counts['детские'] || 0 }
      ];
    }

    function buildMechOptions() {
      var counts = countByKey('mech', function (p) {
        var t = (p.features || []).join(' ') + ' ' + p.name;
        var out = [];
        if (t.indexOf('еврокниж') !== -1) out.push('Еврокнижка');
        if (t.indexOf('аккордеон') !== -1) out.push('Аккордеон');
        if (t.indexOf('выкат') !== -1) out.push('Выкатной');
        if (t.indexOf('дельфин') !== -1) out.push('Дельфин');
        return out;
      });
      return [
        { id: 'evroknizhka', label: 'Еврокнижка', count: counts['еврокнижка'] || 0 },
        { id: 'akkordeon', label: 'Аккордеон', count: counts['аккордеон'] || 0 },
        { id: 'vykatnoy', label: 'Выкатной', count: counts['выкатной'] || 0 },
        { id: 'delfin', label: 'Дельфин', count: counts['дельфин'] || 0 }
      ];
    }

    function buildMaterialOptions() {
      var counts = countByKey('material', function (p) {
        var out = [];
        if (p.materials) {
          Object.keys(p.materials).forEach(function (k) {
            var v = p.materials[k];
            if (k === 'Ткань' || k === 'Изголовье') {
              if (v.indexOf('экокож') !== -1) out.push('Экокожа');
              if (v.indexOf('велюр') !== -1) out.push('Велюр');
              if (v.indexOf('рогож') !== -1) out.push('Рогожка');
              if (v.indexOf('микровелюр') !== -1) out.push('Микровелюр');
            }
          });
        }
        return out;
      });
      return [
        { id: 'велюр', label: 'Велюр', count: counts['велюр'] || 0 },
        { id: 'рогожка', label: 'Рогожка', count: counts['рогожка'] || 0 },
        { id: 'микровелюр', label: 'Микровелюр', count: counts['микровелюр'] || 0 },
        { id: 'экокожа', label: 'Экокожа', count: counts['экокожа'] || 0 }
      ];
    }

    function buildColorOptions() {
      var counts = countByKey('color', function (p) {
        var out = [];
        (p.colorOptions || []).forEach(function (o) {
          var l = o.toLowerCase();
          if (l.indexOf('дуб сонома') !== -1) out.push('Дуб сонома');
          if (l.indexOf('венге') !== -1) out.push('Венге');
          if (l.indexOf('белый') !== -1) out.push('Белый');
          if (l.indexOf('графит') !== -1) out.push('Графит');
        });
        return out;
      });
      return [
        { id: 'дуб сонома', label: 'Дуб сонома', count: counts['дуб сонома'] || 0 },
        { id: 'венге', label: 'Венге', count: counts['венге'] || 0 },
        { id: 'белый', label: 'Белый', count: counts['белый'] || 0 },
        { id: 'графит', label: 'Графит', count: counts['графит'] || 0 }
      ];
    }

    function renderFilters() {
      var isSoft = state.cat === 'soft';
      filterGroupEls.type.forEach(function (el) {
        el.closest('.filter-group').classList.toggle('hidden', !isSoft);
      });
      filterGroupEls.mech.forEach(function (el) {
        el.closest('.filter-group').classList.toggle('hidden', !isSoft);
      });
      filterGroupEls.color.forEach(function (el) {
        el.closest('.filter-group').classList.toggle('hidden', isSoft);
      });
      renderFilterGroups('type'); renderFilterGroups('mech');
      renderFilterGroups('material'); renderFilterGroups('color');
    }

    function updateFilterCount() {
      var n = state.filters.type.length + state.filters.mech.length +
        state.filters.material.length + state.filters.color.length;
      if (state.priceMax < 60000) n++;
      filterCountEls.forEach(function (el) {
        var base = 'Фильтры';
        el.textContent = n > 0 ? base + ' (' + n + ')' : base;
      });
    }

    function syncPriceInput() {
      priceRanges.forEach(function (r) { r.value = state.priceMax; });
      priceOuts.forEach(function (o) { o.textContent = formatNumber(state.priceMax) + ' ₽'; });
    }

    priceRanges.forEach(function (priceRange) {
      priceRange.addEventListener('input', debounce(function () {
        state.priceMax = parseInt(priceRange.value, 10) || 60000;
        syncPriceInput();
        updateFilterCount();
      }, 120));
      priceRange.addEventListener('change', function () { applyFilters(); });
    });
    priceGroups.forEach(function (g) { g.classList.toggle('hidden', false); });
    syncPriceInput();

    /* сброс */
    function resetFilters() {
      state.filters = { type: [], mech: [], material: [], color: [] };
      state.priceMax = 60000;
      state.shown = 6;
      syncPriceInput();
      renderFilterGroups('type'); renderFilterGroups('mech'); renderFilterGroups('material'); renderFilterGroups('color');
      applyFilters();
    }
    $$('[data-action="reset-filters"]').forEach(function (b) {
      b.addEventListener('click', function () { resetFilters(); });
    });

    /* --- сортировка --- */
    var sortSelect = $('#catalog-sort');
    var sortSelectDesktop = $('#catalog-sort-desktop');
    function bindSort(sel) {
      if (!sel) return;
      sel.value = state.sort;
      sel.addEventListener('change', function () {
        state.sort = sel.value;
        if (sortSelect) sortSelect.value = state.sort;
        if (sortSelectDesktop) sortSelectDesktop.value = state.sort;
        state.shown = 6;
        applyFilters();
      });
    }
    bindSort(sortSelect);
    bindSort(sortSelectDesktop);

    /* --- показать ещё --- */
    if (moreBtn) {
      moreBtn.addEventListener('click', function () {
        state.shown += 6;
        var list = getProducts();
        renderGrid(list, false);
      });
    }

    /* --- шторка фильтров (mobile) --- */
    var sheet = $('#filter-sheet');
    var sheetBackdrop = $('#filter-sheet-backdrop');
    $$('[data-open-filters]').forEach(function (b) {
      b.addEventListener('click', function () { openSheet(true); });
    });
    function openSheet(open) {
      if (!sheet) return;
      sheet.classList.toggle('sheet-open', open);
      if (sheetBackdrop) sheetBackdrop.classList.toggle('sheet-backdrop-show', open);
      document.body.classList.toggle('overflow-hidden', open);
    }
    if (sheetBackdrop) sheetBackdrop.addEventListener('click', function () { openSheet(false); });
    $$('[data-close-sheet]').forEach(function (b) {
      b.addEventListener('click', function () { openSheet(false); });
    });
    $$('[data-action="apply-filters"]').forEach(function (b) {
      b.addEventListener('click', function () { applyFilters(); });
    });
    var sheetApply = $('#filter-sheet-apply');
    if (sheetApply) {
      sheetApply.addEventListener('click', function () {
        applyFilters();
        openSheet(false);
      });
    }

    /* --- URL --- */
    function updateUrl() {
      var p = new URLSearchParams();
      if (state.cat === 'corpus') p.set('cat', 'corpus');
      if (state.sub !== 'all') p.set('sub', state.sub);
      var qs = p.toString();
      history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    }

    renderTabs();
    renderSubchips();
    renderFilters();
    applyFilters();
  }

  /* ============================================================
     КАРТОЧКА ТОВАРА
     ============================================================ */
  function productInit() {
    var root = $('#product-app');
    if (!root) return;

    var params = new URLSearchParams(location.search);
    var slug = params.get('id') || 'divan-uglovoy-richards';
    var p = C.getProduct(slug);
    if (!p) {
      root.innerHTML = '<div class="empty py-20">' +
        '<p class="font-display text-xl">Товар не найден</p>' +
        '<p class="text-greige">Возможно, вы перешли по старой ссылке.</p>' +
        '<a class="btn btn-primary" href="catalog.html">В каталог</a></div>';
      return;
    }

    /* ---- галерея ---- */
    var galleryImages = C.gallery(p.slug);
    var mainImg = $('#product-main-img');
    var counter = $('#product-photo-counter');
    var thumbs = $('#product-thumbs');
    var galleryEl = $('#product-gallery');
    var current = 0;

    function setPhoto(i, animate) {
      current = (i + galleryImages.length) % galleryImages.length;
      if (animate && mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = galleryImages[current];
          mainImg.alt = p.name + ' — фото ' + (current + 1) + ' из ' + galleryImages.length;
          mainImg.style.opacity = '1';
        }, 180);
      } else if (mainImg) {
        mainImg.src = galleryImages[current];
        mainImg.alt = p.name + ' — фото ' + (current + 1) + ' из ' + galleryImages.length;
      }
      if (counter) counter.textContent = (current + 1) + ' / ' + galleryImages.length;
      if (thumbs) {
        $$('.thumb', thumbs).forEach(function (t, ti) {
          t.classList.toggle('thumb-active', ti === current);
        });
      }
    }

    if (mainImg) {
      mainImg.addEventListener('error', function () {
        galleryEl.classList.add('hidden');
        var err = $('#product-gallery-error');
        if (err) err.classList.remove('hidden');
      });
    }

    var prevBtn = $('#gallery-prev'), nextBtn = $('#gallery-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { setPhoto(current - 1, true); });
    if (nextBtn) nextBtn.addEventListener('click', function () { setPhoto(current + 1, true); });

    if (thumbs) {
      galleryImages.forEach(function (src, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'thumb' + (i === 0 ? ' thumb-active' : '');
        b.setAttribute('aria-label', 'Фото ' + (i + 1));
        b.innerHTML = '<img src="' + src + '" alt="' + escapeHtml(p.name) + ' фото ' + (i + 1) + '" loading="lazy">';
        b.addEventListener('click', function () { setPhoto(i, true); });
        thumbs.appendChild(b);
      });
    }
    setTimeout(function () { setPhoto(0, false); }, 50);

    /* swipe */
    var touchStart = null;
    if (galleryEl) {
      galleryEl.addEventListener('touchstart', function (e) {
        touchStart = e.touches[0].clientX;
      }, { passive: true });
      galleryEl.addEventListener('touchend', function (e) {
        if (touchStart === null) return;
        var dx = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(dx) > 48) setPhoto(current + (dx < 0 ? 1 : -1), true);
        touchStart = null;
      }, { passive: true });
    }

    /* ---- мета и бейджи ---- */
    var title = $('#product-title');
    if (title) title.textContent = p.name;
    document.title = p.name + ' — цена ' + formatNumber(p.price) + ' ₽ в Москве | Креат Мебель';

    var meta = $('#product-meta');
    if (meta) {
      meta.innerHTML = '<span aria-hidden="true">★</span> 4.8 · 27 отзывов · Артикул ' +
        escapeHtml(p.id || '') + ' · <a href="#reviews" class="underline decoration-dotted hover:text-terracotta">отзывы</a>';
    }

    var stockBadge = $('#product-stock');
    if (stockBadge) {
      if (p.inStock) {
        stockBadge.innerHTML = '<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-olive">' +
          '<span class="inline-block w-2.5 h-2.5 rounded-full bg-olive"></span> Готовность ' +
          p.productionDays + (p.productionDays > 4 ? '–' + (p.productionDays + 2) : '') + ' дней · доставка +1–2 дня</span>';
      } else {
        stockBadge.innerHTML = '<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-greige">' +
          '<span class="inline-block w-2.5 h-2.5 rounded-full bg-greige"></span> Нет в наличии · делаем под заказ</span>';
      }
    }

    /* ---- опции и пересчёт цены ---- */
    var priceEl = $('#product-price');
    var oldPriceEl = $('#product-old-price');
    var installmentEl = $('#product-installment');
    var fabricChips = $('#fabric-chips');
    var mechChips = $('#mech-chips');
    var sizeChips = $('#size-chips');
    var basePrice = parseInt(p.price, 10);
    var oldPrice = parseInt(p.oldPrice, 10);

    var state = {
      fabric: 0,
      mech: 0,
      size: 0
    };

    var fabricOpts = [];
    var fabricDeltas = [];
    (p.colorOptions || []).forEach(function (c, i) {
      fabricOpts.push(c);
      fabricDeltas.push(i === 2 ? 2400 : 0); // третий цвет — с доплатой, как в макете
    });
    if (p.materials && p.materials['Ткань'] && p.materials['Ткань'].toLowerCase().indexOf('экокож') === -1) {
      fabricOpts.push('Экокожа “Капучино”');
      fabricDeltas.push(3200);
    }

    var mechOpts = [];
    var feats = (p.features || []).join(' ').toLowerCase();
    if (feats.indexOf('аккордеон') !== -1) mechOpts.push('Аккордеон');
    if (feats.indexOf('выкат') !== -1) mechOpts.push('Выкатной');
    mechOpts.push('Еврокнижка');
    if (feats.indexOf('дельфин') !== -1) mechOpts.push('Дельфин');

    var sizeOpts = [
      { label: (p.sizes && p.sizes['Ширина']) || 'Стандарт', delta: 0 },
      { label: '240 см', delta: 3000 },
      { label: '260 см', delta: 6000 }
    ];

    function totalPrice() {
      return basePrice + fabricDeltas[state.fabric] + (sizeOpts[state.size] ? sizeOpts[state.size].delta : 0);
    }

    function renderPrice(animate) {
      var old = oldPrice > basePrice ? oldPrice + fabricDeltas[state.fabric] + sizeOpts[state.size].delta : 0;
      var target = totalPrice();
      if (animate && priceEl) {
        var start = parseInt(priceEl.textContent.replace(/[^\d]/g, ''), 10) || target;
        var t0 = performance.now(), dur = 200;
        function step(ts) {
          var k = Math.min(1, (ts - t0) / dur);
          var v = start + (target - start) * (1 - Math.pow(1 - k, 3));
          priceEl.textContent = formatNumber(v) + ' ₽';
          if (k < 1) requestAnimationFrame(step);
          else priceEl.textContent = formatNumber(target) + ' ₽';
          if (oldPriceEl) oldPriceEl.textContent = old > target ? formatNumber(old) + ' ₽' : '';
        }
        requestAnimationFrame(step);
      } else {
        if (priceEl) priceEl.textContent = formatNumber(target) + ' ₽';
        if (oldPriceEl) oldPriceEl.textContent = old > target ? formatNumber(old) + ' ₽' : '';
      }
      var perMonth = Math.round(target / 12);
      if (installmentEl) {
        installmentEl.innerHTML = '<a href="delivery.html#payment" class="hover:text-terracotta">Рассрочка 0-0-12: <b>' +
          formatNumber(perMonth) + ' ₽/мес</b>, без первого взноса</a>';
      }
      var stickyPrice = $('#sticky-price');
      if (stickyPrice) stickyPrice.textContent = formatNumber(target) + ' ₽';
    }

    function makeChips(el, labels, active, onClick) {
      if (!el) return;
      el.innerHTML = '';
      labels.forEach(function (label, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip ' + (active === i ? 'chip-active' : 'chip-idle');
        b.textContent = label;
        b.setAttribute('aria-pressed', active === i ? 'true' : 'false');
        b.addEventListener('click', function () { onClick(i); });
        el.appendChild(b);
      });
    }

    makeChips(fabricChips, fabricOpts, 0, function (i) {
      state.fabric = i;
      makeChips(fabricChips, fabricOpts, i, arguments.callee);
      renderPrice(true);
    });

    makeChips(mechChips, mechOpts, mechOpts.length - 1, function (i) {
      state.mech = i;
      makeChips(mechChips, mechOpts, i, arguments.callee);
      renderPrice(false);
    });

    makeChips(sizeChips, sizeOpts.map(function (s) {
      return s.delta ? s.label + ' +' + formatNumber(s.delta) + ' ₽' : s.label;
    }), 0, function (i) {
      state.size = i;
      makeChips(sizeChips, sizeOpts.map(function (s) {
        return s.delta ? s.label + ' +' + formatNumber(s.delta) + ' ₽' : s.label;
      }), i, arguments.callee);
      renderPrice(true);
    });

    renderPrice(false);

    /* ---- характеристики и особенности ---- */
    var descList = $('#product-features');
    if (descList) {
      descList.innerHTML = (p.features || []).map(function (f) {
        return '<li class="flex items-start gap-2"><span class="included-icon" aria-hidden="true">✓</span><span>' + escapeHtml(f) + '</span></li>';
      }).join('');
    }

    var sizeTable = $('#product-size-table');
    if (sizeTable && p.sizes) {
      sizeTable.innerHTML = Object.keys(p.sizes).map(function (k) {
        return '<tr><td>' + escapeHtml(k) + '</td><td class="font-semibold">' + escapeHtml(p.sizes[k]) + '</td></tr>';
      }).join('');
    }

    var materialsTable = $('#product-materials-table');
    if (materialsTable && p.materials) {
      materialsTable.innerHTML = Object.keys(p.materials).map(function (k) {
        return '<tr><td>' + escapeHtml(k) + '</td><td>' + escapeHtml(p.materials[k]) + '</td></tr>';
      }).join('');
    }

    /* ---- «Что входит в цену» / обратный калькулятор ---- */
    var includedRows = $('#included-rows');
    if (includedRows) {
      var deliveryCost = p.deliveryIncluded ? 0 : 1500;
      var assemblyCost = p.assemblyIncluded ? 0 : 1000;
      var rows = [
        { label: 'Товар', value: formatNumber(totalPrice()) + ' ₽' },
        { label: 'Доставка по Москве (МКАД)', value: p.deliveryIncluded ? 'Включено' : formatNumber(deliveryCost) + ' ₽', ok: p.deliveryIncluded },
        { label: 'Подъём на этаж (лифт)', value: 'Включено', ok: true },
        { label: 'Сборка', value: p.assemblyIncluded ? 'В подарок' : formatNumber(assemblyCost) + ' ₽', ok: p.assemblyIncluded }
      ];
      includedRows.innerHTML = rows.map(function (r) {
        return '<div class="flex items-center justify-between gap-3 py-2 border-b border-line/60 last:border-0">' +
          '<span class="flex items-center gap-2.5"><span class="included-icon" aria-hidden="true">✓</span>' + escapeHtml(r.label) + '</span>' +
          '<span class="font-semibold ' + (r.ok ? 'text-olive' : 'text-ink') + '">' + escapeHtml(r.value) + '</span></div>';
      }).join('');
      var totalRow = $('#included-total');
      if (totalRow) {
        totalRow.innerHTML = '<span class="flex items-center gap-2.5"><span class="included-icon" aria-hidden="true">✓</span>Итого всё включено</span>' +
          '<span class="font-display text-lg font-semibold" data-price-total>' + formatNumber(totalPrice()) + ' ₽</span>';
      }
    }

    /* ---- кнопки и корзина ---- */
    var addBtn = $('#product-add');
    function afterAdd() {
      if (addBtn) {
        addBtn.textContent = '✓ В корзине';
        addBtn.classList.add('added');
        setTimeout(function () {
          addBtn.textContent = 'Добавить в корзину';
          addBtn.classList.remove('added');
        }, 2200);
      }
    }
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (!p.inStock) {
          var m = $('#modal-size');
          if (m) openModal('size');
          return;
        }
        addToCart(p.slug, 1, p.name);
        afterAdd();
      });
    }
    var stickyAdd = $('#sticky-add');
    if (stickyAdd) stickyAdd.addEventListener('click', function () {
      addToCart(p.slug, 1, p.name);
      afterAdd();
    });

    /* ---- похожие — с этим смотрят ---- */
    var relatedGrid = $('#related-grid');
    if (relatedGrid) {
      var sameCat = window.PRODUCTS.filter(function (x) {
        return x.slug !== p.slug && x.category.indexOf(p.category.split('/')[0]) === 0;
      });
      if (sameCat.length < 4) {
        window.PRODUCTS.forEach(function (x) {
          if (sameCat.length >= 4) return;
          if (x.slug !== p.slug && sameCat.indexOf(x) === -1) sameCat.push(x);
        });
      }
      sameCat.sort(function (a, b) { return a.price - b.price; });
      var related = sameCat.slice(0, 4);
      var container = document.createElement('div');
      container.className = 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6';
      related.forEach(function (rp) {
        var wrap = document.createElement('div');
        wrap.innerHTML = productCard(rp);
        container.appendChild(wrap.firstChild);
      });
      relatedGrid.appendChild(container);
    }

    /* ---- табы карточки ---- */
    var tabButtons = $$('#product-tabs [data-tab]');
    var tabPanels = $$('.product-tab-panel');
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-tab');
        tabButtons.forEach(function (b) {
          b.classList.toggle('tab-active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        tabPanels.forEach(function (panel) {
          panel.classList.toggle('hidden', panel.id !== 'tab-' + id);
        });
      });
    });

    /* ---- sticky-панель появляется при скролле (mobile) ---- */
    var stickyBar = $('#sticky-buy');
    if (stickyBar) {
      var seen = false;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        var show = y > 300;
        if (show !== seen) {
          seen = show;
          stickyBar.classList.toggle('sticky-buy-show', show);
        }
      }, { passive: true });
    }
  }

  /* ============================================================
     КОРЗИНА
     ============================================================ */
  function cartInit() {
    var root = $('#cart-app');
    if (!root) return;

    var emptyBox = $('#cart-empty');
    var fillBox = $('#cart-filled');
    var promo = { code: '', discount: 0 };

    function render() {
      var cart = C.getCart();
      if (!cart.length) {
        emptyBox.classList.remove('hidden');
        fillBox.classList.add('hidden');
        return;
      }
      emptyBox.classList.add('hidden');
      fillBox.classList.remove('hidden');

      var list = $('#cart-lines');
      list.innerHTML = '';
      var subtotal = 0;
      cart.forEach(function (it, i) {
        var p = C.getProduct(it.slug);
        if (!p) return;
        var lineTotal = p.price * (it.qty || 1);
        subtotal += lineTotal;
        var row = document.createElement('div');
        row.className = 'cart-line';
        row.innerHTML =
          '<a class="cart-line-img" href="product.html?id=' + encodeURIComponent(p.slug) + '">' +
          '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" loading="lazy"></a>' +
          '<div class="flex flex-col gap-1 min-w-0">' +
          '<a class="font-semibold leading-snug hover:text-terracotta" href="product.html?id=' + encodeURIComponent(p.slug) + '">' + escapeHtml(p.name) + '</a>' +
          '<span class="text-xs text-greige">' + formatNumber(p.price) + ' ₽ · всё включено</span>' +
          '<div class="flex items-center gap-2 mt-1">' +
          '<button type="button" class="qty-btn" data-dir="-1" data-i="' + i + '" aria-label="Уменьшить">−</button>' +
          '<span class="w-8 text-center font-semibold">' + (it.qty || 1) + '</span>' +
          '<button type="button" class="qty-btn" data-dir="1" data-i="' + i + '" aria-label="Увеличить">+</button>' +
          '</div></div>' +
          '<div class="flex flex-col items-end justify-between gap-2">' +
          '<span class="font-display font-semibold">' + formatNumber(lineTotal) + ' ₽</span>' +
          '<button type="button" class="text-sm text-greige underline decoration-dotted hover:text-terracotta" data-remove="' + i + '">Удалить</button>' +
          '</div>';
        list.appendChild(row);
      });

      var discount = promo.discount ? Math.round(subtotal * promo.discount) : 0;
      var delivery = subtotal - discount >= C.RATES.deliveryMkadIncludedFrom ? 0 : C.RATES.deliveryMkadFlat;
      var total = subtotal - discount + delivery;

      $('#cart-subtotal').textContent = formatNumber(subtotal) + ' ₽';
      var promoRow = $('#cart-promo-row');
      if (promoRow) {
        promoRow.classList.toggle('hidden', !promo.discount);
        if (promo.discount) $('#cart-promo-value').textContent = '−' + formatNumber(discount) + ' ₽';
      }
      $('#cart-delivery').textContent = delivery === 0 ? 'Включено' : formatNumber(delivery) + ' ₽';
      $('#cart-total').textContent = formatNumber(total) + ' ₽';

      var months = parseInt($('#cart-months').value, 10) || 12;
      $('#cart-monthly').textContent = formatNumber(total / months) + ' ₽/мес';
      $('#cart-monthly-note').textContent = 'при рассрочке на ' + months + ' мес. · 0-0 — без первого взноса и переплат';
      C.setCart(cart);
    }

    $('#cart-lines').addEventListener('click', function (e) {
      var cart = C.getCart();
      var btn = e.target.closest('[data-dir]');
      var rm = e.target.closest('[data-remove]');
      if (btn) {
        var i = parseInt(btn.getAttribute('data-i'), 10);
        cart[i].qty = (cart[i].qty || 1) + parseInt(btn.getAttribute('data-dir'), 10);
        if (cart[i].qty < 1) cart.splice(i, 1);
        C.setCart(cart);
        render();
      } else if (rm) {
        cart.splice(parseInt(rm.getAttribute('data-remove'), 10), 1);
        C.setCart(cart);
        render();
      } else {
        return;
      }
      e.preventDefault();
    });

    var promoBtn = $('#promo-apply');
    if (promoBtn) {
      promoBtn.addEventListener('click', function () {
        var input = $('#promo-input');
        var code = (input.value || '').trim().toUpperCase();
        var msg = $('#promo-msg');
        if (C.PROMOCODES[code]) {
          promo.code = code;
          promo.discount = C.PROMOCODES[code].discount;
          msg.textContent = C.PROMOCODES[code].label;
          msg.classList.remove('text-greige');
          msg.classList.add('text-olive');
        } else {
          promo.code = ''; promo.discount = 0;
          msg.textContent = 'Промокод не найден';
          msg.classList.add('text-greige');
          msg.classList.remove('text-olive');
        }
        render();
      });
    }

    var monthsSel = $('#cart-months');
    if (monthsSel) monthsSel.addEventListener('change', render);

    var checkoutBtn = $('#cart-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        checkoutBtn.textContent = '✓ Заявка оформлена! Перезвоним за 15 минут';
        checkoutBtn.disabled = true;
        setTimeout(function () {
          checkoutBtn.textContent = 'Оформить заказ';
          checkoutBtn.disabled = false;
        }, 3500);
      });
    }

    render();
  }

  /* ============================================================
     КАЛЬКУЛЯТОР ДОСТАВКИ
     ============================================================ */
  function deliveryInit() {
    var root = $('#delivery-calc');
    if (!root) return;

    var state = { product: 'divan-uglovoy-richards', zone: 'mkad', km: 10, floor: 3, lift: true, assembly: true };
    var els = {
      select: $('#calc-product'),
      zoneChips: $$('#calc-zone .chip'),
      kmWrap: $('#calc-km-wrap'),
      kmInput: $('#calc-km'),
      kmHint: $('#calc-km-hint'),
      floor: $('#calc-floor'),
      liftChips: $$('#calc-lift .chip'),
      assemblyChips: $$('#calc-assembly .chip'),
      anomaly: $('#calc-anomaly'),
      result: $('#calc-result'),
      deliveryLine: $('#calc-delivery-line'),
      liftLine: $('#calc-lift-line'),
      assemblyLine: $('#calc-assembly-line'),
      totalLine: $('#calc-total'),
      totalZero: $('#calc-total-zero')
    };

    function setChips(chips, activeIndex) {
      chips.forEach(function (c, i) {
        c.classList.toggle('chip-active', i === activeIndex);
        c.classList.toggle('chip-idle', i !== activeIndex);
      });
    }

    function chipIndex(chips) {
      for (var i = 0; i < chips.length; i++) if (chips[i].classList.contains('chip-active')) return i;
      return 0;
    }

    function bindChips(chips, stateKey, values) {
      chips.forEach(function (c, i) {
        c.addEventListener('click', function () {
          setChips(chips, i);
          state[stateKey] = values[i];
          if (stateKey === 'zone') els.kmWrap.classList.toggle('hidden', values[i] === 'mkad');
          calc();
        });
      });
    }

    els.productEl = els.select;
    if (els.select) {
      window.PRODUCTS.forEach(function (p) {
        var o = document.createElement('option');
        o.value = p.slug;
        o.textContent = p.name + ' — ' + formatNumber(p.price) + ' ₽';
        els.select.appendChild(o);
      });
      els.select.addEventListener('change', function () { state.product = els.select.value; calc(); });
    }

    bindChips(els.zoneChips, 'zone', ['mkad', 'beyond']);
    bindChips(els.liftChips, 'lift', [true, false]);
    bindChips(els.assemblyChips, 'assembly', [true, false]);

    if (els.kmInput) {
      els.kmInput.addEventListener('input', debounce(function () {
        var v = parseInt(els.kmInput.value, 10);
        if (isNaN(v) || v < 1 || v > 100) {
          els.kmInput.classList.add('field-error');
          if (els.kmHint) els.kmHint.classList.remove('hidden');
          state.km = 0;
        } else {
          els.kmInput.classList.remove('field-error');
          if (els.kmHint) els.kmHint.classList.add('hidden');
          state.km = v;
        }
        calc();
      }, 150));
    }

    if (els.floor) {
      els.floor.addEventListener('input', function () {
        var v = parseInt(els.floor.value, 10);
        state.floor = (isNaN(v) || v < 1) ? 1 : Math.min(v, 25);
      });
      els.floor.addEventListener('change', calc);
    }

    function calc() {
      var p = C.getProduct(state.product);
      if (!p) return;
      var amount = parseInt(p.price, 10);
      var R = C.RATES;
      var lines = [];
      var total = 0;

      /* доставка */
      if (state.zone === 'mkad') {
        if (amount >= R.deliveryMkadIncludedFrom) {
          lines.push({ label: 'Доставка по Москве (в пределах МКАД)', text: 'Включено бесплатно', ok: true, cost: 0 });
        } else {
          lines.push({ label: 'Доставка по Москве (до 15 000 ₽)', text: formatNumber(R.deliveryMkadFlat) + ' ₽', ok: false, cost: R.deliveryMkadFlat });
          total += R.deliveryMkadFlat;
        }
      } else {
        var kmCost = Math.max(1, state.km) * R.deliveryBeyondMkadPerKm;
        lines.push({ label: 'За МКАД · ' + Math.max(1, state.km) + ' км × 40 ₽', text: formatNumber(kmCost) + ' ₽', ok: false, cost: kmCost });
        total += kmCost;
        els.anomaly.classList.toggle('hidden', state.km <= R.deliveryBeyondAnomalyKm);
      }

      /* подъём */
      if (state.lift) {
        lines.push({ label: 'Подъём на этаж (лифт)', text: 'Включено', ok: true, cost: 0 });
      } else {
        var floorsCost = Math.max(0, state.floor - 1) * R.liftPerFloor;
        lines.push({
          label: 'Подъём без лифта · ' + Math.max(0, state.floor - 1) + ' эт. × 350 ₽',
          text: formatNumber(floorsCost) + ' ₽',
          ok: false,
          cost: floorsCost
        });
        total += floorsCost;
      }

      /* сборка */
      if (state.assembly) {
        if (p.assemblyIncluded) {
          lines.push({ label: 'Сборка', text: 'В подарок', ok: true, cost: 0 });
        } else {
          lines.push({ label: 'Сборка корпусной мебели', text: formatNumber(R.assemblyCorpusDemo) + ' ₽', ok: false, cost: R.assemblyCorpusDemo });
          total += R.assemblyCorpusDemo;
        }
      }

      /* рендер */
      els.deliveryLine.innerHTML = lines.filter(function (l) { return l.label.indexOf('Доставка') === 0 || l.label.indexOf('За МКАД') === 0 || l.label === 'Доставка по Москве (до 15 000 ₽)'; })
        .map(function (l) {
          return '<div class="flex justify-between gap-3 ' + (l.ok ? 'text-olive' : '') + '"><span>' + l.label + '</span><b>' + l.text + '</b></div>';
        }).join('');
      els.liftLine.innerHTML = lines.filter(function (l) { return l.label.indexOf('Подъём') === 0; })
        .map(function (l) {
          return '<div class="flex justify-between gap-3 ' + (l.ok ? 'text-olive' : '') + '"><span>' + l.label + '</span><b>' + l.text + '</b></div>';
        }).join('');
      els.assemblyLine.innerHTML = lines.filter(function (l) { return l.label.indexOf('Сборка') === 0; })
        .map(function (l) {
          return '<div class="flex justify-between gap-3 ' + (l.ok ? 'text-olive' : '') + '"><span>' + l.label + '</span><b>' + l.text + '</b></div>';
        }).join('');

      els.totalZero.classList.toggle('hidden', total !== 0);
      if (total === 0) {
        els.totalLine.innerHTML = '<div class="flex justify-between gap-3 text-olive font-semibold"><span>Доставка и подъём</span><b>Включено бесплатно</b></div>' +
          '<div class="flex justify-between gap-3 text-olive font-semibold"><span>Сборка</span><b>0 ₽ (в подарок)</b></div>' +
          '<div class="flex justify-between gap-3 text-lg font-display font-semibold mt-2 pt-3 border-t border-olive/30"><span>Итого</span><span>0 ₽ — всё включено</span></div>';
      } else {
        els.totalLine.innerHTML = '<div class="flex justify-between gap-3 font-display text-xl font-semibold mt-2 pt-3 border-t border-line"><span>Итого</span><span>' + formatNumber(total) + ' ₽</span></div>';
      }
      els.result.classList.remove('hidden');

      var prev = els.result.dataset.total;
      if (prev && prev !== String(total)) els.result.classList.add('calc-flash');
      setTimeout(function () { els.result.classList.remove('calc-flash'); }, 250);
      els.result.dataset.total = String(total);
    }

    calc();
  }

  /* ============================================================
     КОНТАКТЫ: статус открыто/закрыто
     ============================================================ */
  function contactsInit() {
    var el = $('#contacts-status');
    if (!el) return;
    var now = new Date();
    var h = now.getHours() + now.getMinutes() / 60;
    var open = h >= 9 && h < 20;
    var line = $('#contacts-status-line');
    var closedBlock = $('#contacts-closed');
    if (open) {
      el.innerHTML = '<span class="inline-flex w-3 h-3 rounded-full bg-olive"></span> Сейчас открыто — отвечаем сразу';
      if (line) line.classList.remove('text-greige');
    } else {
      el.innerHTML = '<span class="inline-flex w-3 h-3 rounded-full bg-greige"></span> Сейчас закрыто — откроемся в 9:00';
      if (closedBlock) closedBlock.classList.remove('hidden');
      if (line) line.classList.add('text-greige');
    }
  }

  /* ============================================================
     ФОРМЫ
     ============================================================ */
  function initForms() {
    /* Все формы с data-form: отправка → валидация → confirm-состояние */
    $$('form[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;

        $$('[required]', form).forEach(function (input) {
          clearInputError(input);
          var v = input.value.trim();
          if (input.type === 'tel' && !validPhone(v)) {
            setInputError(input, 'Введите номер в формате +7 (900) 000-00-00');
            ok = false;
          } else if (input.type === 'email' && v && v.indexOf('@') === -1) {
            setInputError(input, 'Проверьте адрес — например, info@creatmebel.ru');
            ok = false;
          } else if (input.tagName === 'TEXTAREA' && !v) {
            setInputError(input, 'Напишите вопрос — например, про сроки или размеры');
            ok = false;
          } else if (input.type !== 'checkbox' && !v) {
            setInputError(input, 'Заполните это поле');
            ok = false;
          }
        });

        var file = $('input[type="file"]', form);
        if (file && file.files && file.files[0] && file.files[0].size > 10 * 1024 * 1024) {
          var fh = file.closest('.field-wrap').querySelector('.field-hint');
          if (fh) { fh.textContent = 'Фото больше 10 МБ. Уменьшите или отправьте без него'; fh.classList.remove('hidden'); }
          ok = false;
        }

        if (!ok) return;

        var btn = $('[type="submit"]', form);
        var original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Отправляем…';

        setTimeout(function () {
          form.classList.add('hidden');
          var target = document.querySelector(form.getAttribute('data-form-success'));
          if (target) target.classList.remove('hidden');
          btn.disabled = false;
          btn.textContent = original;
          form.reset();
        }, 650);
      });
    });

    /* телефонные маски (лёгкая подсказка) */
    $$('input[type="tel"]').forEach(function (input) {
      input.addEventListener('input', function () { clearInputError(input); });
    });
  }

  /* ============================================================
     МОДАЛКИ (просчёт, звонок, 1 клик)
     ============================================================ */
  function initModals() {
    var modals = $$('.modal');
    function openModal(name) {
      var m = $('#modal-' + name);
      if (!m) return;
      m.classList.remove('modal-hidden');
      document.body.classList.add('overflow-hidden');
      var closeBtn = m.querySelector('[data-close]');
      if (closeBtn) closeBtn.focus();
    }
    function closeModal(name) {
      var m = $('#modal-' + name);
      if (!m) return;
      m.classList.add('modal-hidden');
      document.body.classList.remove('overflow-hidden');
    }
    window.CM.openModal = openModal;

    $$('[data-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openModal(btn.getAttribute('data-open-modal'));
      });
    });
    $$('.modal [data-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        closeModal(btn.closest('.modal').id.replace('modal-', ''));
      });
    });
    $$('.modal-backdrop').forEach(function (back) {
      back.addEventListener('click', function () {
        closeModal(back.closest('.modal').id.replace('modal-', ''));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $$('.modal').forEach(function (m) {
          if (!m.classList.contains('modal-hidden')) closeModal(m.id.replace('modal-', ''));
        });
      }
    });

    /* Тип мебели в просчёте */
    var typeWrap = $('#size-type-chips');
    if (typeWrap) {
      ['Шкаф', 'Гостиная', 'Прихожая', 'Спальня', 'Детская', 'Кухня', 'Другое'].forEach(function (t, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip chip-tiny ' + (i === 0 ? 'chip-active' : 'chip-idle');
        b.textContent = t;
        b.addEventListener('click', function () {
          $$('.chip', typeWrap).forEach(function (c) {
            c.classList.remove('chip-active'); c.classList.add('chip-idle');
          });
          b.classList.remove('chip-idle'); b.classList.add('chip-active');
        });
        typeWrap.appendChild(b);
      });
    }
  }

  /* ============================================================
     ШАПКА / НАВИГАЦИЯ
     ============================================================ */
  function initHeader() {
    var header = $('header.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('header-scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* бургер */
    var burger = $('#burger');
    var mobileMenu = $('#mobile-menu');
    var burgerClose = $('#mobile-menu-close');
    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        mobileMenu.classList.add('menu-open');
        document.body.classList.add('overflow-hidden');
      });
    }
    if (burgerClose && mobileMenu) {
      burgerClose.addEventListener('click', function () {
        mobileMenu.classList.remove('menu-open');
        document.body.classList.remove('overflow-hidden');
      });
    }
    mobileMenu && mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu || e.target.closest('[data-close-menu]')) {
        mobileMenu.classList.remove('menu-open');
        document.body.classList.remove('overflow-hidden');
      }
    });
    $$('a[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (mobileMenu) mobileMenu.classList.remove('menu-open');
        document.body.classList.remove('overflow-hidden');
        var m = $('.modal:not(.modal-hidden)');
        if (m) { m.classList.add('modal-hidden'); }
      });
    });

    /* mega-menu каталога (desktop) */
    var catalogBtn = $('#nav-catalog');
    var mega = $('#mega-menu');
    if (catalogBtn && mega) {
      catalogBtn.addEventListener('click', function (e) {
        e.preventDefault();
        mega.classList.toggle('mega-open');
      });
      document.addEventListener('click', function (e) {
        if (mega && !mega.contains(e.target) && !catalogBtn.contains(e.target)) {
          mega.classList.remove('mega-open');
        }
      });
    }
  }

  /* ============================================================
     АККОРДЕОНЫ (details) — кастомная анимация стрелки
     ============================================================ */
  function initAccordions() {
    $$('details.acc').forEach(function (d) {
      d.addEventListener('toggle', function () {
        d.classList.toggle('acc-open', d.open);
      });
    });
  }

  /* ============================================================
     ПРОСЧЁТ: выбор файла
     ============================================================ */
  function initFileInputs() {
    $$('input[type="file"]').forEach(function (input) {
      var label = input.closest('.field-wrap') && input.closest('.field-wrap').querySelector('.file-label');
      var name = input.closest('.field-wrap') && input.closest('.field-wrap').querySelector('.file-name');
      input.addEventListener('change', function () {
        var f = input.files && input.files[0];
        if (name && f) name.textContent = '✓ ' + f.name;
        else if (name) name.textContent = '';
      });
    });
  }

  /* ============================================================
     ИНИЦИАЛИЗАЦИЯ
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    updateBadges();
    initHeader();
    initModals();
    initForms();
    initAccordions();
    initFileInputs();
    renderHits();
    initHomeCategoryTiles();
    catalogInit();
    productInit();
    cartInit();
    deliveryInit();
    contactsInit();
  });
})();