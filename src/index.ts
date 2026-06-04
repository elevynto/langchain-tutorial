import "dotenv/config";

import { literaryAssistant } from "./agents/literaryAssistant/index.js";

await literaryAssistant().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
