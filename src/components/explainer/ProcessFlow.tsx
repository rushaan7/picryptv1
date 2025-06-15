
import { motion } from 'framer-motion';
import EncryptionStageCard from './EncryptionStageCard';
import AnimatedConnectionArrow from './AnimatedConnectionArrow';

export default function ProcessFlow() {
  const stages = [
    {
      id: 1,
      title: "Text Normalization",
      description: "Convert input text to ASCII character codes",
      example: "'Hello' → [72, 101, 108, 108, 111]",
      color: "white"
    },
    {
      id: 2,
      title: "π-Digit Generation",
      description: "Extract corresponding π digits for each position",
      example: "π[0-4] → [3, 1, 4, 1, 5]",
      color: "gray"
    },
    {
      id: 3,
      title: "Character Transformation",
      description: "Apply cipher formula to each character",
      example: "(72+3) mod 65536 → 75 → 'K'",
      color: "white"
    },
    {
      id: 4,
      title: "Output Encoding",
      description: "Combine transformed characters into final result",
      example: "[75, 102, 112, 109, 116] → 'Kfpmtǅ'",
      color: "gray"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950/50 section-animate">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-8">
            Encryption Process
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Step-by-step visualization of how text transforms through the π-based cipher
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <EncryptionStageCard stage={stage} />
              </motion.div>
              
              {index < stages.length - 1 && (
                <AnimatedConnectionArrow delay={index * 0.2 + 0.4} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
