import React, { useState, FC, FormEvent } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Star, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Filter, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Eye, 
  CreditCard,
  MessageCircle,
  PackageCheck
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';

export interface CricketProduct {
  id: string;
  name: string;
  category: 'kits' | 'bats' | 'protection' | 'balls' | 'apparel' | 'shoes';
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  specifications: string[];
  sizes?: string[];
}

export const ACADEMY_STORE_PRODUCTS: CricketProduct[] = [
  {
    id: 'prod-kit-1',
    name: 'Shanmukha Academy Complete Cadet Pro Kit (All-In-One)',
    category: 'kits',
    brand: 'Shanmukha Elite Series',
    price: 12999,
    originalPrice: 16499,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80',
    badge: 'Academy Mandatory / Best Value',
    inStock: true,
    description: 'The official all-in-one tournament & practice match kit bag designed for enrolled cadets. Contains English willow bat, match leg-guards, sausage gloves, titanium grille helmet, thigh guard, academy kit bag with wheels, and 2 sets of white & colored jerseys.',
    specifications: [
      'Grade 2 English Willow Bat with Knocking-in included',
      'High-Density Dual Wing Leg Guards (Pads)',
      'Split-Finger Pro Leather Batting Gloves',
      'BCCI & ICC Conformed Steel/Titanium Helmet',
      'Shanmukha Academy Heavy-Duty Wheelie Duffel Bag',
      'Dual Academy Training Jerseys with Custom Cadet Name & Number'
    ],
    sizes: ['Junior (Age 8-11)', 'Youth (Age 12-15)', 'Full Adult (Men/Women)']
  },
  {
    id: 'prod-bat-1',
    name: 'Shanmukha Signature Edition English Willow Bat',
    category: 'bats',
    brand: 'SG / Shanmukha Custom Craft',
    price: 8499,
    originalPrice: 10999,
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80',
    badge: 'Hand-Selected Grain',
    inStock: true,
    description: 'Expertly pressed from premium unbleached Grade-1 English Willow. Features massive 40mm contoured edges, feather-light pickup balance, and a mid-to-low sweet spot optimized for subcontinent bounce and driving power.',
    specifications: [
      'Wood: Handcrafted 8-11 Straight Grains Grade 1 English Willow',
      'Edges: 38mm - 41mm power edge profile',
      'Handle: 12-Piece Sarawak Semi-Oval Cane Handle with Chevron Grip',
      'Weight: 1160g - 1220g (Light pickup, dynamic power transfer)',
      'Pre-knocked with 10,000 mechanical mallet strikes at Academy lab'
    ],
    sizes: ['Short Handle (SH)', 'Long Handle (LH)', 'Harrow (Junior)']
  },
  {
    id: 'prod-bat-2',
    name: 'PowerStroke Kashmir Willow Match & Net Bat',
    category: 'bats',
    brand: 'SS Ton / Academy Special',
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    badge: 'Best for Daily Nets',
    inStock: true,
    description: 'High-density seasoned Kashmir Willow built for heavy daily net practice against high-speed leather bowling and Bola bowling machine balls without edge chipping.',
    specifications: [
      'Wood: Seasoned Grade 1 Kashmir Willow with Toe Guard',
      'Handle: 3-piece cane handle with shock-absorbent grip',
      'Weight: 1180g - 1240g',
      'Includes anti-scuff protective clear sheet pre-applied'
    ],
    sizes: ['Size 4', 'Size 5', 'Size 6', 'Full Size (SH)']
  },
  {
    id: 'prod-prot-1',
    name: 'Titanium Air-Flow Cricket Safety Helmet',
    category: 'protection',
    brand: 'Shrey / Shanmukha Co-Brand',
    price: 3899,
    originalPrice: 4899,
    rating: 4.9,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&w=800&q=80',
    badge: 'ICC 2026 Certified',
    inStock: true,
    description: 'Ultra-lightweight high-impact polymer shell with extended back-neck protection guard (StemGuard) and adjustable titanium face grille.',
    specifications: [
      'Certified: Meets latest BS 7928:2013 & ICC Safety Directives',
      'Weight: Only 720 grams',
      'Grille: High-tensile stainless steel/titanium wire for zero vision distortion',
      'Lining: Sweat-wicking dual-density EPS foam cushions with rotary dial adjuster'
    ],
    sizes: ['Small (54-56cm)', 'Medium (57-59cm)', 'Large (60-62cm)']
  },
  {
    id: 'prod-prot-2',
    name: 'Test Pro Ultra-Light Leg Guards (Batting Pads)',
    category: 'protection',
    brand: 'Kookaburra / Shanmukha',
    price: 3299,
    originalPrice: 4299,
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro Protection',
    inStock: true,
    description: '7-cane reinforced lightweight vertical bolsters with high-density Plastazote foam and ergonomically shaped knee pocket with gel cushioning.',
    specifications: [
      'Internal: Gel-reinforced knee bolster for shock absorption',
      'Straps: 50mm premium padded Lycra velcro straps with easy pull-tabs',
      'Ankle: Reinforced instep with durable PU piping'
    ],
    sizes: ['Boys (Junior)', 'Youth', 'Men Standard']
  },
  {
    id: 'prod-prot-3',
    name: 'Matrix Split-Finger Sausage Batting Gloves',
    category: 'protection',
    brand: 'SG / Shanmukha',
    price: 1799,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    badge: 'Soft Feel Pittards Palm',
    inStock: true,
    description: 'Highest tier sheepskin/Pittards leather palm with fiber impact inserts on the leading bottom two fingers and side-bar protection.',
    specifications: [
      'Palm: Premium Grade Pittards Sheep Leather for exceptional sweat grip',
      'Protection: Multi-flex split sausage blocks with high-density fiber inserts',
      'Thumb: 3-piece curved impact shield',
      'Wrist: 50mm double-sided sweatband with rubber Velcro strap'
    ],
    sizes: ['Youth', 'Adult Men Right-Hand', 'Adult Men Left-Hand']
  },
  {
    id: 'prod-ball-1',
    name: 'Official Shanmukha 4-Piece Alum Leather Match Balls (Box of 6)',
    category: 'balls',
    brand: 'Kookaburra / SG Club Match',
    price: 3499,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80',
    badge: 'BCCI KSCA Approved',
    inStock: true,
    description: 'Official 156g 4-piece alum-tanned leather balls with 80 hand-crafted linen stitches. Retains true seam and swing shape over 50 overs on hard turf wickets.',
    specifications: [
      'Core: Layered Portuguese cork and wool wound center',
      'Leather: Premium alum-tanned water-resistant English hide',
      'Available Colors: Test Red, ODI White, or Pink Day/Night',
      'Box Quantity: 6 Brand New Wrapped Match Balls'
    ],
    sizes: ['Red (Test)', 'White (T20)', 'Pink (Day-Night)']
  },
  {
    id: 'prod-app-1',
    name: 'Official Shanmukha Academy Match & Net Kit Uniform (Set of 2)',
    category: 'apparel',
    brand: 'Shanmukha Athletics',
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    badge: 'Mandatory Academy Wear',
    inStock: true,
    description: 'Official breathable Dry-Fit polo shirts and training track pants featuring UV-50+ sun protection and laser-perforated side ventilation panels.',
    specifications: [
      'Fabric: 100% Micro-Poly Dry-Fit Honeycomb Breathable Fabric',
      'Print: High-density sublimated Academy Crest + Custom Cadet Name & Squad No.',
      'Set includes: 1x White Match Polo + Pant, 1x Red/Navy Practice Training Set'
    ],
    sizes: ['XS (Age 8-10)', 'S (Age 11-13)', 'M (Age 14-16)', 'L (Full Adult)', 'XL', 'XXL']
  },
  {
    id: 'prod-shoe-1',
    name: 'All-Rounder Metal & Rubber Spikes Turf Cricket Shoes',
    category: 'shoes',
    brand: 'Asics / Payntr / Academy',
    price: 4299,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    badge: 'Turf & Astro Grip',
    inStock: true,
    description: 'Equipped with dual interchangeable metal spikes and rubber studs for seamless transition between turf match wickets and synthetic net practice.',
    specifications: [
      'Sole: High-grade TPU plate with 11 metal spike pin sockets + 11 rubber studs + key',
      'Cushioning: GEL forefoot and rearfoot shock-attenuation for bowling impact',
      'Upper: Lightweight water-resistant PU with reinforced toe cap'
    ],
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  }
];

