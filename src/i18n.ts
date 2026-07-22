import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation dictionaries
const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        shop: 'Shop',
        bag: 'Bag',
        login: 'Login',
        logout: 'Logout',
        signIn: 'Sign In',
        signUp: 'Sign Up',
      },
      home: {
        welcome: 'Welcome to SweetDelights',
        subtitle: 'Fresh homemade sweets & savory snacks delivered to your door.',
        exploreBtn: 'Explore Selection',
        badge: 'Homemade • Organic • Delicious',
        heroHeading1: 'Sweets crafted',
        heroHeading2: 'with heart. 🍬',
        heroSubtitle: 'Every bite tells a story of tradition, love, and the finest organic ingredients — delivered fresh to your door.',
        shopNow: 'Shop Now',
        joinFree: 'Join Free',
        welcomeBack: 'Welcome back,',
        happyCustomers: 'happy customers',
        handpicked: 'Handpicked for you',
        featuredSweets: 'Featured Sweets',
        viewAll: 'View all',
        addToBag: 'Add',
        memberOffer: 'Members get 10% off every order 🎉',
        memberOfferSub: 'Sign up free — no password, just your email.',
        signUpFree: 'Sign Up Free',
        customersSay: 'What our customers say',
        perks: {
          freeDelivery: 'Free Delivery',
          freeDeliveryBody: 'On all orders over $30. Same-day dispatch available.',
          organic: '100% Organic',
          organicBody: 'Only premium, ethically-sourced organic ingredients.',
          madeToOrder: 'Made to Order',
          madeToOrderBody: 'Every batch is freshly prepared — never mass-produced.',
          madeWithLove: 'Made with Love',
          madeWithLoveBody: 'Crafted in small batches by our team of passionate bakers.',
        },
      },
      shop: {
        title: 'Our Homemade Selection',
        subtitle: 'Baked in small batches using premium organic ingredients.',
        addToBag: 'Add to Bag',
        searchPlaceholder: 'Search sweets and snacks...',
        categories: {
          all: 'All',
          sweet: 'Sweets',
          savory: 'Savory Snacks',
        },
        reviews: 'reviews',
      },
      cart: {
        yourBag: 'Your Bag',
        emptyBag: 'Your bag is empty',
        total: 'Total',
        proceedToCheckout: 'Proceed to Checkout',
        clearBag: 'Clear bag',
        remove: 'Remove',
      },
      checkout: {
        title: 'Checkout',
        emptyBag: 'Your bag is empty.',
        continueShopping: 'Continue Shopping',
        deliveryDetails: 'Delivery Details',
        orderSummary: 'Order Summary',
        total: 'Total',
        placingOrder: 'Placing Order…',
        placeOrder: 'Place Order',
        fields: {
          fullName: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          addressLine1: 'Address Line 1',
          addressLine2: 'Address Line 2 (optional)',
          city: 'City',
          postcode: 'Postcode / ZIP',
          country: 'Country',
          notes: 'Order Notes (optional)',
        },
        paymentMethod: 'Payment Method',
        paymentMethods: {
          upi: 'UPI / QR Code',
          card: 'Credit / Debit Card',
          cod: 'Cash on Delivery (COD)'
        }
      },
      orderSuccess: {
        title: 'Order Almost Complete! 🎉',
        subtitle: 'To confirm your order, please send us a quick message on WhatsApp.',
        whatsappBtn: 'Confirm via WhatsApp',
        orderNumber: 'Order',
        details: 'You will be redirected to WhatsApp with your order details pre-filled.'
      }
    },
  },
  kn: {
    translation: {
      navbar: {
        home: 'ಮುಖಪುಟ',
        shop: 'ಅಂಗಡಿ',
        bag: 'ಬ್ಯಾಗ್',
        login: 'ಲಾಗಿನ್',
        logout: 'ನಿರ್ಗಮನ',
        signIn: 'ಸೈನ್ ಇನ್',
        signUp: 'ಸೈನ್ ಅಪ್',
      },
      home: {
        welcome: 'ಸ್ವೀಟ್‌ಡಿಲೈಟ್ಸ್‌ಗೆ ಸುಸ್ವಾಗತ',
        subtitle: 'ತಾಜಾ ಮನೆಮಾಡಿದ ಸಿಹಿ ಮತ್ತು ಸವಿಯಾದ ತಿಂಡಿಗಳು ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ.',
        exploreBtn: 'ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ',
        badge: 'ಮನೆಮಾಡಿದ • ಸಾವಯವ • ರುಚಿಕರ',
        heroHeading1: 'ಮನಸ್ಸಿನಿಂದ ತಯಾರಿಸಿದ',
        heroHeading2: 'ಸಿಹಿ ತಿಂಡಿಗಳು 🍬',
        heroSubtitle: 'ಪ್ರತಿಯೊಂದು ತಿಂಡಿಯಲ್ಲೂ ಸಂಪ್ರದಾಯ, ಪ್ರೀತಿ ಮತ್ತು ಶ್ರೇಷ್ಠ ಸಾವಯವ ಪದಾರ್ಥಗಳ ಕಥೆ ಇದೆ — ತಾಜಾವಾಗಿ ನಿಮ್ಮ ಮನೆಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',
        shopNow: 'ಈಗ ಖರೀದಿಸಿ',
        joinFree: 'ಉಚಿತವಾಗಿ ಸೇರಿ',
        welcomeBack: 'ಮರಳಿ ಬನ್ನಿ,',
        happyCustomers: 'ಸಂತೃಪ್ತ ಗ್ರಾಹಕರು',
        handpicked: 'ನಿಮಗಾಗಿ ಆರಿಸಲಾಗಿದೆ',
        featuredSweets: 'ವಿಶೇಷ ಸಿಹಿ ತಿಂಡಿಗಳು',
        viewAll: 'ಎಲ್ಲ ನೋಡಿ',
        addToBag: 'ಸೇರಿಸಿ',
        memberOffer: 'ಸದಸ್ಯರಿಗೆ ಪ್ರತಿ ಆರ್ಡರ್‌ನಲ್ಲಿ 10% ರಿಯಾಯಿತಿ 🎉',
        memberOfferSub: 'ಉಚಿತ ಸೈನ್ ಅಪ್ — ಕೇವಲ ನಿಮ್ಮ ಇಮೇಲ್ ಮಾತ್ರ.',
        signUpFree: 'ಉಚಿತ ಸೈನ್ ಅಪ್',
        customersSay: 'ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ',
        perks: {
          freeDelivery: 'ಉಚಿತ ಡೆಲಿವರಿ',
          freeDeliveryBody: '$30 ಮೇಲಿನ ಎಲ್ಲ ಆರ್ಡರ್‌ಗಳಿಗೆ. ಅದೇ ದಿನ ಡಿಸ್ಪ್ಯಾಚ್ ಲಭ್ಯ.',
          organic: '100% ಸಾವಯವ',
          organicBody: 'ಉತ್ತಮ ದರ್ಜೆಯ, ನೈತಿಕವಾಗಿ ಸಂಗ್ರಹಿಸಿದ ಸಾವಯವ ಪದಾರ್ಥಗಳು ಮಾತ್ರ.',
          madeToOrder: 'ಆರ್ಡರ್ ಮೇರೆಗೆ ತಯಾರು',
          madeToOrderBody: 'ಪ್ರತಿ ಬ್ಯಾಚ್ ತಾಜಾವಾಗಿ ತಯಾರಿಸಲಾಗುತ್ತದೆ — ಎಂದಿಗೂ ಸಾಮೂಹಿಕ ಉತ್ಪಾದನೆ ಇಲ್ಲ.',
          madeWithLove: 'ಪ್ರೀತಿಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ',
          madeWithLoveBody: 'ನಮ್ಮ ಉತ್ಸಾಹಿ ಬೇಕರ್‌ಗಳ ತಂಡದಿಂದ ಸಣ್ಣ ಬ್ಯಾಚ್‌ಗಳಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ.',
        },
      },
      shop: {
        title: 'ನಮ್ಮ ಮನೆಮಾಡಿದ ಆಯ್ಕೆ',
        subtitle: 'ಉತ್ತಮ ಸಾವಯವ ಪದಾರ್ಥಗಳನ್ನು ಬಳಸಿ ಸಣ್ಣ ಬ್ಯಾಚ್‌ಗಳಲ್ಲಿ ಬೇಯಿಸಲಾಗಿದೆ.',
        addToBag: 'ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಿ',
        searchPlaceholder: 'ಸಿಹಿ ಮತ್ತು ಸವಿಯಾದ ತಿಂಡಿಗಳನ್ನು ಹುಡುಕಿ...',
        categories: {
          all: 'ಎಲ್ಲಾ',
          sweet: 'ಸಿಹಿ ತಿಂಡಿಗಳು',
          savory: 'ಖಾರ ಮತ್ತು ಸವಿಯಾದ ತಿಂಡಿಗಳು',
        },
        reviews: 'ವಿಮರ್ಶೆಗಳು',
      },
      cart: {
        yourBag: 'ನಿಮ್ಮ ಬ್ಯಾಗ್',
        emptyBag: 'ನಿಮ್ಮ ಬ್ಯಾಗ್ ಖಾಲಿಯಾಗಿದೆ',
        total: 'ಒಟ್ಟು',
        proceedToCheckout: 'ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
        clearBag: 'ಬ್ಯಾಗ್ ಖಾಲಿ ಮಾಡಿ',
        remove: 'ತೆಗೆದುಹಾಕಿ',
      },
      checkout: {
        title: 'ಚೆಕ್‌ಔಟ್',
        emptyBag: 'ನಿಮ್ಮ ಬ್ಯಾಗ್ ಖಾಲಿಯಾಗಿದೆ.',
        continueShopping: 'ಖರೀದಿ ಮುಂದುವರಿಸಿ',
        deliveryDetails: 'ಡೆಲಿವರಿ ವಿವರಗಳು',
        orderSummary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
        total: 'ಒಟ್ಟು',
        placingOrder: 'ಆರ್ಡರ್ ಮಾಡಲಾಗುತ್ತಿದೆ…',
        placeOrder: 'ಆರ್ಡರ್ ಮಾಡಿ',
        fields: {
          fullName: 'ಪೂರ್ಣ ಹೆಸರು',
          email: 'ಇಮೇಲ್ ವಿಳಾಸ',
          phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
          addressLine1: 'ವಿಳಾಸ ಸಾಲು 1',
          addressLine2: 'ವಿಳಾಸ ಸಾಲು 2 (ಐಚ್ಛಿಕ)',
          city: 'ನಗರ',
          postcode: 'ಪೋಸ್ಟ್‌ಕೋಡ್ / ZIP',
          country: 'ದೇಶ',
          notes: 'ಆರ್ಡರ್ ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)',
        },
        paymentMethod: 'ಪಾವತಿ ವಿಧಾನ',
        paymentMethods: {
          upi: 'UPI / QR ಕೋಡ್',
          card: 'ಕ್ರೆಡಿಟ್ / ಡೆಬಿಟ್ ಕಾರ್ಡ್',
          cod: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ (COD)'
        }
      },
      orderSuccess: {
        title: 'ಆರ್ಡರ್ ಬಹುತೇಕ ಪೂರ್ಣಗೊಂಡಿದೆ! 🎉',
        subtitle: 'ನಿಮ್ಮ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲು, ದಯವಿಟ್ಟು ನಮಗೆ WhatsApp ನಲ್ಲಿ ಒಂದು ಸಣ್ಣ ಸಂದೇಶ ಕಳುಹಿಸಿ.',
        whatsappBtn: 'WhatsApp ಮೂಲಕ ದೃಢೀಕರಿಸಿ',
        orderNumber: 'ಆರ್ಡರ್',
        details: 'ನಿಮ್ಮ ಆರ್ಡರ್ ವಿವರಗಳೊಂದಿಗೆ ನಿಮ್ಮನ್ನು WhatsApp ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತದೆ.'
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language if translation is missing
    interpolation: {
      escapeValue: false // React already protects against XSS
    }
  });

export default i18n;