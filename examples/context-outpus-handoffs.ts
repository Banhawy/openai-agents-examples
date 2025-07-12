import { Agent, run, tool } from '@openai/agents';
import z from 'zod';

const contextExample = async () => {
  interface Purchase {
    id: string;
    uid: string;
    deliveryStatus: string;
  }
  interface UserContext {
    uid: string;
    isProUser: boolean;

    // this function can be used within tools
    fetchPurchases(): Promise<Purchase[]>;
  }

  const agent = new Agent<UserContext>({
    name: 'Personal shopper',
    instructions: 'Recommend products the user will love.',
  });

  const result = await run(agent, 'Find me a new pair of running shoes', {
    context: { uid: 'abc', isProUser: true, fetchPurchases: async () => [] },
  });

  console.log(result.finalOutput); // "Sure! I can help you find a new pair of running shoes. Since you're a pro user, I'll prioritize high-quality options."
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

const handoffsExample = async () => {
  const bookingAgent = new Agent({
    name: 'Booking Agent',
    instructions: 'Help users with booking requests.',
  });

  const refundAgent = new Agent({
    name: 'Refund Agent',
    instructions: 'Process refund requests politely and efficiently.',
  });

  // Use Agent.create method to ensure the finalOutput type considers handoffs
  const triageAgent = Agent.create({
    name: 'Triage Agent',
    instructions: [
      'Help the user with their questions.',
      'If the user asks about booking, hand off to the booking agent.',
      'If the user asks about refunds, hand off to the refund agent.',
    ].join('\n'),
    handoffs: [bookingAgent, refundAgent],
  });

  const result = await run(triageAgent, 'I want to book a flight to Paris');
  console.log(result.finalOutput); // "Sure! I can help you with booking a flight to Paris. Let me connect you with our booking agent."
}

// contextExample().catch(console.error);
// outputTypes().catch(console.error);
handoffsExample().catch(console.error);