import React from 'react';
import { IntegrationService, IntegrationStatus, Category, Product, CartItem, SellerStat, Order, OrderStatus, User, Affiliate, AffiliateStat, Commission, ShippingAddress, PaymentDetails, DownlineMember } from './types';

const OmiseLogo = () => (
    <svg width="80" height="30" viewBox="0 0 105 32" fill="none" xmlns="http://www.w.org/2000/svg">
        <path d="M24.786 19.452c0-4.04 2.808-6.66 7.452-6.66 4.644 0 7.452 2.62 7.452 6.66 0 4.04-2.808 6.66-7.452 6.66-4.644 0-7.452-2.62-7.452-6.66zm11.34 0c0-2.204-1.332-3.8-3.888-3.8-2.556 0-3.888 1.596-3.888 3.8 0 2.204 1.332 3.8 3.888 3.8 2.556 0 3.888-1.596 3.888-3.8zM41.742 25.812V13.092h3.564v12.72h-3.564zM59.91 19.452c0-4.04 2.808-6.66 7.452-6.66 4.644 0 7.452 2.62 7.452 6.66 0 4.04-2.808 6.66-7.452 6.66-4.644 0-7.452-2.62-7.452-6.66zm11.34 0c0-2.204-1.332-3.8-3.888-3.8-2.556 0-3.888 1.596-3.888 3.8 0 2.204 1.332 3.8 3.888 3.8 2.556 0 3.888-1.596 3.888-3.8zM76.974 25.812V13.092h3.564v11.52l7.308-11.52h4.32l-8.532 12.864v.144l8.604 12.516h-4.32l-7.956-11.808v11.808h-3.564zM99.654 25.812V13.092h3.564v12.72h-3.564z" fill="#1A1B23"></path>
        <path d="M15.894 16c0-4.44-3.564-8-7.956-8S0 11.56 0 16c0 4.44 3.564 8 7.938 8s7.956-3.56 7.956-8zm-2.952 0c0 2.76-2.232 5-4.986 5s-5.004-2.24-5.004-5 2.25-5 5.004-5 4.986 2.24 4.986 5z" fill="#1459F5"></path>
    </svg>
);

const KerryLogo = () => (
    <svg width="80" height="30" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="30" fontFamily="Arial, sans-serif" fontSize="30" fill="#E81E24" fontWeight="bold">Kerry</text>
        <text x="85" y="30" fontFamily="Arial, sans-serif" fontSize="30" fill="#000000" fontWeight="bold">Express</text>
    </svg>
);

const SendGridLogo = () => (
    <svg width="100" height="30" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="45" fontFamily="Arial, sans-serif" fontSize="50" fill="#2085F4" fontWeight="bold">SendGrid</text>
    </svg>
);


export const INITIAL_SERVICES: IntegrationService[] = [
  {
    id: 'omise',
    name: 'Omise Payment Gateway',
    description: 'Enable credit card and other payment methods for your store.',
    logo: <OmiseLogo />,
    status: IntegrationStatus.DISCONNECTED,
    values: { publicKey: '', secretKey: '' },
    fields: [
      {
        id: 'publicKey',
        label: 'Public Key',
        type: 'text',
        placeholder: 'pkey_test_xxxxxxxxxxxxxxxxx',
        helpText: 'Find your Public Key in your Omise Dashboard under API Keys.',
      },
      {
        id: 'secretKey',
        label: 'Secret Key',
        type: 'password',
        placeholder: 'skey_test_xxxxxxxxxxxxxxxxx',
        helpText: 'Find your Secret Key in your Omise Dashboard under API Keys.',
      },
    ],
  },
  {
    id: 'kerry',
    name: 'Kerry Express',
    description: 'Integrate with Kerry Express for shipping and logistics.',
    logo: <KerryLogo />,
    status: IntegrationStatus.DISCONNECTED,
    values: { apiKey: '', apiSecret: '' },
    fields: [
      {
        id: 'apiKey',
        label: 'API Key',
        type: 'text',
        placeholder: 'Enter your Kerry Express API Key',
        helpText: 'Request your API Key from your Kerry Express account manager.',
      },
      {
        id: 'apiSecret',
        label: 'API Secret',
        type: 'password',
        placeholder: 'Enter your Kerry Express API Secret',
        helpText: 'This is provided along with your API Key.',
      },
    ],
  },
  {
    id: 'sendgrid',
    name: 'SendGrid Email',
    description: 'Automate transactional emails like order confirmations.',
    logo: <SendGridLogo />,
    status: IntegrationStatus.DISCONNECTED,
    values: { apiKey: '' },
    fields: [
      {
        id: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: 'SG.xxxxxxxxxxxxxxxxxxxxxx',
        helpText: 'Generate an API key from your SendGrid account settings.',
      },
    ],
  },
];


