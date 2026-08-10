import { useEffect, useRef, useState } from "react";

const WS_URL = "wss://ws.daotask20.test-hub.xyz";

export type PriceState = {
  prices: Record<string, string | null>;
  connected: boolean;
};

export function useRbntPrices(): PriceState {
  const [prices, setPrices] = useState<Record<string, string | null>>({});
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    closedRef.current = false;

    const connect = () => {
      if (closedRef.current) return;
      let ws: WebSocket;
      try {
        ws = new WebSocket(WS_URL);
      } catch {
        timerRef.current = setTimeout(connect, 5000);
        return;
      }
      socketRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(String(event.data));
          if (data && typeof data === "object") {
            setPrices((prev) => {
              const next = { ...prev };
              for (const key of Object.keys(data)) {
                if (key === "ts") continue;
                const value = data[key];
                if (value === null || typeof value === "string" || typeof value === "number") {
                  next[key] = value === null ? null : String(value);
                }
              }
              return next;
            });
          }
        } catch {
          // ignore malformed payloads
        }
      };

      const scheduleReconnect = () => {
        setConnected(false);
        if (closedRef.current) return;
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(connect, 5000);
      };

      ws.onclose = scheduleReconnect;
      ws.onerror = () => {
        try {
          ws.close();
        } catch {
          scheduleReconnect();
        }
      };
    };

    connect();

    return () => {
      closedRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      const ws = socketRef.current;
      if (ws) {
        ws.onclose = null;
        ws.onerror = null;
        try {
          ws.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return { prices, connected };
}
