/* ============================================================
   Креат Мебель v2.0 — данные прототипа
   Источник: content/products.json (15 реальных SKU)
   ============================================================ */
window.CM = window.CM || {};

/* Общие контакты и факты */
window.CM.CONTACTS = {
  phoneDisplay: '+7 (920) 622-51-95',
  phoneHref: 'tel:+79206225195',
  whatsapp: 'https://wa.me/79206225195',
  viber: 'viber://chat?number=79206225195',
  email: 'info@creatmebel.ru',
  vk: 'https://vk.com/creatmebel_ru',
  ok: 'https://ok.ru/creatmebel',
  city: 'Москва',
  schedule: '9:00–20:00, без выходных'
};

/* Тарифы (прототипные, ⚠️ уточняются у заказчика) */
window.CM.RATES = {
  deliveryMkadIncludedFrom: 15000,
  deliveryMkadFlat: 1500,
  deliveryBeyondMkadPerKm: 40,
  deliveryBeyondAnomalyKm: 50,
  liftPerFloor: 350,
  assemblyCorpusMin: 500,
  assemblyCorpusMax: 1500,
  assemblyCorpusDemo: 1000
};

/* Промокоды */
window.CM.PROMOCODES = { KB20: { discount: 0.05, label: '−5% по промокоду KB20' } };

