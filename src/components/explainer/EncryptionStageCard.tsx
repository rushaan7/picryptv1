
import { motion } from 'framer-motion';

interface EncryptionStage {
  id: number;
  title: string;
  description: string;
  example: string;
  color: string;
}

interface EncryptionStageCardProps {
  stage: EncryptionStage;
}

export default function EncryptionStageCard({ stage }: EncryptionStageCardProps) {
  const colorClasses = {
    'white': {
      bg: 'bg-white/[0.02]',
      border: 'border-white/[0.08]',
      text: 'text-white',
      glow: 'shadow-white/10'
    },
    'gray': {
      bg: 'bg-gray-500/[0.02]',
      border: 'border-gray-500/[0.08]',
      text: 'text-gray-300',
      glow: 'shadow-gray-500/10'
    },
    'academia-accent': {
      bg: 'bg-academia-accent/10',
      border: 'border-academia-accent/30',
      text: 'text-academia-accent',
      glow: 'shadow-academia-accent/20'
    },
    'academia-highlight': {
      bg: 'bg-academia-highlight/10',
      border: 'border-academia-highlight/30',
      text: 'text-academia-highlight',
      glow: 'shadow-academia-highlight/20'
    }
  };

  // Fallback to white if color doesn't exist
  const colors = colorClasses[stage.color as keyof typeof colorClasses] || colorClasses.white;

  return (
    <motion.div
      className={`${colors.bg} ${colors.border} border rounded-2xl p-8 mb-8 backdrop-blur-sm ${colors.glow} transition-all duration-300`}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-6">
        <div className={`flex-shrink-0 w-16 h-16 ${colors.bg} ${colors.border} border rounded-full flex items-center justify-center`}>
          <span className={`text-2xl font-light ${colors.text}`}>
            {stage.id}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className={`text-2xl font-light ${colors.text} mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}>
            {stage.title}
          </h3>
          <p className="text-gray-400 text-lg mb-4 font-light">
            {stage.description}
          </p>
          <div className="bg-black/50 border border-white/[0.05] rounded-lg p-4">
            <code className="font-mono text-gray-300 text-sm">
              {stage.example}
            </code>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
