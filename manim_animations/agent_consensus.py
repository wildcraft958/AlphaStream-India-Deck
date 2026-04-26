"""
13-Agent Consensus — clean version.
- Dot indicators inside boxes (no FA icons — they render badly at small sizes)
- DejaVu Sans proportional font
- Slower animations
- VGroup.arrange for title (no overflow)
"""
from manim import *

BG    = "#05070D"
CYAN  = "#22D3EE"
GREEN = "#10F4B1"
AMBER = "#FFB020"
VIOLET= "#A78BFA"
RED   = "#FF5577"
DIM   = "#8A9CB8"
TEXT  = "#EAF1FB"
PANEL = "#0D1929"

SANS = "Sans"           # Pango generic — better letter spacing than DejaVu
MONO = "JetBrains Mono"


def agent_box(name, sublabel, color, w=2.60, h=0.80):
    rect = RoundedRectangle(
        width=w, height=h, corner_radius=0.09,
        fill_color=PANEL, fill_opacity=1,
        stroke_color=color, stroke_width=2.2,
    )
    t1 = Text(name,     font=SANS, font_size=19, color=color)
    t2 = Text(sublabel, font=SANS, font_size=12, color=DIM)
    cx = rect.get_center()[0]
    t1.move_to([cx, rect.get_center()[1] + 0.16, 0])
    t2.move_to([cx, rect.get_center()[1] - 0.18, 0])
    return VGroup(rect, t1, t2)


def decision_box():
    rect = RoundedRectangle(
        width=4.2, height=1.70, corner_radius=0.14,
        fill_color=PANEL, fill_opacity=1,
        stroke_color=AMBER, stroke_width=3,
    )
    glow = rect.copy().set_stroke(color=AMBER, width=16, opacity=0.12)
    t1 = Text("DECISION AGENT",       font=SANS, font_size=22, color=AMBER)
    t2 = Text("Alpha Score 0 to 100", font=SANS, font_size=15, color=DIM)
    t3 = Text("BUY / HOLD / SELL",    font=SANS, font_size=14, color=AMBER)
    t1.move_to(rect.get_center() + UP * 0.32)
    t2.move_to(rect.get_center())
    t3.move_to(rect.get_center() - UP * 0.42)
    return VGroup(glow, rect, t1, t2, t3)