const allProducts: (Omit<Product, 'id' | 'imageUrl' | 'images'> & { seed: string })[] = [
    // Fresh Produce (inspired by images)
    { 
        name: 'Organic Brown Onions (1kg)', 
        price: 90, 
        pv: 3,
        dietary_tags: ['Organic', 'Vegan'],
        shopName: 'Green Grocer', 
        rating: 4.8, 
        category: 'fresh-produce', 
        brand: 'Fresh Farm',
        description: 'Versatile and flavorful organic brown onions, perfect for a wide range of dishes. Sourced from local sustainable farms in Thailand.',
        sku: 'GG-ONION-001',
        stock: 250,
        status: 'Active',
        seed: 'brown-onions'
    },
    { 
        name: 'Organic Vegetable Box', 
        price: 750, 
        pv: 30,
        dietary_tags: ['Organic', 'Vegan'],
        shopName: 'Green Grocer', 
        rating: 4.9, 
        category: 'fresh-produce', 
        brand: 'Fresh Farm',
        description: 'A curated box of seasonal organic vegetables. Includes carrots, broccoli, bell peppers, tomatoes, and more. Perfect for a week of healthy meals.',
        sku: 'GG-VEGBOX-001',
        stock: 50,
        status: 'Active',
        seed: 'vegetable-box'
    },
    { 
        name: 'Fresh Carrots (500g)', 
        price: 50, 
        pv: 2,
        dietary_tags: ['Organic'],
        shopName: 'Green Grocer', 
        rating: 4.7, 
        category: 'fresh-produce', 
        brand: 'Fresh Farm',
        description: 'Crisp and sweet organic carrots, rich in Vitamin A. Great for snacking, salads, or cooking.',
        sku: 'GG-CARROT-001',
        stock: 180,
        status: 'Active',
        seed: 'fresh-carrots'
    },
    { 
        name: 'Broccoli Florets (300g)', 
        price: 75, 
        pv: 3,
        shopName: 'Green Grocer', 
        rating: 4.8, 
        category: 'fresh-produce', 
        brand: 'Fresh Farm',
        description: 'Freshly cut broccoli florets, packed with nutrients. Easy to steam, roast, or add to stir-fries.',
        sku: 'GG-BROC-001',
        stock: 120,
        status: 'Active',
        seed: 'broccoli-florets'
    },
     // Juices & Smoothies (inspired by images)
    { 
        name: 'Super Greens Detox Smoothie', 
        price: 180, 
        pv: 7,
        dietary_tags: ['Vegan', 'Gluten-Free'],
        shopName: 'Healthy Hut', 
        rating: 4.9, 
        category: 'juices-smoothies', 
        brand: 'JuiceLife',
        description: 'A refreshing and nutrient-dense smoothie with spinach, kale, apple, lemon, and ginger. A perfect start to your day.',
        reviews: [
            { id: 'rev1', author: 'Somsak', rating: 5, date: '1 day ago', comment: 'So refreshing and healthy!' },
        ],
        sku: 'HH-GRSM-001',
        stock: 80,
        status: 'Active',
        seed: 'green-smoothie-jar'
    },
    { 
        name: 'Freshly Squeezed Orange Juice (1L)', 
        price: 150, 
        pv: 6,
        shopName: 'Healthy Hut', 
        rating: 4.8, 
        category: 'juices-smoothies', 
        brand: 'JuiceLife',
        description: '100% pure orange juice, freshly squeezed and never from concentrate. Packed with Vitamin C.',
        sku: 'HH-OJ-001',
        stock: 100,
        status: 'Active',
        seed: 'orange-juice-glass'
    },
    { 
        name: 'Organic Strawberry Kefir', 
        price: 120, 
        pv: 5,
        dietary_tags: ['Organic', 'Probiotic'],
        shopName: 'Wellness Corner', 
        rating: 4.7, 
        category: 'juices-smoothies', 
        brand: 'Good Gut',
        description: 'A creamy and delicious strawberry kefir, full of probiotics to support gut health. Made with organic milk and real strawberries.',
        sku: 'WC-KEFIR-001',
        stock: 90,
        status: 'Active',
        seed: 'strawberry-smoothie-bottle'
    },
     // Healthy Snacks (inspired by images)
    { 
        name: 'Dark Chocolate Covered Apricots', 
        price: 250, 
        pv: 10,
        shopName: 'Healthy Hut', 
        rating: 4.9, 
        category: 'healthy-snacks', 
        brand: 'Sweet Health',
        description: 'Juicy dried apricots covered in rich, 70% dark chocolate. A guilt-free treat packed with antioxidants.',
        sku: 'HH-APR-001',
        stock: 150,
        status: 'Active',
        seed: 'chocolate-apricot'
    },
    { 
        name: 'Activated Almonds (150g)', 
        price: 180, 
        pv: 7,
        dietary_tags: ['Vegan', 'Keto'],
        shopName: 'Healthy Hut', 
        rating: 4.8, 
        category: 'healthy-snacks', 
        brand: 'NuttyNaturals',
        description: 'Almonds that have been soaked and dehydrated to improve digestibility and nutrient absorption. A crunchy and healthy snack.',
        sku: 'HH-ALM-001',
        stock: 200,
        status: 'Active',
        seed: 'activated-almonds'
    },
     { 
        name: 'Kale Chips - Sea Salt', 
        price: 135, 
        pv: 5,
        dietary_tags: ['Vegan', 'Gluten-Free'],
        shopName: 'Green Grocer', 
        rating: 4.6, 
        category: 'healthy-snacks', 
        brand: 'SnackWell',
        description: 'Crispy kale chips lightly seasoned with sea salt. A great alternative to potato chips.',
        sku: 'GG-KALE-001',
        stock: 0,
        status: 'Inactive',
        seed: 'kale-chips-bowl'
    },
    // Pantry Staples
    { 
        name: 'Organic Quinoa (500g)', 
        price: 220, 
        pv: 9,
        dietary_tags: ['Organic', 'Vegan'],
        shopName: 'Green Grocer', 
        rating: 4.9, 
        category: 'pantry-staples', 
        brand: 'NuttyNaturals',
        description: 'High-protein organic white quinoa. A versatile grain for salads, bowls, or as a side dish.',
        sku: 'GG-QUIN-001',
        stock: 130,
        status: 'Active',
        seed: 'quinoa-bag'
    },
    { 
        name: 'Extra Virgin Olive Oil (500ml)', 
        price: 350, 
        pv: 14,
        dietary_tags: ['Organic'],
        shopName: 'Green Grocer', 
        rating: 4.8, 
        category: 'pantry-staples', 
        brand: 'OlioCo',
        description: 'Cold-pressed extra virgin olive oil from organic olives. Perfect for dressings and finishing dishes.',
        sku: 'GG-EVOO-001',
        stock: 100,
        status: 'Active',
        seed: 'olive-oil-bottle'
    },
    { 
        name: 'Organic Coconut Milk (400ml)', 
        price: 85, 
        pv: 3,
        dietary_tags: ['Organic', 'Vegan'],
        shopName: 'Healthy Hut', 
        rating: 4.7, 
        category: 'pantry-staples', 
        brand: 'CocoFresh',
        description: 'Creamy organic coconut milk, ideal for Thai curries, soups, and desserts. No additives or preservatives.',
        sku: 'HH-COCO-001',
        stock: 300,
        status: 'Active',
        seed: 'coconut-milk-can'
    },
    // Supplements (keeping some from original theme)
    { 
        name: 'Plant-Based Protein Powder', 
        price: 1350, 
        pv: 55,
        dietary_tags: ['Vegan', 'Gluten-Free'],
        shopName: 'Healthy Hut', 
        rating: 4.7, 
        category: 'supplements', 
        brand: 'ProteinCo',
        description: 'A high-quality blend of pea and rice protein, providing a complete amino acid profile. Perfect for post-workout recovery for those on a plant-based diet.',
        sku: 'HH-VPRO-001',
        stock: 110,
        status: 'Active',
        seed: 'vegan-protein-tub'
    },
    { 
        name: 'Omega-3 Algae Oil', 
        price: 950, 
        pv: 38,
        dietary_tags: ['Vegan'],
        shopName: 'Wellness Corner', 
        rating: 4.9, 
        category: 'supplements', 
        brand: 'VitaWorld',
        description: 'A vegan source of essential Omega-3 fatty acids (EPA & DHA) derived from marine algae. Supports brain and heart health.',
        sku: 'WC-ALG-001',
        stock: 150,
        status: 'Active',
        seed: 'algae-oil-capsules'
    },
     { 
        name: 'Probiotic 50 Billion CFU', 
        price: 1100, 
        pv: 44,
        shopName: 'Wellness Corner', 
        rating: 4.8, 
        category: 'supplements', 
        brand: 'VitaWorld',
        description: 'A high-potency probiotic with 10 different strains to support digestive health and immune function.',
        sku: 'WC-PROB-001',
        stock: 180,
        status: 'Active',
        seed: 'probiotic-bottle'
    },
    // Personal Care
     { 
        name: 'Natural Bamboo Toothbrush Set', 
        price: 180, 
        pv: 7,
        shopName: 'Beauty Blooms', 
        rating: 4.9, 
        category: 'personal-care', 
        brand: 'EcoSmile',
        description: 'An eco-friendly alternative to plastic toothbrushes. Made from sustainable bamboo with charcoal-infused bristles.',
        sku: 'BB-BAM-001',
        stock: 300,
        status: 'Active',
        seed: 'bamboo-toothbrushes-holder'
    },
     { 
        name: 'Organic Lavender Soap Bar', 
        price: 150, 
        pv: 6,
        dietary_tags: ['Organic', 'Natural'],
        shopName: 'Beauty Blooms', 
        rating: 4.8, 
        category: 'personal-care', 
        brand: 'HerbaGlow',
        description: 'A calming and moisturizing soap bar made with organic lavender essential oil and shea butter.',
        sku: 'BB-SOAP-001',
        stock: 200,
        status: 'Active',
        seed: 'lavender-soap-bar'
    },
    // Mom & Baby
    { 
        name: 'Organic Baby Rice Puffs', 
        price: 120, 
        pv: 5,
        dietary_tags: ['Organic'],
        shopName: 'Little Sprouts', 
        rating: 4.8, 
        category: 'mom-baby', 
        brand: 'BabyOrganics',
        description: 'Gentle and easy-to-digest organic rice puffs for your little one. A perfect first snack that melts in the mouth.',
        sku: 'LS-PUFF-001',
        stock: 400,
        status: 'Active',
        seed: 'toddler-puffs-snack'
    },
     { 
        name: 'Natural Nipple Cream', 
        price: 350, 
        pv: 14,
        dietary_tags: ['Organic'],
        shopName: 'Little Sprouts', 
        rating: 4.9, 
        category: 'mom-baby', 
        brand: 'BabyOrganics',
        description: 'A soothing and safe nipple cream for breastfeeding mothers, made with 100% natural and organic ingredients.',
        sku: 'LS-NIP-001',
        stock: 150,
        status: 'Active',
        seed: 'nipple-cream-tube'
    },
];

