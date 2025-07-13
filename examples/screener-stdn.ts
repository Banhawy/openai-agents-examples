import {
  Agent,
  AgentInputItem,
  run,
  tool,
  user,
  webSearchTool,
  withTrace,
} from '@openai/agents';
import { createInterface } from 'node:readline/promises';
import { z } from 'zod';
import { validateEnv } from '../utils/env.ts';

// Load and validate environment variables
validateEnv();

async function ask(prompt: string) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const message = await rl.question(prompt);
  rl.close();
  return message;
}

// const getWeatherTool = tool({
//   name: 'get_weather',
//   description: 'Get the weather for a given city',
//   parameters: z.object({
//     demo: z.string(),
//   }),
//   execute: async (input) => {
//     return `The weather in ${input.demo} is sunny`;
//   },
// });

const restrictedWebSearchTool = tool({
  name: 'etf_screener_search',
  description: 'Search for ETF information only on the ETF Central screener website',
  parameters: z.object({
    query: z.string().describe('Search query for ETF information'),
  }),
  execute: async (input) => {
    // This tool is restricted to only visit the ETF Central screener
    const allowedUrl = 'https://www.etfcentral.com/etf-screener';
    return `Searching for "${input.query}" on ${allowedUrl}. This tool is restricted to only access ETF Central's screener page for ETF information.`;
  },
});

// const weatherAgent = new Agent({
//   name: 'Weather Agent',
//   handoffDescription: 'Knows everything about the weather but nothing else.',
//   tools: [getWeatherTool, webSearchTool()],
// });

const etfScreenerAgent = new Agent({
  name: 'ETF Screener Agent',
  instructions: 'You are an ETF screening specialist. You can only search for ETF information using the ETF Central screener website "https://www.etfcentral.com/etf-screener". You help users find and analyze exchange-traded funds, and return also the URL of the ETF Central screener page results.',
  handoffDescription: 'Specializes in ETF screening and analysis using ETF Central data.',
  tools: [restrictedWebSearchTool, webSearchTool()],
});

const agent = new Agent({
  name: 'Basic test agent',
  instructions: 'You are a basic agent',
  handoffDescription: 'An expert on everything but the weather and ETF screening.',
  handoffs: [etfScreenerAgent],
});

// weatherAgent.handoffs.push(agent);
etfScreenerAgent.handoffs.push(agent);

let history: AgentInputItem[] = [];
let latestAgent: Agent = etfScreenerAgent;

async function main() {
  console.log('Type exit() to leave');
  await withTrace('Chat Session', async () => {
    while (true) {
      const message = await ask('> ');
      if (message === 'exit()') {
        return;
      }
      history.push(user(message));
      const result = await run(latestAgent, history);

      console.log(`[${latestAgent.name}] ${result.finalOutput}`);

      if (result.lastAgent) {
        latestAgent = result.lastAgent;
      }
      history = result.history;
    }
  });
}

main().catch(console.error);