import { motion } from 'framer-motion';

const companies = [
  { name: 'Google', logo: 'G' },
  { name: 'Microsoft', logo: 'M' },
  { name: 'Amazon', logo: 'A' },
  { name: 'Adobe', logo: 'Ad' },
  { name: 'Atlassian', logo: 'At' },
  { name: 'Uber', logo: 'U' },
  { name: 'Stripe', logo: 'S' },
  { name: 'Meta', logo: 'Me' },
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[13px] font-semibold text-text-secondary uppercase tracking-[2px] mb-10"
        >
          Trusted by professionals at
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-text/8 flex items-center justify-center">
                <span className="text-[12px] font-bold text-text">{company.logo}</span>
              </div>
              <span className="text-[15px] font-semibold text-text tracking-[-0.3px]">{company.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
