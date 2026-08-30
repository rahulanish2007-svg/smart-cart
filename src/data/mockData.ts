import { Product, PlannedItem, Order } from '../types';
import bourbonImg from '../assets/images/bourbon_biscuits_pack_1788080204529.jpg';
import goodDayImg from '../assets/images/goodday_cookies_pack_1788080220506.jpg';
import darkFantasyImg from '../assets/images/dark_fantasy_biscuits_1788080233723.jpg';
import digestiveImg from '../assets/images/digestive_biscuits_pack_1788080250607.jpg';
import cremeCookiesImg from '../assets/images/creme_cookies_pack_1788080265293.jpg';

export const PRODUCTS: Product[] = [
  // Today's Best Deals / Staples
  {
    id: 'aashirvaad-atta-5kg',
    name: 'Aashirvaad Atta 5kg',
    brand: 'Aashirvaad',
    category: 'Staples',
    price: 225,
    originalPrice: 265,
    discountPercent: 15,
    unit: '5kg pack',
    rating: 4.8,
    reviewsCount: '2k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-NgiuyefT4smGjn2-cjm6uhXl8Sfdve0D_c6TPb-LLBuKtAywffnMShSYjAO_ObqyQ3ZCw96iSH5T5Jy-f1szKPwIsuCIXfMjPiNMnI633MFx0Fo9LGrFSZQSCxd_zTBj6uv_JZ_bxZvCn9RbAo0Gj51QMgCZMY3zVm6c_Hr0i8BmmkeCsqCidji8flLztA2YX88_O1y7Izbd1VysH147vE-vY9K-V0MwdkncO5GApmPCsbEb7U4N',
    description: 'Aashirvaad Select Premium Sharbati Whole Wheat Atta milled with high-grade wheat grains for softer rotis.',
    tag: '15% OFF'
  },
  {
    id: 'amul-butter-500g',
    name: 'Amul Butter 500g',
    brand: 'Amul',
    category: 'Dairy & Breakfast',
    price: 270,
    originalPrice: 285,
    discountPercent: 5,
    unit: '500g block',
    rating: 4.9,
    reviewsCount: '5k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbdLivyslW7MH0OlbrXwggWz1FfTPgHT3IV9uoTWGIzMwCUi_WLT-ffkHLLwbGjilJtWvqdAa-oeypr3RC1aJAAC55QH4ksQF7uTqJ6C7g9XyYUQnsoHlLTemrkK7ayfPeQW0ke_upbB7OZ27yotA-vVyNMDVwhaYA28XpeWxpJtDAslomDqznkPBTFGLjXJN4U-bD42mx7NhuTc3R2J_iraUJqUqt5Lp-aeIsZug-Q2lyJ0qVSgWu',
    description: 'Iconic Pasteurised Amul Butter prepared with fresh milk cream. Perfect for breakfast toast and cooking.',
    tag: '5% OFF'
  },
  {
    id: 'india-gate-basmati-5kg',
    name: 'India Gate Basmati 5kg',
    brand: 'India Gate',
    category: 'Staples',
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    unit: '5kg bag',
    rating: 4.7,
    reviewsCount: '1.2k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZllQCb5OzFWhF1mUNTvfgOPPz50JV0BAvbDi5_KW3FiKjKJu83cQh9bLGWvm7sXRcn4NLrwvyTWGCbvcAKyh9s_Z4lG7exaosY_TkvHCvzCGaLHfK-VDWAMHIfjilV-g2f332_zsMGmVG2zBhVH1MS93mb5c1hvMr_drEr-ss009HzWoFn7gdJykBn-x21iDDFy5zjlNjFRaySQqHxxXKPP5Wf6X8YlbYrEbEUcc-I5nIzvYPr3Ez',
    description: 'Aged long-grain aromatic basmati rice, ideal for biryanis and special festive meals.',
    tag: '20% OFF'
  },
  {
    id: 'saffola-gold-oil-1l',
    name: 'Saffola Gold Oil 1L',
    brand: 'Saffola',
    category: 'Cooking Essentials',
    price: 185,
    originalPrice: 205,
    discountPercent: 10,
    unit: '1L bottle',
    rating: 4.6,
    reviewsCount: '800+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa_aJiiTNlU4tENx-YkhPVZXrSOqeE_UPWHOvfANmeJPewnRz-s0FBYHzcbgf_nXMueacM8DUS_KVm2t8QwAdd7oOQ2Yb0yxDmzoURceJhjAbxn9E0gg41VfaqCsB1rlAqGz_UND2ejmvxuEUJhLMn89h2KEIRHVikJrDHZrm9MtPNrUm8BgDWi0lk-27r3rRYv4s63OTy-leBiW1nrkqradeVa0rf4Ti8qK82_1wxWValpIR_SbIl',
    description: 'Healthy blended cooking oil with ProNutri and antioxidant power for heart wellness.',
    tag: '10% OFF'
  },

  // Dairy & Breakfast View Products
  {
    id: 'fresh-whole-milk-1l',
    name: 'Fresh Farm Whole Milk (1L)',
    brand: 'SmartKart Dairy',
    category: 'Dairy',
    price: 68,
    unit: '1L glass bottle',
    rating: 4.9,
    reviewsCount: '3.4k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmsMvE9lCyMPtsfjI2V7e1_kp0VvnycYHAszO1NV8hl7Ag52xEWgsSTtVmlnlGqHg_BEvliFj7Hs0oaJBHdYJxx7kcoQFdlKzl65R6N920cB4_gHa9qv_dGEdod5hqJKNIhFUFzIbIF4iGfaPK7LvDZmNAy9Q9jQ3WWS8jnHkFFDi59axQHK-R9eZNAjVnKPGzxvmqyllAMmP94HNE6LuZhv73HBFICExjQnckViLQymFMuBlcbuv',
    isFreshToday: true,
    description: 'Farm-fresh pasteurized organic whole milk packed in chilled bottles within 4 hours of morning milking.',
    tag: 'Fresh Today'
  },
  {
    id: 'premium-malai-paneer-200g',
    name: 'Premium Malai Paneer (200g)',
    brand: 'Dairy Best',
    category: 'Dairy',
    price: 85,
    unit: '200g pack',
    rating: 4.8,
    reviewsCount: '1.9k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5a-KucDJWEXmbZuVnSSJXlk7JxoawpoNdcaCuMl4e8Z0IaoRHLopH-vvJAChyeGeagcslxlMC2RpwLAX8623StE6BkxNE6cN_J5fDlGSogvAnJuXthqffyMdkm6ziI80BYJkPdLmqj4mMQrq-jeM0HwXPRn9FzzGY8vy5kE9hL2HfxLhakQo7LDwtaEkrWvm5g-g-5fsFSs2K6InsXONNSpfiWNW7Vn_-YoCqilzpjx-9wx18FxjU',
    description: 'Soft, melt-in-mouth cottage cheese crafted from pure full-cream buffalo milk without preservatives.',
    tag: 'Bestseller'
  },
  {
    id: 'thick-creamy-curd-400g',
    name: 'Thick & Creamy Curd (400g)',
    brand: 'Dairy Pure',
    category: 'Dairy',
    price: 45,
    unit: '400g tub',
    rating: 4.7,
    reviewsCount: '890',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_632kNlG7Mb2NrtWJJDH98QIQO0kZX3TbKV8tcgpbBfpIFePGeSF8Tlu9aGOX8aozawvgbO1JYhwSRIQ5j9o7N0VgyQy_0XffqjPh7eanOu-8YdML04ewvrIefYVpLBUtlqZKLIt11U4nDLibhJJYM8otSj-4_fzkDdJzIaqaqc2DuS0EET8iYs4Ya57g_zFQgsCM8UdfgtURrZmth9ucxq7druCoG--RTAU-_q-Sr6rqjtBuJY3_',
    description: 'Traditional set dahi with a rich, creamy texture and pleasant mild tanginess for raita or daily meals.',
    tag: 'Popular'
  },
  {
    id: 'farm-fresh-brown-eggs-6',
    name: 'Farm Fresh Brown Eggs (6 pcs)',
    brand: 'Country Farms',
    category: 'Breakfast',
    price: 65,
    originalPrice: 72,
    discountPercent: 10,
    unit: '6 pcs carton',
    rating: 4.8,
    reviewsCount: '2.1k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRg9gCTGntrKz-UX2CB8vf00OCbBj69SDZEmCacHn_T6NDqh-UPIeNSehdOzfjvS1qLfLOptyFoKmekv50kh0ngrkaKzmIBHinYYMuKwVt20B77irnmV0gkoFZ4g8yXHoBUa2sfXYxO9zyLwkyVcmBFHrxED6DWiwY2UFM0fZ0Qi4Mm9pVw22D54OAvVeVn-cWUGnqaH0dxHngRORh78iz0mb7uT8wEFnXHlN_abq4QxGt1aKvFLCt',
    description: 'Free-range, grain-fed brown hen eggs rich in Omega-3 and natural protein.',
    tag: '10% OFF'
  },

  // Recommended & Quick Restock items
  {
    id: 'fresh-coriander-100g',
    name: 'Fresh Coriander 100g',
    brand: 'Farm Fresh',
    category: 'Fruits & Veg',
    price: 15,
    unit: '100g bunch',
    rating: 4.7,
    reviewsCount: '4k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BryDFh8jOGt2IpF9kd8jsNoxOLiOHUCuut2EBtV9TIvkDlfHLelwX1e6d0lG39uWxtTzvZnqEDOQ5MLp2hfGyOP2Ns6v1t2xVUP7DKjpMb_GEqZy887xVC-o3PPB28tUoyrWyb1PoJVgVmA3t7EuXgFByoGh-PhJ6peNoQKVn29mJEViuD0YrEuDaeDDF63y8ME5aIxfQi3Il31Z8H2JF9HFslquT2Xb4MPyG3IFOp21UwE3CwVJ',
    tag: 'Popular in Mumbai',
    tagColor: 'secondary-container'
  },
  {
    id: 'robusta-bananas-1kg',
    name: 'Robusta Bananas 1kg',
    brand: 'Farm Fresh',
    category: 'Fruits & Veg',
    price: 60,
    unit: '1kg (approx 5-6 pcs)',
    rating: 4.8,
    reviewsCount: '6.2k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdPclBTojiA0aMTMwHjcLPspFkvvkFt7Ra-zjlOje6qS0sYBXIg9aADyhxYsFgvvmtZQI7aG1fkwNb2FvXfXHII92F02OTGb1ICLIDaN_2sRhGQosuxw98dzcooobwMZAv6BWtXhgkQkQSYFTaUMfSWA21JPE82w0eF9bGAVBmNZsJAEJGyMV3gx2GYulTeHAPDQ1W-j4JZ4uk5yjSDXIa_v7AYQmXe-3OX-YWWCXxDfjhFn_wTL27',
    tag: 'Often bought together',
    tagColor: 'tertiary-fixed'
  },
  {
    id: 'amul-taaza-milk-1l',
    name: 'Amul Taaza Milk 1L',
    brand: 'Amul',
    category: 'Dairy',
    price: 54,
    unit: '1L pouch',
    rating: 4.9,
    reviewsCount: '15k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsN0aremtiHhIL_n_EPd9GMcm5-IyyCQo-XAFBaIiuaKX0OrOWAh6a1xbeP40GVHVx08TrgJt5CcgCKddyOfKqSybki6ae-EzKi9akxtGeWCkwX_Cn8oSmENugjFDv5qtHugp3ASnBNSQhftu12lTWVyDScaCF6HOtfiNekNX-UxwN7izgUWz4CZ17v_93CKV6ihUuGQULa6uOfWPCJPL2ZPxfLqYR9d9LLW9X4zOBr5Ya89c_vOId'
  },
  {
    id: 'artisan-brown-bread',
    name: 'Artisan Brown Bread (400g)',
    brand: 'Modern Bakery',
    category: 'Breakfast',
    price: 45,
    unit: '400g pack',
    rating: 4.6,
    reviewsCount: '1.5k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_f3TzGCxlPVsLyz-2PyCugmPzAAFLy5dNjl0slNrwyb_dX9Zsq_2Ht2iSBD0Kn_oamBlkh7luyN7rRLWYNKELxwnXiLrIn5EqEQixZ-Np61M2-xxf99Sc4LkeuOi1HcKhlQZdiaK312-BO1L33L1IQ6XhnUZC_xyi8WE4oMrH55-L6F-lPSQFLNTd33IU77bOUr76GhC84oLTUhm3Z_-rtapdCcr_E4ZWNTd83jZA--KEKbSvs5-'
  },
  {
    id: 'organic-spinach-2-bunches',
    name: 'Organic Spinach (Palak)',
    brand: 'Fresh Farms',
    category: 'Fruits & Veg',
    price: 120,
    unit: '2 Bunches',
    rating: 4.8,
    reviewsCount: '850',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BryDFh8jOGt2IpF9kd8jsNoxOLiOHUCuut2EBtV9TIvkDlfHLelwX1e6d0lG39uWxtTzvZnqEDOQ5MLp2hfGyOP2Ns6v1t2xVUP7DKjpMb_GEqZy887xVC-o3PPB28tUoyrWyb1PoJVgVmA3t7EuXgFByoGh-PhJ6peNoQKVn29mJEViuD0YrEuDaeDDF63y8ME5aIxfQi3Il31Z8H2JF9HFslquT2Xb4MPyG3IFOp21UwE3CwVJ',
    tag: 'Organic'
  },
  {
    id: 'toor-dal-1kg',
    name: 'Toor Dal (Yellow Lentils) 1kg',
    brand: 'Tata Sampann',
    category: 'Staples',
    price: 180,
    originalPrice: 195,
    discountPercent: 8,
    unit: '1kg pack',
    rating: 4.9,
    reviewsCount: '4.2k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZllQCb5OzFWhF1mUNTvfgOPPz50JV0BAvbDi5_KW3FiKjKJu83cQh9bLGWvm7sXRcn4NLrwvyTWGCbvcAKyh9s_Z4lG7exaosY_TkvHCvzCGaLHfK-VDWAMHIfjilV-g2f332_zsMGmVG2zBhVH1MS93mb5c1hvMr_drEr-ss009HzWoFn7gdJykBn-x21iDDFy5zjlNjFRaySQqHxxXKPP5Wf6X8YlbYrEbEUcc-I5nIzvYPr3Ez',
    tag: 'Unpolished'
  },

  // Biscuits & Cookies Under ₹100
  {
    id: 'britannia-bourbon-150g',
    name: 'Britannia Bourbon Chocolate Biscuits (150g)',
    brand: 'Britannia',
    category: 'Snacks & Biscuits',
    price: 35,
    originalPrice: 40,
    discountPercent: 12,
    unit: '150g pack',
    rating: 4.9,
    reviewsCount: '8.4k+',
    image: bourbonImg,
    description: 'Iconic chocolate sandwich biscuits with smooth dark chocolate cream filling and sparkling sugar sprinkles on crisp chocolate biscuits.',
    tag: 'Under ₹100'
  },
  {
    id: 'britannia-good-day-butter-200g',
    name: 'Britannia Good Day Butter Cookies (200g)',
    brand: 'Britannia',
    category: 'Snacks & Biscuits',
    price: 45,
    originalPrice: 50,
    discountPercent: 10,
    unit: '200g pack',
    rating: 4.8,
    reviewsCount: '12.5k+',
    image: goodDayImg,
    description: 'Rich and buttery melt-in-mouth cookies with signature curved smiles, baked to golden perfection with real dairy butter.',
    tag: 'Popular'
  },
  {
    id: 'dark-fantasy-choco-fills-75g',
    name: 'Sunfeast Dark Fantasy Choco Fills (75g)',
    brand: 'Sunfeast',
    category: 'Snacks & Biscuits',
    price: 40,
    originalPrice: 50,
    discountPercent: 20,
    unit: '75g pack',
    rating: 4.9,
    reviewsCount: '10.2k+',
    image: darkFantasyImg,
    description: 'Crispy chocolate cookie shell enveloping an irresistible molten choco-lava center that bursts with deep chocolate flavor.',
    tag: '20% OFF'
  },
  {
    id: 'nutrichoice-digestive-250g',
    name: 'NutriChoice Whole Wheat Digestive Biscuits (250g)',
    brand: 'Britannia',
    category: 'Snacks & Biscuits',
    price: 65,
    originalPrice: 75,
    discountPercent: 13,
    unit: '250g pack',
    rating: 4.7,
    reviewsCount: '6.1k+',
    image: digestiveImg,
    description: 'Wholesome high-fiber digestive biscuits baked with wheat bran, rolled oats, and essential dietary fiber. Zero trans fat.',
    tag: 'Healthy Snack'
  },
  {
    id: 'cadbury-oreo-vanilla-120g',
    name: 'Cadbury Oreo Vanilla Creme Biscuits (120g)',
    brand: 'Cadbury Oreo',
    category: 'Snacks & Biscuits',
    price: 40,
    originalPrice: 45,
    discountPercent: 11,
    unit: '120g pack',
    rating: 4.8,
    reviewsCount: '9.3k+',
    image: cremeCookiesImg,
    description: 'Rich dark cocoa embossed sandwich biscuits filled with velvety smooth sweet vanilla creme. The classic twist, lick, and dunk biscuit.',
    tag: 'Kids Favorite'
  }
];

