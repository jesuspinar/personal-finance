## Generic Rules
Code Style:
- Use Prettier for formatting
- ESLint for linter rules
- TypeScript for type safety
- Consistent imports and naming conventions
- Proper error handling

Naming Conventions:
- CamelCase for functions
- Snake_case for variables
- Descriptive variable names

Documentation:
- Write comments and documentation
- Maintain README.md

CI/CD:
- GitHub Actions for automated testing
- Continuous integration and deployment

Testing Frameworks:
- Jest or Mocha for unit tests
- Cypress for end-to-end testing

Code Review:
- Pull requests with code reviews
- Code quality checks

Performance:
- Optimize code for efficiency
- Reduce unnecessary computations

Security:
- Follow security best practices
- Use secure authentication methods

---

### **Project Context Summary**

This Angular 17 app manages **income and outcome records** stored in an **IndexedDB** database (through `OfflineDbService`).
The architecture has been refactored to follow **clean separation of concerns** using Angular’s new **signals** and **standalone components**.

#### 1. **Core Structure**

* **`OfflineDbService`**: Low-level IndexedDB access.

* **`IncomeService and OutcomeService`**: Wraps all CRUD logic for incomes and outcomes and holds state (signals, computed values).

  * Uses a **`PaginationService<T>`** for pagination logic.
  * Exposes signals like `pagination.paginatedItems`, `pagination.totalPages`, etc.
  * Provides helper methods like `loadAll()`, `add()`, `update()`, `delete()`, and `getById()`.

* **`PaginationService<T>`**:
  Generic service handling pagination state and logic (`items`, `currentPage`, `itemsPerPage`, computed pagination data).

#### 2. **UI Components**

* **`IncomeComponent`**: Displays the list of incomes.

  * Subscribes to signals from `IncomeService.pagination`.
  * Uses `<app-pagination>` for paging controls.

  * **`OutocomeComponent`**: Displays the list of outcomes.

  * Subscribes to signals from `OutcomeService.pagination`.
  * Uses `<app-pagination>` for paging controls.

* **`PaginationComponent`**:
  Standalone reusable component built with Angular 17’s `input()` API.
  Accepts a `PaginationService` instance and provides UI for page navigation and page-size selection.

* **`IncomeFormComponent`**:
  Handles adding and editing income records.
  Uses `IncomeService` instead of `OfflineDbService` directly.
  Determines mode (`add` or `edit`) from query params, patches form values when editing, and calls the appropriate service method on submit.

* **`OutcomeFormComponent`**:
  Handles adding and editing income records.
  Uses `OutcomeService` instead of `OfflineDbService` directly.
  Determines mode (`add` or `edit`) from query params, patches form values when editing, and calls the appropriate service method on submit.

#### 3. **Angular 17 Features Used**

* **Standalone components** (no `NgModule` dependency).
* **Signals** (`signal`, `computed`, `input`) for reactive state management.
* **@if** syntax for template conditional rendering.
* **@for** syntax for template iteration.
* **Reactive forms** for validation and submission.

---

**Goal of the refactor:**
Make the codebase more modular, reactive, and maintainable — moving all logic from components into services and keeping each layer’s responsibility clear:

* `PaginationService` → pagination state logic
  * `IncomeService` → business logic and data management
  * `OutcomeService` → business logic and data management
* Components → pure presentation
