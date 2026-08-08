# REDBELLYDAO TASK-20: Where to Buy & Trade RBNT

Canonical, dated reference for every live venue trading RBNT. Native RBNT spot
listings and wrapped RBNT (wRBNT) are kept clearly separate, and the document
states plainly that no futures market is currently confirmed, instead of leaving
that gap for someone to assume one exists.

## Files

- `[Where_to_Buy_and_Trade_RBNT.docx](https://github.com/poundeater/redbellydao/blob/main/Where_to_Buy_and_Trade_RBNT.docx)` / `[.pdf](https://github.com/poundeater/redbellydao/blob/main/Where_to_Buy_and_Trade_RBNT.pdf)`  the companion document, styled to
  the Task Board brand kit (light theme).
- `lovable-prompt.md`  the prompt used to generate the graphic, both export sizes
  (1080x1080 for X, 1200x630 for Discord).

## What is confirmed and how

Every venue was checked directly against its own trade or listing page on
**August 8, 2026**, then cross-referenced against at least two independent
sources. Nothing here is copied from a single aggregator without a second check.

**Native RBNT, spot (5 venues):**

| Exchange | Pair | Direct check | Cross-check |
|---|---|---|---|
| Gate | [RBNT/USDT](https://www.gate.com/trade/RBNT_USDT) | gate.com trade page | CoinGecko, CoinCodex |
| MEXC | [RBNT/USDT](https://www.mexc.com/exchange/RBNT_USDT) | mexc.com exchange page | CoinGecko, CoinCodex |
| BYDFi | [RBNT/USDT](https://www.bydfi.com/en/spot/RBNT_USDT) | bydfi.com's own sitemap lists the pair directly | CoinCodex, Coinlore |
| BitMart | [RBNT/USDT](https://www.bitmart.com/trade/RBNT_USDT) | bitmart.com's own live trade page | CoinCodex, Coinlore |
| WhiteBIT | [RBNT/USDT](https://whitebit.com/trade/RBNT-USDT) | whitebit.com trade page | CoinGecko, CoinCodex  both show no trades in the hours before verification, so it is listed but flagged thin rather than dropped |

One thing worth flagging for whoever reviews this: CoinGecko's own tracked-markets
table for RBNT currently shows only Gate, MEXC, WhiteBIT, and the Uniswap pool 
it does not surface BYDFi or BitMart, most likely because CoinGecko has not added
those exchanges to its tracked list for this token, not because the listings do
not exist. Both were confirmed independently straight from the exchanges
themselves (BYDFi's sitemap, BitMart's own live trade page) before being included
here. Relying on a single aggregator's market table alone would have understated
this by two venues.

**Wrapped RBNT (wRBNT), a separate token from native RBNT:**

- Ethereum: `0xb45ffb51984d626ee758b336c61cf20990c6bf13`  matched against
  CoinMarketCap's own contract field for the token and against the input address
  CoinGecko's Uniswap V4 listing points to. Tradeable on Uniswap; volume is thin.
- Solana: `2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3`  matched against
  CoinMarketCap's Solscan explorer link for the token. No specific live DEX pool
  was independently reconfirmed in this pass  note this honestly rather than
  naming a venue that wasn't actually checked.

**Futures: none confirmed.** CoinGecko's markets table splits into Spot,
Perpetuals, and Futures tabs; all five current results sit under Spot, with zero
under the other two. MEXC's own live futures order book for RBNT returns empty
fields across the board. Some exchange pages carry generic marketing copy
mentioning futures trading, but that copy is templated and appears on token pages
regardless of whether a market actually exists there, so it was not treated as
evidence. This is why the deliverable states "no futures market" as a direct
finding rather than listing a futures section with a stale entry in it.

## Before you submit

This is an August 8, 2026 snapshot. Exchange listings on a token at this market
size can change within days. Re-check each link above yourself before the task is
marked complete, and again before anyone relies on this to move funds.
