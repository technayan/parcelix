import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Header */}
        <div className="space-y-2">
          <span className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-primary/80 select-none">
            404
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Page not found
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-primary border border-primary rounded-3xl gap-1 hover:bg-secondary hover:border-secondary hover:text-white duration-300"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