export const PRODUCTS: Product[] = allProducts.map((p, i) => {
    const seed = p.seed;
    const defaultImages = [
        `https://picsum.photos/seed/${seed}/800/800`,
        `https://picsum.photos/seed/${seed}2/800/800`,
        `https://picsum.photos/seed/${seed}3/800/800`,
        `https://picsum.photos/seed/${seed}4/800/800`,
    ];
    // Add description for all products for consistency
    const description = p.description || `High-quality ${p.name} from ${p.brand}. Perfect for your health and wellness routine.`;
    return {
        ...p,
        id: `prod${i + 1}`,
        imageUrl: defaultImages[0],
        images: defaultImages,
        description,
    };
});

const productCounts = PRODUCTS.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

export const CATEGORIES: Category[] = [
    { id: 'fresh-produce', name: 'Fresh Produce', imageUrl: 'https://picsum.photos/seed/fresh-vegetables/400/400', productCount: productCounts['fresh-produce'] || 0 },
    { id: 'juices-smoothies', name: 'Juices & Smoothies', imageUrl: 'https://picsum.photos/seed/fresh-juice/400/400', productCount: productCounts['juices-smoothies'] || 0 },
    { id: 'healthy-snacks', name: 'Healthy Snacks', imageUrl: 'https://picsum.photos/seed/healthy-nuts/400/400', productCount: productCounts['healthy-snacks'] || 0 },
    { id: 'pantry-staples', name: 'Pantry Staples', imageUrl: 'https://picsum.photos/seed/pantry-jars/400/400', productCount: productCounts['pantry-staples'] || 0 },
    { id: 'supplements', name: 'Supplements', imageUrl: 'https://picsum.photos/seed/vitamin-bottles/400/400', productCount: productCounts['supplements'] || 0 },
    { id: 'personal-care', name: 'Personal Care', imageUrl: 'https://picsum.photos/seed/natural-soap/400/400', productCount: productCounts['personal-care'] || 0 },
    { id: 'mom-baby', name: 'Mom & Baby', imageUrl: 'https://picsum.photos/seed/baby-lotion/400/400', productCount: productCounts['mom-baby'] || 0 },
];

