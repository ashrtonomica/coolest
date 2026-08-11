---
name: Redbelly DAO Task Board brand kit
description: Brand rules from the Redbelly DAO Task Board kit - accent usage, tonal depth, card nesting, logo treatment
type: design
---
Brand rules (source of truth: Redbelly DAO Task Board brand kit):

- Small text/links on dark surfaces use accent #ffb3ae, never solid brand red #EF5350 (fails AA at small sizes). #EF5350 only as solid fill on primary buttons (Trade Now, Open Bridge).
- Depth is tonal only: cards use #1e2a31 fill + 1px lighter border, never drop shadows.
- Avoid box-in-box: use a card only where elevation means real hierarchy; otherwise separate with a single 1px top border in hairline #27323a or plain negative space.
- Tokens live in src/styles.css (:root dark theme): --card #1e2a31, --hairline #27323a, --accent #ffb3ae, --brand #ef5350.
- Wide wordmark logos (lucid.png, reddex.png) are cropped to content bbox and rendered fixed-height / auto-width with object-fit contain, never squished into square boxes.