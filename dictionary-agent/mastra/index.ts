
import { Mastra } from '@mastra/core';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { dogAgent } from './agents/dog-agent';

export const mastra = new Mastra({
  agents: { dogAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Dog Mastra",
    level: "info",
  }),
});