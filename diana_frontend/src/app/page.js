"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { icons, featureIcons } from "@/config/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl mb-8 sm:mb-10 shadow-xl border border-primary/20"
            >
              <icons.logo className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-foreground leading-tight"
            >
              Meet Diana
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
            >
              The future of AI conversation is here. Experience seamless voice interactions, 
              multi-agent intelligence, and limitless possibilities with Diana.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            >
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-lg font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                >
                  Start Chatting
                  <icons.arrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-border text-foreground rounded-lg font-semibold text-lg sm:text-xl hover:bg-secondary hover:border-primary/50 transition-all duration-200 w-full sm:w-auto"
              >
                <icons.play className="w-5 h-5 sm:w-6 sm:h-6" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements - Hidden on mobile for better performance */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-20 left-4 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-primary/20 rounded-full"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-40 right-4 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 bg-accent/20 rounded-full"
        />
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute bottom-20 left-4 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 bg-primary/30 rounded-full"
        />
      </motion.section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">Powerful Features</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Discover the capabilities that make Diana the ultimate AI assistant
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featureIcons.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -4, 
                  transition: { duration: 0.2 }
                }}
                className="group p-6 sm:p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                  <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "< 100ms", label: "Response Time" },
              { number: "50+", label: "Languages" },
              { number: "24/7", label: "Available" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className="p-6 sm:p-8 group cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors duration-200">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Experience the Future?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 px-4">
              Join thousands of users who have already transformed their workflow with Diana
            </p>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-lg font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200 mx-auto w-full sm:w-auto"
              >
                Get Started Now
                <icons.arrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