export const INITIAL_PLANNED_ITEMS: PlannedItem[] = [
  {
    id: 'plan-1',
    name: 'Organic Spinach',
    brand: 'Fresh Farms',
    category: 'Produce & Fresh',
    quantity: '2 Bunches',
    price: 120,
    icon: 'nutrition',
    checked: true,
    productId: 'organic-spinach-2-bunches'
  },
  {
    id: 'plan-2',
    name: 'Paneer (Cottage Cheese)',
    brand: 'Dairy Best',
    category: 'Produce & Fresh',
    quantity: '500g',
    price: 240,
    icon: 'egg',
    checked: true,
    productId: 'premium-malai-paneer-200g'
  },
  {
    id: 'plan-3',
    name: 'Basmati Rice',
    brand: 'Premium Long Grain',
    category: 'Pantry Staples',
    quantity: '2 kg',
    price: 350,
    icon: 'grain',
    checked: true,
    productId: 'india-gate-basmati-5kg'
  },
  {
    id: 'plan-4',
    name: 'Toor Dal (Yellow Lentils)',
    brand: 'Unpolished',
    category: 'Pantry Staples',
    quantity: '1 kg',
    price: 180,
    icon: 'soup_kitchen',
    checked: true,
    productId: 'toor-dal-1kg'
  }
];

export const INITIAL_PAST_ORDERS: Order[] = [
  {
    id: 'SK-94821',
    date: 'Yesterday, 6:45 PM',
    itemsCount: 4,
    total: 820,
    status: 'Delivered',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 },
      { product: PRODUCTS[4], quantity: 2 }
    ]
  },
  {
    id: 'SK-93102',
    date: '24 Aug 2026',
    itemsCount: 6,
    total: 1450,
    status: 'Delivered',
    items: [
      { product: PRODUCTS[2], quantity: 1 },
      { product: PRODUCTS[3], quantity: 1 },
      { product: PRODUCTS[6], quantity: 2 }
    ]
  }
];
