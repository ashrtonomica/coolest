import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, Fragment, useState } from "react";
import { useRbntPrices } from "@/hooks/useRbntPrices";
import ethereumLogo from "../ethereum-eth-logo.png";
import baseLogo from "../Base_square_blue.png";
import solanaLogo from "../solana-sol-logo.png";
import inchLogo from "../1inch.png";
import bitgetLogo from "../bitget.png";
import kyberswapLogo from "../kyber-network-crystal-v2-knc-logo.png";
import raydiumLogo from "../raydium.png";
import okxLogo from "../OKX_id7gsDJl-c_0.png";
import rbntLogo from "../rbnt.png";
import wrbntLogo from "../wrbnt.png";
import reddexLogo from "../reddex.png";
import lucidLogo from "../lucid.png";

const LOGO_STYLE = {
  width: 20,
  height: 20,
  objectFit: "contain",
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Where to Buy & Trade RBNT | Redbelly DAO TASK-20" },
      {
        name: "description",
        content:
          "Canonical, dated list of every live venue trading RBNT: native spot, wrapped spot, and derivatives. Verified 2026-08-08 UTC.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Where to Buy & Trade RBNT" },
      {
        property: "og:description",
        content:
          "Canonical venue list for RBNT: native spot, wrapped spot, and derivatives. Verified 2026-08-08 UTC.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Where to Buy & Trade RBNT" },
      {
        name: "twitter:description",
        content:
          "Canonical venue list for RBNT: native spot, wrapped spot, and derivatives.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Page,
});

type Venue = {
  name: string;
  type: "CEX" | "DEX" | "NONE";
  pair: string;
  url: string | null;
  status: "verified" | "thin" | "unconfirmed" | "none";
  category: "native-spot" | "wrapped-spot" | "futures";
  chain?: string;
  flag?: string;
  logo?: string;
};

const VENUES: Venue[] = [
  {
    name: "MEXC",
    type: "CEX",
    pair: "RBNT/USDT",
    url: "https://www.mexc.com/exchange/RBNT_USDT",
    status: "verified",
    category: "native-spot",
    logo: "/logos/mexc.jpg",
  },
  {
    name: "Gate",
    type: "CEX",
    pair: "RBNT/USDT",
    url: "https://www.gate.com/trade/RBNT_USDT",
    status: "verified",
    category: "native-spot",
    logo: "/logos/gate.png",
  },
  {
    name: "WhiteBIT",
    type: "CEX",
    pair: "RBNT/USDT",
    url: "https://whitebit.com/trade/RBNT-USDT",
    status: "thin",
    category: "native-spot",
    logo: "/logos/whitebit.png",
  },
  {
    name: "BYDFi",
    type: "CEX",
    pair: "RBNT/USDT",
    url: "https://www.bydfi.com",
    status: "verified",
    category: "native-spot",
    logo: "/logos/bydfi.png",
  },
  {
    name: "No futures market confirmed as of 2026-08-08.",
    type: "NONE",
    pair: "-",
    url: null,
    status: "none",
    category: "futures",
  },
];

type ChainDexVenue = {
  name: string;
  url: string;
  logo?: string;
};

type ChainGroup = {
  chain: string;
  pair: string;
  contract: string;
  impacts: string[];
  severity: "low" | "medium" | "high";
  note?: string;
  unusableNote?: string;
  logo?: string;
  venues: ChainDexVenue[];
};

