import { useState, useEffect } from "react";

const DIMENSIONS = [
  { id: "strategy", label: "Onderwijsvisie & Beleid", icon: "🧭", color: "#fcd9c0", accent: "#d96b2d" },
  { id: "data", label: "AI-Tools & Platforms", icon: "🖥️", color: "#fcebc2", accent: "#c98a10" },
  { id: "talent", label: "Docentcompetenties", icon: "🎓", color: "#f7c9b8", accent: "#c94e2e" },
  { id: "implementatie", label: "Curriculum & Toetsing", icon: "📚", color: "#fde8c0", accent: "#d4841a" },
  { id: "ethiek", label: "Integriteit & Governance", icon: "⚖️", color: "#f5d4b0", accent: "#b85e18" },
];

const QUESTIONS = {
  strategy: [
    { q: "De faculteit heeft een duidelijke, gedragen onderwijsvisie op het gebruik van AI in het onderwijs.", weight: 1 },
    { q: "Het gebruik van AI is expliciet geregeld in de Onderwijs- en Examenregeling (OER).", weight: 1 },
    { q: "Er zijn concrete doelen geformuleerd voor de AI-geletterdheid van onze studenten.", weight: 1 },
    { q: "Opleidingsdirecteuren en de examencommissie zijn actief betrokken bij het AI-onderwijsbeleid.", weight: 1 },
  ],
  data: [
    { q: "Studenten en docenten hebben toegang tot goedgekeurde, veilige AI-onderwijsplatforms.", weight: 1 },
    { q: "De goedgekeurde AI-onderwijsplatforms worden daadwerkelijk en breed gebruikt in de opleidingen.", weight: 1 },
    { q: "Er zijn heldere richtlijnen over welke AI-tools wel en niet zijn toegestaan in het onderwijs.", weight: 1 },
    { q: "Het gebruik en de effectiviteit van AI-onderwijsplatforms worden structureel gemonitord en geëvalueerd.", weight: 1 },
  ],
  talent: [
    { q: "Docenten worden geschoold in het didactisch en verantwoord inzetten van AI.", weight: 1 },
    { q: "Er is voldoende AI-geletterdheid onder het onderwijzend personeel van de faculteit.", weight: 1 },
    { q: "Docenten delen onderling actief goede praktijken rondom AI in het onderwijs.", weight: 1 },
    { q: "Er heerst een open en veilige cultuur om met AI in het onderwijs te experimenteren.", weight: 1 },
  ],
  implementatie: [
    { q: "Er worden voldoende AI-geletterdheidsmodules toegepast binnen onze curricula.", weight: 1 },
    { q: "AI-vaardigheden zijn ingebed in de eindtermen en leeruitkomsten van de opleidingen.", weight: 1 },
    { q: "Toets- en examenvormen zijn aangepast aan het bestaan van generatieve AI.", weight: 1 },
    { q: "AI wordt actief en doelgericht ingezet om het leerproces van studenten te ondersteunen.", weight: 1 },
  ],
  ethiek: [
    { q: "Het aantal AI-gerelateerde fraude- en plagiaatgevallen neemt af.", weight: 1 },
    { q: "Er zijn AI-compliance officers of duidelijke aanspreekpunten binnen de faculteit.", weight: 1 },
    { q: "Studenten worden helder geïnformeerd over wat wel en niet is toegestaan met AI.", weight: 1 },
    { q: "Er is een helder, gedragen protocol voor het omgaan met AI-fraude en -plagiaat.", weight: 1 },
  ],
};

const MATURITY_LEVELS = [
  { min: 0, max: 20, label: "Initieel", desc: "AI staat nog in de kinderschoenen. Er zijn weinig gestructureerde initiatieven.", color: "#f9c6d0" },
  { min: 21, max: 40, label: "Verkennend", desc: "Eerste stappen worden gezet. Er zijn pilots maar geen coherente aanpak.", color: "#f9eac6" },
  { min: 41, max: 60, label: "Ontwikkelend", desc: "Structuur begint te ontstaan. Meerdere initiatieven lopen parallel.", color: "#c6e2f9" },
  { min: 61, max: 80, label: "Gevorderd", desc: "AI is geïntegreerd in processen. Schaalbare aanpak aanwezig.", color: "#d4f5c6" },
  { min: 81, max: 100, label: "Leidend", desc: "De universiteit is een voorbeeld op het gebied van AI-adoptie.", color: "#e2c6f9" },
];

const SCALE = [
  { value: 1, label: "Helemaal oneens" },
  { value: 2, label: "Oneens" },
  { value: 3, label: "Neutraal" },
  { value: 4, label: "Eens" },
  { value: 5, label: "Helemaal eens" },
];

