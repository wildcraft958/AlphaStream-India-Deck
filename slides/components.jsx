// ======= DESIGN TOKENS =======
const TYPE_SCALE = {
  hero: 132, title: 68, subtitle: 44, body: 32, small: 26, mono: 22, label: 20,
};
const SPACING = {
  paddingTop: 100, paddingBottom: 80, paddingX: 100,
  titleGap: 48, itemGap: 28,
};
const COLORS = {
  bg: '#05070D', bgGrad1: '#070B16', bgGrad2: '#0A1225',
  panel: 'rgba(255,255,255,0.035)', panelBorder: 'rgba(255,255,255,0.08)',
  panelStrong: 'rgba(255,255,255,0.06)',
  line: 'rgba(255,255,255,0.08)',
  text: '#EAF1FB', textDim: '#8A9CB8', textFaint: '#55687F',
  cyan: '#22D3EE', green: '#10F4B1', amber: '#FFB020', red: '#FF5577', blue: '#60A5FA', violet: '#A78BFA',
};
const FONT_MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Consolas, monospace';
const FONT_SANS = '"Inter", system-ui, -apple-system, Helvetica, Arial, sans-serif';

// ======= SHARED CHROME =======
function Frame({ children, style = {} }) {
  return (
    <div style={{
      width: 1920, height: 1080,
      background: `radial-gradient(ellipse at top left, ${COLORS.bgGrad2} 0%, ${COLORS.bgGrad1} 40%, ${COLORS.bg} 100%)`,
      color: COLORS.text, fontFamily: FONT_SANS,
      position: 'relative', overflow: 'hidden', ...style,
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: 900, height: 900, borderRadius: '50%', top: -300, right: -200, background: `radial-gradient(circle, ${COLORS.cyan}14, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', bottom: -200, left: -200, background: `radial-gradient(circle, ${COLORS.violet}12, transparent 70%)`, pointerEvents: 'none' }} />
      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
        opacity: 0.35,
      }} />
      {children}
    </div>
  );
}

function Chrome({ n, section }) {
  return (
    <>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 52,
        background: 'rgba(5,7,13,0.6)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${COLORS.line}`,
        display: 'flex', alignItems: 'center', padding: '0 44px',
        fontFamily: FONT_MONO, fontSize: 18, color: COLORS.textDim, letterSpacing: '0.08em', zIndex: 10,
        whiteSpace: 'nowrap',
      }}>
        <div style={{ display: 'flex', gap: 8, marginRight: 22, flexShrink: 0 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 10px ${COLORS.green}` }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.amber }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.red }} />
        </div>
        <span style={{ color: COLORS.cyan, whiteSpace: 'nowrap' }}>ALPHASTREAM</span>
        <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.1)' }}>/</span>
        <span style={{ whiteSpace: 'nowrap' }}>{section}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 22, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: COLORS.green, marginRight: 8, boxShadow: `0 0 10px ${COLORS.green}` }} />LIVE</span>
          <span style={{ color: COLORS.textFaint, whiteSpace: 'nowrap' }}>ET GENAI · 26 APR 2026</span>
          <span style={{ color: COLORS.textFaint, whiteSpace: 'nowrap' }}>{n}/10</span>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: 'rgba(5,7,13,0.6)', backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${COLORS.line}`,
        display: 'flex', alignItems: 'center', padding: '0 44px',
        fontFamily: FONT_MONO, fontSize: 17, color: COLORS.textFaint, letterSpacing: '0.08em', zIndex: 10,
        whiteSpace: 'nowrap',
      }}>
        <span>TEAM NAMOFANS</span>
        <span style={{ margin: '0 14px' }}>·</span>
        <span>PS-06 · AI FOR THE INDIAN INVESTOR</span>
        <span style={{ marginLeft: 'auto', color: COLORS.cyan }}>github.com/wildcraft958/AlphaStream_India</span>
      </div>
    </>
  );
}

