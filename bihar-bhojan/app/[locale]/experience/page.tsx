'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000"
            alt="Dining Experience"
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">The Experience</h1>
          <p className="text-2xl text-[#FEF3E7]">Dine in the heart of Bihari tradition</p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-[#FEF3E7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Sparkles className="w-12 h-12 text-[#F59E0B] mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-[#111827] mb-6">
                A Culinary Journey
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Experience the warmth of Bihari hospitality with every visit. From the moment you step in,
                we invite you to savor authentic flavors in a setting that honors tradition and comfort.
              </p>
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#C2410C] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-[#9A3412] transition-all duration-300"
                >
                  View Menu
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