function RadarChart({ scores }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 95;
  const n = DIMENSIONS.length;

  const points = DIMENSIONS.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const labelPoints = DIMENSIONS.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + (r + 28) * Math.cos(angle), y: cy + (r + 28) * Math.sin(angle) };
  });

  const getDataPoints = () =>
    DIMENSIONS.map((d, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const val = (scores[d.id] || 0) / 100;
      return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
    });

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = getDataPoints();
  const polyPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  const gridPath = (lvl) => points.map((p, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + r * lvl * Math.cos(angle);
    const y = cy + r * lvl * Math.sin(angle);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ") + "Z";

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {gridLevels.map((lvl) => (
        <path key={lvl} d={gridPath(lvl)} fill="none" stroke="#f5e0cc" strokeWidth="1.5" strokeDasharray={lvl < 1 ? "4,3" : "0"} />
      ))}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#f5e0cc" strokeWidth="1.5" />
      ))}
      <path d={polyPath} fill="rgba(210,100,40,0.15)" stroke="#d96b2d" strokeWidth="2.5" strokeLinejoin="round" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill={DIMENSIONS[i].accent} stroke="white" strokeWidth="2" />
      ))}
      {DIMENSIONS.map((d, i) => (
        <text
          key={i}
          x={labelPoints[i].x}
          y={labelPoints[i].y}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", fill: "#5a4a6a", fontWeight: 600 }}
        >
          {d.icon}
        </text>
      ))}
    </svg>
  );
}

