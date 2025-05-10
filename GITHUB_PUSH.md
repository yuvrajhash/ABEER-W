# Push to GitHub Repository "Adhiron2"

Follow these steps to push your project to a new GitHub repository named "Adhiron2":

## Step 1: Create a new repository on GitHub

1. Go to https://github.com/new
2. Name your repository "Adhiron2"
3. Do not initialize the repository with a README, .gitignore, or license
4. Click "Create repository"

## Step 2: Push your local repository to GitHub

After creating the repository on GitHub, you'll see instructions for pushing an existing repository. Use these commands:

```bash
# Make sure you're in the pharma-ecommerce directory
cd E:\ADHIRON\Test project 2\pharma-ecommerce

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/Adhiron2.git

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Authentication

When pushing to GitHub, you'll be prompted for your GitHub credentials. You can use either:

1. Your GitHub username and personal access token (not your regular password)
2. GitHub CLI for easier authentication

### Using a Personal Access Token

If you don't have a personal access token:
1. Go to GitHub > Settings > Developer settings > Personal access tokens
2. Generate a new token with "repo" permissions
3. Use this token as your password when prompted

### Using GitHub CLI

If you prefer using GitHub CLI:
1. Install GitHub CLI from https://cli.github.com/
2. Open a terminal and run `gh auth login`
3. Follow the prompts to authenticate
4. Then run `gh repo create Adhiron2 --private --source=. --push`

## Verify

After pushing, visit https://github.com/YOUR_USERNAME/Adhiron2 to verify your code has been pushed successfully. 