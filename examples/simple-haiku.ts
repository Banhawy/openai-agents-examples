import { Agent, run } from '@openai/agents';
import { validateEnv } from '../utils/env';

// Load and validate environment variables
validateEnv();

const agent = new Agent({
  name: 'Assistant',
  instructions: 'You are a helpful assistant',
});

const fn = async () => {
    const result = await run(
      agent,
      'Write a haiku about recursion in programming.',
    );
    console.log(result.finalOutput);
}

fn().catch(console.error);