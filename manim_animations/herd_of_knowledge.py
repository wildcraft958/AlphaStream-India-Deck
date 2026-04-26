"""
Herd of Knowledge — 14 connectors, 4 categories.
Dot indicators instead of FA icons (FA icons render malformed at small node sizes).
DejaVu Sans proportional font. Slowed animations.
"""
from manim import *

BG    = "#05070D"
CYAN  = "#22D3EE"
GREEN = "#10F4B1"
AMBER = "#FFB020"
VIOLET= "#A78BFA"
DIM   = "#8A9CB8"
TEXT  = "#EAF1FB"
PANEL = "#0D1929"

SANS = "Sans"           # Pango generic — better letter spacing
MONO = "JetBrains Mono"


def connector_node(label, sublabel, color, w=3.10, h=0.62):
    """Bloomberg-style: rounded box with a colored left accent bar (replaces dot)."""
    rect = RoundedRectangle(
        width=w, height=h, corner_radius=0.10,
        fill_color=PANEL, fill_opacity=1,
        stroke_color=color, stroke_width=1.9,
    )
    # Left accent bar — clean professional indicator
    accent = Rectangle(
        width=0.08, height=h - 0.18,
        fill_color=color, fill_opacity=0.95,
        stroke_width=0,
    )
    accent.move_to(rect.get_left() + RIGHT * 0.16)

    # Text shifted slightly right of center to balance with accent bar
    t1 = Text(label,    font=SANS, font_size=17, color=color)
    t2 = Text(sublabel, font=SANS, font_size=12, color=DIM)
    cx = rect.get_center()[0] + 0.07
    t1.move_to([cx, rect.get_center()[1] + 0.16, 0])
    t2.move_to([cx, rect.get_center()[1] - 0.16, 0])
    return VGroup(rect, accent, t1, t2)


def cat_header(label, count, color, w=3.30, h=0.58):
    """Wider category header with extra internal padding."""
    rect = RoundedRectangle(
        width=w, height=h, corner_radius=0.10,
        fill_color=ManimColor(color).interpolate(ManimColor(BG), 0.76),
        fill_opacity=1, stroke_color=color, stroke_width=1.7,
    )
    t = Text(f"{label}  ({count})", font=SANS, font_size=17, color=color)
    t.move_to(rect)
    return VGroup(rect, t)