const CHAIN_GROUPS: ChainGroup[] = [
  {
    chain: "Ethereum",
    pair: "WRBNT/ETH",
    contract: "0xb45ffb51984d626ee758b336c61cf20990c6bf13",
    impacts: ["100k: 1.51-2.87%", "1M: 13-14%"],
    severity: "medium",
    logo: ethereumLogo,
    venues: [
      {
        name: "1inch",
        url: "https://1inch.com/swap?src=1:0xb45ffb51984d626ee758b336c61cf20990c6bf13&dst=1:USDT",
        logo: inchLogo,
      },
      {
        name: "OKX DEX",
        url: "https://web3.okx.com/dex-swap?chain=ethereum,ethereum&token=0xb45ffb51984d626ee758b336c61cf20990c6bf13,0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        logo: okxLogo,
      },
      {
        name: "Bitget",
        url: "https://web3.bitget.com/en/swap/eth/0xb45fFB51984d626Ee758b336C61Cf20990c6bF13",
        logo: bitgetLogo,
      },
    ],
  },
  {
    chain: "Base",
    pair: "RBNT/USDC",
    contract: "0x020940df9F5E77338a094D55b5B5914122a804A5",
    impacts: ["1M: 7.88-8.04%", "100k: 13.36%"],
    severity: "medium",
    logo: baseLogo,
    venues: [
      {
        name: "KyberSwap",
        url: "https://kyberswap.com/swap/base/0x020940df9f5e77338a094d55b5b5914122a804a5-to-usdc",
        logo: kyberswapLogo,
      },
      {
        name: "1inch",
        url: "https://1inch.com/swap?src=8453:0x020940df9f5e77338a094d55b5b5914122a804a5&dst=8453:USDC",
        logo: inchLogo,
      },
      {
        name: "OKX DEX",
        url: "https://web3.okx.com/dex-swap?chain=base,base&token=0x020940df9f5e77338a094d55b5b5914122a804a5,0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
        logo: okxLogo,
      },
      {
        name: "Bitget",
        url: "https://web3.bitget.com/en/swap/base/0x020940df9F5E77338a094D55b5B5914122a804A5",
        logo: bitgetLogo,
      },
    ],
  },
  {
    chain: "Solana",
    pair: "WRBNT/-",
    contract: "2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3",
    impacts: ["10k: 86.77%"],
    severity: "high",
    note: "No live pool confirmed - status unconfirmed.",
    unusableNote: "effectively unusable at this size",
    logo: solanaLogo,
    venues: [
      {
        name: "Raydium",
        url: "https://raydium.io/swap/?inputMint=2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        logo: raydiumLogo,
      },
    ],
  },
];

const METHODOLOGY = [
  "Every exchange was checked against its own live trade page.",
  "Each listing was cross-referenced against CoinGecko and CoinCodex, or Coinlore where needed.",
  "For wRBNT, contract addresses were matched against CoinMarketCap's explorer links.",
  "Any venue found in only one source with no live confirmation is left off the list.",
  "Relying on a single aggregator's market table alone would have understated listings by two venues.",
];

const statusColor: Record<Venue["status"], string> = {
  verified: "bg-success",
  thin: "bg-warning",
  unconfirmed: "bg-warning",
  none: "bg-brand",
};

const statusText: Record<Venue["status"], string> = {
  verified: "text-success",
  thin: "text-warning",
  unconfirmed: "text-warning",
  none: "text-brand",
};

const statusBorderColor: Record<Venue["status"], string> = {
  verified: "border-success",
  thin: "border-warning",
  unconfirmed: "border-warning",
  none: "border-brand",
};

function NativeStatusBadge({ status }: { status: Venue["status"] }) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded border bg-card px-2.5 py-1 min-w-[90px] ${statusBorderColor[status]}`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${statusColor[status]}`}
        aria-hidden="true"
      />
      <span className={`font-mono text-[13px] ${statusText[status]}`}>
        {status}
      </span>
    </span>
  );
}

