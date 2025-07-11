# Branch Protection Setup

To ensure that the CI checks block PRs when they fail, you need to configure branch protection rules in your GitHub repository.

## Setup Instructions

1. **Go to your repository settings:**
   - Navigate to your GitHub repository
   - Click on "Settings" tab
   - Click on "Branches" in the left sidebar

2. **Add branch protection rule:**
   - Click "Add rule" or "Add branch protection rule"
   - In "Branch name pattern", enter: `main` (or `master` if that's your default branch)
   - Check the following options:
     - ✅ "Require a pull request before merging"
     - ✅ "Require status checks to pass before merging"
     - ✅ "Require branches to be up to date before merging"
     - ✅ "Include administrators"

3. **Select required status checks:**
   - In the "Status checks that are required" section, search for and select:
     - `build-and-test` (from the CI workflow)
     - `build` (from the build-check workflow)

4. **Save the rule:**
   - Click "Create" or "Save changes"

## What This Does

- **Blocks merging** if the build fails
- **Requires PRs** for all changes to main branch
- **Ensures code is up to date** before merging
- **Applies to everyone** including administrators

## Workflow Files Created

- `.github/workflows/build-check.yml` - Simple build check
- `.github/workflows/ci.yml` - Comprehensive CI with multiple Node.js versions

## Testing the Setup

1. Create a new branch
2. Make a change that would break the build (e.g., add a syntax error)
3. Create a PR
4. The CI should run and fail, blocking the merge
5. Fix the issue and push - the PR should become mergeable again

## Optional Enhancements

You can also enable:
- **Dismiss stale PR approvals** when new commits are pushed
- **Restrict pushes that create files** to prevent unauthorized changes
- **Require linear history** for cleaner git history 