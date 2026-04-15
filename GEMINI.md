# 🍏 GEMINI.md: iMac G3 Edition & Agentic Workflow

## 💎 Design System (iMac G3 Edition)

- **Aesthetic**: Focus on translucent, glassmorphism effects.
- **Typography**: Adhere to Golden Ratio (1.618) scaling with a 16px base and 68px H1.
- **Layout**: Utilize a 4px grid system and a 62/38 golden ratio split for dashboard layouts.
- **Components**:
  - **Squircles**: Use for cards, avatars, icons, and general containers.
  - **Buttons**: Must use **superellipses** (mathematical Lamé curves) for a premium, organic feel.

---

## 🛠️ Git & Trunk-Based Workflow

- **Linear History**: Use trunk-based rebase to maintain a strictly linear history.
- **Sync Protocol**: Run `git pull --rebase` before pushing to integrate changes seamlessly.
- **Atomic Commits**: Use the format `feat(<domain>): <description>`.
- **Cleanliness**: Ensure no `console.log` or debug code remains in production-path files.
- **Git Tooling**:
  - **Git**: Primary version control system.
  - **gh**: GitHub CLI for managing PRs and issues.
  - **lazygit**: TUI for visual branch management and staging.

---

## 🚀 Language & Framework Best Practices

### Bun (Primary Runtime)

- **Execution**: Use `bun run` for scripts and `bun x` for binaries.
- **Package Management**: Use `bun install` for lightning-fast dependency resolution.
- **Testing**: Prioritize `bun test` for native, high-performance test execution.
- **Native Clustering**: Utilize the `reusePort: true` option within `Bun.serve` to allow multiple Bun processes to bind to the same port for OS-level load balancing.

### Hono & SvelteKit

- **Hono**: Leverage `Hono<Env>` for type safety and stick to Web Standard APIs (Request/Response).
- **SvelteKit**: Prioritize server-only modules (`.server.ts`) for sensitive logic.
- **Styling**: No semicolons, single quotes, no trailing commas, and alphabetically sorted imports.
- **Tooling**: Use `oxfmt --write . && oxlint --fix` for high-severity rule enforcement.

---

## 🔌 MCP Command Namespacing

To avoid conflicts with built-in CLI commands and silence startup warnings, always use the following namespaced versions for **octocode**:

- **Help**: Use `/octocode.help` instead of `/help`.
- **Initialization**: Use `/octocode.init` instead of `/init`.
- **Planning**: Use `/octocode.plan` instead of `/plan`.

---

## 🧪 TDD & CI/CD Protocol

- **Test-Driven Development**: Every new feature requires a corresponding test file (`.test.ts` / `.test.tsx`).
- **Coverage**: Maintain an 80% total coverage requirement.
- **Process Management**: For production, use **PM2** with the `/Users/alvin/.bun/bin/bun` interpreter and the `-i max` flag.

---

## 🧰 Integrated MCP Servers

- **Coding**: `octocode` (repo indexing), `sequential-thinking` (logic breakdown).
- **Environment**: `filesystem` (file I/O), `github` (PR management).
- **Search & Research**: `duckduckgo-mcp` (free web search), `context7-mcp` (docs retrieval).
- **Testing/Web**: `playwright` (automation), `httpyac` (API testing), `chrome-devtools`.
- **Cloud**: `aws` (resource management via python3).

---

## 🚨 Contingency Protocol

- **Build/Lint Failure**: If `oxfmt` or `oxlint` fails, halt immediately, self-correct, and re-run.
- **Conflict Resolution**: Favor the most recent architectural standard over legacy patterns.
