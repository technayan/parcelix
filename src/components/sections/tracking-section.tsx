"use client";

import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function TrackingSection() {
  const [trackingId, setTrackingId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchedId(trackingId.trim());
  }
  return (
    <section className="pb-14 sm:pb-20" id="track">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="grid gap-5 rounded-xl border border-border bg-card p-5 shadow-xl shadow-slate-900/5 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-6 md:p-7">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">
              Where is your parcel?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your tracking ID to preview your shipment update.
            </p>
          </div>
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <input
              aria-label="Tracking ID"
              placeholder="e.g. TRK-7H6MXUR6-PFTHZW5U"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              required
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 h-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-orange-500/10"
            />
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium cursor-pointer text-white transition hover:bg-orange-600"
              type="submit"
            >
              <Search size={16} /> Track shipment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
