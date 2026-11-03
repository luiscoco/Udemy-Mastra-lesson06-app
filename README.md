# Mastra · Lesson 06 · Agent Instructions and Prompts

Inspect a reusable instruction set and a separate article task, then compare an actual model answer with a checkable three-bullet contract.

![Lesson 06 application](docs/application-preview.png)

## What this application does

Choose an audience and a style. The preview constructs the real agent's instructions separately from the changing article text; it does not pretend to generate a summary.

**Practical mode:** Actual instruction/task construction · no model call.

The local path previews actual instructions and message construction. It produces no simulated AI summary. The live path invokes Mastra; structural bullet checks do not certify faithfulness to the article.

## Run the application

Use **Node.js 24+**. Each lesson is an independent repository with its own dependency lockfile.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson06-app.git
cd Udemy-Mastra-lesson06-app
npm ci
npm start
```

Open **http://127.0.0.1:3206** and choose **Run practical lab**. The practical operation requires no model key. Starting the server does not make a provider request. Keep the terminal open; Ctrl+C stops it. To change the port, set PORT in the environment or local .env file.

## Application pages

| Page | Content |
| --- | --- |
| Application lab | Editable JSON cases, actual execution, formatted result, event log and structured metadata |
| What you will learn | Lesson objectives, comprehension checks and a concrete exercise |
| How to run | Installation, local/live modes, commands and troubleshooting |
| Architecture & workflow | The practical execution sequence and the actual request runner |
| Code walkthrough | Source-derived excerpts with GitHub line references |

The application supports light/dark themes, mobile layouts, sanitized Markdown, syntax-highlighted code and copy-code controls.

## Practical execution workflow

| Stage | Source | Actual behavior |
| --- | --- | --- |
| Validate task data | [src/lab.ts](src/lab.ts) | Accept a supported audience/style and a bounded article. |
| Inspect reusable instructions | [src/mastra/agents.ts](src/mastra/agents.ts) | Define the summarizer’s stable role, grounding rule and exactly-three-bullets contract. |
| Build user task | [src/lab.ts](src/lab.ts) | Encode article content as task data separately from reusable agent instructions. |
| Inspect prompt boundary | [src/lab.ts](src/lab.ts) | Return the assembled instructions/task without pretending a summary was generated. |

The browser posts JSON to **POST /api/lab**. The host validates the envelope, runs the lesson implementation and sends NDJSON events. The UI renders the actual result and a separate application outcome. **GET /api/config** exposes public lesson metadata and credential-presence readiness, never credential values.

## Classroom cases and expected outcomes

### 1. Beginner summary brief

```json
{
  "audience": "beginner",
  "style": "concise",
  "article": "Classroom article: The course team introduced a typed lesson-lookup tool. The application validates a lesson ID before reading the catalog. A missing record produces a clarification request instead of an invented answer."
}
```

**Expected:** Separate reusable instructions and article task, ready for the live model.

### 2. Unsupported brief preset

```json
{
  "audience": "beginner",
  "style": "anything-goes",
  "article": "A classroom article with enough content to summarize safely."
}
```

**Expected:** The preset contract rejects an unsupported style.

## Interpreting the result

- The local lab is a prompt-construction exercise; it does not fabricate a summary.
- The bullet check validates structure. A student must compare the statements with the article.
- Unsupported styles fail input validation.

**Complete** means the operation met its implemented completion checks. **Needs attention** exposes a business, format or validation finding. **Could not finish** is an execution/request failure. **Cancelled** is a separate user action. Read the evidence before treating any runtime status as task correctness.

## Optional live-agent workflow

1. The registered summarizer receives the supplied article, audience, style and question.
2. generate() produces real text; checkSummary() checks exactly three bullet lines and no preface.

The live button uses **POST /api/query** and a real provider, and may incur API usage. Tests use an explicit SDK model adapter; no paid provider call is claimed by the test evidence.

Configure your own credentials locally, preserving any existing .env:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3206
```

Choose a model your account can access and restart the server. Credentials remain on the host and are ignored by Git. Existing shell values take precedence over the optional .env file. Provider/model availability and supported parameters must be checked for your selected model.

## Build, samples and verification

```powershell
npm run sample
npm run build
npm test
npm run test:browser
```

- **sample:** executes the default practical case without a provider key.
- **sample:live:** runs an actual provider request after configuration; invoke separately with npm run sample:live.
- **build:** regenerates all five pages, actual-source excerpts, architecture SVG, this README and the browser bundle.
- **test:** typechecks and runs offline local-operation, invalid-input, cancellation, real-SDK adapter, generated-content and HTTP-boundary checks, plus lesson-specific regression cases.
- **test:browser:** uses isolated headless Chrome to execute the real practical lab and its failure case, verify all five pages and mobile layout, check theme persistence, syntax colors and safe Markdown, and save [browser evidence](docs/browser-qa.json). The live-renderer fixture makes no provider request.

Set BROWSER_EXECUTABLE if Chrome/Chromium is not installed at the platform’s standard path. Browser tests are local; GitHub Actions runs npm ci, build and the offline test suite.

## Dependencies

| Runtime package | Pinned version |
| --- | --- |
| @mastra/core | 1.81.0 |
| dompurify | 3.4.17 |
| marked | 18.1.3 |
| zod | 4.6.7 |

The committed package-lock.json fixes the installed dependency tree. A remote model alias is independent of the JavaScript lockfile.

## Student exercise

Keep the article fixed and change the audience. Then keep the brief fixed and change the article. Compare actual outputs and verify each bullet against its source.

Rebuild after a source change so the explanation pages, line references and README remain consistent with the running code.

## Source and references

- [src/lab.ts](src/lab.ts)
- [src/mastra/agents.ts](src/mastra/agents.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [HTTP host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Page and README generator](scripts/build-pages.ts)
- [Agent instructions](https://mastra.ai/docs/agents/overview)
- [Generation messages](https://mastra.ai/reference/agents/generate)

Prism’s license is included in [public/prism-LICENSE.txt](public/prism-LICENSE.txt).
