import { motion } from 'framer-motion';
import { Clock, HelpCircle, Briefcase, BarChart2 } from 'lucide-react';

const companies = [
  { name: 'Google', difficulty: 'Hard', questions: 340, role: 'SDE, PM, DS', time: '45 min', color: '#EA4335' },
  { name: 'Amazon', difficulty: 'Hard', questions: 420, role: 'SDE, TPM, BA', time: '60 min', color: '#FF9900' },
  { name: 'Microsoft', difficulty: 'Medium', questions: 290, role: 'SDE, PM, DE', time: '45 min', color: '#00A4EF' },
  { name: 'Netflix', difficulty: 'Hard', questions: 180, role: 'SDE, PM', time: '50 min', color: '#E50914' },
  { name: 'Adobe', difficulty: 'Medium', questions: 210, role: 'SDE, Designer', time: '40 min', color: '#FF0000' },
  { name: 'Uber', difficulty: 'Medium', questions: 260, role: 'SDE, PM, DS', time: '45 min', color: '#000000' },
  { name: 'Flipkart', difficulty: 'Medium', questions: 195, role: 'SDE, PM', time: '40 min', color: '#F7D21E' },
  { name: 'Goldman Sachs', difficulty: 'Hard', questions: 150, role: 'SDE, Analyst', time: '50 min', color: '#6D9DC5' },
];

function getDifficultyStyle(level) {
  switch (level) {
    case 'Hard':
      return 'bg-red-50 text-red-700';
    case 'Medium':
      return 'bg-amber-50 text-amber-700';
    default:
      return 'bg-green-50 text-green-700';
  }
}

export default function CompanyLibrary() {
  return (
    <section id="companies" className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[13px] font-semibold text-accent uppercase tracking-[2px] mb-4">
            Company Library
          </span>
          <h2 className="text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold text-text tracking-[-1.5px] leading-[1.1] mb-5">
            Practice for your dream company.
          </h2>
          <p className="text-[17px] text-text-secondary max-w-[500px] mx-auto leading-[1.7]">
            Access curated interview questions and preparation materials
            from the world's top technology companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-bg-card rounded-2xl border border-border/60 p-5 hover:border-accent/20 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[13px]"
                    style={{ backgroundColor: company.color }}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-text">{company.name}</h3>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getDifficultyStyle(company.difficulty)}`}>
                  {company.difficulty}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{company.questions}+ questions</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{company.role}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{company.time} avg</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