function TradeButton({
  href,
  label = "Trade Now",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1.5 rounded text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
      style={{
        backgroundColor: "#EF5350",
        padding: "6px 14px",
        fontFamily: '"Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif',
        fontWeight: 600,
      }}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

const IMPACT_COLORS: Record<ChainGroup["severity"], string> = {
  low: "#86EFAC",
  medium: "#FCD34D",
  high: "#F87171",
};

function ImpactBadge({
  severity,
  children,
}: {
  severity: ChainGroup["severity"];
  children: ReactNode;
}) {
  const color = IMPACT_COLORS[severity];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px]"
      style={{ backgroundColor: "#1e2a31", borderColor: color, color }}
    >
      {severity === "high" ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}

function ChainGroupRow({ group }: { group: ChainGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-hairline py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 text-left"
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          {group.logo ? (
            <img
              src={group.logo}
              alt=""
              width={20}
              height={20}
              className="shrink-0"
              style={LOGO_STYLE}
            />
          ) : null}
          <span className="font-semibold text-foreground">{group.chain}</span>
          <span className="font-mono text-[13px] text-secondary-foreground">
            {group.pair}
          </span>
        </span>
        <span className="flex shrink-0 items-center">
          <ImpactBadge severity={group.severity}>
            <span className="flex flex-col items-start leading-tight">
              {group.impacts.map((impact) => (
                <span key={impact}>{impact}</span>
              ))}
            </span>
          </ImpactBadge>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {group.note ? (
        <p className="mt-1.5 text-[14px] text-warning">{group.note}</p>
      ) : null}
      {open ? (
        <div className="mt-2 rounded-chip border border-hairline bg-nested p-3">
          <p className="font-mono text-[12px] break-all text-muted-foreground">
            <span className="text-secondary-foreground">Contract:</span>{" "}
            {group.contract}
          </p>
          <ul className="mt-1 flex flex-col">
            {group.venues.map((v) => (
              <li
                key={v.name}
                className="flex items-center justify-between gap-3 border-b border-hairline py-2.5 last:border-b-0"
              >
                <span className="flex items-center gap-2 text-[15px] text-foreground">
                  {v.logo ? (
                    <img
                      src={v.logo}
                      alt=""
                      width={20}
                      height={20}
                      className="shrink-0"
                      style={LOGO_STYLE}
                    />
                  ) : null}
                  {v.name}
                </span>
                <TradeButton href={v.url} />
              </li>
            ))}
          </ul>
          {group.unusableNote ? (
            <p className="pt-2 text-[14px]" style={{ color: "#F87171" }}>
              {group.unusableNote}
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

const MONO_STACK = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

function isFiatQuote(pair: string) {
  const quote = pair.split("/")[1]?.toUpperCase() ?? "";
  return ["USDT", "USDC", "USD", "EUR", "BUSD", "DAI"].includes(quote);
}

function LiveLabel() {
  return (
    <span className="flex items-center justify-end gap-1.5">
      <span
        className="live-dot inline-block shrink-0 rounded-full"
        style={{ width: 6, height: 6, backgroundColor: "#86EFAC" }}
        aria-hidden="true"
      />
      <span
        style={{
          fontFamily: MONO_STACK,
          fontSize: 10,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: "#6b7a85",
        }}
      >
        Live
      </span>
    </span>
  );
}

function PriceCell({
  venue,
  price,
  connected,
}: {
  venue: Venue;
  price: string | null | undefined;
  connected: boolean;
}) {
  const baseStyle = {
    fontFamily: MONO_STACK,
    fontSize: 14,
  } as const;

  if (venue.name === "BYDFi") {
    return (
      <span
        className="justify-self-end overflow-visible whitespace-nowrap text-right"
        style={{ ...baseStyle, color: "#93a4ae" }}
      >
        Check exchange
      </span>
    );
  }

  return (
    <div className="flex min-w-[110px] flex-col items-end justify-self-end overflow-visible text-right">
      <LiveLabel />
      <span
        className="whitespace-nowrap"
        style={{
          ...baseStyle,
          color: price == null || !connected ? "#6b7a85" : "#e4ebf0",
        }}
      >
        {price == null
          ? connected
            ? "loading"
            : "offline"
          : `${isFiatQuote(venue.pair) ? "$" : ""}${price}`}
      </span>
    </div>
  );
}

function NativeVenueRow({
  venue,
  price,
  connected,
}: {
  venue: Venue;
  price?: string | null;
  connected: boolean;
}) {
  return (
    <li className="grid grid-cols-subgrid col-span-full items-center border-b border-hairline py-3 last:border-b-0">
      <div className="flex items-center gap-2 whitespace-nowrap">
        {venue.logo ? (
          <img
            src={venue.logo}
            alt=""
            className="shrink-0"
            width={24}
            height={24}
            style={{
              width: 24,
              height: 24,
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : null}
        {venue.chain ? (
          <span className="label-sm text-[11px] text-muted-foreground">
            {venue.chain}
          </span>
        ) : null}
        <span className="font-semibold text-foreground">{venue.name}</span>
      </div>
      <span className="inline-flex w-fit rounded-chip border border-hairline bg-nested px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
        {venue.type === "NONE" ? "SPOT ONLY" : venue.type}
      </span>
      <span className="font-mono text-[13px] text-secondary-foreground">
        {venue.pair}
      </span>
      <NativeStatusBadge status={venue.status} />

      <div className="justify-self-end">
        {venue.url ? (
          <TradeButton href={venue.url} />
        ) : (
          <span className="text-[15px] text-muted-foreground">No link</span>
        )}
      </div>
      <PriceCell venue={venue} price={price} connected={connected} />
    </li>
  );
}

function WhitebitCallout() {
  return (
    <div
      className="mt-2 flex items-start gap-3 text-[16px] leading-[1.5]"
      style={{
        backgroundColor: "#1e2a31",
        border: "1px solid #FCD34D",
        borderLeft: "3px solid #FCD34D",
        borderRadius: "4px",
        padding: "10px 14px",
        color: "#e4ebf0",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-1 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      WhiteBIT shows no trades in the hours before verification - it is listed
      but thin.
    </div>
  );
}

function Card({
  accent,
  title,
  caption,
  captionTone = "muted",
  nested = false,
  children,
}: {
  accent?: string;
  title: string;
  caption?: string;
  captionTone?: "muted" | "warning";
  nested?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-panel border border-hairline ${nested ? "bg-nested" : "bg-card"} overflow-hidden`}
    >
      <div className="flex">
        {accent ? (
          <div className="w-1 shrink-0" style={{ backgroundColor: accent }} />
        ) : null}
        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <header className="mb-4">
            <h2 className="label-sm text-[13px] text-foreground">{title}</h2>
            {caption ? (
              <p
                className={`mt-1 text-[15px] ${captionTone === "warning" ? "text-warning" : "text-muted-foreground"}`}
              >
                {caption}
              </p>
            ) : null}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}

function Page() {
  const { prices, connected } = useRbntPrices();
  const native = VENUES.filter((v) => v.category === "native-spot");
  const futures = VENUES.filter((v) => v.category === "futures");

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] font-bold tracking-[0.12em] text-foreground uppercase">
          Redbelly DAO
        </span>
        <span className="label-sm text-[11px] text-muted-foreground">
          TASK-20
        </span>
      </div>

      <header className="border-b border-hairline pb-8">
        <h1 className="text-[32px] leading-tight font-bold tracking-[-0.02em] text-foreground sm:text-[44px]">
          Where to Buy & Trade RBNT
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-secondary-foreground">
          Canonical venue list: native, wrapped, and derivatives
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="font-mono text-[13px] text-accent">
            Last verified: 2026-08-08 UTC
          </span>
          <a
            href="#verify"
            className="rounded-chip border border-border px-3 py-1.5 text-[14px] text-foreground hover:border-accent hover:text-accent"
          >
            Re-verify checklist
          </a>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-6">
        <Card title="Spot - Native RBNT" caption="You own the token">
          <div className="-mx-1 min-w-0 max-w-full overflow-x-auto px-1">
            <ul className="grid w-full min-w-[740px] grid-cols-[minmax(130px,1fr)_56px_105px_98px_128px_minmax(120px,auto)] gap-x-3 gap-y-0">
              {native.map((v) => (
                <Fragment key={v.name}>
                  <NativeVenueRow
                    venue={v}
                    price={prices[v.name.toLowerCase()]}
                    connected={connected}
                  />
              {v.name === "WhiteBIT" ? (
                <li className="col-span-full list-none">
                  <WhitebitCallout />
                </li>
              ) : null}
                </Fragment>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-[16px] leading-relaxed text-secondary-foreground">
            CoinGecko's tracked markets table does not surface BYDFi. It was
            confirmed directly from the exchange itself (BYDFi's sitemap)
            before inclusion.
          </p>
        </Card>

        <Card
          title="Spot - RBNT / WRBNT"
          caption="Separate from native RBNT"
          captionTone="warning"
        >
          <ul className="flex flex-col">
            {CHAIN_GROUPS.map((g) => (
              <ChainGroupRow key={g.chain} group={g} />
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary-foreground">
            wRBNT is a separate ERC-20 token pegged 1:1 to native RBNT through
            Redbelly's official Ethereum bridge. It is not interchangeable on
            every venue without bridging.
          </p>
        </Card>

        <Card
          title="Spot - Redbelly Native DEX"
          caption="Trade directly on Redbelly Network"
        >
          <ul className="flex flex-col">
            <li className="flex flex-col flex-wrap gap-2 border-b border-hairline py-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4">
              <div className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-2">
                  <img
                    src={rbntLogo}
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0"
                    style={LOGO_STYLE}
                  />
                  <span className="font-semibold text-foreground">RBNT</span>
                </span>
                <span className="font-mono text-[13px] text-secondary-foreground">
                  RBNT/USDC.e
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-[480px]:justify-end">
                <NativeStatusBadge status="verified" />
                <TradeButton href="https://www.reddex.io/swap?chain=redbelly&inputCurrency=NATIVE&outputCurrency=0x8201c02d4AB2214471E8C3AD6475C8b0CD9F2D06" />
              </div>
            </li>
            <li className="flex flex-col flex-wrap gap-2 border-b border-hairline py-3 last:border-b-0 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4">
              <div className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-2">
                  <img
                    src={wrbntLogo}
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0"
                    style={LOGO_STYLE}
                  />
                  <span className="font-semibold text-foreground">WRBNT</span>
                </span>
                <span className="font-mono text-[13px] text-secondary-foreground">
                  WRBNT/USDC.e
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-[480px]:justify-end">
                <NativeStatusBadge status="verified" />
                <TradeButton href="https://www.reddex.io/swap?chain=redbelly&inputCurrency=0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076&outputCurrency=0x8201c02d4AB2214471E8C3AD6475C8b0CD9F2D06" />
              </div>
              <p className="w-full font-mono text-[12px] break-all text-muted-foreground">
                0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076
              </p>
            </li>
          </ul>
          <p className="mt-4 text-[14px] text-muted-foreground">
            <img
              src={reddexLogo}
              alt=""
              width={20}
              height={20}
              className="mr-2 inline-block align-[-4px]"
              style={LOGO_STYLE}
            />
            Reddex is the official liquidity hub for Redbelly Network.
          </p>
        </Card>

        <Card title="Bridges">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col rounded-chip border border-hairline bg-nested p-4">
              <h3 className="flex items-center gap-2 text-[16px] font-semibold leading-tight text-foreground">
                <img
                  src={lucidLogo}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                  style={LOGO_STYLE}
                />
                Lucid Labs Bridge
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-secondary-foreground">
                Official route for bringing RBNT and WRBNT back to Redbelly
                Network from 9 chains: Ethereum, Arbitrum, Optimism, Base, BSC,
                Polygon, Avalanche, Sonic, and Solana (Solana route currently
                unavailable).
              </p>
              <div className="mt-4">
                <TradeButton
                  href="https://bridge.lucidlabs.fi/"
                  label="Open Bridge"
                />
              </div>
            </div>
            <div className="flex flex-col rounded-chip border border-hairline bg-nested p-4">
              <h3 className="flex items-center gap-2 text-[16px] font-semibold leading-tight text-foreground">
                <img
                  src={reddexLogo}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                  style={LOGO_STYLE}
                />
                Reddex Bridge
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-secondary-foreground">
                Official route for bridging USDC and USDT into Redbelly
                Network. Runs on the same Lucid Labs / Polymer infrastructure.
                Flat 1% fee.
              </p>
              <div className="mt-4">
                <TradeButton
                  href="https://www.reddex.io/bridge"
                  label="Open Bridge"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card
          accent="#EF5350"
          title="Futures / Derivatives"
          caption="No ownership. Leverage risk."
          captionTone="warning"
          nested
        >
          <p className="rounded-chip border border-hairline bg-card px-4 py-3 text-[18px] font-semibold text-foreground">
            {futures[0]?.name}
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary-foreground">
            CoinGecko's markets table splits into Spot, Perpetuals, and Futures
            tabs - all five current results sit under Spot, with zero under the
            other two. MEXC's own live futures order book for RBNT returns empty
            fields across the board. Some exchange pages carry generic marketing
            copy mentioning futures trading, but that copy is templated and
            appears on token pages regardless of whether a market actually
            exists there, so it was not treated as evidence.
          </p>
        </Card>

        <section className="rounded-panel border border-hairline bg-card p-5 sm:p-6">
          <h2 className="label-sm text-[13px] text-foreground">
            Why this page exists
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-secondary-foreground">
            One exchange delisted an RBNT futures market, and we read it as a
            spot delisting. The correction took longer than the confusion did,
            and in the meantime holders were told their token had been pulled
            from a venue where it is still trading today.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-secondary-foreground">
            We own that. This page keeps native spot, wrapped spot, and
            derivatives in three separate, labeled sections with a dated
            verification stamp, so the next time a derivatives market changes,
            anyone can check in ten seconds which of the three it touched.
          </p>
        </section>

        <section
          id="verify"
          className="rounded-panel border border-hairline bg-card p-5 scroll-mt-6 sm:p-6"
        >
          <h2 className="label-sm text-[13px] text-foreground">
            Verification methodology
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-secondary-foreground">
            Every venue was checked directly against its own trade or listing
            page on August 8, 2026, then cross-referenced against at least two
            independent sources. Nothing here is copied from a single aggregator
            without a second check.
          </p>
          <ol className="mt-4 flex flex-col gap-3">
            {METHODOLOGY.map((item, i) => (
              <li key={item} className="flex gap-3">
                <span className="font-mono text-[13px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] leading-relaxed text-secondary-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <footer className="mt-10 border-t border-hairline pt-6">
        <p className="font-mono text-[13px] text-accent">
          Last verified: 2026-08-08 UTC
        </p>
        <p className="mt-2 text-[15px] text-secondary-foreground">
          Sources: CoinGecko, CoinCodex, Coinlore, and each exchange's own live
          listing page
        </p>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Not financial advice. Listings change, re-verify before trading.
        </p>
        <a
          href="https://redbelly-dao-taskboard.vercel.app/"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-block text-[14px] text-accent underline underline-offset-4 hover:no-underline"
        >
          Back to the Redbelly DAO Task Board
        </a>
      </footer>
    </main>
  );
}