function Body({ children, topPad = 88, botPad = 60 }) {
  return (
    <div style={{
      position: 'absolute', top: 52, left: 0, right: 0, bottom: 44,
      padding: `${topPad}px ${SPACING.paddingX}px ${botPad}px`,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      {children}
    </div>
  );
}

function Title({ eyebrow, children, style = {} }) {
  return (
    <div style={{ marginBottom: SPACING.titleGap, flexShrink: 0, ...style }}>
      {eyebrow && (
        <div style={{
          fontFamily: FONT_MONO, fontSize: TYPE_SCALE.label, color: COLORS.cyan,
          letterSpacing: '0.2em', marginBottom: 18, textTransform: 'uppercase',
        }}>
          {eyebrow}
        </div>
      )}
      <h1 style={{
        margin: 0, fontSize: TYPE_SCALE.title, fontWeight: 600,
        letterSpacing: '-0.02em', lineHeight: 1.05, color: COLORS.text,
      }}>
        {children}
      </h1>
    </div>
  );
}

// Glass card
function Card({ children, accent, style = {} }) {
  return (
    <div style={{
      background: COLORS.panel, backdropFilter: 'blur(12px)',
      border: `1px solid ${COLORS.panelBorder}`,
      borderTop: accent ? `3px solid ${accent}` : `1px solid ${COLORS.panelBorder}`,
      ...style,
    }}>{children}</div>
  );
}

// Icon primitives, simple SVG glyphs (no external dep)
const Icon = {
  Data:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>,
  Stream:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Brain: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z"/><path d="M12 8v8"/></svg>,
  DB:    (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>,
  Screen:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  Alert: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.6" fill={p.c||'currentColor'}/></svg>,
  Bolt:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Target:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill={p.c||'currentColor'}/></svg>,
  Clock: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Trend: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/></svg>,
  Users: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Shield:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Code:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Search:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Arrow: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  X:     (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="2.2"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>,
  Check: (p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill="none" stroke={p.c||'currentColor'} strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
  Github:(p={}) => <svg viewBox="0 0 24 24" width={p.s||28} height={p.s||28} fill={p.c||'currentColor'}><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/></svg>,
};

// ======= SLIDE 1 =======
function Slide1() {
  return (
    <Frame>
      <Chrome n="01" section="BOOT / INIT" />
      <Body topPad={0} botPad={0}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', flex: 1, gap: 0 }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px 0 100px', borderRight: `1px solid ${COLORS.line}` }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, alignSelf: 'flex-start',
              padding: '10px 20px', border: `1px solid ${COLORS.cyan}`, color: COLORS.cyan,
              fontFamily: FONT_MONO, fontSize: 20, letterSpacing: '0.22em', marginBottom: 48,
              background: 'rgba(34,211,238,0.06)',
            }}>
              <span style={{ width: 8, height: 8, background: COLORS.cyan, borderRadius: '50%', boxShadow: `0 0 12px ${COLORS.cyan}` }} />
              STREAMING · LIVE
            </div>
            <div className="anim-el anim-slide-up" style={{ fontSize: 168, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.88 }}>
              Alpha<span style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.green})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Stream</span>
            </div>
            <div style={{ fontSize: 68, fontWeight: 300, letterSpacing: '0.2em', color: COLORS.textDim, marginTop: 8, marginBottom: 56 }}>
              INDIA
            </div>
            <div className="anim-el anim-slide-up delay-1" style={{ fontSize: TYPE_SCALE.subtitle, lineHeight: 1.25, color: COLORS.text, maxWidth: 780, fontWeight: 400 }}>
              Real-time AI investment intelligence for the Indian retail investor.
            </div>
            <div className="anim-el anim-fade delay-2" style={{ display: 'flex', gap: 56, marginTop: 72, fontFamily: FONT_MONO, fontSize: 26 }}>
              <div>
                <div style={{ color: COLORS.textFaint, fontSize: 20, letterSpacing: '0.2em', marginBottom: 8 }}>TEAM</div>
                <div style={{ color: COLORS.text }}>NAMOFANS</div>
              </div>
              <div>
                <div style={{ color: COLORS.textFaint, fontSize: 20, letterSpacing: '0.2em', marginBottom: 8 }}>BUILD</div>
                <div style={{ color: COLORS.text }}>v1.0 · FINALE</div>
              </div>
              <div>
                <div style={{ color: COLORS.textFaint, fontSize: 20, letterSpacing: '0.2em', marginBottom: 8 }}>TARGET</div>
                <div style={{ color: COLORS.text }}>PS-06 · RETAIL</div>
              </div>
            </div>
          </div>

          {/* Right: contrast panel */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px 0 80px', gap: 40 }}>
            <Card className="anim-el anim-slide-right delay-2" style={{ padding: 40 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: '0.22em', color: COLORS.red, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon.X s={20} c={COLORS.red} /> INSTITUTIONS
              </div>
              <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: COLORS.text }}>
                $32,000<span style={{ color: COLORS.textDim, fontSize: 44, fontWeight: 400 }}> /yr</span>
              </div>
              <div style={{ fontSize: 30, color: COLORS.textDim, marginTop: 12 }}>
                Bloomberg-class terminals
              </div>
            </Card>
            <Card className="anim-el anim-slide-right delay-3" style={{ padding: 40 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: '0.22em', color: COLORS.amber, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon.Alert s={20} c={COLORS.amber} /> RETAIL
              </div>
              <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: COLORS.text, whiteSpace: 'nowrap' }}>
                WhatsApp<span style={{ color: COLORS.textDim, fontSize: 44, fontWeight: 400 }}> tips</span>
              </div>
              <div style={{ fontSize: 30, color: COLORS.textDim, marginTop: 12 }}>
                Stale data · hallucinated bots
              </div>
            </Card>
            <Card className="anim-el anim-slide-right delay-4" style={{ padding: '26px 32px', borderTop: `3px solid ${COLORS.cyan}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: COLORS.cyan, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: '0.08em' }}>
                <Icon.Arrow s={22} c={COLORS.cyan} /> We close the gap.
              </div>
            </Card>
          </div>
        </div>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 2 =======
function Slide2() {
  const stats = [
    { num: '15 Cr+', unit: 'DEMAT ACCOUNTS',  sub: 'CDSL + NSDL, Mar 2024',  color: COLORS.cyan,  icon: Icon.Users },
    { num: '80%',    unit: 'RELY ON TIPS',    sub: 'Informal, unverified',   color: COLORS.amber, icon: Icon.Alert },
    { num: '2 to 3 h',unit:'WASTED DAILY',    sub: 'Per active trader',      color: COLORS.green, icon: Icon.Clock },
    { num: '₹2.19 L',unit: 'LOST / USER / YR',sub: 'Productivity foregone',  color: COLORS.red,   icon: Icon.Trend },
  ];
  return (
    <Frame>
      <Chrome n="02" section="MARKET / DIAGNOSTICS" />
      <Body>
        <Title eyebrow="Problem · 01">An information gap at nation scale.</Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, flex: 1, minHeight: 0 }}>
          {stats.map((s, i) => {
            const IC = s.icon;
            return (
              <Card key={s.unit} accent={s.color} className={`anim-el anim-slide-up delay-${i + 1}`} style={{
                padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ color: s.color, marginBottom: 24 }}><IC s={36} c={s.color} /></div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: '0.15em', color: s.color, marginBottom: 20 }}>
                    {s.unit}
                  </div>
                  <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: '-0.03em', color: COLORS.text, lineHeight: 1, whiteSpace: 'nowrap' }}>
                    {s.num}
                  </div>
                </div>
                <div style={{ fontSize: 26, color: COLORS.textDim, marginTop: 24, fontFamily: FONT_MONO, letterSpacing: '0.02em' }}>
                  {s.sub}
                </div>
              </Card>
            );
          })}
        </div>
        <Card className="anim-el anim-slide-up delay-5" style={{
          marginTop: 32, padding: '32px 40px', borderLeft: `3px solid ${COLORS.red}`,
          display: 'grid', gridTemplateColumns: '280px 1fr', gap: 44, alignItems: 'center', flexShrink: 0,
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: COLORS.red, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon.Alert s={30} c={COLORS.red} /> THE AI TRAP
          </div>
          <div style={{ fontSize: TYPE_SCALE.body, lineHeight: 1.4, color: COLORS.text, borderLeft: `1px solid ${COLORS.line}`, paddingLeft: 44 }}>
            Free AI chatbots answer from <span style={{ color: COLORS.red }}>static training weights</span>, hallucinate prices, and miss real-time earnings, dangerous anywhere near capital.
          </div>
        </Card>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 3 =======
function Slide3() {
  const rows = [
    { dim: 'Data freshness',    bad: 'Static weights · training cutoff', good: 'Streaming · sub-2s latency',           bi: Icon.Clock, gi: Icon.Bolt },
    { dim: 'Reasoning',         bad: 'Single LLM call',                  good: '13-agent fusion · 0-100 Alpha Score',  bi: Icon.Brain, gi: Icon.Brain },
    { dim: 'Numerical answers', bad: 'Generated / hallucinated',         good: 'SQL on DuckDB · deterministic',        bi: Icon.X,     gi: Icon.Check },
    { dim: 'Evidence',          bad: 'Plausible prose',                  good: 'Source-cited · link-backed',           bi: Icon.Search,gi: Icon.Shield },
    { dim: 'History',           bad: 'Opinion',                          good: 'Backtested across 5 years',            bi: Icon.Search,gi: Icon.Target },
  ];
  return (
    <Frame>
      <Chrome n="03" section="SOLUTION / PARADIGM" />
      <Body>
        <Title eyebrow="Solution · 02">A live AI paradigm, not a chatbot wrapper.</Title>
        <Card className="anim-el anim-fade" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.4fr',
            borderBottom: `1px solid ${COLORS.line}`, background: 'rgba(255,255,255,0.02)',
            fontFamily: FONT_MONO, fontSize: 22, letterSpacing: '0.18em', color: COLORS.textFaint,
            flexShrink: 0,
          }}>
            <div style={{ padding: '22px 32px' }}>DIMENSION</div>
            <div style={{ padding: '22px 32px', borderLeft: `1px solid ${COLORS.line}`, color: COLORS.red, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon.X s={22} c={COLORS.red} /> LLM WRAPPER
            </div>
            <div style={{ padding: '22px 32px', borderLeft: `1px solid ${COLORS.line}`, color: COLORS.cyan, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon.Check s={22} c={COLORS.cyan} /> ALPHASTREAM
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {rows.map((r, i) => {
              const Bi = r.bi, Gi = r.gi;
              return (
                <div key={r.dim} className={`anim-el anim-slide-right delay-${i + 1}`} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.4fr',
                  borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.line}` : 'none',
                  flex: 1, alignItems: 'center',
                }}>
                  <div style={{ padding: '0 32px', fontFamily: FONT_MONO, fontSize: 26, color: COLORS.text, letterSpacing: '0.04em' }}>{r.dim}</div>
                  <div style={{ padding: '0 32px', borderLeft: `1px solid ${COLORS.line}`, color: COLORS.textDim, fontSize: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Bi s={22} c={COLORS.red} /> <span>{r.bad}</span>
                  </div>
                  <div style={{ padding: '0 32px', borderLeft: `1px solid ${COLORS.line}`, color: COLORS.text, fontSize: 28, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Gi s={22} c={COLORS.green} /> <span>{r.good}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 4 =======
function Slide4() {
  const layers = [
    { n: '01', name: 'INGESTION',  color: COLORS.cyan,   icon: Icon.Data,   items: ['NSE · BSE · NSDL', 'Groww · yfinance', 'Macro + news feeds'] },
    { n: '02', name: 'STREAMING',  color: COLORS.green,  icon: Icon.Stream, items: ['Pathway engine', 'Incremental index', 'Zero batch rebuilds'] },
    { n: '03', name: 'REASONING',  color: COLORS.amber,  icon: Icon.Brain,  items: ['13-agent swarm', 'Gemini 2.0 Flash', 'Adaptive RAG'] },
    { n: '04', name: 'ANALYTICS',  color: COLORS.blue,   icon: Icon.DB,     items: ['DuckDB OLAP', 'ChromaDB vectors', 'Text2SQL pipeline'] },
    { n: '05', name: 'DELIVERY',   color: COLORS.violet, icon: Icon.Screen, items: ['React 19 terminal', 'WebSocket stream', 'LangGraph NLQ'] },
  ];
  return (
    <Frame>
      <Chrome n="04" section="SYSTEM / ARCHITECTURE" />
      <Body>
        <Title eyebrow="Architecture · 03">Five layers, one deterministic pipeline.</Title>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flex: 1, minHeight: 0 }}>
          {layers.map((L, i) => {
            const IC = L.icon;
            return (
              <React.Fragment key={L.n}>
                <Card className={`anim-el anim-slide-up delay-${i + 1}`} style={{
                  flex: 1, padding: 32, display: 'flex', flexDirection: 'column',
                  borderTop: `3px solid ${L.color}`,
                  boxShadow: `0 0 60px -20px ${L.color}30`,
                }}>
                  <div style={{ color: L.color, marginBottom: 20 }}><IC s={40} c={L.color} /></div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: L.color, letterSpacing: '0.18em', marginBottom: 8 }}>
                    LAYER {L.n}
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.01em', color: COLORS.text, marginBottom: 28 }}>
                    {L.name}
                  </div>
                  <div style={{ flex: 1 }}>
                    {L.items.map((it) => (
                      <div key={it} style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.text, marginBottom: 14, lineHeight: 1.3 }}>
                        <span style={{ color: L.color, marginRight: 10 }}>▸</span>{it}
                      </div>
                    ))}
                  </div>
                </Card>
                {i < layers.length - 1 && (
                  <div className={`anim-el anim-fade delay-${i + 1}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, color: COLORS.textFaint }}>
                    <Icon.Arrow s={32} c={COLORS.textFaint} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <Card className="anim-el anim-slide-up delay-6" style={{
          marginTop: 28, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: FONT_MONO, fontSize: 26, flexShrink: 0,
        }}>
          <span style={{ color: COLORS.textDim, letterSpacing: '0.06em' }}>
            <span style={{ color: COLORS.cyan }}>RAW DATA</span> → <span style={{ color: COLORS.green }}>STREAM</span> → <span style={{ color: COLORS.amber }}>AGENTS</span> → <span style={{ color: COLORS.blue }}>SQL</span> → <span style={{ color: COLORS.violet }}>UI</span>
          </span>
          <span style={{ color: COLORS.text }}>
            End-to-end latency: <span style={{ color: COLORS.green, fontWeight: 600 }}>&lt; 2,000 ms</span>
          </span>
        </Card>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 5 =======
function Slide5() {
  const tabs = ['OVERVIEW', 'SIGNALS', 'GLOBAL INTEL', 'NLQ CHAT', 'PORTFOLIO'];
  return (
    <Frame>
      <Chrome n="05" section="DEMO / ENTER SYSTEM" />
      <Body topPad={64} botPad={44}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.green, letterSpacing: '0.22em', marginBottom: 14 }}>
              ▸ DEMONSTRATION · 04
            </div>
            <h1 style={{ margin: 0, fontSize: 88, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              Switching to the <span style={{ color: COLORS.cyan }}>live system.</span>
            </h1>
          </div>
          <div style={{
            padding: '18px 28px', border: `1px solid ${COLORS.green}`, background: 'rgba(16,244,177,0.06)',
            color: COLORS.green, fontFamily: FONT_MONO, fontSize: 26, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <Icon.Bolt s={26} c={COLORS.green} /> ENTER TERMINAL
          </div>
        </div>

        {/* Mock terminal */}
        <Card className="anim-el anim-slide-up delay-1" style={{
          flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
          boxShadow: `0 0 0 1px ${COLORS.cyan}30, 0 40px 80px rgba(0,0,0,0.6)`,
        }}>
          {/* Tab row */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderBottom: `1px solid ${COLORS.line}`, fontFamily: FONT_MONO, fontSize: 22, flexShrink: 0 }}>
            {tabs.map((t, i) => (
              <div key={t} style={{
                padding: '18px 28px', color: i === 0 ? COLORS.cyan : COLORS.textDim,
                borderBottom: i === 0 ? `2px solid ${COLORS.cyan}` : '2px solid transparent',
                letterSpacing: '0.12em',
              }}>{t}</div>
            ))}
            <div style={{ marginLeft: 'auto', padding: '18px 28px', color: COLORS.textFaint, fontSize: 20 }}>
              RELIANCE.NS · 2,847.20 <span style={{ color: COLORS.green }}>+1.42%</span>
            </div>
          </div>
          {/* Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', flex: 1, minHeight: 0 }}>
            <div style={{ padding: 24, borderRight: `1px solid ${COLORS.line}`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: COLORS.textFaint, letterSpacing: '0.12em', marginBottom: 12 }}>PRICE · 1D CANDLES</div>
              <svg viewBox="0 0 600 220" preserveAspectRatio="none" style={{ width: '100%', flex: 1 }}>
                <defs>
                  <linearGradient id="s5area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160, 200].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke={COLORS.line} strokeWidth="1" />)}
                <path className="anim-el anim-fade delay-3" d="M0,150 L40,140 L80,155 L120,120 L160,125 L200,100 L240,110 L280,85 L320,95 L360,70 L400,80 L440,60 L480,72 L520,45 L560,55 L600,38 L600,220 L0,220 Z" fill="url(#s5area)" />
                <path className="anim-el anim-draw delay-2" d="M0,150 L40,140 L80,155 L120,120 L160,125 L200,100 L240,110 L280,85 L320,95 L360,70 L400,80 L440,60 L480,72 L520,45 L560,55 L600,38" fill="none" stroke={COLORS.cyan} strokeWidth="2" />
                {[[30,130,155,120],[80,150,170,140],[130,115,130,100],[180,95,120,85],[230,105,115,88],[280,80,100,72],[330,90,105,78],[380,65,85,58],[430,55,75,50],[480,65,75,55],[530,40,55,32],[580,35,50,28]].map((c,i) => {
                  const [x, o, l, h] = c; const up = h < o;
                  return (
                    <g key={i}>
                      <line x1={x} x2={x} y1={h} y2={l} stroke={up ? COLORS.green : COLORS.red} strokeWidth="1" />
                      <rect x={x-6} y={Math.min(o,h)} width="12" height={Math.abs(o-h)} fill={up ? COLORS.green : COLORS.red} />
                    </g>
                  );
                })}
              </svg>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: COLORS.textFaint, letterSpacing: '0.12em', marginBottom: 12 }}>ALPHA SCORE · 13 AGENTS</div>
              <div style={{ fontSize: 88, fontWeight: 700, color: COLORS.green, lineHeight: 1, letterSpacing: '-0.02em' }}>
                82<span style={{ fontSize: 32, color: COLORS.textDim }}>/100</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 24, color: COLORS.green, fontFamily: FONT_MONO }}>STRONG BUY · conviction 0.84</div>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: FONT_MONO, fontSize: 18 }}>
                {[['Filing', 88], ['Technical', 79], ['Insider', 84], ['Sentiment', 76], ['Backtest', 82]].map(([l, v]) => (
                  <div key={l} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 40px', gap: 12, alignItems: 'center' }}>
                    <span style={{ color: COLORS.textDim }}>{l}</span>
                    <span style={{ height: 6, background: COLORS.line, position: 'relative' }}>
                      <span className="anim-el anim-grow-h delay-3" style={{ position: 'absolute', inset: 0, width: v + '%', background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.green})` }} />
                    </span>
                    <span style={{ color: COLORS.text }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Flow strip */}
        <div className="anim-el anim-slide-up delay-4" style={{ marginTop: 24, display: 'flex', gap: 10, fontFamily: FONT_MONO, fontSize: 18, flexShrink: 0 }}>
          {['OVERVIEW', 'SIGNALS', 'GLOBAL INTEL', 'NLQ CHAT', 'SENTIMENT SHIFT'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div style={{
                flex: 1, padding: '14px 16px',
                background: COLORS.panel, backdropFilter: 'blur(12px)',
                border: `1px solid ${i === arr.length - 1 ? COLORS.green : COLORS.panelBorder}`,
                color: i === arr.length - 1 ? COLORS.green : COLORS.text,
                letterSpacing: '0.08em', textAlign: 'center', whiteSpace: 'nowrap',
              }}>
                <span style={{ color: COLORS.textFaint }}>{String(i+1).padStart(2, '0')} </span>{step}
              </div>
              {i < arr.length - 1 && <span style={{ color: COLORS.textFaint, alignSelf: 'center' }}>▶</span>}
            </React.Fragment>
          ))}
        </div>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 6 =======
function Slide6() {
  const moats = [
    { label: 'STREAMING', color: COLORS.cyan, metric: '< 2s', sub: 'news → UI', icon: Icon.Bolt,
      title: 'Pathway sub-2-second latency',
      body: 'Ingest, embed, and push a breaking article to the React dashboard via WebSocket, no refresh, no batch rebuild.' },
    { label: 'RETRIEVAL', color: COLORS.amber, metric: '−40%', sub: 'token cost', icon: Icon.Search,
      title: 'Adaptive geometric RAG',
      body: 'Start with 2 documents. Double only when the model signals insufficient context. Cheap when easy, rigorous when it matters.',
      viz: 'rag' },
    { label: 'REASONING', color: COLORS.green, metric: '8', sub: 'node graph', icon: Icon.Code,
      title: 'LangGraph NLQ with SQL correction',
      body: 'Guardrail → route → SQL → execute on DuckDB → narrate. A correction loop retries on errors.',
      viz: 'graph' },
  ];
  return (
    <Frame>
      <Chrome n="06" section="SYSTEM / MOAT" />
      <Body>
        <Title eyebrow="Moat · 05">Three things a wrapper cannot copy.</Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, flex: 1, minHeight: 0 }}>
          {moats.map((m, i) => {
            const IC = m.icon;
            return (
              <Card key={m.label} className={`anim-el anim-slide-up delay-${i + 1}`} style={{ padding: 40, display: 'flex', flexDirection: 'column', borderTop: `3px solid ${m.color}`, boxShadow: `0 0 80px -30px ${m.color}50` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <IC s={32} c={m.color} />
                  <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: '0.22em', color: m.color }}>{m.label}</div>
                </div>
                <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, color: m.color }}>{m.metric}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: COLORS.textDim, marginTop: 12 }}>{m.sub}</div>

                {m.viz === 'rag' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, fontFamily: FONT_MONO, fontSize: 20 }}>
                    {[2, 4, 8].map((n, i) => (
                      <React.Fragment key={n}>
                        <div style={{
                          padding: '10px 14px', border: `1px solid ${m.color}80`, color: m.color,
                          background: `rgba(255,176,32,0.05)`, letterSpacing: '0.08em',
                          opacity: 0.55 + i * 0.22,
                        }}>{n} DOCS</div>
                        {i < 2 && <Icon.Arrow s={18} c={COLORS.textFaint} />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {m.viz === 'graph' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 28, fontFamily: FONT_MONO, fontSize: 15, flexWrap: 'wrap' }}>
                    {['Guard', 'Route', 'SQL', 'Exec', 'Fix', 'Narr'].map((s, i, a) => (
                      <React.Fragment key={s}>
                        <span style={{ padding: '6px 10px', border: `1px solid ${m.color}80`, color: m.color, letterSpacing: '0.06em' }}>{s}</span>
                        {i < a.length - 1 && <span style={{ color: COLORS.textFaint }}>›</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                <div style={{ height: 1, background: COLORS.line, margin: '32px 0 24px' }} />
                <div style={{ fontSize: 30, fontWeight: 600, color: COLORS.text, marginBottom: 14, lineHeight: 1.15 }}>{m.title}</div>
                <div style={{ fontSize: 24, color: COLORS.textDim, lineHeight: 1.45 }}>{m.body}</div>
              </Card>
            );
          })}
        </div>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 7 =======
function Slide7() {
  const weights = [
    { name: 'CORPORATE FILINGS',  w: 0.25, color: COLORS.cyan,   desc: 'BSE regulatory disclosures' },
    { name: 'TECHNICAL TRENDS',   w: 0.25, color: COLORS.green,  desc: 'RSI, MACD, chart patterns' },
    { name: 'INSIDER / FII FLOW', w: 0.20, color: COLORS.amber,  desc: 'NSDL streak detection' },
    { name: 'NEWS SENTIMENT',     w: 0.15, color: COLORS.blue,   desc: 'Multi-source NLP' },
    { name: 'BACKTEST AGENT',     w: 0.15, color: COLORS.violet, desc: '5-yr historical validation' },
  ];
  const maxW = 0.25;
  return (
    <Frame>
      <Chrome n="07" section="ENGINE / FUSION" />
      <Body>
        <Title eyebrow="Fusion · 06">13 agents, one Alpha Score.</Title>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, flex: 1, minHeight: 0 }}>
          {/* LEFT: weights */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '280px 1fr 80px', gap: 28, marginBottom: 24,
              fontFamily: FONT_MONO, fontSize: 20, color: COLORS.textFaint, letterSpacing: '0.15em',
            }}>
              <span>SIGNAL CATEGORY</span>
              <span>CONTRIBUTION</span>
              <span style={{ textAlign: 'right' }}>WEIGHT</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {weights.map((w, i) => (
                <div key={w.name} style={{ display: 'grid', gridTemplateColumns: '280px 1fr 80px', gap: 28, alignItems: 'center' }}>
                  <div style={{ fontFamily: FONT_MONO, letterSpacing: '0.05em', lineHeight: 1.2 }}>
                    <div style={{ fontSize: 22, color: COLORS.text }}>{w.name}</div>
                    <div style={{ fontSize: 18, color: COLORS.textFaint, marginTop: 4 }}>{w.desc}</div>
                  </div>
                  <div style={{ height: 20, background: 'rgba(255,255,255,0.04)', border: `1px solid ${COLORS.panelBorder}`, position: 'relative' }}>
                    <div className={`anim-el anim-grow-h delay-${i + 1}`} style={{ position: 'absolute', inset: 0, width: (w.w / maxW * 100) + '%', background: `linear-gradient(90deg, ${w.color}30, ${w.color})`, boxShadow: `0 0 20px ${w.color}60` }} />
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 36, fontWeight: 700, color: w.color, textAlign: 'right', letterSpacing: '-0.02em' }}>{w.w.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: score gauge */}
          <Card className="anim-el anim-fade delay-3" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.cyan, letterSpacing: '0.22em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon.Target s={22} c={COLORS.cyan} /> ALPHA SCORE
            </div>
            {/* Arc gauge */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 1', marginTop: 8 }}>
              <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor={COLORS.red} />
                    <stop offset="50%" stopColor={COLORS.amber} />
                    <stop offset="100%" stopColor={COLORS.green} />
                  </linearGradient>
                </defs>
                <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke={COLORS.line} strokeWidth="14" />
                <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="14"
                  strokeDasharray="283" strokeDashoffset={283 * (1 - 0.82)} strokeLinecap="round" />
                {/* Tick marks */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => {
                  const a = Math.PI * (1 - t);
                  const x1 = 100 + Math.cos(a) * 72, y1 = 100 - Math.sin(a) * 72;
                  const x2 = 100 + Math.cos(a) * 80, y2 = 100 - Math.sin(a) * 80;
                  return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.textFaint} strokeWidth="1.5" />;
                })}
              </svg>
            </div>
            <div style={{ textAlign: 'center', marginTop: -20 }}>
              <div style={{ fontSize: 140, fontWeight: 700, color: COLORS.green, lineHeight: 1, letterSpacing: '-0.04em' }}>
                82<span style={{ fontSize: 52, color: COLORS.textDim, fontWeight: 400 }}>/100</span>
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: COLORS.green, letterSpacing: '0.18em', marginTop: 10 }}>STRONG BUY</div>
            </div>
            <div style={{ height: 1, background: COLORS.line, margin: '28px 0 20px' }} />
            <div style={{ fontSize: 24, color: COLORS.textDim, lineHeight: 1.45 }}>
              The Decision Agent fuses 13 independent signals, preventing single-point failure and mode collapse.
            </div>
          </Card>
        </div>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 8 =======
function Slide8() {
  return (
    <Frame>
      <Chrome n="08" section="IMPACT / USER" />
      <Body>
        <Title eyebrow="Impact · 07">Time saved. Alpha earned.</Title>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1, minHeight: 0 }}>
          {/* Time card */}
          <Card className="anim-el anim-slide-up delay-1" style={{ padding: 56, display: 'flex', flexDirection: 'column', borderTop: `3px solid ${COLORS.cyan}`, boxShadow: `0 0 80px -30px ${COLORS.cyan}50` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <Icon.Clock s={30} c={COLORS.cyan} />
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.cyan, letterSpacing: '0.22em' }}>RECOVERED PRODUCTIVITY</div>
            </div>
            <div style={{ fontSize: 180, fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em', color: COLORS.text }}>
              ₹2.19<span style={{ color: COLORS.cyan }}>L</span>
            </div>
            <div style={{ fontSize: 40, color: COLORS.textDim, marginTop: 14, fontWeight: 300 }}>per user / year</div>
            <div style={{ height: 1, background: COLORS.line, margin: '36px 0 24px' }} />
            {/* Visual bar: 2h -> 15min */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT_MONO, fontSize: 22 }}>
              <span style={{ color: COLORS.red }}>2h+ daily</span>
              <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, width: '100%', background: `linear-gradient(90deg, ${COLORS.red}, transparent)`, opacity: 0.7 }} />
                <div style={{ position: 'absolute', inset: 0, width: '12%', background: COLORS.cyan }} />
              </div>
              <span style={{ color: COLORS.cyan }}>15 min</span>
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.textDim, marginTop: 20 }}>
              1.75h × 250 days × ₹500/hr
            </div>
          </Card>

          {/* Alpha card */}
          <Card className="anim-el anim-slide-up delay-2" style={{ padding: 56, display: 'flex', flexDirection: 'column', borderTop: `3px solid ${COLORS.green}`, boxShadow: `0 0 80px -30px ${COLORS.green}50` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <Icon.Trend s={30} c={COLORS.green} />
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.green, letterSpacing: '0.22em' }}>POTENTIAL ALPHA</div>
            </div>
            <div style={{ fontSize: 180, fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em', color: COLORS.text }}>
              ₹54<span style={{ color: COLORS.green }}>K</span>
            </div>
            <div style={{ fontSize: 40, color: COLORS.textDim, marginTop: 14, fontWeight: 300 }}>per user / year</div>
            <div style={{ height: 1, background: COLORS.line, margin: '36px 0 24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, fontFamily: FONT_MONO, fontSize: 22 }}>
              {[['2-3', 'signals/mo'], ['60%', 'hist. accuracy'], ['₹3K', 'avg gain']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ color: COLORS.text, fontSize: 36, fontWeight: 600 }}>{n}</div>
                  <div style={{ color: COLORS.textDim, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="anim-el anim-slide-up delay-3" style={{
          marginTop: 28, padding: '28px 40px', borderLeft: `3px solid ${COLORS.amber}`,
          display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, alignItems: 'center', flexShrink: 0,
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: COLORS.amber, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon.Shield s={26} c={COLORS.amber} /> RISK MITIGATION
          </div>
          <div style={{ fontSize: 30, color: COLORS.text, borderLeft: `1px solid ${COLORS.line}`, paddingLeft: 40 }}>
            Portfolio-aware alerts and FII/DII streak cross-references significantly reduce behavioral panic selling.
          </div>
        </Card>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 9 =======
function Slide9() {
  const rows = [
    { y: 'YEAR 1', users: '50,000',   rev: '59.9',  mult: 0.10, color: COLORS.blue },
    { y: 'YEAR 3', users: '2,00,000', rev: '239.8', mult: 0.40, color: COLORS.cyan },
    { y: 'YEAR 5', users: '5,00,000', rev: '599.4', mult: 1.00, color: COLORS.green },
  ];
  return (
    <Frame>
      <Chrome n="09" section="FORECAST / ET MARKETS" />
      <Body>
        <Title eyebrow="Revenue · 08">The path to ₹599 Cr ARR.</Title>

        {/* Bar chart */}
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {rows.map((r, i) => (
            <Card key={r.y} className={`anim-el anim-fade delay-${i + 1}`} style={{ padding: 36, display: 'flex', flexDirection: 'column', borderTop: `3px solid ${r.color}` }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: r.color, letterSpacing: '0.22em', marginBottom: 18 }}>
                {r.y}
              </div>
              <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, color: COLORS.text, letterSpacing: '-0.04em' }}>
                ₹{r.rev}<span style={{ color: COLORS.textDim, fontSize: 44, fontWeight: 400 }}> Cr</span>
              </div>
              <div style={{ fontSize: 28, color: COLORS.textDim, marginTop: 12 }}>annual revenue</div>
              {/* Growing bar */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', marginTop: 32 }}>
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.panelBorder}`, position: 'relative' }}>
                  <div className={`anim-el anim-grow-v delay-${i + 1}`} style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: (r.mult * 100) + '%',
                    background: `linear-gradient(180deg, ${r.color}, ${r.color}60)`,
                    boxShadow: `0 0 40px ${r.color}50`,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center',
                    fontFamily: FONT_MONO, fontSize: 38, fontWeight: 700, color: COLORS.text, letterSpacing: '-0.01em',
                  }}>
                    {r.users}
                    <div style={{ fontSize: 18, color: COLORS.text, opacity: 0.7, marginTop: 4, fontWeight: 400, letterSpacing: '0.15em' }}>USERS</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28, flexShrink: 0 }}>
          <Card className="anim-el anim-slide-right delay-4" style={{ padding: '24px 32px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: COLORS.textFaint, letterSpacing: '0.15em', marginBottom: 10 }}>MODEL ASSUMPTIONS</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.text, lineHeight: 1.6 }}>
              ₹999/mo premium tier · SOM 1.5L users (0.5% of active traders)
            </div>
          </Card>
          <Card className="anim-el anim-slide-right delay-5" style={{ padding: '24px 32px', borderLeft: `3px solid ${COLORS.green}` }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: COLORS.green, letterSpacing: '0.15em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon.Check s={18} c={COLORS.green} /> ET MARKETS SAVINGS
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.text, lineHeight: 1.6 }}>
              30% less manual analyst work · ₹5-10 Cr / yr
            </div>
          </Card>
        </div>
      </Body>
    </Frame>
  );
}

// ======= SLIDE 10 =======
function Slide10() {
  const team = ['Animesh Raj', 'Devansh Gupta', 'Monika Kumari'];
  return (
    <Frame>
      <Chrome n="10" section="END / OPEN FOR Q&A" />
      <Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.cyan, letterSpacing: '0.22em', marginBottom: 24 }}>
                ▸ SESSION CLOSING · 09
              </div>
              <h1 className="anim-el anim-slide-up" style={{ margin: 0, fontSize: 124, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                Open for<br/>architectural<br/>
                <span style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.green})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>review.</span>
              </h1>
            </div>
            <div style={{ fontSize: 32, color: COLORS.textDim, maxWidth: 800, lineHeight: 1.35 }}>
              A live-streaming, multi-agent, source-cited terminal, end-to-end for Problem Statement 6.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card className="anim-el anim-slide-right delay-1" style={{ padding: 36, borderTop: `3px solid ${COLORS.cyan}` }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.cyan, letterSpacing: '0.22em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon.Github s={22} c={COLORS.cyan} /> REPOSITORY
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: COLORS.text, lineHeight: 1.35 }}>
                github.com/<br/>
                <span style={{ color: COLORS.cyan }}>wildcraft958/AlphaStream_India</span>
              </div>
            </Card>

            <Card className="anim-el anim-slide-right delay-2" style={{ padding: 36, flex: 1, borderTop: `3px solid ${COLORS.green}` }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: COLORS.green, letterSpacing: '0.22em', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon.Users s={22} c={COLORS.green} /> TEAM NAMOFANS
              </div>
              {team.map((n, i) => (
                <div key={n} style={{ display: 'flex', gap: 20, fontFamily: FONT_MONO, fontSize: 26, color: COLORS.text, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: COLORS.textFaint, fontSize: 20 }}>{String(i+1).padStart(2, '0')}</span>
                  <span>{n}</span>
                </div>
              ))}
            </Card>

            <Card className="anim-el anim-fade delay-3" style={{ padding: '22px 32px', border: `1px solid ${COLORS.cyan}`, background: 'rgba(34,211,238,0.06)' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: COLORS.cyan, letterSpacing: '0.1em', textAlign: 'center' }}>
                &gt; awaiting_jury_input_<span style={{ display: 'inline-block', width: 12, height: 20, marginLeft: 6, background: COLORS.cyan, verticalAlign: 'middle', animation: 'blink 1s steps(2) infinite' }} />
              </div>
            </Card>
          </div>
        </div>
      </Body>
    </Frame>
  );
}

Object.assign(window, {
  Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10,
  COLORS, TYPE_SCALE, SPACING, FONT_MONO, FONT_SANS,
});
