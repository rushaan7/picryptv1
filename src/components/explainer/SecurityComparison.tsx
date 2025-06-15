
import { motion } from 'framer-motion';

export default function SecurityComparison() {
  const advantages = [
    {
      aspect: "Zero Key Management",
      description: "Revolutionary approach using mathematical constant π - no keys to store, exchange, or compromise",
      icon: "🔑"
    },
    {
      aspect: "Ultra-Lightweight",
      description: "Minimal computational overhead with simple arithmetic operations - perfect for any device",
      icon: "⚡"
    },
    {
      aspect: "Mathematical Foundation",
      description: "Built on the infinite, non-repeating digits of π - leveraging pure mathematical constants",
      icon: "∞"
    },
    {
      aspect: "Instant Implementation",
      description: "Deploy in minutes with just a few lines of code - no complex libraries or dependencies",
      icon: "🚀"
    },
    {
      aspect: "Universal Compatibility",
      description: "Works seamlessly across all platforms and programming languages without modification",
      icon: "🌐"
    },
    {
      aspect: "Educational Excellence",
      description: "Perfect introduction to cryptography - understand encryption principles through mathematical beauty",
      icon: "🎓"
    },
    {
      aspect: "Predictable Performance",
      description: "Consistent, deterministic results with no randomization overhead - reliable every time",
      icon: "📊"
    },
    {
      aspect: "Memory Efficient",
      description: "Minimal memory footprint - ideal for embedded systems and resource-constrained environments",
      icon: "💾"
    }
  ];

  return (
    <section className="py-24 bg-black relative section-animate">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-8">
            Revolutionary Advantages
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Discover why π-based encryption represents the future of cryptographic innovation
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.aspect}
                className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center text-2xl">
                    {advantage.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                      {advantage.aspect}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.01] to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/[0.02] border border-white/[0.08] rounded-full">
            <span className="text-2xl mr-3">π</span>
            <span className="text-white/80 font-light">
              The mathematical constant that powers the future of encryption
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
