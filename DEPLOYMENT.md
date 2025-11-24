# Deploying Your Blood Type App

There are several free options to make your app public. Here are the easiest ones:

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy React apps. It's free and takes just a few minutes.

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

3. **Your app will be available at**: `https://your-app-name.vercel.app`

### Automatic Updates:
- Every time you push to GitHub, Vercel automatically redeploys your app
- You can also set up a custom domain if you want

---

## Option 2: Netlify

Similar to Vercel, also very easy:

1. Push to GitHub (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

---

## Option 3: GitHub Pages

Free hosting directly from GitHub:

1. Install the GitHub Pages plugin:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Update `vite.config.js` to add base path:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

## Quick Deploy Commands

After setting up git, you can use these commands:

```bash
# Build the app locally to test
npm run build

# Preview the production build
npm run preview
```

---

## Important Notes

- Make sure your Excel file (`Tipos_de_Sangre.xlsx`) is in the repository if you want to regenerate data
- The generated `src/familyMembers.js` file will be included in the build
- All your family data will be public once deployed (make sure that's okay!)