export const CART_ITEMS: CartItem[] = [
    { ...PRODUCTS[1], quantity: 1 }, // Organic Vegetable Box
    { ...PRODUCTS[4], quantity: 2 }, // Super Greens Detox Smoothie
    { ...PRODUCTS[7], quantity: 1 }, // Dark Chocolate Covered Apricots
];

// Mock Data for Seller Dashboard
const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" />
    </svg>
);

const CubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
    </svg>
);


export const SELLER_STATS: SellerStat[] = [
    {
        label: 'Total Revenue',
        value: '฿425,700',
        change: '+12.5%',
        changeType: 'increase',
        icon: <DollarSignIcon />,
    },
    {
        label: 'Pending Orders',
        value: '2',
        changeType: 'increase',
        icon: <ShoppingCartIcon />,
    },
    {
        label: 'Total Products',
        value: '5',
        changeType: 'decrease',
        icon: <CubeIcon />,
    },
];

export const SELLER_PRODUCTS: Product[] = PRODUCTS.filter(p => p.shopName === 'Healthy Hut');

const mockAddress1: ShippingAddress = { fullName: 'Somsri Jaidee', address: '123 Sukhumvit Road, Klongtoey', city: 'Bangkok', province: 'Bangkok', postalCode: '10110', phone: '081-234-5678'};
const mockAddress2: ShippingAddress = { fullName: 'John Doe', address: '456 Rama IV Road, Pathum Wan', city: 'Bangkok', province: 'Bangkok', postalCode: '10330', phone: '081-111-2222'};
const mockAddress3: ShippingAddress = { fullName: 'Peter Jones', address: '789 Silom Road, Bang Rak', city: 'Bangkok', province: 'Bangkok', postalCode: '10500', phone: '089-876-5432'};

