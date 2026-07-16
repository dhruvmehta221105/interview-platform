import { motion } from 'framer-motion';
import { Building2, Play, MessageSquareText, TrendingUp } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Building2,
    title: 'Choose Your Company',
    description: 'Select from 50+ companies including Google, Amazon, Microsoft, and more. Pick your role and interview type.',
  },
  {
    step: '02',
    icon: Play,
    title: 'Start Your Interview',
    description: 'Begin a realistic AI-powered or HR expert interview session tailored to the company\'s actual interview process.',
  },
  {
    step: '03',
    icon: MessageSquareText,
    title: 'Receive AI Analysis',
    description: 'Get instant, detailed feedback on your communication, technical skills, problem-solving, and overall performance.',
  },
  {
    step: '04',
    icon: TrendingUp,
    title: 'Track & Improve',
    description: 'Monitor your progress over time with analytics, identify weak areas, and keep improving until you\'re interview-ready.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[13px] font-semibold text-accent uppercase tracking-[2px] mb-4">
            How It Works
          </span>
          <h2 className="text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold text-text tracking-[-1.5px] leading-[1.1] mb-5">
            Four steps to interview mastery.
          </h2>
          <p className="text-[17px] text-text-secondary max-w-[480px] mx-auto leading-[1.7]">
            A simple, structured approach to help you prepare
            systematically and land offers with confidence.
          </p>
        </motion.div>

        <div className="relative max-w-[680px] mx-auto">
          <div className="absolute left-[23px] top-[60px] bottom-[60px] w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-[48px] h-[48px] rounded-2xl bg-bg-card border border-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(31,94,59,0.1)]">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>

                  <div className="flex-1 bg-bg-card rounded-2xl p-6 border border-border/60 group-hover:border-accent/20 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[12px] font-bold text-accent tracking-wide">{step.step}</span>
                      <h3 className="text-[16px] font-bold text-text tracking-[-0.3px]">{step.title}</h3>
                    </div>
                    <p className="text-[14px] text-text-secondary leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
