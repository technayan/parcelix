"use client";

import { type ChatMessage, sendChatMessage } from "@/api/ai-assistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

export function ParcelixAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();

    if (!content || loading || content.length > 500) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];

    // Update the UI immediately; make exactly one request.
    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const history = updatedMessages.slice(-6);
      const reply = await sendChatMessage(history);

      setMessages((current) => [
        ...current,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error("Parcelix chat request failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to Parcelix Assistant.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <Card className="mb-3 flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between bg-background text-foreground">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-5 w-5 text-orange-500" />
                Parcelix Assistant
              </CardTitle>
              <p className="mt-1 text-xs text-foreground/50">
                Ask about shipments, pricing, and payments
              </p>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-foreground hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 p-3">
            <ScrollArea className="min-h-0 flex-1 pr-3">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    Hi! I can help you understand how Parcelix works. What would
                    you like to know?
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={`${index}-${message.role}`}
                    className={`max-w-[90%] whitespace-pre-wrap wrap-break-word rounded-xl p-3 text-sm ${
                      message.role === "user"
                        ? "ml-auto bg-orange-500 text-white"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                )}
              </div>
            </ScrollArea>

            {error && (
              <p role="alert" className="text-xs text-destructive">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                className="border-foreground/20"
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Parcelix..."
                aria-label="Message Parcelix Assistant"
                maxLength={500}
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={loading || !input.trim()}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              AI-generated answers may be inaccurate.
            </p>
          </CardContent>
        </Card>
      )}

      <Button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="h-14 w-14 rounded-full bg-orange-500 shadow-lg hover:bg-orange-600 cursor-pointer"
        aria-label={
          open ? "Close Parcelix Assistant" : "Open Parcelix Assistant"
        }
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </div>
  );
}
