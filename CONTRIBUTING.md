# Contributing to ChatGPT Learning

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Before You Start

- Fork the repository
- Clone your fork locally
- Create a new branch for your changes
- Follow the code style guidelines
- Keep commits atomic and descriptive

## Branch Naming Convention

Use descriptive branch names following this pattern:

```
feature/feature-name        # New feature
bugfix/bug-description      # Bug fix
docs/documentation-update   # Documentation
refactor/refactor-area      # Code refactoring
hotfix/urgent-fix           # Urgent fixes
```

Example: `feature/multi-agent-weather` or `bugfix/eslint-config`

## Commit Message Format

Use clear, descriptive commit messages:

```
type(scope): subject

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Build, dependencies, or tooling changes
```

Examples:
```
feat(weather-agent): add temperature conversion tool
fix(eslint): resolve config validation error
docs(readme): update setup instructions
chore(deps): update eslint to latest version
```

## Code Quality Standards

### Before Submitting a PR

1. **Run linting and formatting:**
   ```bash
   npm run lint:fix
   npm run format
   ```

2. **Verify your changes work:**
   ```bash
   node path/to/module/index.js
   ```

3. **Check for console errors:**
   - Ensure no `console.error()` or unhandled errors
   - Only use `console.log()` for intended output

### ESLint Rules

The project enforces:
- ES2021+ syntax
- Double quotes for strings
- Semicolons required
- 2-space indentation
- `const` preferred over `let` and `var`
- No trailing spaces
- Meaningful variable names

### Prettier Formatting

All files are automatically formatted with:
- 100 character line width
- 2-space tabs
- Trailing commas in multiline objects
- LF line endings

## Testing Changes

1. **Test your code manually:**
   - Run the module with `node`
   - Verify expected output
   - Check for errors

2. **Test with Husky pre-commit:**
   - Make a commit to test the pre-commit hooks
   - Ensure lint and format pass

3. **Update existing tests:**
   - If modifying functionality, update related tests
   - Add new tests for new features

## PR Guidelines

### When Creating a Pull Request

1. **Use the PR template:**
   - All sections should be filled out
   - Link related issues
   - Describe your changes clearly

2. **Keep PRs focused:**
   - One feature or fix per PR
   - Avoid mixing unrelated changes

3. **Write clear titles:**
   ```
   Good: Add temperature conversion to weather agent
   Bad: Update stuff
   ```

4. **Provide context:**
   - Why are these changes needed?
   - What problem does this solve?
   - Any trade-offs or considerations?

### PR Review Process

1. **Code Review:**
   - At least one maintainer review required
   - Respond to feedback and make requested changes
   - Commit changes with clear messages

2. **CI/CD Checks:**
   - All automated checks must pass
   - No ESLint or Prettier errors
   - No broken imports or syntax errors

3. **Merge Criteria:**
   - ✅ All checks pass
   - ✅ At least one approval
   - ✅ Up to date with main branch
   - ✅ No conflicts
   - ✅ Clear commit history

## Common Contribution Types

### Adding a New Module

1. Create new folder: `0X_module_name/`
2. Add `index.js` (main logic)
3. Add `functions.js` (helper functions)
4. Update `shared/envs_enum.js` if new env vars needed
5. Update README.md with module description
6. Test thoroughly before PR

### Bug Fixes

1. Describe the bug in the PR
2. Include steps to reproduce
3. Explain your fix
4. Verify existing functionality still works

### Documentation

1. Update relevant `.md` files
2. Keep formatting consistent
3. Add examples where helpful
4. Verify links work correctly

## Questions?

- Check existing issues and PRs
- Review the README and documentation
- Ask maintainers for clarification

## Thank You!

Your contributions help make this project better. We appreciate your time and effort!
