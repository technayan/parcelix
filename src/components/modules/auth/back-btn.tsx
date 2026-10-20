"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="inline-flex cursor-pointer h-10 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium transition hover:bg-muted"
    >
      <ArrowLeft size={15} /> Go back
    </Button>
  );
}
