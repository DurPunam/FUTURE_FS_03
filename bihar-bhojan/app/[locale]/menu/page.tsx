'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { SearchBar } from '@/components/menu/SearchBar';
import Cart from '@/components/cart/Cart';
import menuData from '@/data/menu.json';
import { MenuCategory, MenuItem } from '@/lib/types';

type DietaryPreference = 'all' | 'veg' | 'non-veg';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return menuData.menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDietary = selectedDietary === 'all' || 
        (selectedDietary === 'veg' && item.isVeg) ||
        (selectedDietary === 'non-veg' && !item.isVeg);
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesDietary && matchesSearch;
    }) as MenuItem[];
  }, [selectedCategory, selectedDietary, searchQuery]);

  const DIETARY_OPTIONS: DietaryPreference[] = ['all', 'veg', 'non-veg'];
  const DIETARY_COLORS = {
    all: 'bg-[#C2410C]',
    veg: 'bg-[#27AE60]',
    'non-veg': 'bg-[#DC2626]',
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-light max-w-2xl mx-auto">
              Explore our authentic Bihari delicacies, crafted with love and tradition
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={(cat) => setSelectedCategory(cat)} />
            
            {/* Inline Dietary Filter */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Dietary Preference
              </label>
              <div className="flex gap-2 flex-wrap">
                {DIETARY_OPTIONS.map((dietary) => {
                  const isActive = selectedDietary === dietary;
                  return (
                    <motion.button
                      key={dietary}
                      onClick={() => setSelectedDietary(dietary)}
                      className={`
                        px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                        transition-colors duration-200 min-w-fit
                        ${
                          isActive
                            ? `${DIETARY_COLORS[dietary]} text-white shadow-md`
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {dietary === 'all' ? 'All' : dietary === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-900 dark:text-gray-100 text-lg">
            Showing <span className="font-bold text-terracotta dark:text-turmeric">{filteredItems.length}</span> dishes
          </p>
        </motion.div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <MenuItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No dishes found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>

      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-terracotta text-white p-4 rounded-full shadow-2xl hover:bg-terracotta-dark transition-all duration-300 z-40"
        aria-label="Open cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </motion.button>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
