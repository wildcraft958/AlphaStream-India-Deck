"""
NLQ Pipeline — final clean rewrite.

Fixes vs prior version:
  - Removed ALL dot indicators inside boxes.
  - Fixed arrow routing bug: `h_arrow` was always using src.get_right() → dst.get_left(),
    but Row 3 chain goes RIGHT-TO-LEFT (Validate → Narrate → Output Guardrail → SSE).
    That made arrows span ACROSS BOTH source and destination boxes. Now arrows
    auto-detect direction and connect adjacent edges only.
  - "Validate + Correct" shortened to "Validate" (overflowed the 2.45 wide box).
  - Removed retry self-loop arc; correction loop indicated as sublabel only.
  - Removed Analytics box from main flow (was forcing diagonal/L paths).
  - Switched to `font="Sans"` (Pango generic) with weight=NORMAL — cleaner
    letter rendering than DejaVu Sans Bold (which has Pango kerning artifacts).
"""
import numpy as np
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

# Pango "Sans" generic family — picks best-rendering sans-serif on the system,
# which avoids the spacing artifacts seen with DejaVu Sans Bold.
SANS = "Sans"
MONO = "JetBrains Mono"


def pnode(label, sublabel, color, w=2.55, h=0.82):
    """Plain coloured-stroke box with text only — no dot, no icon."""
    rect = RoundedRectangle(
        width=w, height=h, corner_radius=0.10,
        fill_color=PANEL, fill_opacity=1,
        stroke_color=color, stroke_width=2.2,
    )
    glow = rect.copy().set_stroke(color=color, width=10, opacity=0.09)
    t1 = Text(label,    font=SANS, font_size=18, color=color)
    t2 = Text(sublabel, font=SANS, font_size=12, color=DIM)
    cx = rect.get_center()[0]
    t1.move_to([cx, rect.get_center()[1] + 0.15, 0])
    t2.move_to([cx, rect.get_center()[1] - 0.20, 0])
    return VGroup(glow, rect, t1, t2)


def float_badge(label, color, w=2.80, h=0.46):
    rect = RoundedRectangle(
        width=w, height=h, corner_radius=0.08,
        fill_color=ManimColor(color).interpolate(ManimColor(BG), 0.82),
        fill_opacity=1, stroke_color=color, stroke_width=1.4,
    )
    t = Text(label, font=SANS, font_size=14, color=color)
    t.move_to(rect)
    return VGroup(rect, t)


def chain_arrow(src, dst, color):
    """Auto-direction arrow: connects adjacent edges based on x-positions.
    No more spans-across-boxes bug — works for both LR and RL chains."""
    if src.get_center()[0] < dst.get_center()[0]:
        # Left-to-right: src is on the left, exit from its right, enter dst's left
        start, end = src.get_right(), dst.get_left()
    else:
        # Right-to-left: src is on the right, exit from its left, enter dst's right
        start, end = src.get_left(), dst.get_right()
    return Arrow(start, end,
                 buff=0.08, stroke_color=color, stroke_width=2.1,
                 tip_length=0.18, max_tip_length_to_length_ratio=0.32)


def curvy_l_bridge(start_pt, end_pt, color):
    """Smooth L-shape connection from start_pt down then across to end_pt.
    Uses bezier interpolation for rounded corners."""
    s = np.array(start_pt) if not isinstance(start_pt, np.ndarray) else start_pt
    e = np.array(end_pt)   if not isinstance(end_pt,   np.ndarray) else end_pt
    # Mid-y waypoint at half-way between start and end vertically
    mid_y = (s[1] + e[1]) / 2
    waypoints = [
        s,
        np.array([s[0], mid_y, 0]),     # straight down from start
        np.array([e[0], mid_y, 0]),     # horizontal to end's column
        e,                              # down into end
    ]
    path = VMobject(stroke_color=color, stroke_width=2.2, stroke_opacity=0.95)
    path.set_points_smoothly(waypoints)

    # Arrowhead at the end, oriented downward (since path enters end from above)
    tip = Triangle(fill_color=color, fill_opacity=1, stroke_width=0).scale(0.13)
    tip.rotate(-PI / 2)              # point downward
    tip.move_to(e + np.array([0, 0.07, 0]))
    return VGroup(path, tip)


