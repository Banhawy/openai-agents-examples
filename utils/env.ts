import 'dotenv/config';

// Validate that required environment variables are set
export function validateEnv() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is required');
    console.error('Please create a .env file based on .env.example and add your OpenAI API key');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded successfully');
}

// Export common environment variables
export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
} as const;
