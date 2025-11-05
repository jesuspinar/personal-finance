Build/Lint/Test:
- npm run build
- npm run lint
- npm test

Code Style:
- Use Prettier for formatting
- ESLint for linter rules
- TypeScript for type safety
- Consistent imports and naming conventions
- Proper error handling

Cursor/Copilot Rules:
- .cursor/rules/ for custom rules
- .github/copilot-instructions.md for copilot settings

Naming Conventions:
- CamelCase for functions
- Snake_case for variables
- Descriptive variable names

Dependencies:
- Regularly update dependencies
- Use version control with Git

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

Testing Coverage:
- Aim for 80%+ test coverage
- Use JaCoCo or similar tools

Code Quality:
- Lint and format code regularly
- Use linters like ESLint

Collaboration:
- Use Git for version control
- Maintain a clean and organized codebase

Testing:
- Run a single test with: npm test -- --testPathPattern <test-name>

Error Handling:
- Always use try-catch blocks for asynchronous operations
- Log errors with descriptive messages
- Never swallow exceptions silently

Formatting:
- Enforce consistent spacing and indentation
- Use single quotes for strings
- Keep function parameters on one line when possible

Import Rules:
- Import from nearest parent directory
- Group imports by type (core, third-party, local)
- Avoid deep imports

Types:
- Use explicit types for all variables and function parameters
- Prefer interface over type alias when possible
- Use optional chaining for optional properties

Naming:
- Use descriptive names that reflect the purpose
- Avoid generic names like 'data' or 'info'
- Use singular nouns for single items, plural for collections

Security:
- Validate all user inputs
- Sanitize all outputs
- Use secure HTTP headers
- Avoid storing sensitive data in client-side storage