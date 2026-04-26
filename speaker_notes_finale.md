# AlphaStream India — Finale Speaker Notes (5:30 target)

ET Gen AI Hackathon Grand Finale, 26 Apr 2026, 10:00 AM IST.
Format: 6 min presentation + live demo, then 6 min Q&A. Plan for **5:30** so you have buffer.

## Slides to actually navigate

Hit these eleven only. Skip the rest unless a judge asks.

1. Title
2. Problem
3. Paradigm
4. Architecture
5. Herd of Knowledge
6. Demo Transition (immediately switch to local app)
7. Moat
9. Fusion Engine
11. User Impact
12. Revenue Projection
17. Team

Skip in main flow: 8 (NLQ pipeline), 10 (Agent consensus), 13-15 (appendices), 16 (references). Keep them for Q&A — that is the whole point of having them.

## Time budget

| Block | Slides | Target | Running |
|---|---|---|---|
| Hook | 1, 2 | 0:35 | 0:35 |
| Differentiator | 3 | 0:25 | 1:00 |
| System | 4, 5 | 0:50 | 1:50 |
| Demo | 6 + local app | 1:30 | 3:20 |
| Moat | 7, 9 | 0:50 | 4:10 |
| Why it matters | 11, 12 | 0:50 | 5:00 |
| Close | 17 | 0:25 | 5:25 |

If you blow past the demo budget, drop slide 9 (Fusion) and merge its line into slide 7. Do not drop slide 11 or 12, those are the money slides.

## Slide 1 · Title (0:00 to 0:10)

> Good morning. Two pictures. A Mumbai trader on a thirty-two thousand dollar Bloomberg terminal. A retail investor checking a WhatsApp group for the next tip. We close that gap. AlphaStream India.

Move on. Do not linger.

## Slide 2 · Problem (0:10 to 0:35)

> Twenty-one crore demat accounts in India, four and a half crore active. Eighty percent rely on tips, not data. Two to three hours a day lost to disconnected screens. And the obvious shortcut, ChatGPT, is dangerous because it answers from frozen weights and hallucinates prices.

## Slide 3 · Paradigm (0:35 to 1:00)

> So we built a live AI paradigm, not another chatbot. Streaming under two seconds. Thirteen agents fused into one Alpha Score. Every number from SQL on DuckDB, deterministic. Citations on every claim.

## Slide 4 · Architecture (1:00 to 1:25)

> Five layers. Ingestion. Pathway streaming engine. Thirteen agents. DuckDB and Chroma. React terminal. End to end, news article to UI, under two seconds.

Point at the diagram, don't read it.

## Slide 5 · Herd of Knowledge (1:25 to 1:50)

Let the video play in the background while you talk.

> Fourteen connectors, four categories. News, market data, institutional flows including NSDL FII DII and NSE insider, and global macro from FRED. All deduplicated, embedded, and indexed incrementally by Pathway. No batch rebuilds.

## Slide 6 · Demo (1:50 to 3:20) — local app

Switch tabs. Have the app ALREADY OPEN in another window before the call starts.

Run this exact sequence, no improvising:

1. **Dashboard glance (15 s)** — show overview: top signals, FII flow, sentiment.
2. **NLQ chat (30 s)** — ask one question you have rehearsed, e.g. *"Which Nifty 50 stocks had FII inflow streaks of 5 days or more this month?"* — show grounded answer with table and citation.
3. **Live sentiment shift (45 s)** — the money shot. Inject the prepared news article, watch the recommendation flip on screen in under two seconds, no refresh.

Narration over the demo, not in advance:

> Watch the screen, not me. I am injecting a breaking story right now. Pathway picks it up, the sentiment agent reranks, the Decision Agent reweights, and the recommendation flips. Under two seconds.

If the live shift fails, fall back: **"Here is a recording of the same flow from a few hours ago."** Have the backup MP4 in the same folder, ready to drag-drop into a Meet share.