export const MOCK_ORDERS: Order[] = [
    { id: 'BH-12035', customerName: 'Somsri', customerEmail: 'customer@blivehealthy.co.th', date: '2024-07-28', total: 430, totalPV: 17, status: OrderStatus.SHIPPED, items: [
        { productId: 'prod5', productName: PRODUCTS[4].name, quantity: 1 }, // Super Greens Detox Smoothie
        { productId: 'prod8', productName: PRODUCTS[7].name, quantity: 1 } // Dark Chocolate Covered Apricots
    ], shopName: 'Healthy Hut', shippingAddress: mockAddress1, paymentDetails: { method: 'credit-card', transactionId: 'chrg_test_12035', date: '2024-07-28' } },
    { id: 'BH-12034', customerName: 'John Doe', customerEmail: 'john.d@example.com', date: '2024-07-28', total: 950, totalPV: 38, status: OrderStatus.PROCESSING, items: [
        { productId: 'prod15', productName: PRODUCTS[14].name, quantity: 1 } // Omega-3 Algae Oil
    ], shopName: 'Wellness Corner', shippingAddress: mockAddress2, paymentDetails: { method: 'bank-transfer', transactionId: 'txn_test_12034', date: '2024-07-28' } },
    { id: 'BH-12033', customerName: 'Somsri', customerEmail: 'customer@blivehealthy.co.th', date: '2024-07-27', total: 1435, totalPV: 58, status: OrderStatus.DELIVERED, items: [
        { productId: 'prod13', productName: PRODUCTS[12].name, quantity: 1 }, // Organic Coconut Milk
        { productId: 'prod14', productName: PRODUCTS[13].name, quantity: 1 } // Plant-Based Protein Powder
    ], shopName: 'Healthy Hut', shippingAddress: mockAddress1, paymentDetails: { method: 'credit-card', transactionId: 'chrg_test_12033', date: '2024-07-27' } },
    { id: 'BH-12032', customerName: 'Peter Jones', customerEmail: 'peter.j@example.com', date: '2024-07-26', total: 180, totalPV: 7, status: OrderStatus.DELIVERED, items: [
        { productId: 'prod9', productName: PRODUCTS[8].name, quantity: 1 } // Activated Almonds
    ], shopName: 'Healthy Hut', shippingAddress: mockAddress3, paymentDetails: { method: 'cod', transactionId: 'cod_test_12032', date: '2024-07-26' } },
    { id: 'BH-12031', customerName: 'Somchai', customerEmail: 'somchai.k@example.com', date: '2024-07-25', total: 750, totalPV: 30, status: OrderStatus.CANCELLED, items: [
        { productId: 'prod2', productName: PRODUCTS[1].name, quantity: 1 } // Organic Vegetable Box
    ], shopName: 'Green Grocer', shippingAddress: mockAddress2, paymentDetails: { method: 'credit-card', transactionId: 'chrg_test_12031', date: '2024-07-25' } },
    { id: 'BH-12030', customerName: 'Anna Williams', customerEmail: 'anna.w@example.com', date: '2024-07-25', total: 1220, totalPV: 49, status: OrderStatus.SHIPPED, items: [
        { productId: 'prod7', productName: PRODUCTS[6].name, quantity: 1 }, // Organic Strawberry Kefir
        { productId: 'prod16', productName: PRODUCTS[15].name, quantity: 1 } // Probiotic 50 Billion CFU
    ], shopName: 'Wellness Corner', shippingAddress: mockAddress3, paymentDetails: { method: 'bank-transfer', transactionId: 'txn_test_12030', date: '2024-07-25' } },
    { id: 'BH-12029', customerName: 'David Chen', customerEmail: 'david.c@example.com', date: '2024-07-24', total: 1100, totalPV: 44, status: OrderStatus.DELIVERED, items: [
        { productId: 'prod16', productName: PRODUCTS[15].name, quantity: 1 } // Probiotic 50 Billion CFU
    ], shopName: 'Wellness Corner', shippingAddress: mockAddress2, paymentDetails: { method: 'credit-card', transactionId: 'chrg_test_12029', date: '2024-07-24' } },
    { id: 'BH-12028', customerName: 'Ploy', customerEmail: 'ploy.p@example.com', date: '2024-07-24', total: 330, totalPV: 13, status: OrderStatus.PROCESSING, items: [
        { productId: 'prod17', productName: PRODUCTS[16].name, quantity: 1 }, // Natural Bamboo Toothbrush Set
        { productId: 'prod18', productName: PRODUCTS[17].name, quantity: 1 } // Organic Lavender Soap Bar
    ], shopName: 'Beauty Blooms', shippingAddress: mockAddress1, paymentDetails: { method: 'bank-transfer', transactionId: 'txn_test_12028', date: '2024-07-24' } },
    { id: 'BH-12027', customerName: 'Mike Brown', customerEmail: 'mike.b@example.com', date: '2024-07-23', total: 1350, totalPV: 55, status: OrderStatus.SHIPPED, items: [
        { productId: 'prod14', productName: PRODUCTS[13].name, quantity: 1 } // Plant-Based Protein Powder
    ], shopName: 'Healthy Hut', shippingAddress: mockAddress3, paymentDetails: { method: 'credit-card', transactionId: 'chrg_test_12027', date: '2024-07-23' } },
    { id: 'BH-12026', customerName: 'Jessica Lee', customerEmail: 'jessica.l@example.com', date: '2024-07-22', total: 330, totalPV: 13, status: OrderStatus.DELIVERED, items: [
        { productId: 'prod17', productName: PRODUCTS[16].name, quantity: 1 }, // Natural Bamboo Toothbrush Set
        { productId: 'prod18', productName: PRODUCTS[17].name, quantity: 1 } // Organic Lavender Soap Bar
    ], shopName: 'Beauty Blooms', shippingAddress: mockAddress1, paymentDetails: { method: 'cod', transactionId: 'cod_test_12026', date: '2024-07-22' } },
];

