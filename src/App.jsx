import { useState } from "react";

const COMMITTEES = [
  "UNSC", "UNHRC", "UNGA", "WHO", "UNESCO", "ECOSOC",
  "DISEC", "SPECPOL", "LEGAL", "UNEP", "IAEA", "FATF",
  "INTERPOL", "UNCTAD", "WTO", "IMF", "ILO", "UNFCCC",
  "ICC", "NPT", "Custom"
];

const TONES = [
  { value: "assertive", label: "Assertive", desc: "Bold, direct, unapologetic" },
  { value: "diplomatic", label: "Diplomatic", desc: "Measured, coalition-building" },
  { value: "aggressive", label: "Aggressive", desc: "Confrontational, pressure-heavy" },
  { value: "neutral", label: "Neutral", desc: "Balanced, fact-driven" },
];

const SPEECH_LENGTHS = [
  { value: 60, label: "60s" },
  { value: 90, label: "90s" },
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
];

const GUIDE_SECTIONS = [
  {
    id: "overview", title: "MUN Overview", icon: "◈", color: "#D4AF37",
    content: [
      { type: "intro", text: "MUN spans 2-3 days of formal committee sessions, lobbying, and debate. Here is everything you need to know from prep to awards." },
      { type: "list", label: "What to expect", items: ["Opening ceremony (first day only)", "Committee sessions — formal participation, monitored by judges", "Breaks for eating and lobbying (informal convincing)", "Social event — usually a concert or formal dinner", "Closing and awards ceremony (last day only)"] },
      { type: "tip", text: "Dress formally. Suit and tie is the safest choice. First impressions in the committee room matter." },
    ]
  },
  {
    id: "prep", title: "Preparation", icon: "◉", color: "#A09BE7",
    content: [
      { type: "intro", text: "You will typically get one week to prepare after receiving your country and committee assignment. Use every day of it." },
      { type: "list", label: "What to prepare", items: ["Opening speech (60-90 seconds, sets your stance)", "5+ moderated caucus topics (MODs)", "Individual framework with a unique name", "Printed research for on-the-spot speeches", "Position paper (if required by the organizer)"] },
      { type: "block", label: "Position Paper", text: "A position paper outlines your country's stance on the topic, past actions that align with it, and future plans supported by real frameworks. Not always required — check with your organizer." },
      { type: "block", label: "MODs (Moderated Caucus Topics)", text: "MODs are broken-down sub-topics of the main issue. For example, if your topic is Digital Inequality, one MOD could be: 'The Lack of Financial Resources to Support Digital Equality.' You need a prepared speech for each MOD you plan to raise. They let you identify loopholes, deepen analysis, and steer the committee." },
      { type: "block", label: "Your Framework", text: "A framework packages all your solutions under a unique name. It shows judges you have thought beyond surface-level fixes and sets you up to lead a working paper. Example: BTCF Framework." },
      { type: "tip", text: "Print your research. Judges notice when delegates speak from notes vs. read off a phone. Physical papers also let you reference data quickly during cross-examination." },
    ]
  },
  {
    id: "day1", title: "Day 1", icon: "①", color: "#7EC8A4",
    content: [
      { type: "intro", text: "Day one sets the tone. Introduce yourself well, establish your position early, and get onto the General Speakers List." },
      { type: "list", label: "How the day runs", items: ["Register at the desk — remember your delegate code", "Opening ceremony (not always)", "Directed to your committee room", "Judges ask for introductions", "Motion to establish GSL (General Speakers List)", "Opening speeches begin", "First MODs are definition-based"] },
      { type: "block", label: "Raising a Motion — Exact Format", text: 'Moderated Caucus:\n"The Delegate of [Country] would like to raise a motion for a Moderated Caucus to discuss [MOD topic] for total time X, individual speaking time Y."\n\nX = total time (usually 10-15 min). Y = per delegate (usually 45-60 sec).\n\nGSL:\n"The Delegate of [Country] would like to raise a motion to establish the General Speakers List."' },
      { type: "tip", text: "In Day 1, judges want definition-based MODs. Save your problem-based and solution-focused MODs for Day 2." },
    ]
  },
  {
    id: "day2", title: "Day 2", icon: "②", color: "#F4A261",
    content: [
      { type: "intro", text: "Day two is where the committee shifts from understanding the problem to forming solutions. Blocs start to solidify." },
      { type: "list", label: "Priorities", items: ["Raise problem-based MODs", "Start identifying bloc partners", "Lobby actively during breaks", "Begin merging frameworks with allies", "Draft or contribute to working papers"] },
      { type: "block", label: "Working Papers", text: "A working paper compiles the individual frameworks of a bloc into a shared document. Judges begin looking for these by Day 2's second session. Keep the format clean — pre-ambulatory and operative clauses matter." },
      { type: "tip", text: "Use unmoderated caucus time aggressively on Day 2. It is your best window to convince undecided delegations and finalize your bloc." },
    ]
  },
  {
    id: "day3", title: "Day 3", icon: "③", color: "#E07070",
    content: [
      { type: "intro", text: "The final day. Get as many countries in your bloc as possible, present your Draft Resolution cleanly, and leave a strong impression on judges." },
      { type: "list", label: "Final day flow", items: ["Continue lobbying — every vote counts", "Begin Draft Resolution by second session", "Assign roles: 1-2 presenters, 1-2 for cross-examination", "DR needs at least 50% of committee votes to pass", "Third session: DR presentation and judge assessment", "Social event, then awards ceremony"] },
      { type: "block", label: "Draft Resolution Format", text: "Your DR must follow formal UN formatting with pre-ambulatory clauses (describing the problem) and operative clauses (outlining solutions). Judges assess your bloc on format as much as content. Rehearse the presentation — judges will ask cross-examination questions designed to catch you off guard." },
      { type: "tip", text: "By the third session, judges are finalizing awards. Be present, be vocal, and back up your bloc's DR confidently." },
    ]
  },
  {
    id: "alliances", title: "Forming Alliances", icon: "◎", color: "#60C8E8",
    content: [
      { type: "intro", text: "Alliances are built before the gavel even drops. The delegate who lobbies hardest wins more often than the delegate who speaks best." },
      { type: "list", label: "Alliance strategy", items: ["Start lobbying before the opening ceremony", "Use lunch breaks to approach undecided or newer delegates", "Acknowledge good solutions in speeches — it builds goodwill", "Use Unmoderated Caucus for convincing, not resting", "Use Consultation of the Whole to swing undecided countries"] },
      { type: "block", label: "The Chit System — Most Important Tool", text: '50% of your MUN is done through chits.\n\nFold the chit so the outside reads:\nFrom: [Your Country] → To: [Target Country]\n\nPass them during formal sessions. Use them to share arguments, propose alliances, counter other blocs, and coordinate speeches. Be concise but convincing — you have one line to make your case.' },
      { type: "tip", text: "Target first-time delegates early. They are often intimidated and will follow whoever approaches them with confidence and clarity." },
    ]
  },
];

