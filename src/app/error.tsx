"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Header */}
        <div className="space-y-2">
          <span className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-gray-400 select-none">
            500
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Internal Server Error
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Opps, Someting went wrong. Please refresh the page or try again
            later.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            className="flex items-center p-4 text-white cursor-pointer border border-primary rounded-3xl gap-1 bg-primary/80 hover:bg-primary duration-300"
            onClick={() => router.back()}
          >
            Go Back <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
