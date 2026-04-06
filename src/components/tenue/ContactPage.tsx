'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: 'hover:bg-blue-600' },
  { name: 'TikTok', icon: Send, url: 'https://tiktok.com', color: 'hover:bg-neutral-600' },
];

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Casablanca, Morocco' },
  { icon: Phone, label: 'Phone', value: '+212 600 000 000' },
  { icon: Mail, label: 'Email', value: 'contact@tenuestyle.ma' },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9:00 - 18:00' },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: 'Message sent!',
      description: 'We will get back to you as soon as possible.',
    });
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-2">
            Get in Touch
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto">
            Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <motion.div variants={fadeUp} custom={0}>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">Contact Info</h3>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} custom={2}>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-transparent transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className={`h-4 w-4 ${social.name === 'TikTok' ? 'rotate-[-30deg]' : ''}`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-neutral-800 bg-neutral-950 p-8 sm:p-12 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="h-7 w-7 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 rounded-none text-xs tracking-wider uppercase"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                custom={0}
                onSubmit={handleSubmit}
                className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-5"
              >
                <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-2">
                  Send a Message
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email"
                      required
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-neutral-400 uppercase tracking-wider">Subject</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-neutral-400 uppercase tracking-wider">Message *</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    required
                    rows={5}
                    className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none mt-1.5 text-sm resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-neutral-200 rounded-none px-8 py-5 text-sm tracking-[0.15em] uppercase font-medium h-auto w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
