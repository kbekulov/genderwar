# Gender War product system

Gender War is a content-driven interactive story. New insights should extend the story as scenario records instead of creating one-off pages.

## From realization to experience

1. **Interpret** — restate the realization as a testable insight and separate observation from explanation.
2. **Frame** — identify the perspective, context, pressures, incentives, and the contrasting interpretation.
3. **Qualify** — label it as a hypothesis, observed pattern, or evidence-backed claim. Avoid presenting group averages as rules about every person.
4. **Design** — choose the smallest useful mechanic: choose, compare, simulate, or reveal.
5. **Implement** — add a typed `Scenario` in `app/content/story.ts` and render it through reusable scenario UI.
6. **Verify** — test both perspectives, mobile and desktop behavior, accessibility, copy, and evidence links.
7. **Ship** — build, commit, push, and publish the public site.

## Scenario contract

Every scenario has an ID, title, perspective, insight, confidence level, setup, mechanic, choices, takeaway, and optional evidence links. This keeps content, product reasoning, and presentation separate while allowing the app shell and navigation to remain stable.

## Editorial principle

The app can explore uncomfortable patterns without turning them into universal claims. It should distinguish data, interpretation, and speculation; show context; and give the other perspective enough fidelity to be recognizable rather than caricatured.
