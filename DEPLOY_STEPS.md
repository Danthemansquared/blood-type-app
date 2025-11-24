# Quick Deploy Steps

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `blood-type-app` (or any name you like)
3. Make it **Public** (or Private if you prefer)
4. **DON'T** check "Add a README file" (you already have one)
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
# Example: git remote add origin https://github.com/danthemansquared/blood-type-app.git

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go back to Vercel (the page you have open)
2. In the "Import Git Repository" section on the left, you should see your new repository appear
3. Click the **"Import"** button next to your repository
4. Vercel will auto-detect your Vite settings
5. Click **"Deploy"**
6. Wait ~2 minutes and your app will be live!

## Alternative: If you want to use the URL field

If you prefer to use the URL field at the top:
1. Copy your GitHub repository URL (looks like: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`)
2. Paste it into the "Enter a Git repository URL to deploy..." field
3. Click "Continue"
4. Follow the prompts to deploy