export const MOCK_ALL_USERS: User[] = [
    { id: 'admin1', name: 'Admin User', email: 'admin@blivehealthy.co.th', role: 'admin', joinDate: '2023-01-15', status: 'Active' },
    { id: 'seller1', name: 'Healthy Hut', email: 'seller@healthyhut.co.th', role: 'seller', joinDate: '2023-02-20', status: 'Active', shopDescription: 'Your one-stop shop for fitness supplements and organic snacks.' },
    { id: 'cust1', name: 'Somsri', email: 'customer@blivehealthy.co.th', role: 'customer', joinDate: '2023-03-01', status: 'Active' },
    { id: 'cust2', name: 'John Doe', email: 'john.d@example.com', role: 'customer', joinDate: '2023-05-10', status: 'Active' },
    { id: 'seller2', name: 'Wellness Corner', email: 'contact@wellnesscorner.com', role: 'seller', joinDate: '2023-06-05', status: 'Banned', shopDescription: 'Curated vitamins and supplements for a healthier you.' },
    { id: 'cust3', name: 'Malee S.', email: 'malee.s@example.com', role: 'customer', joinDate: '2023-07-21', status: 'Active' },
    { id: 'cust4', name: 'Peter Jones', email: 'peter.j@example.com', role: 'customer', joinDate: '2023-09-01', status: 'Active' },
    { id: 'seller3', name: 'Green Grocer', email: 'info@greengrocer.co.th', role: 'seller', joinDate: '2023-11-12', status: 'Active', shopDescription: 'Fresh, organic, and healthy food products delivered to your door.' },
    { id: 'cust5', name: 'Somchai K.', email: 'somchai.k@example.com', role: 'customer', joinDate: '2024-01-18', status: 'Banned' },
    { id: 'cust6', name: 'Anna Williams', email: 'anna.w@example.com', role: 'customer', joinDate: '2024-02-25', status: 'Active' },
    { id: 'seller4', name: 'Beauty Blooms', email: 'support@beautyblooms.com', role: 'seller', joinDate: '2024-04-03', status: 'Active', shopDescription: 'Natural and effective skin care and personal care products.' },
    { id: 'seller5', name: 'Little Sprouts', email: 'hello@littlesprouts.com', role: 'seller', joinDate: '2024-05-01', status: 'Active', shopDescription: 'Gentle and organic products for moms and babies.' },
    { id: 'cust7', name: 'David Chen', email: 'david.c@example.com', role: 'customer', joinDate: '2024-06-15', status: 'Active' },
    { id: 'aff1', name: 'Top Influencer', email: 'influencer@blivehealthy.co.th', role: 'affiliate', joinDate: '2023-04-10', status: 'Active' },
];

