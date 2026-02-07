'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, UtensilsCrossed, Clock } from 'lucide-react';

export default function HomePage() {

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Full Screen Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000"
            alt="Authentic Bihari Cuisine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Bihar Bhojan
          </h1>
          
          <p className="text-2xl md:text-3xl text-[#FEF3E7] mb-4 font-light">
            Authentic Bihari Heritage Cuisine
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience the rich flavors and traditions of Bihar in every bite
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C2410C] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:bg-[#9A3412] transition-all duration-300 w-full sm:w-auto"
              >
                Order on WhatsApp
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                Book a Table
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-[#FEF3E7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold text-[#111827] mb-6">
              A Taste of Tradition
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Bihar Bhojan brings you the authentic flavors of Bihar&apos;s rich culinary heritage. 
              From the famous Litti Chokha to traditional Sattu delicacies, every dish tells a story 
              of generations of culinary excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <UtensilsCrossed className="w-12 h-12 text-[#C2410C] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#111827] mb-3">Authentic Recipes</h3>
                <p className="text-gray-600">Traditional recipes passed down through generations</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <Sparkles className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#111827] mb-3">Fresh Ingredients</h3>
                <p className="text-gray-600">Sourced daily from local markets for authentic taste</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <Clock className="w-12 h-12 text-[#15803D] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#111827] mb-3">Made with Love</h3>
                <p className="text-gray-600">Every dish prepared with care and tradition</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-[#111827] mb-4">
              Signature Dishes
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most loved traditional delicacies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Litti Chokha',
                desc: 'Traditional roasted wheat balls with mashed vegetables',
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800'
              },
              {
                name: 'Sattu Paratha',
                desc: 'Wholesome flatbread stuffed with roasted gram flour',
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800'
              },
              {
                name: 'Bihari Thali',
                desc: 'Complete traditional meal with multiple delicacies',
                image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800'
              }
            ].map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                    <p className="text-gray-200">{dish.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C2410C] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-[#9A3412] transition-all duration-300"
              >
                View Full Menu
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#C2410C] to-[#9A3412] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Experience Bihar?
            </h2>
            <p className="text-xl mb-10 text-[#FEF3E7]">
              Order now on WhatsApp or book a table for an unforgettable dining experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#C2410C] px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
                >
                  Order Now
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  Book a Table
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