class AgentConsensusScene(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ── Title row (VGroup.arrange prevents overflow) ───────────────────────
        badge_rect = RoundedRectangle(
            width=4.4, height=0.52, corner_radius=0.09,
            fill_color=ManimColor(AMBER).interpolate(ManimColor(BG), 0.80),
            fill_opacity=1, stroke_color=AMBER, stroke_width=1.6,
        )
        badge_txt = Text("13-AGENT CONSENSUS", font=SANS,
                         font_size=17, color=AMBER, weight=BOLD)
        badge_txt.move_to(badge_rect)
        badge_grp = VGroup(badge_rect, badge_txt)

        title_txt = Text(
            "Weighted fusion of 13 specialists into one Alpha Score",
            font=SANS, font_size=18, color=TEXT,
        )
        header = VGroup(badge_grp, title_txt)
        header.arrange(RIGHT, buff=0.5)
        header.move_to([0, 3.6, 0])
        self.play(FadeIn(header), run_time=0.9)
        self.wait(0.5)

        # ── Column headers ────────────────────────────────────────────────────
        lh = Text("MARKET ANALYSIS",   font=MONO, font_size=17, color=CYAN).move_to([-4.9, 2.90, 0])
        rh = Text("DATA INTELLIGENCE", font=MONO, font_size=17, color=VIOLET).move_to([4.9, 2.90, 0])
        self.play(FadeIn(lh, rh), run_time=0.6)
        self.wait(0.3)

        # ── Left agents (Market Analysis) ─────────────────────────────────────
        LEFT = [
            ("Sentiment", "news NLP scoring"),
            ("Technical",  "RSI  MACD  SMA"),
            ("Risk",       "volatility sizing"),
            ("Pattern",    "chart pattern det."),
            ("Backtest",   "5yr win rates"),
            ("Flow",       "FII/DII streaks"),
        ]
        left_ys = [2.25, 1.42, 0.59, -0.24, -1.07, -1.90]
        left_agents = [agent_box(n, s, CYAN).move_to([-4.9, y, 0])
                       for (n, s), y in zip(LEFT, left_ys)]

        # ── Right agents (Data Intelligence) ─────────────────────────────────
        RIGHT = [
            ("Filing",  "BSE disclosures"),
            ("Insider", "SAST/PIT trades"),
            ("Anomaly", "River ML online"),
            ("Search",  "web enrichment"),
            ("Chart",   "matplotlib PNG"),
            ("Report",  "ReportLab PDF"),
        ]
        right_ys = [2.25, 1.42, 0.59, -0.24, -1.07, -1.90]
        right_agents = [agent_box(n, s, VIOLET).move_to([4.9, y, 0])
                        for (n, s), y in zip(RIGHT, right_ys)]

        # ── Decision Agent ────────────────────────────────────────────────────
        dec = decision_box()
        dec.move_to([0, 0.15, 0])

        self.play(
            LaggedStart(*[FadeIn(a, shift=RIGHT * 0.25) for a in left_agents],  lag_ratio=0.10),
            LaggedStart(*[FadeIn(a, shift=LEFT  * 0.25) for a in right_agents], lag_ratio=0.10),
            FadeIn(dec, scale=0.88),
            run_time=2.0,
        )
        self.wait(0.8)

        # ── Arrows ────────────────────────────────────────────────────────────
        dec_l = dec.get_left()
        dec_r = dec.get_right()

        left_arrows = []
        for i, a in enumerate(left_agents):
            end_y = dec_l[1] + (0.55 - i * 0.22)
            end_y = max(dec.get_bottom()[1] + 0.15, min(dec.get_top()[1] - 0.15, end_y))
            left_arrows.append(Arrow(
                a.get_right(), [dec_l[0], end_y, 0],
                buff=0.07, stroke_color=CYAN, stroke_width=1.9, stroke_opacity=0.72,
                tip_length=0.16, max_tip_length_to_length_ratio=0.28,
            ))

        right_arrows = []
        for i, a in enumerate(right_agents):
            end_y = dec_r[1] + (0.55 - i * 0.22)
            end_y = max(dec.get_bottom()[1] + 0.15, min(dec.get_top()[1] - 0.15, end_y))
            right_arrows.append(Arrow(
                a.get_left(), [dec_r[0], end_y, 0],
                buff=0.07, stroke_color=VIOLET, stroke_width=1.9, stroke_opacity=0.72,
                tip_length=0.16, max_tip_length_to_length_ratio=0.28,
            ))

        self.play(
            LaggedStart(*[GrowArrow(a) for a in left_arrows],  lag_ratio=0.08),
            LaggedStart(*[GrowArrow(a) for a in right_arrows], lag_ratio=0.08),
            run_time=2.5,
        )
        self.wait(0.8)

        # ── NLQ Agent + Alpha Score ────────────────────────────────────────────
        nlq_rect = RoundedRectangle(
            width=3.9, height=0.65, corner_radius=0.09,
            fill_color=PANEL, fill_opacity=1,
            stroke_color=GREEN, stroke_width=1.9,
        ).move_to([-3.4, -3.20, 0])
        nlq_txt = Text("NLQ Agent  |  LangGraph 8-node  |  Text2SQL",
                       font=SANS, font_size=14, color=GREEN)
        nlq_txt.move_to(nlq_rect)
        nlq_grp = VGroup(nlq_rect, nlq_txt)

        score_rect = RoundedRectangle(
            width=3.9, height=0.65, corner_radius=0.09,
            fill_color=ManimColor(GREEN).interpolate(ManimColor(BG), 0.82),
            fill_opacity=1, stroke_color=GREEN, stroke_width=2.1,
        ).move_to([1.4, -3.20, 0])
        score_txt = Text("82 / 100   STRONG BUY",
                         font=SANS, font_size=20, color=GREEN, weight=BOLD)
        score_txt.move_to(score_rect)
        score_grp = VGroup(score_rect, score_txt)

        nlq_arrow = DashedLine(
            nlq_grp.get_right() + UP * 0.05,
            dec.get_bottom() + LEFT * 1.0 + DOWN * 0.05,
            dash_length=0.11, color=GREEN, stroke_width=1.7,
        )
        score_arrow = Arrow(
            dec.get_bottom(), score_rect.get_top(),
            buff=0.07, stroke_color=GREEN, stroke_width=1.9,
            tip_length=0.15, max_tip_length_to_length_ratio=0.28,
        )

        self.play(
            FadeIn(nlq_grp), Create(nlq_arrow),
            GrowArrow(score_arrow), FadeIn(score_grp, scale=0.9),
            run_time=1.3,
        )
        self.wait(0.8)

        # Pulse decision agent
        self.play(dec[1].animate.set_stroke(color=AMBER, width=6), run_time=0.4)
        self.play(dec[1].animate.set_stroke(color=AMBER, width=3), run_time=0.5)
        self.wait(4.0)
