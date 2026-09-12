# Contributing to Fact Frenzy

## Creating issues

This is a collaborative project, and though a number of issues are already created, others may need to be added. 
- Anyone on the team can add an issue. It may be helpful to discuss with the rest of the team in Discord before creating an issue, especially if you mean to assign it to yourself and begin working on it.
- Use one of [the issue templates for this repo](https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy/tree/main/.github/ISSUE_TEMPLATE) when creating issues (options come up when you open a new issue).

## Claiming issues

1. Find an unassigned issue. 
2. Team members can assign themselves, though it may be helpful to let others on the team know in Discord, in case someone else was thinking of working on the issue. Maybe the issue could be taken on collaboratively, for example. 
3. It is helpful to discuss with team members the general approach before writing code on self-created and self-assigned issues, to avoid problems down the road. 

## Naming branches, commits and PRs

Use the [Conventional Commits standard](https://www.conventionalcommits.org/en/v1.0.0/) for naming: `<type>[optional scope]: <description>`

Commits and PRs examples

- `docs: update instructions for claiming issues in CONTRIBUTING.md`
- `feat(api): add POST method for new quiz questions`
- `fix(web): increase colour contrast to adhere to WCAG guidelines`

Branches examples

- `docs/update-README`
- `chore/add-env-example`

## PR workflow

1. Run a linter and test before pushing changes.
```bash
# frontend linting and testing (testing to be added)
npm run lint

# backend linting and testing (to be added)
```

2. Use [the PR template for this repo](https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy/blob/main/.github/pull_request_template.md) when creating PRs. 

3. Each PR should have at least one team member review, and then can be approved and merged by the team lead.

## Git workflow
The recommended approach is to work directly in the main repository using feature branches. An alternative fork-based workflow is also provided below for team members who prefer it.

### Recommended: Working with feature branches
#### Initial setup:
1. `mkdir -p src` (Create a folder named "src", a common name for the "source" folder. Also common to place this at the root of your drive. `-p` safely creates it even if run multiple times)
2. `cd src` (Move to the directory you want to put the code in, example being "src")
3. `git clone https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy.git` (Clone the main repository directly on your computer)
4. `cd fact-frenzy` (Navigate into your local repository folder)

#### Start contributing:
1. `git checkout main` (Switch to the main branch)
2. `git pull origin main` (This will pull commits from "origin/main". Here, "origin" refers to the main team repository)
3. `git checkout -b feature/xyz` (Create a new branch for your specific task such as "feature/xyz" which is a snapshot of `main`. This becomes your working environment)
4. Write your code...

#### Finish & push:
1. `git add .` (Stage all changes you made in your feature branch when you are done coding)
2. `git commit -m "feat: add some new feature"` (Create a local commit with your feature work)
3. `git checkout main` (Switch back to `main`)
4. `git pull --rebase origin main` (Ensures your local main is still up-to-date with teammates)
5. `git checkout feature/xyz` (Switch back to your feature branch)
6. `git rebase main` (Teammates may push to main while you are working on your branch. Rebase will pull those changes so you can fix any conflicts and include the latest updates from their work. `git rebase --abort` can be used to cancel this if needed)
7. `git push -u origin feature/xyz` (Push your feature branch to `origin` in GitHub. If testers don't have this branch locally, they can load it using `git fetch origin` followed by `git checkout -b feature/xyz origin/feature/xyz`. `-u` sets up tracking so future `git push`/`git pull` commands work automatically)
8. Open a Pull Request (PR) on GitHub targeting `main`

### Alternative: Working with a fork

#### Initial setup:
1. Fork the repo on GitHub.
2. `git clone https://github.com/YOUR_USERNAME/fact-frenzy.git` (Clone your fork locally on your computer.)   
3. `cd fact-frenzy` (Navigate into your local repository folder.) 
4. `git remote add upstream https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy.git` (Add the original repository as `upstream` so you can fetch its commits later; only needed once per clone.)  

#### Start contributing:
5. `git checkout main` (Switch to your local main branch.)
6. `git fetch upstream` (Fetch the latest commits from the original repository (upstream) without modifying your local branches.)   
7. `git merge upstream/main` (Merge commits from upstream/main into your local main branch to update it with the original repository's latest changes.)   
8. `git push origin main` (Push your updated local main branch to your fork on GitHub to keep it in sync.)   
9. `git checkout -b feature/xyz` (Create a new `feature/xyz` branch, which is a snapshot of `main` _at this moment_.)
10. Write your code. Meanwhile, teammates may push to `main`. Divergence happens. Your feature branch and local `main` are now both behind the remote `main`. 

#### Finish & push:
11. `git add .` (Stage all changes you made in your feature branch.)  
12. `git commit -m "feat: add some new feature"` (Create a local commit with your feature work.)

**Update your local `main` branch and merge the latest changes into your feature branch:**

13. `git checkout main` (Switch back to your local main branch before syncing.)  
14. `git fetch upstream` (Fetch the latest commits from the original repository so you can update your local `main` with the latest changes.)  
15. `git merge upstream/main` (Merge the latest upstream commits into your local `main` branch.)    
16. `git push origin main` (Push the updated `main` to your fork.)
17. `git checkout feature/xyz` (Switch back to your feature branch.)   
18. `git merge main` (Merge the updated local `main` into your feature branch. Resolve any conflicts if they occur.)
19. `git push origin feature/xyz` (Push your feature branch and all commits to your fork on GitHub.)  
20. Open a PR on GitHub. 

> **Note:** You can also replace some of the steps above by using the GitHub **Sync fork** button together with the terminal commands below. Clicking this button pulls any new commits from the original repo (`upstream/main`) into your fork (`origin/main`) on GitHub. After this, your fork on GitHub is up to date with the original repository.

- **Note 1:** Instead of steps 5, 6, 7, and 8, you can go to your fork on GitHub, click the **Sync fork** button, and then run:
  
  `git checkout main`  
  `git pull origin main`

- **Note 2:** Instead of steps 13, 14, 15, and 16, you can go to your fork on GitHub, click the **Sync fork** button, and then run:

  `git checkout main`  
  `git pull origin main`

## Questions

Any questions or things to discuss can be raised on the Discord channel for this project. 