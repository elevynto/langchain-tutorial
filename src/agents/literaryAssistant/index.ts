import { createAgent } from "langchain";
import { fetchTextFromUrl } from "./fetchTextFromUrl.js";
import { SYSTEM_PROMPT } from "./config.js";
import { createDeepAgent } from "deepagents";
import { model } from "./model.js";
import { checkpointer } from "./memory.js";

export async function literaryAssistant() {
  const agent = createAgent({
    model,
    tools: [fetchTextFromUrl],
    systemPrompt: SYSTEM_PROMPT,
    checkpointer,
  })

  const deepAgent = createDeepAgent({
    model,
    tools: [fetchTextFromUrl],
    systemPrompt: SYSTEM_PROMPT,
    checkpointer,
  });

  const content = `SourceForge Sample File.
    URL: https://txt2html.sourceforge.net/sample.txt

    Answer as much as you can:

    1) How many lines are there in the file.
    2) What's should the title of the document be?
    3) Give me a ~50 word summary of the document.`;

  const sharedTags = ["literary-assistant", "sourceforge-sample"];
  const sharedMetadata = {
    feature: "literaryAssistant",
    source_url: "https://txt2html.sourceforge.net/sample.txt",
  };

  const agentResult = await agent.invoke(
    { messages: [{ role: "user", content }] },
    {
      configurable: { thread_id: "sourceforge-sample-lc" },
      runName: "literaryAssistant.createAgent",
      tags: [...sharedTags, "create-agent"],
      metadata: { ...sharedMetadata, agent_type: "createAgent" },
    },
  );
  const deepAgentResult = await deepAgent.invoke(
    { messages: [{ role: "user", content }] },
    {
      configurable: { thread_id: "sourceforge-sample-da" },
      runName: "literaryAssistant.createDeepAgent",
      tags: [...sharedTags, "deep-agent"],
      metadata: { ...sharedMetadata, agent_type: "createDeepAgent" },
    },
  );

  const agentMessages = agentResult.messages;
  const deepMessages = deepAgentResult.messages;
  console.log(agentMessages[agentMessages.length - 1]!.contentBlocks);
  console.log("\n");
  console.log(deepMessages[deepMessages.length - 1]!.contentBlocks);
}
