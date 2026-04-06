'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/212600000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      <span className="absolute right-full mr-3 bg-white text-neutral-900 text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
