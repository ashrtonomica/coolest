# REDBELLY DAO TASK-20: Where to Buy & Trade RBNT
<img width="1434" height="1024" alt="dao-logo-on-dark" src="https://github.com/user-attachments/assets/b0326eba-68b4-4367-a579-cc59552e7b4e" />



## Files

- [Where_to_Buy_and_Trade_RBNT.docx](https://github.com/poundeater/redbellydao/blob/main/Where_to_Buy_and_Trade_RBNT.docx) / [.pdf](https://github.com/poundeater/redbellydao/blob/main/Where_to_Buy_and_Trade_RBNT.pdf)

## What is confirmed and how

Every venue was checked directly against its own trade or listing page on
**August 11, 2026**, then cross-referenced against at least two independent
sources. Nothing here is copied from a single aggregator without a second check.

**Native RBNT, centralized exchanges (4 venues):**

| Exchange | Pair | Direct check | Cross-check |
|---|---|---|---|
| Gate | [RBNT/USDT](https://www.gate.com/trade/RBNT_USDT) | gate.com trade page | CoinGecko, CoinCodex |
| MEXC | [RBNT/USDT, RBNT/USDC](https://www.mexc.com/exchange/RBNT_USDT) | mexc.com exchange page, highest volume of the four | CoinGecko, CoinCodex |
| BYDFi | [RBNT/USDT](https://www.bydfi.com/en/spot/RBNT_USDT) | bydfi.com's own sitemap lists the pair directly | CoinCodex, Coinlore |
| WhiteBIT | [RBNT/USDT](https://whitebit.com/trade/RBNT-USDT) | whitebit.com trade page, listed but no trades seen in the hours before verification, flagged thin rather than dropped | CoinGecko, CoinCodex |

BitMart was listed in the previous snapshot. It did not reconfirm as a live
venue in this pass and is not included here.

**Native RBNT, on-chain (Reddex):**

Reddex is the official liquidity hub for Redbelly Network, the only venue
confirmed for trading RBNT and wRBNT directly on-chain, without bridging.

| Token | Pair | Status |
|---|---|---|
| RBNT | RBNT/USDC.e | Verified on [reddex.io/swap](https://reddex.io/swap) |
| WRBNT | WRBNT/USDC.e | Verified on [reddex.io/swap](https://reddex.io/swap) |

WRBNT on Redbelly: `0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076`

**Wrapped RBNT (wRBNT), a separate token from native RBNT, three chains:**

- Ethereum: `0xb45ffb51984d626ee758b336c61cf20990c6bf13`, matched against
  CoinMarketCap's own contract field for the token. Tradeable on 1inch, OKX DEX,
  and Bitget. Volume is thin: 1.51 to 2.87% price impact at 100k, 13 to 14% at 1M.
- Base: `0x020940df9F5E77338a094D55b5B5914122a804A5`, independently verified on
  BaseScan as the RBNTOFT contract. Tradeable on KyberSwap, 1inch, OKX DEX, and
  Bitget. 13.36% price impact at 100k, 7.88 to 8.04% at 1M.
- Solana: `2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3`, matched against
  CoinMarketCap's Solscan explorer link for the token. Tradeable on Raydium, but
  86.77% price impact at just 10k. Effectively unusable at this size.

**Bridges:**

Two official routes move RBNT and stablecoins between Redbelly Network and
other chains.

- [Lucid Labs Bridge](https://bridge.lucidlabs.fi): brings RBNT and wRBNT back
  to Redbelly Network from nine chains, Ethereum, Arbitrum, Optimism, Base,
  BSC, Polygon, Avalanche, Sonic, and Solana. The Solana route is currently
  unavailable.
- [Reddex Bridge](https://reddex.io/bridge): brings USDC and USDT into
  Redbelly Network. Runs on the same Lucid Labs and Polymer infrastructure.
  Flat 1% fee.

**Futures: none confirmed.** CoinGecko's markets table splits into Spot,
Perpetuals, and Futures tabs. All current results sit under Spot, zero under
the other two. Some exchange pages carry generic marketing copy mentioning
futures trading, but that copy is templated and appears on token pages
regardless of whether a market actually exists there, so it was not treated as
evidence. This is why the deliverable states "no futures market" as a direct
finding rather than listing a futures section with a stale entry in it.

## Before you submit

This is an August 11, 2026 snapshot. Exchange listings and DEX liquidity at
this market size can change within days. Re-check each link and contract
address above yourself before the task is marked complete, and again before
anyone relies on this to move funds.