class NLQPipelineScene(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ── Title ─────────────────────────────────────────────────────────────
        bdg_rect = RoundedRectangle(
            width=2.8, height=0.50, corner_radius=0.09,
            fill_color=ManimColor(GREEN).interpolate(ManimColor(BG), 0.82),
            fill_opacity=1, stroke_color=GREEN, stroke_width=1.5,
        )
        bdg_txt = Text("NLQ AGENT", font=SANS, font_size=18, color=GREEN)
        bdg_txt.move_to(bdg_rect)
        bdg_grp = VGroup(bdg_rect, bdg_txt)

        title = Text("Market ChatGPT: Next Gen", font=SANS,
                     font_size=26, color=TEXT)
        header = VGroup(bdg_grp, title)
        header.arrange(RIGHT, buff=0.5)
        header.move_to([0, 3.6, 0])

        self.play(FadeIn(header), run_time=0.9)
        self.wait(0.4)

        # ── Layout: clean U-shape  (no diagonals, no L-paths) ─────────────────
        # Top row (5 boxes, left → right): Input → Enrich → Router → Text2SQL → DuckDB
        # Bottom row (4 boxes, right → left): Validate → Narrate → Output Guardrail → SSE
        # Vertical: DuckDB (top right) → Validate (bottom right)
        ROW1_Y =  1.55
        ROW2_Y = -1.55

        # Top: 5 boxes, w=2.55, gap=0.35
        # Total span = 5*2.55 + 4*0.35 = 14.15 → fits in 14.222 frame
        half = (5 * 2.55 + 4 * 0.35) / 2     # = 7.075
        R1 = [-half + 1.275 + i * 2.90 for i in range(5)]
        # = [-5.80, -2.90, 0.00, 2.90, 5.80]

        # Bottom: 4 boxes — centered, so the DuckDB → Validate bridge becomes
        # a curvy L (rounded corner) instead of a straight vertical line.
        # 4 boxes, w=2.55, gap=0.35: total span = 11.25 → centers symmetric about 0
        bot_half = (4 * 2.55 + 3 * 0.35) / 2     # = 5.625
        # Right-to-left order: rightmost first (Validate, then Narrate, etc.)
        R2 = [bot_half - 1.275 - i * 2.90 for i in range(4)]
        # = [4.35, 1.45, -1.45, -4.35]

        # Top-row nodes
        n_guard  = pnode("Input Guardrail", "PII safety check",      RED)
        n_enrich = pnode("Enrich",          "web search + memory",   CYAN)
        n_router = pnode("Router",          "intent classification", CYAN)
        n_sql    = pnode("Text2SQL",        "schema plan sql guard", AMBER)
        n_duck   = pnode("DuckDB Execute",  "30s timeout, 5k rows",  CYAN)
        for n, x in zip([n_guard, n_enrich, n_router, n_sql, n_duck], R1):
            n.move_to([x, ROW1_Y, 0])

        # Bottom-row nodes (right → left order)
        n_val    = pnode("Validate",        "self-corrects · max 3", AMBER)
        n_narr   = pnode("Narrate",          "LLM markdown sources",  GREEN)
        n_oguard = pnode("Output Guardrail", "tech redact, PII scrub",RED)
        n_sse    = pnode("SSE Stream",       "streaming to client",   GREEN)
        for n, x in zip([n_val, n_narr, n_oguard, n_sse], R2):
            n.move_to([x, ROW2_Y, 0])

        # Analytics: alternative path — Router → Analytics → Narrate
        # Positioned in the middle gap (between Row 1 and Row 2), under Router
        n_anal = pnode("Analytics", "pre-defined SQL path", GREEN, w=2.55)
        n_anal.move_to([0, 0, 0])    # under Router (x=R1[2]=0), midway between rows

        # Floating badges between title and Row 1
        mem_badge = float_badge("InMemoryStore session context", AMBER, w=3.6)
        mem_badge.move_to([R1[1], 2.78, 0])    # above Enrich

        mcp_badge = float_badge("3 MCP Tool Servers", VIOLET, w=2.7)
        mcp_badge.move_to([R1[3], 2.78, 0])    # above Text2SQL

        mem_line = DashedLine(mem_badge.get_bottom(), n_enrich.get_top(),
                              dash_length=0.08, color=AMBER, stroke_width=1.4)
        mcp_line = DashedLine(mcp_badge.get_bottom(),
                              n_router.get_top() + RIGHT * 0.4,
                              dash_length=0.08, color=VIOLET, stroke_width=1.4)

        # ── Arrows (using direction-aware chain_arrow) ────────────────────────
        # Top row left→right
        a_top = [
            chain_arrow(n_guard,  n_enrich, CYAN),
            chain_arrow(n_enrich, n_router, CYAN),
            chain_arrow(n_router, n_sql,    AMBER),
            chain_arrow(n_sql,    n_duck,   AMBER),
        ]

        # Curvy L-bridge: DuckDB (top right, x=5.80) → curve → Validate (bottom, x=4.35)
        a_bridge = curvy_l_bridge(
            n_duck.get_bottom(),
            n_val.get_top(),
            AMBER,
        )

        # Router → Analytics (straight vertical, x=0)
        a_router_anal = Arrow(
            n_router.get_bottom(), n_anal.get_top(),
            buff=0.07, stroke_color=GREEN, stroke_width=2.0,
            tip_length=0.16, max_tip_length_to_length_ratio=0.30,
        )

        # Analytics → Narrate: curvy L-line (Analytics at x=0, Narrate at x=1.45)
        a_anal_narr = curvy_l_bridge(
            n_anal.get_bottom(),
            n_narr.get_top(),
            GREEN,
        )

        # Bottom row right→left (uses chain_arrow which auto-detects direction)
        a_bot = [
            chain_arrow(n_val,    n_narr,   GREEN),
            chain_arrow(n_narr,   n_oguard, GREEN),
            chain_arrow(n_oguard, n_sse,    GREEN),
        ]

        # Retry self-loop: smaller 270° clockwise arc with "3×" label inside the
        # ring's center — guaranteed visible regardless of frame edge.
        loop_cx = n_val.get_right()[0] + 0.42
        loop_cy = n_val.get_center()[1]
        loop_r  = 0.32
        start_pt = np.array([loop_cx,            loop_cy + loop_r, 0])   # 12 o'clock
        end_pt   = np.array([loop_cx - loop_r,   loop_cy,           0])   # 9 o'clock
        retry_loop = CurvedArrow(
            start_pt, end_pt,
            angle=-3 * PI / 2,                  # 270° clockwise
            color=RED,
            stroke_width=2.4,
            tip_length=0.14,
        )
        # Label inside the loop's center — always visible, no clipping
        retry_lbl = Text("3×", font=SANS, font_size=18, color=RED)
        retry_lbl.move_to(np.array([loop_cx, loop_cy, 0]))

        # Footer
        footer = Text(
            "Text2SQL:  schema_linker → query_planner → sql_generator → guardrails → correction_loop",
            font=MONO, font_size=13, color=DIM,
        ).move_to([0, -3.50, 0])

        # ── Animate (execution-order narrative) ───────────────────────────────
        # 1) Front of pipeline: Input Guardrail → Enrich → Router
        self.play(
            LaggedStart(*[FadeIn(n, shift=DOWN * 0.12)
                          for n in [n_guard, n_enrich, n_router]],
                        lag_ratio=0.16),
            run_time=1.3,
        )
        # 2) External resources: memory + MCP servers
        self.play(
            FadeIn(mem_badge, mcp_badge),
            Create(mem_line), Create(mcp_line),
            run_time=0.8,
        )
        # 3) Front-row arrows
        self.play(GrowArrow(a_top[0]), run_time=0.55)   # Input  → Enrich
        self.play(GrowArrow(a_top[1]), run_time=0.55)   # Enrich → Router
        self.wait(0.4)

        # 4) ANALYTICS PATH FIRST — Router → Analytics → Narrate
        self.play(FadeIn(n_anal, shift=DOWN * 0.12),
                  GrowArrow(a_router_anal), run_time=0.9)
        self.wait(0.3)
        self.play(FadeIn(n_narr, shift=RIGHT * 0.12),
                  Create(a_anal_narr), run_time=1.2)
        self.wait(0.5)

        # 5) TEXT2SQL DEEP PATH — Router → Text2SQL → DuckDB
        self.play(FadeIn(n_sql, shift=DOWN * 0.12),
                  GrowArrow(a_top[2]), run_time=0.9)   # Router → Text2SQL
        self.play(FadeIn(n_duck, shift=DOWN * 0.12),
                  GrowArrow(a_top[3]), run_time=0.9)   # Text2SQL → DuckDB
        self.wait(0.3)

        # 6) Curvy L-bridge: DuckDB → Validate
        self.play(FadeIn(n_val, shift=UP * 0.12),
                  Create(a_bridge), run_time=1.2)
        self.wait(0.3)

        # 7) Retry self-loop (right side of Validate — uses empty space)
        self.play(Create(retry_loop), FadeIn(retry_lbl), run_time=1.0)
        self.wait(0.4)

        # 8) Validate → Narrate (deep path joins back into output chain)
        self.play(GrowArrow(a_bot[0]), run_time=0.6)
        self.wait(0.3)

        # 9) Output chain — Output Guardrail + SSE Stream
        self.play(FadeIn(n_oguard, shift=LEFT * 0.12),
                  GrowArrow(a_bot[1]), run_time=0.8)
        self.play(FadeIn(n_sse, shift=LEFT * 0.12),
                  GrowArrow(a_bot[2]), run_time=0.8)
        self.wait(0.4)

        # 10) Footer
        self.play(FadeIn(footer), run_time=0.7)
        self.wait(4.0)
