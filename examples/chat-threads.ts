import { Agent, AgentInputItem, run } from '@openai/agents';
import { validateEnv } from '../utils/env.ts';

// Load and validate environment variables
validateEnv();

let thread: AgentInputItem[] = [];

const agent = new Agent({
  name: 'Assistant',
});

async function userSays(text: string) {
  const result = await run(
    agent,
    thread.concat({ role: 'user', content: text }),
  );

  thread = result.history; // Carry over history + newly generated items
  return result.finalOutput;
}

const Q1 = 'What city is the Golden Gate Bridge in?'
console.log(`Q1: ${Q1}`)
const answer1 = await userSays(Q1);
console.log('A1: ', answer1)
// -> "San Francisco"j

const Q2 = 'What state is it in?'
console.log(`Q2: ${Q2}`)
const answer2 = await userSays(Q2);
console.log('A2: ', answer2)
// -> "California"