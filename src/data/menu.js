// Menu data.
// Cake, Bakery, Coffee = real content, transcribed from the official brand kit's
// CMYK/menu/menu.ai (verified via pdftotext against House_of_Novels_Plan.md).
// Healthy Cake and Bread, Events Catering = NO real content exists in the brand kit.
// These are clearly-labeled placeholders only, per instruction, until the client
// provides real items. Do not present these as real menu items anywhere in the UI.

export const categories = [
  {
    slug: 'desserts',
    name: 'Desserts',
    background: 'var(--olive)',
    ink: 'var(--off-white)',
    isPlaceholder: false,
    items: [
      { name: 'Brûlée Pineapple', nameAr: 'أناناس بروليه', price: 18, desc: 'Lime crema, passionfruit sauce, raspberry, mint, shortbread cookie crumble', descAr: 'كريما الليمون، صوص باشن فروت، رازبري، نعناع، كرامبل بسكويت الزبدة' },
      { name: 'Chocolate Lava Cake', nameAr: 'تشوكلت لافا كيك', price: 19, desc: 'Spiced lava cake, whipped mascarpone, raspberry coulis, berries', descAr: 'ماسكاربوني مخفوق، صوص الرازبري، توت مشكل' },
      { name: 'Pistachio & Rose Tart', nameAr: 'بستاشيو آند روز تارت', price: 18, desc: 'Pistachio cream, rose mousse, fresh berries, almond crumble', descAr: 'كريمة البستاشيو، موس الورد، توت مشكل طازج، كرامبل اللوز' },
      { name: 'Vanilla Bean Pavlova', nameAr: 'فانيلا بين بافلوفا', price: 17, desc: 'Vanilla cream, seasonal berries, passionfruit curd, meringue', descAr: 'كريمة الفانيلا، تشكيلة توت موسمي، صوص الباشن فروت، قطع الميرينغ' },
    ],
  },
  {
    slug: 'signature-cakes',
    name: 'Signature Cakes',
    background: 'var(--olive)',
    ink: 'var(--off-white)',
    isPlaceholder: false,
    note: 'The "Cinnamon Roll" item is intentionally excluded here — it appears in the source menu.ai under both Bakery and Signature Cakes, which looks like a client-side duplication error; it is kept only under Bakery. Flag to the client before launch.',
    items: [
      { name: 'Pistachio & Raspberry', nameAr: 'بستاشيو آند رازبري', price: 24, desc: 'Pistachio sponge, raspberry compote, vanilla cream', descAr: 'سبونج البستاشيو، رازبري كومبوت، كريمة الفانيلا' },
      { name: 'Dark Chocolate', nameAr: 'دارك تشوكلت', price: 25, desc: 'Chocolate sponge, dark chocolate ganache, cocoa crumble', descAr: 'سبونج الشوكولاتة، غاناش دارك تشوكلت، كاكاو كرامبل' },
      { name: 'Vanilla & Berries', nameAr: 'فانيلا آند بيريز', price: 23, desc: 'Vanilla sponge, mascarpone cream, seasonal berries', descAr: 'سبونج الفانيلا، كريمة الماسكاربوني، تشكيلة توت موسمي' },
      { name: 'Lemon & Meringue', nameAr: 'ليمون آند ميرينغ', price: 22, desc: 'Lemon curd, vanilla cream, toasted Italian meringue', descAr: 'كِرد ليمون، كريمة الفانيلا، ميرينغ إيطالي مكرمل' },
    ],
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    background: 'var(--peach)',
    ink: 'var(--navy-rich)',
    isPlaceholder: false,
    items: [
      { name: 'Butter Croissant', nameAr: 'بتر كرواسون', price: 12, desc: 'Classic French-style laminated pastry, cultured butter', descAr: 'عجين الكرواسون المورق على الطريقة الفرنسية الكلاسيكية، بالزبدة الطبيعية' },
      { name: 'Almond Croissant', nameAr: 'كرواسون اللوز', price: 15, desc: 'Almond cream, toasted almonds, powdered sugar', descAr: 'كريمة اللوز، لوز محمص مقرمش، سكر ناعم' },
      { name: 'Pain au Chocolat', nameAr: 'كرواسون الشوكولاتة', price: 14, desc: 'Laminated pastry, dark chocolate', descAr: 'طبقات عجين مورقة، شوكولاتة داكنة' },
      { name: 'Pistachio Danish', nameAr: 'بستاشيو دانيش', price: 16, desc: 'Pistachio cream, flaky pastry, roasted pistachios', descAr: 'كريمة البستاشيو، طبقات عجين هشة، فستق محمص مقرمش' },
      { name: 'Cinnamon Roll', nameAr: 'سينامون رول', price: 14, desc: 'Spiced cinnamon filling, vanilla glaze', descAr: 'حشوة القرفة الغنية، فانيلا جليز' },
    ],
  },
  {
    slug: 'coffee',
    name: 'Coffee',
    background: 'var(--baby-blue)',
    ink: 'var(--navy-rich)',
    isPlaceholder: false,
    items: [
      { name: 'Espresso', nameAr: 'إسبريسو', price: 8, desc: 'Single origin, freshly ground' },
      { name: 'Americano', nameAr: 'أمريكانو', price: 10, desc: 'Espresso, hot water' },
      { name: 'Cappuccino', nameAr: 'كابتشينو', price: 12, desc: 'Espresso, steamed milk, delicate foam' },
      { name: 'Caffè Latte', nameAr: 'لاتيه', price: 13, desc: 'Espresso, silky steamed milk' },
      { name: 'Flat White', nameAr: 'فلات وايت', price: 13, desc: 'Double espresso, velvety microfoam' },
    ],
  },
  {
    slug: 'healthy',
    name: 'Healthy Cake and Bread',
    background: 'var(--baby-blue)',
    ink: 'var(--navy-rich)',
    accent: 'var(--orange)',
    isPlaceholder: true,
    note: 'No real menu content exists for this category in the brand kit. Items below are placeholders only — replace with real client content before launch.',
    items: [
      { name: 'Placeholder Item 1', price: null, desc: 'Real item pending from client', placeholder: true },
      { name: 'Placeholder Item 2', price: null, desc: 'Real item pending from client', placeholder: true },
      { name: 'Placeholder Item 3', price: null, desc: 'Real item pending from client', placeholder: true },
    ],
  },
  {
    slug: 'catering',
    name: 'Events Catering',
    background: 'var(--navy-deep)',
    ink: 'var(--off-white)',
    isPlaceholder: true,
    note: 'No real menu content exists for this category in the brand kit. Items below are placeholders only — replace with real client content before launch.',
    catering: { minGuests: 20, minSAR: 500, noticeHours: 48, placeholder: true },
    items: [
      { name: 'Placeholder Item 1', price: null, desc: 'Real item pending from client', placeholder: true },
      { name: 'Placeholder Item 2', price: null, desc: 'Real item pending from client', placeholder: true },
      { name: 'Placeholder Item 3', price: null, desc: 'Real item pending from client', placeholder: true },
    ],
  },
];
