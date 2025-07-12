import { Agent, run, tool } from '@openai/agents';
import z from 'zod';


const simpleAgent = async () => {
  const agent = new Agent({
    name: 'History Tutor',
    instructions:
      'You provide assistance with historical queries. Explain important events and context clearly.',
  });

  const result = await run(agent, 'When did sharks first appear?');

  console.log(result.finalOutput);
}

const agentWithTools = async () => {

  const historyFunFact = tool({
    // The name of the tool will be used by the agent to tell what tool to use.
    name: 'history_fun_fact',
    // The description is used to describe **when** to use the tool by telling it **what** it does.
    description: 'Give a fun fact about a historical event',
    execute: async () => {
      // The output will be returned back to the Agent to use
      return 'Sharks are older than trees.';
    },
    parameters: z.object({
      // The parameters are used to validate the input to the tool.
      // In this case, we don't need any parameters, so we can leave it empty.
    }),
    strict: true,
  });

  const agent = new Agent({
    name: 'History Tutor',
    instructions:
      'You provide assistance with historical queries. Explain important events and context clearly.',
    // Adding the tool to the agent
    tools: [historyFunFact],
  });

  const result = await run(agent, 'When did sharks first appear?');


  console.log(result.finalOutput);
}

const multiAgentHandoffs = async () => {
  const historyTutorAgent = new Agent({
    name: 'History Tutor',
    instructions:
      'You provide assistance with historical queries. Explain important events and context clearly.',
  });

  const mathTutorAgent = new Agent({
    name: 'Math Tutor',
    instructions:
      'You provide help with math problems. Explain your reasoning at each step and include examples',
  });

  const triageAgent = Agent.create({
    name: 'Triage Agent',
    instructions:
      "You determine which agent to use based on the user's homework question",
    handoffs: [historyTutorAgent, mathTutorAgent],
  });

  const result = await run(triageAgent, 'What is the capital of France?');
  console.log(result.finalOutput);
}

const outputTypes = async () => {

  const CalendarEvent = z.object({
    name: z.string(),
    date: z.string(),
    participants: z.array(z.string()),
  });

  const extractor = new Agent({
    name: 'Calendar extractor',
    instructions: 'Extract calendar events from the supplied text.',
    outputType: CalendarEvent,
  });

  const result = await run(extractor, 'I have a meeting with Alice on 2023-10-01 at 10:00 AM');

  console.log(result.finalOutput); // { name: 'meeting with Alice', date: '2023-10-01', participants: ['Alice'] }

}


// simpleAgent().catch(console.error);
// agentWithTools().catch(console.error);
// multiAgentHandoffs().catch(console.error);
outputTypes().catch(console.error);

//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