export const MOCK_AFFILIATES: Affiliate[] = [
    { id: 'aff1', name: 'Top Influencer', email: 'influencer@example.com', commissionRate: 0.10 },
    { id: 'aff2', name: 'Health Blogger TH', email: 'blogger@example.com', commissionRate: 0.08 },
    { id: 'aff3', name: 'Wellness Reviews', email: 'reviews@example.com', commissionRate: 0.05 },
    { id: 'aff4', name: 'Fitness Guru', email: 'guru.fit@example.com', commissionRate: 0.12 },
    { id: 'aff5', name: 'Organic Deals', email: 'deals@organic.com', commissionRate: 0.07 },
];

// Mock Data for Affiliate Dashboard
const ClicksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
);
const ConversionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const CommissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const MOCK_AFFILIATE_STATS: AffiliateStat[] = [
    { label: 'Total Clicks (30d)', value: '12,450', icon: <ClicksIcon /> },
    { label: 'Conversion Rate (30d)', value: '3.2%', icon: <ConversionIcon /> },
    { label: 'Commission Earned (30d)', value: '฿15,800', icon: <CommissionIcon /> },
];

export const MOCK_COMMISSIONS: Commission[] = [
    { id: 'comm1', orderId: 'BH-12035', affiliateId: 'aff1', date: '2024-07-28', productName: 'Super Greens Detox Smoothie', saleAmount: 180, commissionRate: 0.10, commissionEarned: 18.00, status: 'Approved' },
    { id: 'comm2', orderId: 'BH-12033', affiliateId: 'aff2', date: '2024-07-27', productName: 'Plant-Based Protein Powder', saleAmount: 1350, commissionRate: 0.08, commissionEarned: 108.00, status: 'Paid' },
    { id: 'comm3', orderId: 'BH-12030', affiliateId: 'aff1', date: '2024-07-25', productName: 'Probiotic 50 Billion CFU', saleAmount: 1100, commissionRate: 0.10, commissionEarned: 110.00, status: 'Paid' },
    { id: 'comm4', orderId: 'BH-12028', affiliateId: 'aff3', date: '2024-07-24', productName: 'Natural Bamboo Toothbrush Set', saleAmount: 180, commissionRate: 0.05, commissionEarned: 9.00, status: 'Pending' },
    { id: 'comm5', orderId: 'BH-12026', affiliateId: 'aff1', date: '2024-07-22', productName: 'Organic Lavender Soap Bar', saleAmount: 150, commissionRate: 0.10, commissionEarned: 15.00, status: 'Pending' },
    { id: 'comm6', orderId: 'BH-12026', affiliateId: 'aff1', date: '2024-07-22', productName: 'Natural Bamboo Toothbrush Set', saleAmount: 180, commissionRate: 0.10, commissionEarned: 18.00, status: 'Pending' },
];