class HerdOfKnowledgeScene(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ── Title ─────────────────────────────────────────────────────────────
        badge_rect = RoundedRectangle(
            width=3.8, height=0.50, corner_radius=0.09,
            fill_color=ManimColor(CYAN).interpolate(ManimColor(BG), 0.80),
            fill_opacity=1, stroke_color=CYAN, stroke_width=1.5,
        )
        badge_txt = Text("HERD OF KNOWLEDGE", font=SANS,
                         font_size=16, color=CYAN, weight=BOLD)
        badge_txt.move_to(badge_rect)
        badge_grp = VGroup(badge_rect, badge_txt)

        title_txt = Text("14 Connectors  |  4 Categories  |  One Unified Stream",
                         font=SANS, font_size=22, color=TEXT)
        header = VGroup(badge_grp, title_txt)
        header.arrange(RIGHT, buff=0.5)
        header.move_to([0.2, 3.6, 0])
        self.play(FadeIn(header), run_time=0.9)
        self.wait(0.4)

        # ── Central Pathway hub ───────────────────────────────────────────────
        hub_rect = RoundedRectangle(
            width=3.6, height=3.40, corner_radius=0.14,
            fill_color=PANEL, fill_opacity=1,
            stroke_color=CYAN, stroke_width=2.6,
        ).move_to([0, 0.2, 0])
        hub_glow = hub_rect.copy().set_stroke(color=CYAN, width=18, opacity=0.12)

        # Pathway logo (circular-cropped PNG with transparency)
        hub_logo = ImageMobject("animations/pathway_logo.png")
        hub_logo.scale_to_fit_height(0.85)
        hub_logo.move_to(hub_rect.get_center() + UP * 1.05)

        # Subtle cyan ring around the logo for visual integration
        hub_ring = Circle(
            radius=0.45, stroke_color=CYAN, stroke_width=2.5,
            stroke_opacity=0.55, fill_opacity=0,
        )
        hub_ring.move_to(hub_logo.get_center())

        hub_lines = [
            Text("Pathway", font=SANS, font_size=22, color=CYAN),
            Text("ConnectorSubject", font=MONO, font_size=12, color=DIM),
            Text("DocumentStore  |  UsearchKnn", font=MONO, font_size=12, color=DIM),
            Text("Adaptive RAG", font=SANS, font_size=15, color=GREEN),
            Text("n=2  factor=2  max=16 docs", font=MONO, font_size=12, color=GREEN),
        ]
        hub_body = VGroup(*hub_lines).arrange(DOWN, buff=0.12)
        hub_body.move_to(hub_rect.get_center() + DOWN * 0.55)
        # Use Group (not VGroup) to mix ImageMobject with VMobjects
        hub = Group(hub_glow, hub_rect, hub_logo, hub_ring, hub_body)

        self.play(FadeIn(hub, scale=0.92), run_time=0.8)
        self.wait(0.3)

        # ── Node data ─────────────────────────────────────────────────────────
        # NODE_H=0.62, NODE_GAP=0.68 → 0.06 unit padding between adjacent boxes,
        # tightened slightly so bottom Market/Global nodes fit inside the frame.
        NODE_W, NODE_GAP = 3.10, 0.68
        HDR_W = 3.30                     # wider category headers

        NEWS  = [("NewsAPI",      "Breaking News"),
                 ("Finnhub",       "Company News"),
                 ("Alpha Vantage", "Sentiment"),
                 ("MediaStack",    "Global"),
                 ("RSS Feeds",     "Always-on  10 feeds")]

        MKT   = [("NSE API",    "OHLCV  yfinance .NS"),
                 ("BSE API",    "Corporate Filings"),
                 ("Groww API",  "Fundamentals  JWT+TOTP")]

        INST  = [("FIIDIIConnector",  "NSDL  FII/DII Flows"),
                 ("InsiderConnector", "SAST/PIT/Bulk Deals"),
                 ("BSEConnector",     "Corp Announcements")]

        GLOB  = [("GlobalMarket",    "yfinance  VIX/Crypto/FX"),
                 ("MacroConnector",  "FRED API  30+ series"),
                 ("GeopoliticalConn","Hotspot Classifier")]

        LX, RX = -4.9, 4.9

        # Headers — News/Institutional at 2.85 (down from 3.10) so they have
        # clear separation from the HERD OF KNOWLEDGE title (badge bottom ≈ 3.35).
        # Market/Global at -1.55 to leave proper gap from the column above.
        news_hdr = cat_header("News Intelligence",  "5", CYAN,   w=HDR_W).move_to([LX, 2.85, 0])
        mkt_hdr  = cat_header("Market Data",         "3", GREEN,  w=HDR_W).move_to([LX, -1.55, 0])
        ins_hdr  = cat_header("Institutional",       "3", AMBER,  w=HDR_W).move_to([RX, 2.85, 0])
        glo_hdr  = cat_header("Global Intelligence", "3", VIOLET, w=HDR_W).move_to([RX, -1.55, 0])

        # Nodes — News/Institutional start at 2.15 (clear gap from header at 2.85),
        # Market/Global at -2.25 (clear gap from header at -1.55).
        news_nodes = [connector_node(l, s, CYAN,   w=NODE_W).move_to([LX, 2.15 - i * NODE_GAP, 0])
                      for i, (l, s) in enumerate(NEWS)]
        mkt_nodes  = [connector_node(l, s, GREEN,  w=NODE_W).move_to([LX, -2.25 - i * NODE_GAP, 0])
                      for i, (l, s) in enumerate(MKT)]
        ins_nodes  = [connector_node(l, s, AMBER,  w=NODE_W).move_to([RX, 2.15 - i * NODE_GAP, 0])
                      for i, (l, s) in enumerate(INST)]
        glo_nodes  = [connector_node(l, s, VIOLET, w=NODE_W).move_to([RX, -2.25 - i * NODE_GAP, 0])
                      for i, (l, s) in enumerate(GLOB)]

        hub_lx = hub_rect.get_left()[0]
        hub_rx = hub_rect.get_right()[0]

        def l_arrow(node, color):
            sy = node.get_center()[1]
            ey = max(hub_rect.get_bottom()[1] + 0.15,
                     min(hub_rect.get_top()[1] - 0.15, sy))
            return Arrow(node.get_right(), [hub_lx, ey, 0],
                         buff=0.06, stroke_color=color, stroke_width=1.9, stroke_opacity=0.78,
                         tip_length=0.15, max_tip_length_to_length_ratio=0.28)

        def r_arrow(node, color):
            sy = node.get_center()[1]
            ey = max(hub_rect.get_bottom()[1] + 0.15,
                     min(hub_rect.get_top()[1] - 0.15, sy))
            return Arrow(node.get_left(), [hub_rx, ey, 0],
                         buff=0.06, stroke_color=color, stroke_width=1.9, stroke_opacity=0.78,
                         tip_length=0.15, max_tip_length_to_length_ratio=0.28)

        quadrants = [
            (news_hdr, news_nodes, [l_arrow(n, CYAN)   for n in news_nodes]),
            (mkt_hdr,  mkt_nodes,  [l_arrow(n, GREEN)  for n in mkt_nodes]),
            (ins_hdr,  ins_nodes,  [r_arrow(n, AMBER)  for n in ins_nodes]),
            (glo_hdr,  glo_nodes,  [r_arrow(n, VIOLET) for n in glo_nodes]),
        ]

        # ── Animate each quadrant ─────────────────────────────────────────────
        for hdr, nodes, arrows in quadrants:
            self.play(FadeIn(hdr, shift=DOWN * 0.15), run_time=0.6)
            self.play(
                LaggedStart(*[FadeIn(n, shift=DOWN * 0.12) for n in nodes], lag_ratio=0.12),
                run_time=0.9,
            )
            self.play(
                LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.18),
                run_time=0.9,
            )
            self.wait(0.5)

        # ── Hub pulse ─────────────────────────────────────────────────────────
        self.wait(0.3)
        pulse = hub_rect.copy().set_stroke(color=CYAN, width=24, opacity=0.20)
        summary = Text("14 Connectors  |  Unified Stream",
                       font=SANS, font_size=20, color=GREEN)
        summary.move_to([0, -3.75, 0])

        self.play(
            hub_rect.animate.set_stroke(color=CYAN, width=5),
            FadeIn(pulse, scale=1.05), FadeIn(summary),
            run_time=1.0,
        )
        self.play(
            hub_rect.animate.set_stroke(color=CYAN, width=2.6),
            FadeOut(pulse), run_time=0.6,
        )
        self.wait(4.0)
