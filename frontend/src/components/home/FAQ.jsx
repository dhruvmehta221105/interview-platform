import { useState } from "react";

const FAQS = [
  {
    q: "Is InterviewX free to use?",
    a: "Yes! Our Free plan gives you 5 AI-powered interview sessions per month at no cost. You can upgrade to Pro anytime for unlimited access and advanced features like speech analysis and eye contact detection.",
  },
  {
    q: "How realistic are the AI interview questions?",
    a: "Very realistic. Our AI is trained on thousands of actual interview questions from top companies. It also adapts based on your resume and the role you're targeting, and asks follow-up questions just like a real interviewer.",
  },
  {
    q: "Does InterviewX support coding interviews?",
    a: "Yes. We have a dedicated Coding Round module that includes DSA challenges, system design questions, and code quality review. You can practice in our built-in code editor with AI evaluation.",
  },
  {
    q: "How does the AI feedback work?",
    a: "After each interview, our AI generates a comprehensive report covering communication, confidence, vocabulary, grammar, eye contact, speech pace, and technical accuracy. Each dimension is scored and explained with specific improvement tips.",
  },
  {
    q: "Can I practice for non-tech roles?",
    a: "Absolutely. InterviewX covers 50+ categories including Product Management, Finance, Marketing, Sales, Healthcare, Consulting, and more. Each category has role-specific question banks.",
  },
  {
    q: "Is my interview data secure and private?",
    a: "Your privacy is our top priority. Interview sessions are encrypted, never shared with third parties, and you can delete your data at any time from your profile settings. We're fully GDPR compliant.",
  },
  {
    q: "Can I review my past interviews?",
    a: "Yes, on Pro plan all your interview sessions are recorded and saved. You can replay them, re-read transcripts, and compare your scores over time to track improvement.",
  },
  {
    q: "Do you offer team or university plans?",
    a: "Yes! Our Enterprise plan is designed for coding bootcamps, universities, and corporate training teams. Contact our sales team for custom pricing and dedicated onboarding.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" style={{ padding: "120px 60px", background: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#8a8a9a",
            background: "#f8f9fb", border: "1px solid #e8e8f0",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
          }}>
            FAQ
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.1, marginBottom: 16,
          }}>
            Frequently Asked
          </h2>
          <p style={{ fontSize: 18, color: "#5a5a6a", maxWidth: 380, margin: "0 auto", lineHeight: 1.7 }}>
            Everything you need to know about InterviewX.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQS.map((faq, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #f0f0f5",
              }}
            >
              {/* Question Row */}
              <button
                onClick={() => toggle(index)}
                style={{
                  width: "100%", display: "flex",
                  alignItems: "center", justifyContent: "space-between",
                  padding: "22px 0",
                  background: "transparent", border: "none",
                  cursor: "pointer", textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 600,
                  color: openIndex === index ? "#0a0a0a" : "#2a2a3a",
                  letterSpacing: "-0.01em",
                  flex: 1,
                  transition: "color 0.15s",
                }}>
                  {faq.q}
                </span>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: openIndex === index ? "#0a0a0a" : "#f8f9fb",
                  border: `1px solid ${openIndex === index ? "#0a0a0a" : "#e8e8f0"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}>
                  <svg
                    width="12" height="12"
                    fill="none"
                    stroke={openIndex === index ? "#fff" : "#4a4a5a"}
                    strokeWidth="2.5" viewBox="0 0 24 24"
                    style={{
                      transform: openIndex === index ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div style={{
                maxHeight: openIndex === index ? "300px" : "0",
                overflow: "hidden",
                transition: "max-height 0.35s ease",
              }}>
                <p style={{
                  fontSize: 15, color: "#5a5a6a", lineHeight: 1.75,
                  paddingBottom: 22, paddingRight: 48,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <p style={{ fontSize: 15, color: "#8a8a9a" }}>
            Still have questions?{" "}
            <a href="mailto:info@interviewx.com" style={{
              color: "#0a0a0a", fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}>
              Email us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
