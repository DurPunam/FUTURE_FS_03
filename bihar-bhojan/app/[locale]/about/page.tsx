'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Users, Clock, Sparkles, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-2xl text-[#FEF3E7]">A Journey Through Bihar&apos;s Culinary Heritage</p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#FEF3E7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Sparkles className="w-12 h-12 text-[#F59E0B] mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-[#111827] mb-6">
                Preserving Tradition, One Dish at a Time
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Bihar Bhojan was born from a deep love for Bihar&apos;s rich culinary heritage. 
                Our journey began with a simple mission: to bring the authentic flavors of 
                Bihar to food lovers everywhere, preserving centuries-old recipes and cooking 
                techniques passed down through generations.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Every dish we serve tells a story of tradition, culture, and the warmth of 
                Bihari hospitality. From the iconic Litti Chokha to the nutritious Sattu 
                delicacies, we celebrate the diversity and richness of Bihar&apos;s food culture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-[#111827] mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What makes us special</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Heart,
                title: 'Made with Love',
                description: 'Every dish is prepared with care, passion, and respect for tradition',
                color: '#C2410C'
              },
              {
                icon: Award,
                title: 'Authentic Recipes',
                description: 'Traditional recipes passed down through generations of Bihari families',
                color: '#F59E0B'
              },
              {
                icon: Users,
                title: 'Community First',
                description: 'We source ingredients from local farmers and support our community',
                color: '#15803D'
              },
              {
                icon: UtensilsCrossed,
                title: 'Quality Ingredients',
                description: 'Fresh, high-quality ingredients sourced daily for authentic taste',
                color: '#C2410C'
              },
              {
                icon: Clock,
                title: 'Time-Honored Methods',
                description: 'Traditional cooking techniques that bring out the best flavors',
                color: '#F59E0B'
              },
              {
                icon: Sparkles,
                title: 'Cultural Pride',
                description: 'Celebrating and preserving Bihar&apos;s rich culinary heritage',
                color: '#15803D'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-[#FEF3E7] p-8 rounded-2xl shadow-lg"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4" style={{ color: value.color }} />
                <h3 className="text-2xl font-bold text-[#111827] mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#FEF3E7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-[#111827] mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Bihar Bhojan</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Chef Rajesh Kumar',
                role: 'Head Chef',
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800',
                description: '25 years of experience in traditional Bihari cuisine'
              },
              {
                name: 'Priya Singh',
                role: 'Restaurant Manager',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
                description: 'Ensuring every guest feels at home'
              },
              {
                name: 'Amit Sharma',
                role: 'Sous Chef',
                image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=800',
                description: 'Specializing in traditional sweets and desserts'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">{member.name}</h3>
                  <p className="text-[#C2410C] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Experience Our Hospitality
            </h2>
            <p className="text-xl mb-10 text-[#FEF3E7]">
              Visit us today and taste the authentic flavors of Bihar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#C2410C] px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
                >
                  View Menu
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