export const MOCK_NETWORK_DATA: DownlineMember[] = [
    {
        id: 'cust2', name: 'John Doe', level: 1, joinDate: '2024-05-10', downlineCount: 2, totalPV: 5500, totalCommission: 450,
        children: [
            { id: 'cust4', name: 'Peter Jones', level: 2, joinDate: '2024-06-01', downlineCount: 0, totalPV: 2500, totalCommission: 200, children: [] },
            { id: 'cust6', name: 'Anna Williams', level: 2, joinDate: '2024-06-05', downlineCount: 0, totalPV: 3000, totalCommission: 250, children: [] },
        ]
    },
    {
        id: 'cust3', name: 'Malee S.', level: 1, joinDate: '2024-05-21', downlineCount: 1, totalPV: 4800, totalCommission: 380,
        children: [
             { 
                id: 'cust7', name: 'David Chen', level: 2, joinDate: '2024-07-15', downlineCount: 1, totalPV: 1800, totalCommission: 150,
                children: [
                    { id: 'cust-new', name: 'New Member', level: 3, joinDate: '2024-07-20', downlineCount: 0, totalPV: 800, totalCommission: 60, children: [] }
                ]
            },
        ]
    },
     { id: 'cust5', name: 'Somchai K.', level: 1, joinDate: '2024-06-18', downlineCount: 0, totalPV: 1200, totalCommission: 95, children: [] }
];
