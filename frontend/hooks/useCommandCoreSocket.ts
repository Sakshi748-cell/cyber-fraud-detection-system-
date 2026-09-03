"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export function useCommandCoreSocket() {
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_COMMAND_CORE_WS_URL;

    // Do not connect unless a real WebSocket server is configured.
    if (!wsUrl) {
      return;
    }

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.threat_level === "CRITICAL") {
          toast.error("🚨 SPATIAL ANOMALY DETECTED", {
            position: "top-right",
            style: {
              background: "#111827",
              color: "#ffffff",
              border: "1px solid #ef4444",
            },
          });
        }
      } catch {
        console.warn("Invalid Command Core WebSocket message.");
      }
    };

    socket.onclose = () => {
      toast("⚠️ Connection to Command Core Lost - Retrying...", {
        position: "top-right",
        style: {
          background: "#facc15",
          color: "#111827",
          border: "1px solid #eab308",
        },
      });
    };

    return () => {
      socket.close();
    };
  }, []);
}