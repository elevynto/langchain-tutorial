import "dotenv/config";
import { Client } from "langsmith";

import { literaryAssistant } from "./agents/literaryAssistant/index.js";

async function flushLangSmithTraces() {
  if (process.env.LANGSMITH_TRACING !== "true") {
    return;
  }
  if (!process.env.LANGSMITH_API_KEY) {
    return;
  }

  try {
    // Wait for queued trace batches so short-lived runs are visible in LangSmith.
    const client = new Client();
    await client.awaitPendingTraceBatches();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`LangSmith trace flush skipped: ${message}`);
  }
}

try {
  await literaryAssistant();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await flushLangSmithTraces();
}
