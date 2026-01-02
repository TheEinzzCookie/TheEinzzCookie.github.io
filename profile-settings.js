const profileSettings = {
  nameFormat: (name) => `${name}`,
  taglineFormat: (tagline) => `💬 ${tagline}`,
  avatarEffect: {
    scale: 1.05,
    shadowColor: "rgba(88,101,242,0.35)",
    shadowSize: "6px",
    orb: { enabled:true, color:"linear-gradient(135deg,#5865F2,#43B581)", size:140, rotation:20 },
    ring: { enabled:true, color:"rgba(88,101,242,0.5)", thickness:6 }
  },
  statusEffect: { pulse:true, pulseColor:"#23a55a", pulseSpeed:1.5 },
  cardEffect: { glow:true, hoverShadow:"0 10px 28px rgba(0,0,0,.45)" },
  theme: { bg:"#0b0d10", modal:"#1e1f22", card:"#2b2d31", text:"#f2f3f5", muted:"#b5bac1", accent:"#5865f2" }
};