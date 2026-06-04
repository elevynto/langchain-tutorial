import { initChatModel } from "langchain";

export const model = await initChatModel("claude-sonnet-4-6", {
  temperature: 0.5,
  timeout: 300,
  maxTokens: 8000,
});
