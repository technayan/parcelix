const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  success: boolean;
  message: string;
  data?: {
    reply: string;
  };
};

export async function sendChatMessage(
  messages: ChatMessage[],
): Promise<string> {
  if (!API_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  const response = await fetch(`${API_URL}/ai-assistant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // This public FAQ route does not require auth cookies.
    body: JSON.stringify({ messages }),
  });

  const result = (await response
    .json()
    .catch(() => null)) as ChatResponse | null;

  if (!response.ok) {
    throw new Error(
      result?.message ?? `The assistant request failed (${response.status}).`,
    );
  }

  if (!result?.success || !result.data?.reply) {
    throw new Error("The assistant returned an invalid response.");
  }

  return result.data.reply;
}
