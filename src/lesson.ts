import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 6,
  "title": "Agent Instructions and Prompts",
  "shortTitle": "Instructions and prompts",
  "eyebrow": "ROLE · GOAL · CONTEXT · CONSTRAINTS",
  "hero": "Design a clear",
  "accent": "summary brief.",
  "description": "Inspect a reusable instruction set and a separate article task, then compare an actual model answer with a checkable three-bullet contract.",
  "labTitle": "Assemble an article-summary task",
  "labDescription": "Choose an audience and a style. The preview constructs the real agent's instructions separately from the changing article text; it does not pretend to generate a summary.",
  "localMode": "Actual instruction/task construction · no model call",
  "defaultQuestion": "Summarize the supplied article using the selected brief.",
  "objectives": [
    {
      "title": "Write a useful role and goal",
      "text": "Connect the agent's function to an audience and a concrete summary task. A role label alone is not proof of expertise."
    },
    {
      "title": "Supply bounded source context",
      "text": "The article is task data in a user message. It is not concatenated into the reusable instruction string."
    },
    {
      "title": "Make constraints checkable",
      "text": "Ask for exactly three bullets and define their length. Formatting checks are distinct from checking whether each bullet is supported."
    },
    {
      "title": "Specify the output format",
      "text": "A precise brief reduces ambiguity. The live result reports structural bullet checks without claiming factual correctness."
    },
    {
      "title": "Use examples carefully",
      "text": "The brief includes a short format example. The classroom article remains the evidence for the current summary."
    },
    {
      "title": "Inspect the message boundary",
      "text": "Changing article text should not rewrite the agent's instruction role. Role separation is inspectable structure, not a guarantee of model compliance."
    }
  ],
  "workflow": [
    "Validate audience and article",
    "Choose the reusable instruction preset",
    "Construct a separate user task",
    "Inspect role, goal and constraints",
    "Optionally generate a real summary",
    "Check format and compare source support"
  ],
  "scope": "The local path previews actual instructions and message construction. It produces no simulated AI summary. The live path invokes Mastra; structural bullet checks do not certify faithfulness to the article.",
  "examples": [
    {
      "name": "Beginner summary brief",
      "input": {
        "audience": "beginner",
        "style": "concise",
        "article": "Classroom article: The course team introduced a typed lesson-lookup tool. The application validates a lesson ID before reading the catalog. A missing record produces a clarification request instead of an invented answer."
      },
      "expected": "Separate reusable instructions and article task, ready for the live model."
    },
    {
      "name": "Unsupported brief preset",
      "input": {
        "audience": "beginner",
        "style": "anything-goes",
        "article": "A classroom article with enough content to summarize safely."
      },
      "expected": "The preset contract rejects an unsupported style."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/agents.ts",
    "src/mastra/index.ts"
  ],
  "exercise": "Keep the article fixed and change the audience. Then keep the brief fixed and change the article. Compare actual outputs and verify each bullet against its source.",
  "checks": [
    {
      "question": "Is a preview an AI summary?",
      "answer": "No. It shows the instructions and user task that will be sent. Only the live action invokes a model."
    },
    {
      "question": "Do three valid bullets prove factual accuracy?",
      "answer": "No. Each bullet still needs comparison with the supplied article."
    },
    {
      "question": "Does an article belong in reusable system instructions?",
      "answer": "In this app, the changing article is separate user-task data. The reusable instructions define role, goal and output constraints."
    }
  ],
  "docs": [
    {
      "title": "Agent instructions",
      "url": "https://mastra.ai/docs/agents/overview"
    },
    {
      "title": "Generation messages",
      "url": "https://mastra.ai/reference/agents/generate"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Validate task data",
      "component": "src/lab.ts",
      "behavior": "Accept a supported audience/style and a bounded article."
    },
    {
      "step": "Inspect reusable instructions",
      "component": "src/mastra/agents.ts",
      "behavior": "Define the summarizer’s stable role, grounding rule and exactly-three-bullets contract."
    },
    {
      "step": "Build user task",
      "component": "src/lab.ts",
      "behavior": "Encode article content as task data separately from reusable agent instructions."
    },
    {
      "step": "Inspect prompt boundary",
      "component": "src/lab.ts",
      "behavior": "Return the assembled instructions/task without pretending a summary was generated."
    }
  ],
  "liveWorkflow": [
    "The registered summarizer receives the supplied article, audience, style and question.",
    "generate() produces real text; checkSummary() checks exactly three bullet lines and no preface."
  ],
  "outcomeNotes": [
    "The local lab is a prompt-construction exercise; it does not fabricate a summary.",
    "The bullet check validates structure. A student must compare the statements with the article.",
    "Unsupported styles fail input validation."
  ]
} satisfies LessonMetadata;