window.PRODUCTS = [
  {
    "id": "sku-001",
    "slug": "divan-evroknizhka-oskar",
    "name": "Диван еврокнижка «Оскар»",
    "category": "Мягкая мебель / Диваны прямые",
    "oldPrice": null,
    "price": 46500,
    "badge": "Новинка",
    "shortDescription": "Компактный диван с механизмом еврокнижка для гостиной и кухни",
    "features": [
      "Пружинный блок независимых пружин",
      "Механизм еврокнижка",
      "Съемный чехол",
      "Гарантия 18 месяцев"
    ],
    "sizes": {
      "Ширина": "200 см", "Глубина": "90 см", "Высота": "85 см",
      "Высота сиденья": "42 см", "Спальное место": "140x200 см"
    },
    "materials": {
      "Каркас": "Береза", "Наполнитель": "ППУ + независимые пружины", "Ткань": "Рогожка"
    },
    "colorOptions": ["Серый", "Бежевый", "Оливковый"],
    "inStock": true, "productionDays": 5, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 3900,
    "image": "https://creatmebel.ru/assets/images/products/3037/oskar--1.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3037/oskar--1.jpg",
      "https://creatmebel.ru/assets/images/products/3037/oskar.jpg",
      "https://creatmebel.ru/assets/images/products/3037/oskar-.jpg",
      "https://creatmebel.ru/assets/images/products/3037/oskar--2.jpg"
    ]
  },
  {
    "id": "sku-002",
    "slug": "divan-akkordeon-space-2",
    "name": "Диван-аккордеон «Спейс-2»",
    "category": "Мягкая мебель / Диваны прямые",
    "oldPrice": 26000,
    "price": 23900,
    "badge": "−2 100 ₽",
    "shortDescription": "Легкий прямой диван с механизмом аккордеон для небольших гостиных и студий",
    "features": [
      "Механизм аккордеон",
      "ППУ повышенной плотности",
      "Чехол на липучках",
      "Гарантия 18 месяцев"
    ],
    "sizes": {
      "Ширина": "160 см", "Глубина": "85 см", "Высота": "80 см",
      "Высота сиденья": "40 см", "Спальное место": "145x200 см"
    },
    "materials": {
      "Каркас": "Фанера + брус", "Наполнитель": "ППУ EL2040", "Ткань": "Рогожка"
    },
    "colorOptions": ["Серый", "Синий", "Бежевый"],
    "inStock": true, "productionDays": 1, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 2000,
    "image": "https://creatmebel.ru/assets/images/products/3089/spejs-2.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3089/spejs-2.jpg",
      "https://creatmebel.ru/assets/images/products/3089/spejs-2-1.jpg",
      "https://creatmebel.ru/assets/images/products/3089/spejs-2-2.jpg",
      "https://creatmebel.ru/assets/images/products/3089/spejs-2-3.jpg",
      "https://creatmebel.ru/assets/images/products/3089/spejs-2-4.jpg"
    ]
  },
  {
    "id": "sku-003",
    "slug": "divan-uglovoy-richards",
    "name": "Диван угловой «Ричардс»",
    "category": "Мягкая мебель / Диваны угловые",
    "oldPrice": 50200,
    "price": 45200,
    "badge": "−5 000 ₽",
    "shortDescription": "Просторный угловой диван с ящиком для белья для семейной гостиной",
    "features": [
      "Независимые пружины",
      "Механизм еврокнижка",
      "Угловой элемент с ящиком для белья",
      "Съемные чехлы"
    ],
    "sizes": {
      "Ширина": "210 см", "Глубина": "150 см", "Высота": "90 см",
      "Высота сиденья": "44 см", "Спальное место": "150x200 см"
    },
    "materials": {
      "Каркас": "Береза + фанера", "Наполнитель": "ППУ + независимые пружины", "Ткань": "Велюр"
    },
    "colorOptions": ["Песочный", "Графит", "Изумруд"],
    "inStock": true, "productionDays": 7, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 3800,
    "image": "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-00.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-00.jpg",
      "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-0.jpg",
      "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-1.jpg",
      "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-2.jpg",
      "https://creatmebel.ru/assets/images/products/3968/richards-neo-azure-zerkalnyj-3.jpg"
    ]
  },
  {
    "id": "sku-004",
    "slug": "divan-uglovoy-lotter",
    "name": "Диван угловой «Лофтер»",
    "category": "Мягкая мебель / Диваны угловые",
    "oldPrice": null,
    "price": 45000,
    "badge": "Новинка",
    "shortDescription": "Угловой диван в стиле лофт с высокими подлокотниками и спальным местом 145x200",
    "features": [
      "Механизм еврокнижка + тахта",
      "Высокие подлокотники",
      "Ящик для белья",
      "Ткань с пропиткой от влаги"
    ],
    "sizes": {
      "Ширина": "230 см", "Глубина": "160 см", "Высота": "92 см",
      "Высота сиденья": "43 см", "Спальное место": "145x200 см"
    },
    "materials": {
      "Каркас": "Береза", "Наполнитель": "ППУ", "Ткань": "Микровелюр"
    },
    "colorOptions": ["Бежевый", "Коричневый", "Серо-голубой"],
    "inStock": false, "productionDays": 14, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 3800,
    "image": "https://creatmebel.ru/assets/images/products/3021/lofter.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3021/lofter.jpg",
      "https://creatmebel.ru/assets/images/products/3021/lofter-1.jpg",
      "https://creatmebel.ru/assets/images/products/3021/lofter-2.jpg",
      "https://creatmebel.ru/assets/images/products/3021/lofter-3.jpg",
      "https://creatmebel.ru/assets/images/products/3021/lofter-4.jpg"
    ]
  },
  {
    "id": "sku-005",
    "slug": "divan-detskiy-yulechka-100-5",
    "name": "Диван детский «Юлечка 100-5 МП»",
    "category": "Мягкая мебель / Диваны детские",
    "oldPrice": null,
    "price": 19000,
    "badge": "Хит",
    "shortDescription": "Компактный диванчик для детской комнаты с безопасными скругленными углами",
    "features": [
      "Механизм выкатной",
      "Ткань с водоотталкивающей пропиткой",
      "Скругленные углы",
      "Съемный чехол"
    ],
    "sizes": {
      "Ширина": "100 см", "Глубина": "78 см", "Высота": "68 см",
      "Высота сиденья": "35 см", "Спальное место": "70x170 см"
    },
    "materials": {
      "Каркас": "ЛДСП + фанера", "Наполнитель": "ППУ", "Ткань": "Рогожка"
    },
    "colorOptions": ["Розовый", "Сиреневый", "Голубой"],
    "inStock": true, "productionDays": 3, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 1600,
    "image": "https://creatmebel.ru/assets/images/products/2956/detskij-divan-yulechka-100-4-myagkij-podlokotnik.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/2956/detskij-divan-yulechka-100-4-myagkij-podlokotnik.jpg",
      "https://creatmebel.ru/assets/images/products/2956/detskij-divan-yulechka-100-4-mp-2.jpg",
      "https://creatmebel.ru/assets/images/products/2956/detskij-divan-yulechka-100-4-mp-3.jpg",
      "https://creatmebel.ru/assets/images/products/2956/detskij-divan-yulechka-100-4-mp-4.jpg"
    ]
  },
  {
    "id": "sku-006",
    "slug": "kreslo-solo",
    "name": "Кресло «Соло»",
    "category": "Мягкая мебель / Кресла и пуфики",
    "oldPrice": null,
    "price": 15900,
    "badge": "Хит",
    "shortDescription": "Компактное кресло с подлокотниками из массива — для чтения и отдыха",
    "features": [
      "Подлокотники из массива березы",
      "ППУ высокой плотности",
      "Съемный чехол",
      "Гарантия 18 месяцев"
    ],
    "sizes": {
      "Ширина": "75 см", "Глубина": "82 см", "Высота": "88 см", "Высота сиденья": "45 см"
    },
    "materials": {
      "Каркас": "Березовый брус", "Наполнитель": "ППУ 35 кг/м3", "Ткань": "Рогожка"
    },
    "colorOptions": ["Серый", "Бежевый", "Терракотовый"],
    "inStock": true, "productionDays": 1, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 1300,
    "image": "https://creatmebel.ru/assets/images/products/2994/grej-.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/2994/grej-.jpg",
      "https://creatmebel.ru/assets/images/products/2996/screenshot-1.jpg",
      "https://creatmebel.ru/assets/images/products/3003/-729-ronald-729-official.jpg"
    ]
  },
  {
    "id": "sku-007",
    "slug": "shkaf-kupe-premium-3",
    "name": "Шкаф-купе «Премиум-3»",
    "category": "Корпусная мебель / Шкафы-купе",
    "oldPrice": null,
    "price": 57300,
    "badge": "Хит",
    "shortDescription": "Вместительный шкаф-купе на 3 секции с зеркальной дверью и доводчиками",
    "features": [
      "Раздвижная система с доводчиками",
      "3 секции: полки, штанга, ящики",
      "Зеркало на фасаде",
      "Фурнитура с гарантией 18 месяцев"
    ],
    "sizes": { "Ширина": "240 см", "Глубина": "60 см", "Высота": "240 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "ЛДСП + зеркало",
      "Наполнение": "полки, штанга, ящики"
    },
    "colorOptions": ["Дуб сонома", "Венге", "Белый"],
    "inStock": false, "productionDays": 14, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 4800,
    "image": "https://creatmebel.ru/assets/images/products/2003/shkaf-kupe-premium-1.1jpg.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/2003/shkaf-kupe-premium-1.1jpg.jpg",
      "https://creatmebel.ru/assets/images/products/2003/shkaf-kupe-premium-1.jpg"
    ]
  },
  {
    "id": "sku-008",
    "slug": "shkaf-kupe-trend-m",
    "name": "Шкаф-купе «Тренд-М»",
    "category": "Корпусная мебель / Шкафы-купе",
    "oldPrice": null,
    "price": 47200,
    "badge": "Новинка",
    "shortDescription": "Компактный шкаф-купе для спальни и прихожей, делаем по вашим размерам",
    "features": [
      "2 секции с комбинированным наполнением",
      "Трековые направляющие",
      "Делаем по вашим размерам",
      "Кромка ПВХ 2 мм"
    ],
    "sizes": { "Ширина": "180 см", "Глубина": "60 см", "Высота": "240 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "ЛДСП / МДФ",
      "Наполнение": "полки, штанга, ящики-сетки"
    },
    "colorOptions": ["Графит + белый", "Дуб сонома", "Дуб каньон"],
    "inStock": false, "productionDays": 21, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 3900,
    "image": "https://creatmebel.ru/assets/images/products/2872/shkaf-kupe-trend-13-2-x-dvernyj.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/2872/shkaf-kupe-trend-13-2-x-dvernyj.jpg",
      "https://creatmebel.ru/assets/images/products/2872/shkaf-kupe-trend-15-2-x-dvernyj.jpg",
      "https://creatmebel.ru/assets/images/products/2872/shkaf-kupe-trend-vishnevyj-glyanecz-2-x-dvernyj.jpg",
      "https://creatmebel.ru/assets/images/products/2872/shkaf-kupe-trend-laguna-metallik-2-x-dvernyj.jpg"
    ]
  },
  {
    "id": "sku-009",
    "slug": "komod-street-3",
    "name": "Комод «Стрит-3»",
    "category": "Корпусная мебель / Гостиная",
    "oldPrice": 34200,
    "price": 30400,
    "badge": "−3 800 ₽",
    "shortDescription": "Комод на 3 ящика с доводчиками — для гостиной, спальни или прихожей",
    "features": [
      "3 ящика полного выдвижения",
      "Доводчики",
      "Столешница под декор",
      "Кромка ПВХ 2 мм"
    ],
    "sizes": { "Ширина": "120 см", "Глубина": "45 см", "Высота": "80 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "МДФ",
      "Фурнитура": "направляющие полного выдвижения"
    },
    "colorOptions": ["Дуб сонома", "Белый", "Венге"],
    "inStock": true, "productionDays": 5, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 2500,
    "image": "https://creatmebel.ru/assets/images/products/3177/strit-3sl.jpeg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3177/strit-3sl.jpeg"
    ]
  },
  {
    "id": "sku-010",
    "slug": "tumba-pod-tv-solo",
    "name": "Тумба под ТВ «Соло»",
    "category": "Корпусная мебель / Гостиная",
    "oldPrice": null,
    "price": 14700,
    "badge": "Новинка",
    "shortDescription": "Компактная ТВ-тумба с двумя ящиками и открытой нишей под технику",
    "features": [
      "2 ящика с доводчиками",
      "Открытая ниша под консоль и приставку",
      "Кабель-канал",
      "Нескользящие опоры"
    ],
    "sizes": { "Ширина": "140 см", "Глубина": "40 см", "Высота": "50 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "ЛДСП",
      "Столешница": "ЛДСП с кромкой ПВХ"
    },
    "colorOptions": ["Дуб сонома", "Венге", "Серый графит"],
    "inStock": true, "productionDays": 3, "deliveryIncluded": false, "assemblyIncluded": false,
    "installmentFrom": 1200,
    "image": "https://creatmebel.ru/assets/images/products/1753/tumba-tv-1-1.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/1753/tumba-tv-1-1.jpg",
      "https://creatmebel.ru/assets/images/products/1754/tumba-tv-2-1.jpg",
      "https://creatmebel.ru/assets/images/products/1755/tumba-tv-3-1.jpg"
    ]
  },
  {
    "id": "sku-011",
    "slug": "prihozhaya-malevich-5",
    "name": "Прихожая «Малевич-5»",
    "category": "Корпусная мебель / Прихожая",
    "oldPrice": null,
    "price": 31500,
    "badge": "Хит",
    "shortDescription": "Модульная прихожая: шкаф, тумба, зеркало и открытая ниша под обувь",
    "features": [
      "Модульная система из 4 элементов",
      "Зеркало в раме",
      "Открытая ниша под обувь",
      "Штанга и полки в шкафу"
    ],
    "sizes": { "Ширина": "210 см", "Глубина": "40 см", "Высота": "220 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "МДФ", "Зеркало": "серебро, 4 мм"
    },
    "colorOptions": ["Дуб сонома", "Венге", "Белый"],
    "inStock": true, "productionDays": 7, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 2600,
    "image": "https://creatmebel.ru/assets/images/products/4395/prixozhaya-malevich-5-2.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/4395/prixozhaya-malevich-5-2.jpg",
      "https://creatmebel.ru/assets/images/products/4395/prixozhaya-malevich-5.jpg",
      "https://creatmebel.ru/assets/images/products/4395/prixozhaya-malevich-5-1.jpg"
    ]
  },
  {
    "id": "sku-012",
    "slug": "krovat-trento-1",
    "name": "Кровать «Тренто-1»",
    "category": "Корпусная мебель / Спальня",
    "oldPrice": null,
    "price": 31700,
    "badge": "Новинка",
    "shortDescription": "Кровать 160x200 с мягким изголовьем и ортопедическим основанием",
    "features": [
      "Мягкое изголовье с тканевой обивкой",
      "Ортопедическое основание с ламелями",
      "Вместительный короб",
      "Матрас приобретается отдельно"
    ],
    "sizes": {
      "Ширина": "170 см", "Глубина": "212 см", "Высота": "100 см",
      "Спальное место": "160x200 см"
    },
    "materials": {
      "Каркас": "ЛДСП 16 мм", "Изголовье": "МДФ + ткань", "Основание": "ламели береза"
    },
    "colorOptions": ["Серая обивка", "Бежевая обивка", "Темно-синяя обивка"],
    "inStock": true, "productionDays": 5, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 2600,
    "image": "https://creatmebel.ru/assets/images/products/3981/trento-13.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/3981/trento-13.jpg",
      "https://creatmebel.ru/assets/images/products/3981/trento-12.jpg",
      "https://creatmebel.ru/assets/images/products/3981/trento-14.jpg",
      "https://creatmebel.ru/assets/images/products/3981/trento-15.jpg",
      "https://creatmebel.ru/assets/images/products/3981/trento-11.jpg"
    ]
  },
  {
    "id": "sku-013",
    "slug": "krovat-fokus",
    "name": "Кровать «Фокус»",
    "category": "Корпусная мебель / Спальня",
    "oldPrice": 32100,
    "price": 29100,
    "badge": "−3 000 ₽",
    "shortDescription": "Кровать 160x200 с мягким изголовьем в современном стиле, без матраса",
    "features": [
      "Мягкое изголовье",
      "Ортопедическое основание",
      "Ножки из массива",
      "Короб для хранения"
    ],
    "sizes": {
      "Ширина": "170 см", "Глубина": "212 см", "Высота": "95 см",
      "Спальное место": "160x200 см"
    },
    "materials": {
      "Каркас": "ЛДСП 16 мм", "Изголовье": "МДФ + экокожа", "Основание": "ламели береза"
    },
    "colorOptions": ["Белая обивка", "Серый графит", "Капучино"],
    "inStock": true, "productionDays": 3, "deliveryIncluded": true, "assemblyIncluded": true,
    "installmentFrom": 2400,
    "image": "https://creatmebel.ru/assets/images/products/4382/krovat-focus-yasen-shimo-svetlyj.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/4382/krovat-focus-yasen-shimo-svetlyj.jpg",
      "https://creatmebel.ru/assets/images/products/4382/krasnyj-chili.jpg",
      "https://creatmebel.ru/assets/images/products/4382/krovat-fokus-severnoe-derevo-svetloe.jpg",
      "https://creatmebel.ru/assets/images/products/4382/krovat-fokus-sosna-kremovaya.jpg"
    ]
  },
  {
    "id": "sku-014",
    "slug": "obedennaya-gruppa-nord",
    "name": "Обеденная группа «Норд»",
    "category": "Корпусная мебель / Кухня",
    "oldPrice": null,
    "price": 37900,
    "badge": "Новинка",
    "shortDescription": "Стол со складными ножками и 4 стула — готовое решение для кухни и столовой",
    "features": [
      "Стол + 4 стула в комплекте",
      "Столешница с влагостойкой кромкой",
      "Металлический каркас стульев",
      "Собирается за 20 минут"
    ],
    "sizes": {
      "Стол": "120x80x75 см", "Стул": "45x52x90 см", "Высота сиденья": "45 см"
    },
    "materials": {
      "Столешница": "ЛДСП 25 мм", "Каркас стульев": "металл, порошковая окраска",
      "Сиденье": "ЛДСП + экокожа"
    },
    "colorOptions": ["Дуб сонома + черный", "Белый + бежевый", "Графит"],
    "inStock": false, "productionDays": 14, "deliveryIncluded": true, "assemblyIncluded": false,
    "installmentFrom": 3200,
    "image": "https://creatmebel.ru/assets/images/products/1251/obedennaya-gruppa.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/1251/obedennaya-gruppa.jpg"
    ]
  },
  {
    "id": "sku-015",
    "slug": "komod-detskiy-klass-det",
    "name": "Комод детский «Класс-Дет»",
    "category": "Корпусная мебель / Детская",
    "oldPrice": null,
    "price": 12400,
    "badge": "Хит",
    "shortDescription": "Безопасный детский комод на 2 ящика со скругленными углами и доводчиками",
    "features": [
      "Скругленные углы",
      "Доводчики",
      "Влагостойкая пленка",
      "Крепление к стене в комплекте"
    ],
    "sizes": { "Ширина": "80 см", "Глубина": "45 см", "Высота": "90 см" },
    "materials": {
      "Корпус": "ЛДСП 16 мм, класс E1", "Фасады": "ЛДСП с цветной пленкой",
      "Фурнитура": "направляющие с доводчиками"
    },
    "colorOptions": ["Белый", "Белый + розовый", "Белый + голубой"],
    "inStock": true, "productionDays": 1, "deliveryIncluded": false, "assemblyIncluded": false,
    "installmentFrom": 1000,
    "image": "https://creatmebel.ru/assets/images/products/1923/detskij-komod-arka.jpg",
    "images": [
      "https://creatmebel.ru/assets/images/products/1923/detskij-komod-arka.jpg",
      "https://creatmebel.ru/assets/images/products/1924/komod-briz.jpg",
      "https://creatmebel.ru/assets/images/products/1925/komod-korvet.jpg"
    ]
  }
];