## Slide 7 · Moat (3:20 to 3:50)

> Three things a wrapper cannot copy. Sub two second latency. Adaptive RAG that doubles retrieval only when the model needs it, forty percent cheaper than fixed RAG. And our regulatory moat: Perplexity Finance is free for India, but it does not have NSE SAST PIT or NSDL flow data. That data is not in any global API.

## Slide 9 · Fusion Engine (3:50 to 4:10)

> Five weighted buckets feed the Decision Agent: filings twenty-five, technical twenty-five, insider plus FII flow twenty, sentiment fifteen, backtest fifteen. The output is one Alpha Score, zero to one hundred. Above eighty is Strong Buy.

## Slide 11 · User Impact (4:10 to 4:35)

> Per user per year: two lakh nineteen thousand rupees in recovered productivity, fifty-four thousand in extra alpha, fifteen percent fewer behavioural losses. That is the case for the retail investor.

## Slide 12 · Revenue (4:35 to 5:00)

> For ET Markets: at year five, five lakh users at nine ninety-nine a month is five hundred and ninety-nine crore. Tickertape, a screener at five thousand a year, already does one hundred and fourteen crore. We are real time at twelve thousand. Plus thirty percent off ET's analyst workload, another five to ten crore in operational savings.

## Slide 17 · Team (5:00 to 5:25)

> Everything you saw is at github dot com slash wildcraft958 slash AlphaStream India. Built by Team NamoFans. We are open for an architectural teardown. Thank you.

End on the GitHub URL. Stop talking.

## Q&A drill, top 5 most-likely questions

**1. "How do you compete with Perplexity Finance? It is free."**
Perplexity does not have NSE SAST PIT or NSDL FII DII data. Those are regulated domestic feeds, not in any global API. We have them and we have them in real time.

**2. "Sixty percent accuracy is not impressive."**
Sixty percent is the win rate from five-year Nifty 50 backtests. We do not claim more than the data supports. It is honest. The other forty percent we flag as Hold or No Signal, not as wrong calls.

**3. "Why thirteen agents and not one big LLM?"**
Specialisation and traceability. A single LLM is a black box. Thirteen specialists with weighted fusion means we can show the user *which* signal moved the score and by how much. That is the explainability you cannot get from a wrapper.

**4. "Who pays nine ninety-nine rupees a month?"**
Active traders, the four and a half crore active demat accounts. Tickertape charges five thousand a year on a batch screener and clears one hundred and fourteen crore in revenue. We are real time. Half their userbase at our price clears five hundred crore.

**5. "What is your latency under load?"**
Pathway streams incrementally so latency does not degrade with corpus size. Sub two seconds end to end on the live system you just saw. The bottleneck is the LLM call, which we cap at two seconds and fall back to cached signal if it overruns.

## If something breaks on stage

- App crashes mid-demo: switch to the backup MP4. Say *"Here is the same flow from a recording, the live system is back to ingesting in the background."* Move on.
- Slides freeze: refresh tab. Don't apologise more than once. The judges are technical, they have seen this before.
- You go over time: stop mid-sentence on slide 12, jump to slide 17, *"To close: GitHub link, team, thank you."* Take questions. Never blow past 6 minutes.

## Pre-flight checklist (do this 30 min before the call)

- [ ] App running on localhost, all 4 tabs warm
- [ ] Sample NLQ question typed into the chat box already, not sent yet
- [ ] News article ready to inject, browser console or curl command staged
- [ ] Backup MP4 of the live sentiment shift open in another tab, drag-drop ready
- [ ] Slide deck open at slide 1 in fullscreen
- [ ] Mic and camera tested in Meet
- [ ] Phone on silent
- [ ] Glass of water within reach

## One-line truths to fall back on

- "Streaming pipeline. Thirteen weighted agents. SQL-backed answers. Sub two second end to end."
- "We are not a wrapper. Every number is grounded in DuckDB."
- "If you can't see where a signal came from, you can't trust it. We can show you."
