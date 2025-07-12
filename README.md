# OpenAI Agents JS Examples

This project contains practical examples demonstrating how to use the [OpenAI Agents JavaScript SDK](https://openai.github.io/openai-agents-js/) to build intelligent AI agents with various capabilities.

## 📖 About

The OpenAI Agents framework enables developers to create sophisticated AI agents that can use tools, handle context, manage structured outputs, and coordinate through handoffs between multiple specialized agents. This repository showcases these features through practical, runnable examples.

For comprehensive documentation and API reference, visit: **https://openai.github.io/openai-agents-js/**

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- OpenAI API key

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your OpenAI API key as an environment variable:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

## 📋 Examples

### 1. Simple Haiku (`examples/simple-haiku.ts`)

A basic example showing how to create a simple agent that generates haikus.

**Features demonstrated:**
- Basic agent creation
- Simple text generation
- Agent instructions

**Run it:**
```bash
npx tsx examples/simple-haiku.ts
```

### 2. History Tutor (`examples/history-tutor.ts`)

A comprehensive example showcasing multiple agent patterns and capabilities.

**Features demonstrated:**
- **Simple Agent**: Basic Q&A functionality
- **Agent with Tools**: Custom tool integration with parameter validation
- **Multi-Agent Handoffs**: Triage system routing queries to specialized agents
- **Structured Output Types**: Type-safe data extraction using Zod schemas

**Run it:**
```bash
npx tsx examples/history-tutor.ts
```

### 3. Context, Outputs & Handoffs (`examples/context-outpus-handoffs.ts`)

Advanced patterns for real-world applications.

**Features demonstrated:**
- **Context Management**: Passing user-specific context and data to agents
- **Structured Output Types**: Calendar event extraction with type safety
- **Agent Handoffs**: Customer service triage system with specialized agents

**Run it:**
```bash
npx tsx examples/context-outpus-handoffs.ts
```

## 🔧 Key Concepts

### Agents
Create intelligent agents with specific roles and instructions:
```typescript
const agent = new Agent({
  name: 'Assistant',
  instructions: 'You are a helpful assistant',
});
```

### Tools
Extend agent capabilities with custom functions:
```typescript
const tool = tool({
  name: 'my_tool',
  description: 'What this tool does',
  execute: async (params) => {
    // Tool implementation
  },
  parameters: z.object({
    // Parameter schema
  }),
});
```

### Context
Pass application-specific data to agents:
```typescript
const result = await run(agent, 'User message', {
  context: { userId: 'abc', isProUser: true }
});
```

### Handoffs
Route conversations between specialized agents:
```typescript
const triageAgent = Agent.create({
  name: 'Triage',
  instructions: 'Route users to the right specialist',
  handoffs: [specialistAgent1, specialistAgent2],
});
```

### Structured Outputs
Get type-safe, structured responses:
```typescript
const agent = new Agent({
  name: 'Extractor',
  instructions: 'Extract structured data',
  outputType: MyZodSchema,
});
```

## 📚 Learn More

- **Official Documentation**: https://openai.github.io/openai-agents-js/
- **OpenAI Platform**: https://platform.openai.com/
- **Zod Documentation**: https://zod.dev/ (for schema validation)

## 🛠 Development

To modify the examples or create your own:

1. Edit the TypeScript files in the `examples/` directory
2. Run them directly with `npx tsx examples/your-file.ts`
3. Experiment with different agent configurations, tools, and patterns

## 📦 Dependencies

- `@openai/agents`: The core OpenAI Agents SDK
- `zod`: Schema validation for structured outputs and tool parameters

## 🤝 Contributing

Feel free to submit issues and enhancement requests or contribute your own examples!

## 📄 License

This project is provided as educational examples for the OpenAI Agents JavaScript SDK.