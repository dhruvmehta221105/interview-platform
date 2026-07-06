import Marquee from "react-fast-marquee";

const COMPANIES_ROW1 = [
  { name: "Google", abbr: "G" },
  { name: "Amazon", abbr: "amz" },
  { name: "Microsoft", abbr: "ms" },
  { name: "Meta", abbr: "M" },
  { name: "Tesla", abbr: "T" },
  { name: "Adobe", abbr: "Adbe" },
  { name: "OpenAI", abbr: "AI" },
  { name: "Stripe", abbr: "S" },
  { name: "Netflix", abbr: "N" },
];

const COMPANIES_ROW2 = [
  { name: "Uber", abbr: "U" },
  { name: "Airbnb", abbr: "A" },
  { name: "LinkedIn", abbr: "in" },
  { name: "Salesforce", abbr: "SF" },
  { name: "Atlassian", abbr: "At" },
  { name: "Notion", abbr: "N" },
  { name: "Figma", abbr: "F" },
  { name: "Slack", abbr: "Sl" },
  { name: "Dropbox", abbr: "D" },
];

function LogoItem({ company }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 28px",
      cursor: "default",
    }}>
      <div style={{
        width: 32,
        height: 32,
        background: "#f0f0f5",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        color: "#8a8a9a",
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}>
        {company.abbr.substring(0, 2).toUpperCase()}
      </div>
      <span style={{
        fontSize: 15,
        fontWeight: 600,
        color: "#c4c4d4",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        transition: "color 0.2s",
      }}>
        {company.name}
      </span>
    </div>
  );
}

export default function TrustedMarquee() {
  return (
    <section style={{
      padding: "80px 0 80px",
      background: "#fff",
      borderTop: "1px solid #f0f0f5",
      borderBottom: "1px solid #f0f0f5",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8a8a9a",
          marginBottom: 0,
        }}>
          Trusted by professionals from the world's best companies
        </p>
      </div>

      {/* Row 1 — Left */}
      <div style={{ marginBottom: 20 }}>
        <Marquee speed={35} gradient={true} gradientColor={[255, 255, 255]} gradientWidth={80}>
          {COMPANIES_ROW1.map((c, i) => (
            <LogoItem key={i} company={c} />
          ))}
        </Marquee>
      </div>

      {/* Row 2 — Right */}
      <div>
        <Marquee speed={28} direction="right" gradient={true} gradientColor={[255, 255, 255]} gradientWidth={80}>
          {COMPANIES_ROW2.map((c, i) => (
            <LogoItem key={i} company={c} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
