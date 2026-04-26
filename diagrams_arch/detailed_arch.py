"""
AlphaStream India: System Architecture
Fixes: even spacing in all layers, L2/L4 boxes no longer touch,
       L5 latency badge separated from Zustand box.
"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

BG    = "#05070D"
PANEL = "#0D1929"
TEXT  = "#EAF1FB"
DIM   = "#8A9CB8"
CYAN  = "#22D3EE"
GREEN = "#10F4B1"
AMBER = "#FFB020"
VIOLET= "#A78BFA"
RED   = "#FF5577"
BLUE  = "#60A5FA"

W, H = 20, 11.25

fig, ax = plt.subplots(figsize=(W, H), dpi=96)
fig.patch.set_facecolor(BG)
ax.set_facecolor(BG)
ax.set_xlim(0, W)
ax.set_ylim(0, H)
ax.axis("off")

# ── Content x range ────────────────────────────────────────────────────────────
X0 = 0.88    # left margin (after layer label strip)
X1 = 19.70   # right margin
CW = X1 - X0  # = 18.82 content width


# ── Helpers ────────────────────────────────────────────────────────────────────
def even_boxes(n, x_start=X0, x_end=X1, gap=0.30):
    """Return (box_width, [x0, x1, ...]) for n evenly spaced boxes."""
    total_gap = (n - 1) * gap
    bw = (x_end - x_start - total_gap) / n
    xs = [x_start + i * (bw + gap) for i in range(n)]
    return bw, xs


def band(y0, h, color, alpha=0.07):
    ax.add_patch(FancyBboxPatch((0.2, y0), W - 0.4, h,
                                boxstyle="round,pad=0", linewidth=0,
                                facecolor=color, alpha=alpha))
    ax.add_patch(Rectangle((0.2, y0), 0.18, h,
                            facecolor=color, linewidth=0, alpha=0.88))


def layer_label(y0, h, label, color):
    ax.text(0.54, y0 + h / 2, label,
            color=color, fontsize=8.0, fontweight="bold",
            ha="center", va="center", rotation=90, fontfamily="monospace")


def box(x, y, w, h, label, sublabel, color):
    ax.add_patch(FancyBboxPatch((x, y), w, h,
                                boxstyle="round,pad=0.05", linewidth=1.3,
                                edgecolor=color, facecolor=PANEL))
    lbl_y = y + h * (0.64 if sublabel else 0.50)
    ax.text(x + w / 2, lbl_y, label,
            color=color, fontsize=7.6, fontweight="bold",
            ha="center", va="center", fontfamily="monospace", clip_on=True)
    if sublabel:
        ax.text(x + w / 2, y + h * 0.28, sublabel,
                color=DIM, fontsize=6.2,
                ha="center", va="center", fontfamily="monospace", clip_on=True)


def sec_label(x, y, label, color):
    ax.text(x, y, label, color=color, fontsize=7.3, fontweight="bold",
            ha="left", va="bottom", fontfamily="monospace")


def arrow(x0, y0, x1, y1, color=CYAN, lw=1.8):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                arrowprops=dict(arrowstyle="-|>", color=color,
                                lw=lw, mutation_scale=11))


def div(y, color=TEXT):
    ax.plot([0.45, W - 0.45], [y, y], color=color, lw=0.6, alpha=0.25, ls="--")


# ── Layer geometry ─────────────────────────────────────────────────────────────
L5_Y, L5_H = 0.18, 1.48   # Delivery
L4_Y, L4_H = 1.82, 1.82   # Analytics
L3_Y, L3_H = 3.80, 2.10   # Reasoning  (extra height for decision row padding)
L2_Y, L2_H = 6.06, 1.65   # Streaming  (shifted up)
L1_Y, L1_H = 7.87, 3.23   # Data Sources (shifted up, slight height trim)

for y0, h, col in [
    (L5_Y, L5_H, RED),
    (L4_Y, L4_H, GREEN),
    (L3_Y, L3_H, VIOLET),
    (L2_Y, L2_H, CYAN),
    (L1_Y, L1_H, AMBER),
]:
    band(y0, h, col)

layer_label(L5_Y, L5_H, "LAYER 5 DELIVERY",     RED)
layer_label(L4_Y, L4_H, "LAYER 4 ANALYTICS",    GREEN)
layer_label(L3_Y, L3_H, "LAYER 3 REASONING",    VIOLET)
layer_label(L2_Y, L2_H, "LAYER 2 STREAMING",    CYAN)
layer_label(L1_Y, L1_H, "LAYER 1 DATA SOURCES", AMBER)

for y in [L5_Y + L5_H, L4_Y + L4_H, L3_Y + L3_H, L2_Y + L2_H]:
    div(y)

# ── Title ──────────────────────────────────────────────────────────────────────
ax.text(W / 2, 10.90, "AlphaStream India: System Architecture",
        color=TEXT, fontsize=13, fontweight="bold",
        ha="center", va="center", fontfamily="monospace")

# ════════════════════════════════════════════════════════════════════════════════
# LAYER 1: Data Sources — left half (Market+Institutional) / right half (News+Global)
# ════════════════════════════════════════════════════════════════════════════════
LH_END = 9.50    # left half x end
RH_START = 10.15  # right half x start

# Box height and vertical positions within L1
BH = 0.64
LABEL_GAP = 0.22   # breathing room between section label and boxes below it
R1_Y = 9.60        # top row boxes (Market Data / News Intelligence)
R2_Y = 8.08        # bottom row boxes — pushed down to use empty space below, creating clear gap from R1

# Left half: 3 boxes each row, gap=0.30 — fills left half evenly
BW_L, L_xs = even_boxes(3, x_start=X0, x_end=LH_END, gap=0.30)

# Right half News: 5 boxes, gap=0.22
BW_N, N_xs = even_boxes(5, x_start=RH_START, x_end=X1, gap=0.22)

# Right half Global: SAME width as News boxes, centered within right half
RH_WIDTH = X1 - RH_START                     # = 9.55
G_total  = 3 * BW_N + 2 * 0.22               # same gap as News
G_offset = (RH_WIDTH - G_total) / 2          # centering offset
G_xs     = [RH_START + G_offset + i * (BW_N + 0.22) for i in range(3)]
BW_G     = BW_N                               # same width for visual consistency

# Section headers — 0.22 above their row's boxes
sec_label(X0,                      R1_Y + BH + LABEL_GAP, "[M] Market Data",        GREEN)
sec_label(RH_START + G_offset,     R1_Y + BH + LABEL_GAP, "[N] News Intelligence",   CYAN)
sec_label(X0,                      R2_Y + BH + LABEL_GAP, "[I] Institutional",       AMBER)
sec_label(RH_START + G_offset,     R2_Y + BH + LABEL_GAP, "[G] Global Intelligence", VIOLET)

# Row 1 boxes
for x, (lbl, sub) in zip(L_xs, [
    ("NSE API",   "yfinance .NS"),
    ("BSE API",   "Corp Filings"),
    ("Groww API", "JWT + TOTP"),
]):
    box(x, R1_Y, BW_L, BH, lbl, sub, GREEN)

for x, (lbl, sub) in zip(N_xs, [
    ("NewsAPI",      "Breaking"),
    ("Finnhub",      "Company"),
    ("AlphaVantage", "Sentiment"),
    ("MediaStack",   "Global"),
    ("RSS Feeds",    "10 feeds"),
]):
    box(x, R1_Y, BW_N, BH, lbl, sub, CYAN)

# Row 2 boxes
for x, (lbl, sub) in zip(L_xs, [
    ("FIIDIIConnector", "NSDL Flows"),
    ("InsiderConnector","SAST/PIT/Bulk"),
    ("BSEConnector",    "Corp Actions"),
]):
    box(x, R2_Y, BW_L, BH, lbl, sub, AMBER)

for x, (lbl, sub) in zip(G_xs, [
    ("GlobalMarket",  "VIX/Crypto/FX"),
    ("MacroConnector","FRED 30+ series"),
    ("Geopolitical",  "Hotspot Classify"),
]):
    box(x, R2_Y, BW_G, BH, lbl, sub, VIOLET)

# ════════════════════════════════════════════════════════════════════════════════
# LAYER 2: Pathway Streaming — 5 boxes, gap=0.35 (boxes won't touch)
# ════════════════════════════════════════════════════════════════════════════════
L2_items = [
    ("[~] ConnectorSubject",  "pw.io.python",         CYAN),
    ("[+] DocumentStore",     "TokenSplitter 400t",   CYAN),
    ("[#] UsearchKnnFactory", "COS similarity",       CYAN),
    ("[*] AdaptiveRAG",       "n=2 factor=2 iter=4",  GREEN),
    ("[>] pw.persistence",    ".PathwayCache",        DIM),
]
BW2, L2_xs = even_boxes(len(L2_items), gap=0.35)
L2_BY = L2_Y + 0.42
L2_BH = 0.82

for x, (lbl, sub, col) in zip(L2_xs, L2_items):
    box(x, L2_BY, BW2, L2_BH, lbl, sub, col)

# ════════════════════════════════════════════════════════════════════════════════
# LAYER 3: Multi-Agent Reasoning
# ════════════════════════════════════════════════════════════════════════════════
# Left 6 agents (Market Analysis)
L3_LEFT = ["[◉] Sentiment","[▲] Technical","[◆] Risk","[◇] Pattern","[>] Backtest","[~] Flow"]
# Right 6 agents (Data Intelligence)
L3_RIGHT= ["[■] Filing","[x] Insider","[!] Anomaly","[*] Search","[^] Chart","[#] Report"]

AH = 0.54
A_BY = L3_Y + 1.08   # raised so there is clear gap above the decision row

# Split: left agents in left ~51%, right agents in right ~49%
L_MID = 9.60    # dividing point
R_START_3 = 10.15

AW_L, AL_xs = even_boxes(6, x_start=X0, x_end=L_MID, gap=0.16)
AW_R, AR_xs = even_boxes(6, x_start=R_START_3, x_end=X1, gap=0.16)

sec_label(X0,        A_BY + AH + 0.08, "Market Analysis",   CYAN)
sec_label(R_START_3, A_BY + AH + 0.08, "Data Intelligence", VIOLET)

for x, name in zip(AL_xs, L3_LEFT):
    box(x, A_BY, AW_L, AH, name, "", CYAN)
for x, name in zip(AR_xs, L3_RIGHT):
    box(x, A_BY, AW_R, AH, name, "", VIOLET)

# Decision Agent + NLQ Agent — centered horizontally, gap from agent row above
DW   = 4.2    # decision box width
NLQ_W= 5.8    # nlq box width
DH   = 0.62   # row height
GAP  = 0.55   # gap between the two boxes
TOTAL_W = DW + GAP + NLQ_W                  # = 10.55
DEC_X   = (X0 + X1) / 2 - TOTAL_W / 2      # ~5.02  (centered)
NLQ_X   = DEC_X + DW + GAP                  # ~9.77
DEC_Y   = L3_Y + 0.20                       # bottom of row (with padding from layer edge)
box(DEC_X, DEC_Y, DW,    DH, "[*] Decision Agent",           "Alpha Score 0-100  BUY/HOLD/SELL", AMBER)
box(NLQ_X, DEC_Y, NLQ_W, DH, "[>] NLQ Agent (LangGraph 8-node)", "Text2SQL + Guardrails + MCP Servers", GREEN)

# ════════════════════════════════════════════════════════════════════════════════
# LAYER 4: Analytics — 6 boxes, gap=0.30 (boxes won't touch)
# ════════════════════════════════════════════════════════════════════════════════
L4_items = [
    ("[=] DuckDB OLAP",       "10 tables  6 views",    GREEN),
    ("[v] ChromaDB",          "Vector Store",          BLUE),
    ("[#] Text2SQL Pipeline", "schema plan sql guard", AMBER),
    ("[*] MCP Servers (3)",   "market signal search",  VIOLET),
    ("[~] RAGPipeline",       "Chunker+HybridRetriever",CYAN),
    ("[^] FastAPI",           "60+ ep  WS  SSE",       RED),
]
BW4, L4_xs = even_boxes(len(L4_items), gap=0.30)
L4_BY = L4_Y + 0.48
L4_BH = 0.86

for x, (lbl, sub, col) in zip(L4_xs, L4_items):
    box(x, L4_BY, BW4, L4_BH, lbl, sub, col)

# ════════════════════════════════════════════════════════════════════════════════
# LAYER 5: Delivery — 3 functional boxes + separate latency badge
# Boxes in left 70%, badge in right 30% — NO OVERLAP
# ════════════════════════════════════════════════════════════════════════════════
L5_BOX_END = 13.60   # boxes occupy x=0.88 to 13.60
BADGE_X    = 14.10   # badge starts here
BADGE_W    =  5.30   # badge width (14.10 + 5.30 = 19.40 < 19.70 ✓)

L5_items = [
    ("[>] React 19 Terminal", "5-Tab Bloomberg  Recharts",  RED),
    ("[~] WebSocket + SSE",   "/ws/{ticker}  <50ms  SSE",   CYAN),
    ("[=] Zustand State",     "localStorage persistence",    DIM),
]
BW5, L5_xs = even_boxes(3, x_start=X0, x_end=L5_BOX_END, gap=0.35)
L5_BY = L5_Y + 0.25
L5_BH = 0.90

for x, (lbl, sub, col) in zip(L5_xs, L5_items):
    box(x, L5_BY, BW5, L5_BH, lbl, sub, col)

# Latency badge — fully right of all L5 boxes
ax.add_patch(FancyBboxPatch((BADGE_X, L5_BY), BADGE_W, L5_BH,
                             boxstyle="round,pad=0.06", linewidth=1.6,
                             edgecolor=GREEN, facecolor=PANEL))
ax.text(BADGE_X + BADGE_W / 2, L5_BY + L5_BH * 0.66,
        "End-to-end latency",
        color=DIM, fontsize=7.8, ha="center", va="center", fontfamily="monospace")
ax.text(BADGE_X + BADGE_W / 2, L5_BY + L5_BH * 0.30,
        "< 2,000 ms",
        color=GREEN, fontsize=11, fontweight="bold",
        ha="center", va="center", fontfamily="monospace")

# ── Inter-layer arrows ─────────────────────────────────────────────────────────
MX = W / 2
arrow(MX, L1_Y,        MX, L2_Y + L2_H, CYAN)
arrow(MX, L2_Y,        MX, L3_Y + L3_H, VIOLET)
arrow(MX, L3_Y,        MX, L4_Y + L4_H, GREEN)
arrow(MX, L4_Y,        MX, L5_Y + L5_H, RED)

plt.savefig("animations/detailed_arch.png", dpi=96, bbox_inches="tight",
            facecolor=BG, edgecolor="none")
plt.close()
print("Saved animations/detailed_arch.png")