function ProgressBar({ value, color, accent }) {
  return (
    <div style={{ background: "#f5e8d8", borderRadius: 20, height: 12, overflow: "hidden", width: "100%" }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${accent})`,
          borderRadius: 20,
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | questions | results
  const [dimIndex, setDimIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [orgName, setOrgName] = useState("");

  const currentDim = DIMENSIONS[dimIndex];
  const currentQuestions = QUESTIONS[currentDim?.id] || [];
  const currentQ = currentQuestions[qIndex];
  const totalQuestions = Object.values(QUESTIONS).flat().length;
  const answeredCount = Object.values(answers).flat().length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const computeScores = () => {
    const scores = {};
    DIMENSIONS.forEach((d) => {
      const qs = QUESTIONS[d.id];
      const ans = answers[d.id] || [];
      const total = qs.reduce((sum, _, i) => sum + (ans[i] || 0), 0);
      const max = qs.length * 5;
      scores[d.id] = Math.round((total / max) * 100);
    });
    return scores;
  };

  const overallScore = () => {
    const scores = computeScores();
    return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / DIMENSIONS.length);
  };

  const getMaturityLevel = (score) =>
    MATURITY_LEVELS.find((l) => score >= l.min && score <= l.max) || MATURITY_LEVELS[0];

  const handleAnswer = (val) => {
    setSelected(val);
  };

  const handleNext = () => {
    if (selected === null) return;
    setAnimating(true);

    const dimAnswers = answers[currentDim.id] ? [...answers[currentDim.id]] : [];
    dimAnswers[qIndex] = selected;
    const newAnswers = { ...answers, [currentDim.id]: dimAnswers };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelected(null);
      setAnimating(false);
      if (qIndex < currentQuestions.length - 1) {
        setQIndex(qIndex + 1);
      } else if (dimIndex < DIMENSIONS.length - 1) {
        setDimIndex(dimIndex + 1);
        setQIndex(0);
      } else {
        setPhase("results");
      }
    }, 300);
  };

  const scores = computeScores();
  const overall = overallScore();
  const maturity = getMaturityLevel(overall);

  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fff8f3 0%, #fef3e2 40%, #fff0e8 100%)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 16px 40px",
    },
    header: {
      width: "100%",
      maxWidth: 680,
      paddingTop: 32,
      paddingBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    logo: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: "linear-gradient(135deg, #fcd9c0, #fcebc2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
    },
    logoText: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 18,
      fontWeight: 700,
      color: "#5a4a6a",
      letterSpacing: "-0.3px",
    },
    card: {
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(16px)",
      borderRadius: 28,
      boxShadow: "0 8px 40px rgba(210,100,40,0.10), 0 2px 12px rgba(0,0,0,0.04)",
      padding: "40px 44px",
      width: "100%",
      maxWidth: 680,
      marginTop: 16,
      border: "1.5px solid rgba(255,255,255,0.9)",
    },
    pill: (color, accent) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: color,
      color: accent,
      borderRadius: 50,
      padding: "5px 14px",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.2px",
    }),
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  if (phase === "intro") {
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <span style={styles.logoText}>AI Maturity Assessment</span>
        </div>
        <div style={{ ...styles.card, textAlign: "center", paddingTop: 52, paddingBottom: 52 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🤖</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#3d2d52", margin: "0 0 12px", lineHeight: 1.2 }}>
            Hoe AI-volwassen is<br />uw onderwijs?
          </h1>
          <p style={{ color: "#7a6a8a", fontSize: 16, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Een self-assessment voor vicedecanen onderwijs. Breng in 20 stellingen de AI-rijpheid van het onderwijs binnen uw faculteit in kaart — van onderwijsvisie en curriculum tot toetsing en integriteit — en ontvang direct een persoonlijk maturiteitsrapport.
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            {DIMENSIONS.map((d) => (
              <span key={d.id} style={styles.pill(d.color, d.accent)}>
                {d.icon} {d.label}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", color: "#7a6a8a", fontSize: 14, fontWeight: 600, marginBottom: 8, textAlign: "left" }}>
              Naam van uw faculteit (optioneel)
            </label>
            <input
              type="text"
              placeholder="bijv. Faculteit der Geesteswetenschappen"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 18px",
                borderRadius: 14,
                border: "2px solid #ede6f7",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                color: "#3d2d52",
                outline: "none",
                boxSizing: "border-box",
                background: "#fff8f3",
                transition: "border-color .2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e8a070")}
              onBlur={(e) => (e.target.style.borderColor = "#ede6f7")}
            />
          </div>

          <button
            onClick={() => setPhase("questions")}
            style={{
              background: "linear-gradient(135deg, #fcd9c0 0%, #fcebc2 100%)",
              color: "#8a3a10",
              border: "none",
              borderRadius: 16,
              padding: "15px 44px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.2px",
              boxShadow: "0 4px 20px rgba(210,100,40,0.22)",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(210,100,40,0.30)"; }}
            onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(210,100,40,0.22)"; }}
          >
            Start de assessment →
          </button>

          <p style={{ color: "#b0a0c0", fontSize: 12, marginTop: 16 }}>⏱ Ongeveer 5–8 minuten · 20 vragen</p>
        </div>
      </div>
    );
  }

  if (phase === "questions") {
    const dimProgress = (qIndex / currentQuestions.length) * 100;
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <span style={styles.logoText}>AI Maturity Assessment</span>
        </div>

        {/* Overall progress */}
        <div style={{ width: "100%", maxWidth: 680, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#9a8aaa", fontWeight: 600 }}>
              Vraag {answeredCount + 1} van {totalQuestions}
            </span>
            <span style={{ fontSize: 12, color: "#9a8aaa", fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} color={currentDim.color} accent={currentDim.accent} />
        </div>

        {/* Dimension tabs */}
        <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 680, marginTop: 20, overflowX: "auto", paddingBottom: 4 }}>
          {DIMENSIONS.map((d, i) => {
            const done = i < dimIndex;
            const active = i === dimIndex;
            return (
              <div
                key={d.id}
                style={{
                  flex: "none",
                  padding: "7px 14px",
                  borderRadius: 50,
                  fontSize: 12,
                  fontWeight: 600,
                  background: active ? d.color : done ? "#f0f0f8" : "rgba(255,255,255,0.7)",
                  color: active ? d.accent : done ? "#a0a0b8" : "#c0b0d8",
                  border: `2px solid ${active ? d.accent + "40" : "transparent"}`,
                  transition: "all .3s",
                  whiteSpace: "nowrap",
                }}
              >
                {done ? "✓ " : ""}{d.icon} {d.label}
              </div>
            );
          })}
        </div>

        {/* Question card */}
        <div
          style={{
            ...styles.card,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity .3s, transform .3s",
          }}
        >
          <div style={{ ...styles.pill(currentDim.color, currentDim.accent), marginBottom: 24 }}>
            {currentDim.icon} {currentDim.label}
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            color: "#3d2d52",
            lineHeight: 1.45,
            margin: "0 0 32px",
            fontWeight: 700,
          }}>
            {currentQ?.q}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SCALE.map((s) => (
              <button
                key={s.value}
                onClick={() => handleAnswer(s.value)}
                style={{
                  background: selected === s.value ? currentDim.color : "rgba(255,255,255,0.8)",
                  border: `2px solid ${selected === s.value ? currentDim.accent : "#ede6f7"}`,
                  borderRadius: 14,
                  padding: "13px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: selected === s.value ? 700 : 500,
                  color: selected === s.value ? currentDim.accent : "#5a4a6a",
                  textAlign: "left",
                  transition: "all .15s",
                  transform: selected === s.value ? "scale(1.01)" : "scale(1)",
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: selected === s.value ? currentDim.accent : "#f5e0c8",
                  color: selected === s.value ? "white" : "#b87040",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                  transition: "all .15s",
                }}>
                  {s.value}
                </div>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
            <button
              onClick={handleNext}
              disabled={selected === null}
              style={{
                background: selected !== null
                  ? `linear-gradient(135deg, ${currentDim.color}, ${currentDim.accent}30)`
                  : "#f5e8d8",
                color: selected !== null ? currentDim.accent : "#d4a880",
                border: `2px solid ${selected !== null ? currentDim.accent + "50" : "transparent"}`,
                borderRadius: 14,
                padding: "12px 30px",
                fontSize: 15,
                fontWeight: 700,
                cursor: selected !== null ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .2s",
              }}
            >
              {dimIndex === DIMENSIONS.length - 1 && qIndex === currentQuestions.length - 1
                ? "Bekijk resultaten →"
                : "Volgende →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.logo}>🎓</div>
        <span style={styles.logoText}>AI Maturity Assessment</span>
      </div>

      {/* Overall score card */}
      <div style={{ ...styles.card, textAlign: "center" }}>
        {orgName && (
          <p style={{ color: "#9a8aaa", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.5px" }}>
            RESULTATEN VOOR {orgName.toUpperCase()}
          </p>
        )}
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#3d2d52", margin: "0 0 24px" }}>
          Uw AI-maturiteitsrapport
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {/* Donut score */}
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140">
              <circle cx="70" cy="70" r="56" fill="none" stroke="#f5e0c8" strokeWidth="14" />
              <circle
                cx="70" cy="70" r="56"
                fill="none"
                stroke={maturity.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56 * overall / 100} ${2 * Math.PI * 56}`}
                transform="rotate(-90 70 70)"
                style={{ filter: "drop-shadow(0 0 8px rgba(210,100,40,0.35))" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: "#3d2d52", lineHeight: 1 }}>
                {overall}
              </span>
              <span style={{ fontSize: 12, color: "#9a8aaa", fontWeight: 600 }}>/ 100</span>
            </div>
          </div>

          {/* Radar */}
          <RadarChart scores={scores} />
        </div>

        {/* Maturity label */}
        <div style={{
          background: maturity.color,
          borderRadius: 16,
          padding: "16px 24px",
          marginTop: 24,
          display: "inline-block",
          minWidth: 320,
        }}>
          <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#3d2d52", marginBottom: 4 }}>
            Niveau: {maturity.label}
          </div>
          <div style={{ fontSize: 14, color: "#5a4a6a", lineHeight: 1.6 }}>{maturity.desc}</div>
        </div>
      </div>

      {/* Per-dimension scores */}
      <div style={{ ...styles.card, marginTop: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#3d2d52", margin: "0 0 24px" }}>
          Scores per dimensie
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {DIMENSIONS.map((d) => {
            const score = scores[d.id];
            const level = getMaturityLevel(score);
            return (
              <div key={d.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#3d2d52" }}>{d.label}</span>
                    <span style={{ ...styles.pill(d.color, d.accent), fontSize: 11, padding: "3px 10px" }}>
                      {level.label}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: d.accent, fontFamily: "'Playfair Display', serif" }}>
                    {score}
                  </span>
                </div>
                <ProgressBar value={score} color={d.color} accent={d.accent} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ ...styles.card, marginTop: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#3d2d52", margin: "0 0 20px" }}>
          Top aanbevelingen
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DIMENSIONS
            .map((d) => ({ ...d, score: scores[d.id] }))
            .sort((a, b) => a.score - b.score)
            .slice(0, 3)
            .map((d, i) => {
              const tips = {
                strategy: "Veranker AI expliciet in de onderwijsvisie en de OER, met actieve betrokkenheid van opleidingsdirecteuren en examencommissie.",
                data: "Bied goedgekeurde AI-onderwijsplatforms aan, stimuleer het gebruik en stel heldere richtlijnen op over toegestane tools.",
                talent: "Investeer in docentprofessionalisering rondom de didactische inzet van AI en faciliteer het delen van goede praktijken.",
                implementatie: "Bed AI-geletterdheidsmodules in de curricula in, neem AI-vaardigheden op in de eindtermen en herzie toetsvormen.",
                ethiek: "Stel een AI-compliance aanspreekpunt aan en zorg voor heldere protocollen en communicatie rond AI-fraude en -plagiaat.",
              };
              return (
                <div key={d.id} style={{
                  background: d.color + "80",
                  borderRadius: 14,
                  padding: "14px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  border: `1.5px solid ${d.color}`,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: d.accent,
                    color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 13, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#3d2d52", marginBottom: 3 }}>
                      {d.icon} {d.label} <span style={{ color: d.accent }}>({d.score}/100)</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#5a4a6a", lineHeight: 1.6 }}>{tips[d.id]}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={() => { setPhase("intro"); setAnswers({}); setDimIndex(0); setQIndex(0); setSelected(null); }}
        style={{
          marginTop: 24,
          background: "rgba(255,255,255,0.8)",
          color: "#c96020",
          border: "2px solid #fcd9c0",
          borderRadius: 14,
          padding: "12px 28px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        ↺ Opnieuw starten
      </button>
    </div>
  );
}