function Spinner() {
  return <div style={{ width: 36, height: 36, border: "3px solid rgba(212,175,55,0.2)", borderTop: "3px solid #D4AF37", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />;
}

function Badge({ text, color = "#D4AF37" }) {
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, border: `1px solid ${color}`, color, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>{text}</span>;
}

function ResultSection({ title, badge, content, accent = "#D4AF37" }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: "22px 24px", marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>{title}</span>
          {badge && <Badge text={badge} color={accent} />}
        </div>
        <button onClick={() => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: copied ? "#7EC8A4" : "rgba(255,255,255,0.35)", padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "monospace", transition: "all 0.2s" }}>{copied ? "✓ copied" : "copy"}</button>
      </div>
      <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.8, fontSize: 14.5, margin: 0, whiteSpace: "pre-wrap" }}>{content}</p>
    </div>
  );
}

function BlocCard({ label, countries, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}25`, borderRadius: 8, padding: "16px 18px", flex: 1, minWidth: 200 }}>
      <div style={{ color, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13.5, lineHeight: 1.75 }}>{countries}</div>
    </div>
  );
}

function GuideSection({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? section.color + "35" : "rgba(255,255,255,0.07)"}`, borderLeft: `3px solid ${open ? section.color : "rgba(255,255,255,0.1)"}`, borderRadius: 8, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s", background: open ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", padding: "17px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: section.color, fontSize: 15 }}>{section.icon}</span>
          <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, fontFamily: "Georgia, serif", fontWeight: 600 }}>{section.title}</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 20, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px", animation: "fadeUp 0.3s ease" }}>
          {section.content.map((block, i) => {
            if (block.type === "intro") return <p key={i} style={{ color: "rgba(255,255,255,0.55)", fontSize: 14.5, lineHeight: 1.8, margin: "0 0 16px", fontStyle: "italic" }}>{block.text}</p>;
            if (block.type === "list") return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ color: section.color, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.label}</div>
                {block.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 7 }}>
                    <span style={{ color: section.color, fontSize: 7, paddingTop: 7, flexShrink: 0 }}>◆</span>
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            );
            if (block.type === "block") return (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${section.color}20`, borderRadius: 6, padding: "15px 18px", marginBottom: 12 }}>
                <div style={{ color: section.color, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{block.label}</div>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>{block.text}</p>
              </div>
            );
            if (block.type === "tip") return (
              <div key={i} style={{ background: `${section.color}0D`, border: `1px solid ${section.color}28`, borderRadius: 6, padding: "12px 16px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: section.color, fontSize: 12, flexShrink: 0, paddingTop: 2 }}>★</span>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{block.text}</p>
              </div>
            );
            return null;
          })}
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "13px 16px", color: "white", fontSize: 15, boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "serif", outline: "none" };

export default function MUNReady() {
  const [tab, setTab] = useState("brief");
  const [country, setCountry] = useState("");
  const [committee, setCommittee] = useState("");
  const [customCommittee, setCustomCommittee] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("assertive");
  const [speechLength, setSpeechLength] = useState(90);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);

  const finalCommittee = committee === "Custom" ? customCommittee : committee;
  const wordCount = Math.round((speechLength / 60) * 120);

  const generate = async () => {
    if (!country.trim() || !finalCommittee.trim() || !topic.trim()) { setError("Please fill in all three fields."); return; }
    setError(""); setLoading(true); setResult(null);
    const toneMap = {
      assertive: "bold, direct, and unapologetic. Make strong claims, use commanding language, do not hedge",
      diplomatic: "measured and coalition-focused. Acknowledge other perspectives while firmly advancing the delegation's interests",
      aggressive: "confrontational and pressure-heavy. Challenge opposing delegations, use urgent language, frame inaction as unacceptable",
      neutral: "balanced and procedural. Rely on facts, cite process, avoid emotional language",
    };
    const prompt = `You are a world-class MUN coach. Generate a complete research brief for a delegate representing ${country} in ${finalCommittee} on: "${topic}".

STRICT RULES:
- ZERO em dashes (no — or --). Use commas, colons, or periods instead.
- ZERO filler: no "it is worth noting", "it is important to", "in conclusion", "needless to say".
- Include real statistics, percentages, year-referenced data, UN resolution numbers wherever possible.
- Tone: ${toneMap[tone]}.
- Opening statement: exactly ${wordCount} words. Heavy rhetoric. Specific data. Clear call to action.
- Position paper: 350-400 words. Three labeled sections.

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "position": "3-4 sentences on ${country}'s stance on ${topic}. At least 2 real statistics or policy references. No filler. No em dashes.",
  "arguments": "4 numbered arguments (1. 2. 3. 4.). Each 2 sentences. Specific to ${country}'s foreign policy. Data in at least 2 arguments. No em dashes.",
  "opening_statement": "Exactly ${wordCount} words. Starts: Honorable Chair, Distinguished Delegates. Tone: ${toneMap[tone]}. No em dashes. No filler. At least 3 statistics. Rhetorical call to action at the end.",
  "position_paper": "350-400 words. Three sections labeled: BACKGROUND, ${country.toUpperCase()}'S POSITION, PROPOSED SOLUTIONS. No em dashes. No filler. Cite real UN resolutions or treaties. Include statistics.",
  "caucus_topics": "5 moderated caucus topics. Numbered 1 to 5, each on its own line. Each is one specific debatable sentence a chair reads aloud. Topics get progressively more specific.",
  "allies": "3-4 countries likely to align with ${country}. One sentence per country referencing a shared policy, treaty, or interest.",
  "opponents": "2-3 countries likely to oppose ${country}. One sentence each with a specific reason."
}`;
    try {
      const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  }
);
const data = await res.json();
const text = data.candidates[0].content.parts[0].text;
setResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
setStage(2);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const reset = () => { setStage(0); setResult(null); setCountry(""); setCommittee(""); setCustomCommittee(""); setTopic(""); setError(""); setTone("assertive"); setSpeechLength(90); };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A", color: "white", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:ital,wght@0,400;1,400&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder { color: rgba(255,255,255,0.22); }
        input:focus, select:focus { border-color: rgba(212,175,55,0.55) !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
        select option { background: #0B0F1A; color: white; }
        button { font-family: inherit; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(circle at 70% 20%, rgba(212,175,55,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(100,130,200,0.04) 0%, transparent 50%), repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.012) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.012) 60px)` }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(11,15,26,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 54 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ color: "#D4AF37", fontSize: 10 }}>◆</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "white", letterSpacing: "0.02em" }}>MUNReady</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["brief", "Research Brief"], ["guide", "MUN Guide"], ["about", "About"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ background: tab === key ? "rgba(212,175,55,0.1)" : "none", border: tab === key ? "1px solid rgba(212,175,55,0.28)" : "1px solid transparent", color: tab === key ? "#D4AF37" : "rgba(255,255,255,0.38)", padding: "6px 14px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.06em", transition: "all 0.18s" }}>{label}</button>
          ))}
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>

        {/* BRIEF */}
        {tab === "brief" && (
          <>
            {stage === 0 && (
              <div style={{ textAlign: "center", paddingTop: "15vh", paddingBottom: "10vh", animation: "fadeUp 0.6s ease" }}>
                <div style={{ marginBottom: 22 }}>
                  <span style={{ display: "inline-block", padding: "5px 15px", border: "1px solid rgba(212,175,55,0.38)", borderRadius: 2, color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.16em", textTransform: "uppercase" }}>MUN Research Assistant</span>
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 8vw, 70px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 18px", background: "linear-gradient(135deg, #fff 0%, #D4AF37 60%, #fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MUNReady</h1>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.48)", maxWidth: 400, margin: "0 auto 12px", lineHeight: 1.75, fontStyle: "italic" }}>Country. Committee. Topic.<br />Complete research brief in seconds.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 20, margin: "26px 0 40px", flexWrap: "wrap" }}>
                  {["Position Summary", "Opening Statement", "Position Paper", "Caucus Topics", "Bloc Analysis"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                      <span style={{ color: "#D4AF37", fontSize: 7 }}>◆</span>
                      <span style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStage(1)} style={{ background: "linear-gradient(135deg, #D4AF37, #B8962E)", color: "#0B0F1A", border: "none", borderRadius: 6, padding: "14px 42px", fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(212,175,55,0.22)", transition: "all 0.2s" }}
                  onMouseOver={e => e.target.style.transform = "translateY(-2px)"} onMouseOut={e => e.target.style.transform = "translateY(0)"}>Build My Brief →</button>
              </div>
            )}

            {stage === 1 && (
              <div style={{ paddingTop: "7vh", paddingBottom: "10vh", animation: "fadeUp 0.5s ease" }}>
                <button onClick={() => setStage(0)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.28)", cursor: "pointer", fontFamily: "monospace", fontSize: 12, marginBottom: 28, padding: 0 }}>← BACK</button>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, margin: "0 0 6px" }}>Your Delegation</h2>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "0 0 28px", fontStyle: "italic" }}>Fill in your assignment, pick your tone and speech length.</p>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Country / Delegation</label>
                  <input value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. Pakistan, Turkey, Brazil..." style={inputStyle} />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Committee</label>
                  <select value={committee} onChange={e => setCommittee(e.target.value)} style={{ ...inputStyle, cursor: "pointer", color: committee ? "white" : "rgba(255,255,255,0.22)", background: "#0F1625" }}>
                    <option value="" disabled>Select a committee...</option>
                    {COMMITTEES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {committee === "Custom" && <input value={customCommittee} onChange={e => setCustomCommittee(e.target.value)} placeholder="Enter committee name..." style={{ ...inputStyle, marginTop: 10 }} />}
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Topic / Resolution</label>
                  <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Refugee crisis in the Middle East..." style={inputStyle} />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Delegation Tone</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {TONES.map(t => (
                      <button key={t.value} onClick={() => setTone(t.value)} style={{ background: tone === t.value ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.02)", border: tone === t.value ? "1px solid rgba(212,175,55,0.45)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}>
                        <div style={{ color: tone === t.value ? "#D4AF37" : "rgba(255,255,255,0.68)", fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{t.label}</div>
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace" }}>{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Opening Statement Length</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {SPEECH_LENGTHS.map(l => (
                      <button key={l.value} onClick={() => setSpeechLength(l.value)} style={{ flex: 1, background: speechLength === l.value ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.02)", border: speechLength === l.value ? "1px solid rgba(212,175,55,0.45)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "12px 8px", cursor: "pointer", transition: "all 0.18s", color: speechLength === l.value ? "#D4AF37" : "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "monospace" }}>{l.label}</button>
                    ))}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "monospace", marginTop: 7 }}>approximately {wordCount} words</div>
                </div>

                {error && <p style={{ color: "#E07070", fontSize: 13, fontFamily: "monospace", marginBottom: 16 }}>{error}</p>}

                <button onClick={generate} disabled={loading} style={{ width: "100%", background: loading ? "rgba(212,175,55,0.1)" : "linear-gradient(135deg, #D4AF37, #B8962E)", color: loading ? "rgba(212,175,55,0.45)" : "#0B0F1A", border: loading ? "1px solid rgba(212,175,55,0.18)" : "none", borderRadius: 6, padding: "15px", fontSize: 15, fontWeight: 700, fontFamily: "'Playfair Display', serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: loading ? "none" : "0 4px 24px rgba(212,175,55,0.2)", transition: "all 0.3s" }}>
                  {loading ? <><Spinner />Generating your brief...</> : "Generate Research Brief →"}
                </button>
              </div>
            )}

            {stage === 2 && result && (
              <div style={{ paddingTop: "5vh", paddingBottom: "10vh" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <Badge text={country} /><Badge text={finalCommittee} color="#7EC8A4" /><Badge text={tone} color="#A09BE7" /><Badge text={`${speechLength}s`} color="rgba(255,255,255,0.22)" />
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.35 }}>{topic}</h2>
                  </div>
                  <button onClick={reset} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.32)", padding: "7px 15px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "monospace", whiteSpace: "nowrap" }}>New Brief</button>
                </div>
                <div style={{ height: 1, background: "linear-gradient(90deg, #D4AF37, transparent)", marginBottom: 24, marginTop: 14 }} />
                <ResultSection title="Country Position" badge="Summary" content={result.position} />
                <ResultSection title="Key Arguments" badge="Debate Prep" content={result.arguments} accent="#7EC8A4" />
                <ResultSection title="Opening Statement" badge={`${speechLength}s · ~${wordCount} words`} content={result.opening_statement} accent="#A09BE7" />
                <ResultSection title="Position Paper" badge="Full Document" content={result.position_paper} accent="#E0A870" />
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(96,200,232,0.18)", borderLeft: "3px solid #60C8E8", borderRadius: 8, padding: "20px 22px", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ color: "#60C8E8", fontSize: 13, fontWeight: 600 }}>Moderated Caucus Topics</span>
                    <Badge text="5 topics" color="#60C8E8" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {result.caucus_topics.split("\n").filter(l => l.trim()).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ color: "#60C8E8", fontFamily: "monospace", fontSize: 12, minWidth: 18, paddingTop: 2 }}>{i + 1}.</span>
                        <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 14.5, lineHeight: 1.65 }}>{line.replace(/^\d+\.\s*/, "")}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Bloc Analysis</div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <BlocCard label="Likely Allies" countries={result.allies} color="#7EC8A4" />
                    <BlocCard label="Likely Opponents" countries={result.opponents} color="#E07070" />
                  </div>
                </div>
                <div style={{ padding: "13px 18px", background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 6, textAlign: "center" }}>
                  <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 12, fontFamily: "monospace", margin: 0 }}>MUNReady · Always verify facts before conference</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* GUIDE */}
        {tab === "guide" && (
          <div style={{ paddingTop: "5vh", paddingBottom: "10vh", animation: "fadeUp 0.5s ease" }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ display: "inline-block", padding: "5px 14px", border: "1px solid rgba(212,175,55,0.32)", borderRadius: 2, color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>Complete Handbook</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, margin: "12px 0 8px", background: "linear-gradient(135deg, #fff 0%, #D4AF37 70%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MUN 101</h2>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, margin: "0 0 28px", fontStyle: "italic", lineHeight: 1.7 }}>Everything from preparation to Draft Resolutions, in order.<br />Click any section to expand it.</p>
            {GUIDE_SECTIONS.map(s => <GuideSection key={s.id} section={s} />)}
            <div style={{ marginTop: 28, padding: "18px 20px", background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8 }}>
              <div style={{ color: "#D4AF37", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Further Reading</div>
              {[["How to Write a Position Paper", "wisemee.com/how-to-write-a-mun-position-paper"], ["How to Write a Resolution", "bestdelegate.com/model-un-made-easy-how-to-write-a-resolution"], ["Choosing a Study Guide Topic", "wisemee.com/choosing-a-mun-study-guide-topic"]].map(([label, url]) => (
                <div key={url} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "rgba(212,175,55,0.45)", fontSize: 7 }}>◆</span>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{label} <span style={{ color: "rgba(255,255,255,0.22)", fontFamily: "monospace", fontSize: 11 }}>— {url}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {tab === "about" && (
          <div style={{ paddingTop: "7vh", paddingBottom: "10vh", animation: "fadeUp 0.5s ease" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 44 }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #8B6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontFamily: "'Playfair Display', serif", fontWeight: 900, marginBottom: 18, boxShadow: "0 0 40px rgba(212,175,55,0.18)", color: "#0B0F1A" }}>S</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, margin: "0 0 6px" }}>Salaar</h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, fontStyle: "italic", margin: "0 0 16px" }}>Student · Debater · Builder · Karachi</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {["TLT Class of 2028", "IGCSE", "Law Society Founder", "MUN Competitor"].map(tag => <Badge key={tag} text={tag} color="rgba(255,255,255,0.25)" />)}
              </div>
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", marginBottom: 36 }} />

            {[
              { color: "#D4AF37", icon: "◈", title: "Why I built MUNReady", text: "Every MUN delegate — including me — spends hours preparing the same things from scratch before every conference. Country positions. Opening statements. MODs. The research is repetitive, and it eats up time that should go toward strategy and lobbying. I built MUNReady to fix that. Enter your assignment, get your complete brief, spend your prep time where it actually counts." },
              { color: "#7EC8A4", icon: "◉", title: "Lycourt Moot Trials", text: "I led my school's team at Lyceum's Lycourt Moot Trials, competing against established law societies from across Karachi. That experience showed me how much preparation separates strong delegations from average ones, and how few students have access to structured prep resources. MUNReady is my answer to that gap." },
              { color: "#A09BE7", icon: "◎", title: "TLT Law Society", text: "I am founding the Law Society at TLT, focused on legal literacy for all students, not just those planning careers in law. The same problem I see in MUN prep exists in legal education: students lack access to clear, structured knowledge. Both are worth fixing, and both start with building something useful." },
              { color: "#60C8E8", icon: "◆", title: "What's next", text: "The goal is to make MUNReady the standard research tool for delegates across Pakistan. Upcoming: a draft resolution builder, bloc strategy simulator, and framework generator. If you are an MUN organizer, society lead, or school that wants to partner or give feedback, reach out." },
            ].map(card => (
              <div key={card.title} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${card.color}22`, borderLeft: `3px solid ${card.color}`, borderRadius: 8, padding: "20px 22px", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: card.color }}>{card.icon}</span>
                  <span style={{ color: card.color, fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600 }}>{card.title}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 14.5, lineHeight: 1.8, margin: 0 }}>{card.text}</p>
              </div>
            ))}

            <div style={{ marginTop: 32, padding: "16px 20px", background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8, textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, fontFamily: "monospace", margin: 0, letterSpacing: "0.05em" }}>Built with purpose · Karachi, Pakistan</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}