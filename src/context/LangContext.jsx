import { createContext, useContext, useState } from 'react';

const dict = {
  en: {
    orderOnline: 'Order Online',
    cash: 'Cash on delivery / pickup only — online payment coming soon.',
    tagline: 'Bakery & Cake Boutique',
    modernTaste: 'Modern Taste.',
    story: 'Since 2018, we’ve crafted pastry and cake for Riyadh’s finest cafés, restaurants, and hotels. Now, for the first time, House of Novéls opens its doors directly to you.',
    signatures: 'A Few Signatures',
    addToCart: 'Add',
    soldOut: 'Sold Out',
    comingSoon: 'Coming Soon',
    cart: 'Cart',
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty.',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    total: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    remove: 'Remove',
    fulfillment: 'Fulfillment',
    pickup: 'Pickup',
    delivery: 'Delivery',
    yourName: 'Your Name',
    phone: 'Phone Number',
    address: 'Delivery Address',
    date: 'Date',
    time: 'Time',
    paymentMethod: 'Payment Method',
    cashOnFulfillment: 'Cash on Delivery / Pickup',
    payOnlineComingSoon: 'Pay Online — Coming Soon',
    placeOrder: 'Place Order',
    placingOrder: 'Placing Order…',
    orderPlaced: 'Order Placed',
    orderThanks: 'Thank you — your order has been received. We’ll be in touch to confirm.',
    orderNumber: 'Order Number',
    backHome: 'Back to Home',
    arPending: 'Arabic product names pending from client — shown in English for now.',
  },
  ar: {
    orderOnline: 'اطلب أونلاين',
    cash: 'الدفع نقدًا عند الاستلام أو التوصيل فقط — الدفع الإلكتروني قريبًا.',
    tagline: 'بوتيك مخبوزات وكيك',
    modernTaste: 'ذوق عصري.',
    story: 'منذ عام 2018، نصنع المخبوزات والكيك لأرقى المقاهي والمطاعم والفنادق في الرياض. اليوم، ولأول مرة، يفتح "هاوس أوف نوفيلز" أبوابه مباشرة لك.',
    signatures: 'مقتطفات مميزة',
    addToCart: 'إضافة',
    soldOut: 'نفدت الكمية',
    comingSoon: 'قريبًا',
    cart: 'السلة',
    yourCart: 'سلتك',
    emptyCart: 'سلتك فارغة.',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'رسوم التوصيل',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    continueShopping: 'متابعة التسوق',
    remove: 'إزالة',
    fulfillment: 'طريقة الاستلام',
    pickup: 'استلام من المتجر',
    delivery: 'توصيل',
    yourName: 'الاسم',
    phone: 'رقم الجوال',
    address: 'عنوان التوصيل',
    date: 'التاريخ',
    time: 'الوقت',
    paymentMethod: 'طريقة الدفع',
    cashOnFulfillment: 'الدفع نقدًا عند الاستلام / التوصيل',
    payOnlineComingSoon: 'الدفع الإلكتروني — قريبًا',
    placeOrder: 'إرسال الطلب',
    placingOrder: 'جارٍ إرسال الطلب…',
    orderPlaced: 'تم استلام الطلب',
    orderThanks: 'شكرًا لك — تم استلام طلبك. سنتواصل معك للتأكيد.',
    orderNumber: 'رقم الطلب',
    backHome: 'العودة للرئيسية',
    arPending: 'أسماء المنتجات بالعربية قيد الانتظار من العميل — تُعرض بالإنجليزية حاليًا.',
  },
};

export const categoryNames = {
  desserts: { en: 'Desserts', ar: 'حلويات' },
  'signature-cakes': { en: 'Signature Cakes', ar: 'كيك مميز' },
  bakery: { en: 'Bakery', ar: 'مخبوزات' },
  coffee: { en: 'Coffee', ar: 'قهوة' },
  healthy: { en: 'Healthy Cake and Bread', ar: 'كيك وخبز صحي' },
  catering: { en: 'Events Catering', ar: 'تقديم الفعاليات' },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => dict[lang][key] || key;
  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));
  return (
    <LangContext.Provider value={{ lang, t, toggle, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
