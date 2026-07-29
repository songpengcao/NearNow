"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SyncState =
  | { status: "idle"; message: string }
  | { status: "running"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function SyncButton() {
  const router = useRouter();
  const [state, setState] = useState<SyncState>({
    status: "idle",
    message: "",
  });

  async function runSync() {
    setState({
      status: "running",
      message: "Fetching and validating the Barcelona agenda…",
    });

    try {
      const response = await fetch("/api/admin/sync", { method: "POST" });
      const payload = (await response.json()) as {
        sync?: { events: number; venues: number };
        error?: string;
      };

      if (!response.ok || !payload.sync) {
        throw new Error(payload.error ?? "The synchronization failed.");
      }

      setState({
        status: "success",
        message: `${payload.sync.events} events across ${payload.sync.venues} venues imported.`,
      });
      router.refresh();
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "The synchronization failed.",
      });
    }
  }

  return (
    <div className="admin-sync-control">
      <button
        className="admin-sync-button"
        type="button"
        onClick={runSync}
        disabled={state.status === "running"}
      >
        <span aria-hidden="true">
          {state.status === "running" ? "···" : "↻"}
        </span>
        {state.status === "running" ? "Syncing" : "Sync agenda"}
      </button>
      <p
        className={`admin-sync-message admin-sync-message--${state.status}`}
        aria-live="polite"
      >
        {state.message}
      </p>
    </div>
  );
}
