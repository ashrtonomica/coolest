import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, Fragment } from "react";
import { useRbntPrices } from "@/hooks/useRbntPrices";

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
    name: "Uniswap V4",
    type: "DEX",
    pair: "wRBNT/ETH",
    url: "https://app.uniswap.org/explore/tokens/ethereum/0xb45ffb51984d626ee758b336c61cf20990c6bf13",
    status: "verified",
    category: "wrapped-spot",
    chain: "Ethereum",
    flag: "volume is thin",
  },
  {
    name: "No live pool confirmed",
    type: "DEX",
    pair: "wRBNT/-",
    url: null,
    status: "unconfirmed",
    category: "wrapped-spot",
    chain: "Solana",
    flag: "not checked in this pass, so no venue is named",
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

const CONTRACTS = [
  { label: "Ethereum:", address: "0xb45ffb51984d626ee758b336c61cf20990c6bf13" },
  {
    label: "Solana:",
    address: "2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3",
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

function StatusDot({ status }: { status: Venue["status"] }) {
  return (
    <span className="flex items-center gap-2">
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

function Tag({ children }: { children: string }) {
  return (
    <span className="label-sm rounded-chip border border-hairline bg-nested px-1.5 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  );
}

function TradeButton({ href }: { href: string }) {
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
      Trade Now
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

function VenueRow({ venue }: { venue: Venue }) {
  return (
    <li className="flex flex-col flex-wrap gap-2 border-b border-hairline py-3 last:border-b-0 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4">
      <div className="flex flex-wrap items-center gap-2">
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
        <Tag>{venue.type === "NONE" ? "SPOT ONLY" : venue.type}</Tag>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-[480px]:justify-end">
        <span className="font-mono text-[13px] text-secondary-foreground">
          {venue.pair}
        </span>
        <StatusDot status={venue.status} />
        {venue.url ? (
          <TradeButton href={venue.url} />
        ) : (
          <span className="text-[15px] text-muted-foreground">No link</span>
        )}
      </div>
      {venue.flag ? (
        <p className="text-[14px] text-warning">
          {venue.flag}
        </p>
      ) : null}
    </li>
  );
}

const MONO_STACK = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

function isFiatQuote(pair: string) {
  const quote = pair.split("/")[1]?.toUpperCase() ?? "";
  return ["USDT", "USDC", "USD", "EUR", "BUSD", "DAI"].includes(quote);
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
        className="justify-self-end text-right"
        style={{ ...baseStyle, color: "#93a4ae" }}
      >
        Check exchange
      </span>
    );
  }

  if (price == null) {
    return (
      <span
        className="justify-self-end text-right"
        style={{ ...baseStyle, color: "#6b7a85" }}
      >
        {connected ? "-" : "-"}
      </span>
    );
  }

  return (
    <span
      className="justify-self-end text-right"
      style={{ ...baseStyle, color: connected ? "#e4ebf0" : "#6b7a85" }}
    >
      {isFiatQuote(venue.pair) ? "$" : ""}
      {price}
    </span>
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
    <li
      className="grid items-center border-b border-hairline py-3 last:border-b-0"
      style={{
        gridTemplateColumns: "minmax(160px, 1fr) 130px 120px 140px 110px",
        columnGap: 16,
      }}
    >
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
        <span className="rounded-chip border border-hairline bg-nested px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {venue.type === "NONE" ? "SPOT ONLY" : venue.type}
        </span>
      </div>
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
  accent: string;
  title: string;
  caption: string;
  captionTone?: "muted" | "warning";
  nested?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-panel border border-hairline ${nested ? "bg-nested" : "bg-card"} overflow-hidden`}
    >
      <div className="flex">
        <div className="w-1 shrink-0" style={{ backgroundColor: accent }} />
        <div className="flex-1 p-5 sm:p-6">
          <header className="mb-4">
            <h2 className="label-sm text-[13px] text-foreground">{title}</h2>
            <p
              className={`mt-1 text-[15px] ${captionTone === "warning" ? "text-warning" : "text-muted-foreground"}`}
            >
              {caption}
            </p>
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
  const wrapped = VENUES.filter((v) => v.category === "wrapped-spot");
  const futures = VENUES.filter((v) => v.category === "futures");

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
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
        <Card
          accent="#86EFAC"
          title="Spot - Native RBNT"
          caption="You own the token"
        >
          <ul className="flex flex-col">
            {native.map((v) => (
              <Fragment key={v.name}>
                <NativeVenueRow
                  venue={v}
                  price={prices[v.name.toLowerCase()]}
                  connected={connected}
                />
                {v.name === "WhiteBIT" ? (
                  <li className="list-none">
                    <WhitebitCallout />
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary-foreground">
            CoinGecko's tracked markets table does not surface BYDFi. It was
            confirmed directly from the exchange itself (BYDFi's sitemap)
            before inclusion.
          </p>
        </Card>

        <Card
          accent="#86EFAC"
          title="Spot - Wrapped RBNT (wRBNT)"
          caption="Separate from native RBNT"
          captionTone="warning"
        >
          <ul className="flex flex-col">
            {wrapped.map((v) => (
              <VenueRow key={v.chain} venue={v} />
            ))}
          </ul>
          <div className="mt-4 rounded-chip border border-hairline bg-nested p-3">
            {CONTRACTS.map((c) => (
              <p
                key={c.label}
                className="font-mono text-[12px] break-all text-muted-foreground"
              >
                <span className="text-secondary-foreground">{c.label}</span>{" "}
                {c.address}
              </p>
            ))}
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary-foreground">
            wRBNT is a separate ERC-20 token pegged 1:1 to native RBNT through
            Redbelly's official Ethereum bridge. It is not interchangeable on
            every venue without bridging.
          </p>
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
