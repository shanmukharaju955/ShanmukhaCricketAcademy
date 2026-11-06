import React, { useState } from 'react';
import {
    Image as ImageIcon,
    Sparkles,
    Layers,
    ZoomIn,
    X,
    Play,
    Video,
    Award,
    ShieldCheck,
    ChevronRight,
    Filter
} from 'lucide-react';

interface GalleryItem {
    id: string;
    title: string;
    category: 'facilities' | 'matches' | 'training' | 'trophies';
    imageUrl: string;
    caption: string;
    badge?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 'g1',
        title: 'Floodlit International Standard Turf Nets',
        category: 'facilities',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
        caption: '8 competitive turf pitches with red soil and black clay wickets for day & night practice sessions.',
        badge: 'Infrastructure'
    },
    {
        id: 'g2',
        title: 'State League Championship Winning Moment',
        category: 'matches',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Shanmukha Cricket Academy U-19 team lifting the KSCA Inter-Club Division Championship Trophy.',
        badge: 'Championship'
    },
    {
        id: 'g3',
        title: 'High-Speed Video Biomechanics Stroke Lab',
        category: 'training',
        imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1200&q=80',
        caption: '240FPS high-speed cameras analyzing bat swing path, weight transfer and impact points.',
        badge: 'AI Biomechanics'
    },
    {
        id: 'g4',
        title: 'Bola 283 True-Speed Bowling Machines',
        category: 'facilities',
        imageUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Advanced digital bowling machines delivering outswing, inswing, off-spin & leg-cutters up to 155 km/h.',
        badge: 'High-Tech'
    },
    {
        id: 'g5',
        title: 'Morning Fielding & Slip-Catching Drills',
        category: 'training',
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-intensity reflex catching, direct-hit target boards and diving catch agility routines.',
        badge: 'Fitness'
    },
    {
        id: 'g6',
        title: 'Ranji Trophy & IPL Alumni Felicitations',
        category: 'trophies',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Celebrating our academy stars drafted into State Ranji squads and IPL developmental camps.',
        badge: 'Alumni Pride'
    },
    {
        id: 'g7',
        title: 'Junior Cadets Masterclass with Coach Shanmukha',
        category: 'training',
        imageUrl: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Foundational stance, grip mechanics, and backlift balance coaching for U-12 trainees.',
        badge: 'Grassroots'
    },
    {
        id: 'g8',
        title: 'Annual Inter-Academy Day-Night T20 Cup',
        category: 'matches',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-octane night tournament with white balls, colored clothing, and digital live stream scoreboards.',
        badge: 'Tournaments'
    }
];

export const AcademyGallery: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'facilities' | 'matches' | 'training' | 'trophies'>('all');
    const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

    const filteredItems = selectedFilter === 'all'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

    const filters = [
        { label: 'All Media', value: 'all' },
        { label: 'Turf Nets & Grounds', value: 'facilities' },
        { label: 'Live Matches & Cups', value: 'matches' },
        { label: 'AI & Coaching Drills', value: 'training' },
        { label: 'Alumni & Trophies', value: 'trophies' },
    ];

    return (
        <section id="gallery" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800/80">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

                {/* Section Heading */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Academy Photo & Video Gallery</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                        Life at <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Shanmukha Academy</span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base">
                        Explore our world-class turf grounds, high-tech bowling machines, tournament triumphs, and rigorous drill sessions.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setSelectedFilter(filter.value as any)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedFilter === filter.value
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-105 border border-red-400/40'
                                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveModalItem(item)}
                            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer"
                        >
                            {/* Image with zoom effect */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Badge */}
                                {item.badge && (
                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-red-500/40 backdrop-blur-md text-[10px] font-black text-amber-400 uppercase tracking-wider">
                                        {item.badge}
                                    </div>
                                )}

                                {/* Zoom Icon Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/50">
                                        <ZoomIn className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-4 space-y-1.5">
                                <h3 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                    {item.caption}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Zoomed View */}
                {activeModalItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
                        <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="aspect-video w-full overflow-hidden relative">
                                <img
                                    src={activeModalItem.imageUrl}
                                    alt={activeModalItem.title}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            <div className="p-6 sm:p-8 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-amber-400 text-xs font-bold uppercase">
                                        {activeModalItem.badge}
                                    </span>
                                    <span className="text-xs text-slate-400 uppercase font-semibold">
                                        Category: {activeModalItem.category}
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white">
                                    {activeModalItem.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {activeModalItem.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};
