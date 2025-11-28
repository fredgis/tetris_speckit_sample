<!--
SYNC IMPACT REPORT
==================
Version Change: N/A → 1.0.0
Change Type: MAJOR (Initial constitution creation)
Modified Principles: N/A (Initial creation)
Added Sections:
  - All four core principles (Code Quality, Testing Standards, UX Consistency, Performance)
  - Development Workflow section
  - Quality Gates section
  - Governance section
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Updated Constitution Check section to reference all four principles
  ✅ spec-template.md - Aligns with UX and testing principles (independent user stories)
  ✅ tasks-template.md - Aligns with testing principles (TDD workflow)
  ⚠ Command files - Minimal agent-specific references found, no updates needed
Follow-up TODOs: None
==================
-->

# Speckit Sample Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

Code MUST be maintainable, readable, and follow established standards. All code MUST:

- Follow consistent naming conventions (descriptive, domain-appropriate identifiers)
- Include inline comments for complex logic or non-obvious decisions
- Avoid code duplication (DRY principle) - extract reusable functions/modules
- Maintain single responsibility - each function/class has one clear purpose
- Be formatted using automated tools (linters, formatters) configured for the project
- Pass all linting checks before merge

**Rationale**: High-quality code reduces technical debt, accelerates onboarding, minimizes bugs, and enables sustainable long-term development. Poor code quality compounds over time, making changes exponentially more difficult and error-prone.

### II. Testing Standards (NON-NEGOTIABLE)

Test-Driven Development (TDD) is MANDATORY. All features MUST follow this workflow:

1. Write tests based on acceptance criteria from spec.md
2. Get user/stakeholder approval on test scenarios
3. Run tests and verify they FAIL (red phase)
4. Implement minimum code to make tests pass (green phase)
5. Refactor while keeping tests passing (refactor phase)

Testing requirements:

- Contract tests MUST be written for all public APIs, interfaces, and data contracts
- Integration tests MUST be written for user journeys that span multiple components
- Unit tests SHOULD be written for complex business logic (encouraged but not blocking)
- All tests MUST be automated and runnable via CI/CD pipeline
- Test coverage SHOULD target 80%+ for critical paths

**Rationale**: TDD prevents regression bugs, ensures requirements are testable, provides living documentation, and builds confidence in changes. Writing tests first forces clear thinking about interfaces and expected behavior before implementation details.

### III. User Experience Consistency

User-facing features MUST deliver predictable, intuitive experiences. All features MUST:

- Follow consistent interaction patterns across the application
- Provide clear, actionable error messages (no cryptic codes without explanation)
- Include user-friendly documentation and help text where appropriate
- Be tested against real user scenarios defined in spec.md
- Support accessibility standards (WCAG 2.1 AA minimum for web/mobile)
- Maintain responsive design principles (adapt to different screen sizes/devices)
- Ensure visual consistency (typography, colors, spacing aligned with design system)

User stories in specifications MUST be:

- Prioritized (P1, P2, P3...) to enable incremental delivery
- Independently testable (each story is a standalone value slice)
- Written from the user's perspective (not technical implementation)
- Include explicit acceptance criteria in Given-When-Then format

**Rationale**: Consistent UX reduces cognitive load, improves user satisfaction, decreases support burden, and builds trust. Independent user stories enable MVP delivery and parallel development, reducing time to value.

### IV. Performance Requirements

Features MUST meet defined performance standards. All implementations MUST:

- Include explicit performance goals in plan.md (response times, throughput, resource limits)
- Measure actual performance against targets before considering feature complete
- Use appropriate data structures and algorithms for expected scale
- Implement pagination, lazy loading, or streaming for large datasets
- Avoid blocking operations on main threads (use async/background processing)
- Include performance regression tests for critical paths
- Profile and optimize bottlenecks before shipping

Common performance targets (adjust based on domain):

- API endpoints: p95 < 200ms for read operations, p95 < 500ms for write operations
- Database queries: < 100ms for indexed lookups, < 1s for complex analytics
- Frontend: First Contentful Paint < 1.5s, Time to Interactive < 3.5s
- Memory: Stay within defined limits (document in plan.md)
- Concurrent users: Support defined load without degradation (load test required)

**Rationale**: Performance directly impacts user experience and operational costs. Setting targets upfront prevents last-minute optimization scrambles and ensures scalability is built in from the start.

## Development Workflow

All feature development MUST follow the Speckit workflow:

1. **Clarify**: Use `/speckit.clarify` to refine ambiguous requirements
2. **Specify**: Use `/speckit.specify` to create detailed spec.md with user stories
3. **Plan**: Use `/speckit.plan` to research and design implementation approach
4. **Tasks**: Use `/speckit.tasks` to break down work into atomic, testable tasks
5. **Implement**: Use `/speckit.implement` to execute tasks following TDD principles
6. **Check**: Use `/speckit.checklist` to verify constitution compliance before merge

Each phase MUST be completed and approved before proceeding to the next phase. All artifacts (spec.md, plan.md, tasks.md) MUST be stored in `specs/[###-feature-name]/` for traceability.

Code reviews MUST verify:

- Constitution compliance (all four principles checked)
- Tests exist and pass (TDD workflow followed)
- Documentation complete (inline comments, user docs updated)
- Performance targets met (metrics included in PR)

## Quality Gates

Before any feature can be considered complete, it MUST pass these gates:

**Gate 1: Constitution Compliance**

- All four principles verified (documented in plan.md Constitution Check section)
- Any violations explicitly justified in Complexity Tracking table
- Justifications must include specific reasoning and alternatives considered

**Gate 2: Testing Verification**

- All contract tests pass (APIs, interfaces, data contracts)
- All integration tests pass (user journeys)
- Unit tests pass where applicable
- TDD workflow followed (tests written first, then implementation)

**Gate 3: User Experience Validation**

- Feature matches acceptance criteria from spec.md
- User stories independently testable and functional
- Error handling provides clear, actionable feedback
- Accessibility requirements met (if applicable)

**Gate 4: Performance Validation**

- Performance targets from plan.md measured and met
- Load tests pass (if concurrent usage expected)
- Resource usage within defined limits
- No performance regressions in critical paths

**Gate 5: Documentation**

- Inline code comments explain complex logic
- User-facing documentation updated (if applicable)
- Technical context documented in plan.md
- Quickstart.md validated (if feature affects setup)

## Governance

This Constitution supersedes all other development practices and guidelines. All team members MUST adhere to these principles without exception.

**Amendment Process**:

1. Amendments MUST be proposed in writing with clear rationale
2. Amendments REQUIRE approval from project stakeholders
3. Amendments MUST include migration plan for existing code (if applicable)
4. Constitution version MUST be incremented following semantic versioning:
   - MAJOR: Backward-incompatible changes (principle removal/redefinition)
   - MINOR: New principles added or material expansions
   - PATCH: Clarifications, wording fixes, non-semantic refinements

**Compliance Review**:

- All PRs MUST verify constitution compliance before merge
- Any complexity exceptions MUST be justified in plan.md Complexity Tracking table
- Constitution violations without justification MUST block merge
- Regular audits SHOULD be conducted to ensure ongoing compliance

**Living Document**:

- This constitution is a living document and will evolve with project needs
- Feedback on constitutional principles is encouraged via formal amendment proposals
- Track all amendments in version history below

**Version**: 1.0.0 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-11-28