interface AcademyStoreProps {
  onOpenBooking: () => void;
}

export const AcademyStore: React.FC<AcademyStoreProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<CricketProduct | null>(null);
  const [cart, setCart] = useState<{ product: CricketProduct; quantity: number; selectedSize: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cadetRollNo, setCadetRollNo] = useState('');

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'kits', label: 'Complete Kit Bags' },
    { id: 'bats', label: 'English & Kashmir Bats' },
    { id: 'protection', label: 'Helmets & Pads' },
    { id: 'balls', label: 'Leather Match Balls' },
    { id: 'apparel', label: 'Academy Uniforms' },
    { id: 'shoes', label: 'Spikes & Shoes' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? ACADEMY_STORE_PRODUCTS
    : ACADEMY_STORE_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: CricketProduct, size?: string) => {
    const sizeToUse = size || (product.sizes ? product.sizes[0] : 'Standard');
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === sizeToUse);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize === sizeToUse
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: sizeToUse }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      const item = updated[index];
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          updated.splice(index, 1);
        } else {
          updated[index] = { ...item, quantity: newQty };
        }
      }
      return updated;
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartSavings = cart.reduce((acc, item) => acc + (item.product.originalPrice - item.product.price) * item.quantity, 0);

  const handleCheckoutViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsSummary = cart.map(i => `• ${i.product.name} (${i.selectedSize}) x ${i.quantity} = ₹${(i.product.price * i.quantity).toLocaleString()}`).join('\n');
    
    const message = `🏏 *SHANMUKHA CRICKET ACADEMY - STORE ORDER*\n\n` +
      `*Buyer Name:* ${customerName || 'Cadet/Parent'}\n` +
      `*Phone:* ${customerPhone || 'N/A'}\n` +
      `*Cadet Enrollment/Batch:* ${cadetRollNo || 'New Trainee'}\n\n` +
      `*ORDERED ITEMS:*\n${itemsSummary}\n\n` +
      `*Total Payable:* ₹${cartTotal.toLocaleString()} (Saved ₹${cartSavings.toLocaleString()})\n\n` +
      `Please confirm stock availability, size allocation, and dispatch to academy locker / address.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ACADEMY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    setOrderSuccess(true);
  };

  return (
    <section id="store" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header with Cart Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Academy Pro Equipment Store</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Gear Up Like A <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">State Champion</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Original match-grade equipment, complete cadet starter kits, hand-knocked English willow bats, and protective gear verified by Coach Shanmukha. Trainees receive up to <strong>25% Cadet Subsidy</strong>.
            </p>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 border border-red-400/40 transition-all hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center animate-bounce">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
            <span>Academy Cart ({cart.length})</span>
          </button>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-white">100% Genuine Gear</p>
              <p className="text-slate-400 text-[11px]">BCCI / ICC Conformed</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Free Bat Knocking</p>
              <p className="text-slate-400 text-[11px]">10K Machine Strikes</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Direct Academy Delivery</p>
              <p className="text-slate-400 text-[11px]">Locker pickup or courier</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <PackageCheck className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Coach Sizing Help</p>
              <p className="text-slate-400 text-[11px]">Fit check before match</p>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-105 border border-red-400/50'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col overflow-hidden"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/60 backdrop-blur-md text-[10px] font-black text-amber-300 uppercase tracking-wider shadow-lg">
                    {product.badge}
                  </div>
                )}

                {/* Quick Details Trigger */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors"
                  title="View Specs"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 font-semibold">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Product Content & Buy Block */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-base group-hover:text-red-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="pt-1 space-y-1">
                    {product.specifications.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black text-white">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors text-center border border-slate-700"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Full Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="aspect-video w-full rounded-2xl overflow-hidden relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs font-bold text-amber-400">
                    {selectedProduct.brand}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-amber-400 text-xs font-bold uppercase">
                      {selectedProduct.badge || 'Academy Gear'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Full Specifications */}
                <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Technical Specifications & Academy Certification
                  </h4>
                  <div className="space-y-2">
                    {selectedProduct.specifications.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size options if available */}
                {selectedProduct.sizes && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Select Trainee Size:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <span key={sz} className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-2xl font-black text-white">₹{selectedProduct.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 line-through ml-2">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/40 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Academy Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sliding Shopping Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-slate-800 shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                  <h3 className="font-black text-white text-lg uppercase tracking-tight">Academy Kit Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                    <p className="text-slate-400 font-medium text-sm">Your Academy Cart is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
                    >
                      Browse Equipment
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-bold text-white text-xs truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-amber-400 font-medium">Size: {item.selectedSize}</p>
                        <p className="text-xs font-bold text-white">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleUpdateQty(index, -item.quantity)}
                          className="text-slate-500 hover:text-red-400 text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-1.5 py-0.5">
                          <button onClick={() => handleUpdateQty(index, -1)} className="text-slate-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                          <button onClick={() => handleUpdateQty(index, 1)} className="text-slate-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & WhatsApp Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/90 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Total Gear Value</span>
                      <span>₹{(cartTotal + cartSavings).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Cadet Special Subsidy</span>
                      <span>- ₹{cartSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                      <span>Total Amount</span>
                      <span className="text-amber-400">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {orderSuccess ? (
                    <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-2xl text-center space-y-2">
                      <Check className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                      <p className="text-xs font-bold text-white">Order Sent via WhatsApp!</p>
                      <p className="text-[11px] text-slate-300">Our kit manager is preparing your gear sizes. You will receive invoice details shortly.</p>
                      <button
                        onClick={() => {
                          setCart([]);
                          setOrderSuccess(false);
                          setIsCartOpen(false);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCheckoutViaWhatsApp} className="space-y-3">
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Cadet / Parent Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-red-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp Phone Number"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-red-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Academy Roll No. / Batch (Optional)"
                          value={cadetRollNo}
                          onChange={(e) => setCadetRollNo(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-transform active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Order & Pay via WhatsApp Desk</span>
                      </button>
                      <p className="text-[10px] text-center text-slate-400">
                        Supports UPI, Card, Net Banking & Cash on Academy Locker Delivery.
                      </p>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