/* Галерея: используем реальные фото из YML или fallback */
window.CM.PLACEHOLDER = 'assets/img/placeholder.svg';

window.CM.gallery = function (slug) {
  var p = window.CM.getProduct(slug);
  if (p && p.images && p.images.length > 0) return p.images;
  if (p && p.image) return [p.image];
  return [window.CM.PLACEHOLDER];
};

window.CM.imgError = function (el) {
  el.onerror = null;
  el.src = window.CM.PLACEHOLDER;
  el.alt = 'Фото скоро появится';
};

window.CM.getProduct = function (slug) {
  if (!slug) return null;
  var p = window.PRODUCTS.find(function (x) { return x.slug === slug; });
  if (p) return p;
  var s = String(slug).toLowerCase().trim();
  p = window.PRODUCTS.find(function (x) {
    return x.id === s
      || String(x.name).toLowerCase().indexOf(s) !== -1
      || String(x.slug).toLowerCase().indexOf(s) !== -1;
  });
  return p || null;
};

/* Корзина (demo state в localStorage) */
window.CM.CART_KEY = 'cm_cart_v2';
window.CM.getCart = function () {
  try { return JSON.parse(localStorage.getItem(window.CM.CART_KEY)) || []; }
  catch (e) { return []; }
};
window.CM.setCart = function (cart) {
  localStorage.setItem(window.CM.CART_KEY, JSON.stringify(cart));
  window.CM.updateBadges();
};
window.CM.cartCount = function () {
  return window.CM.getCart().reduce(function (s, it) { return s + (it.qty || 1); }, 0);
};

/* Форматирование цены: 45 200 ₽ */
window.CM.fmt = function (n) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';
};