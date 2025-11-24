# Family Blood Compatibility App

A beautiful React app to check blood type compatibility among family members.

## Features

- Search and select family members by name
- View who you can donate blood to
- View who you can receive blood from
- Smooth animations with Framer Motion
- Modern, responsive UI with Tailwind CSS

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Adding/Updating Family Members

### From Excel File

The app automatically imports family member data from `Tipos_de_Sangre.xlsx`. To regenerate the data after updating the Excel file:

1. Make sure you have Python 3 and the required packages installed:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install pandas openpyxl
   ```

2. Run the generation script:
   ```bash
   python generate_family_members.py
   ```

   This will update `src/familyMembers.js` with the latest data from your Excel file.

### Manual Editing

Alternatively, you can manually edit the `familyMembers` array in `src/familyMembers.js`:

```javascript
export const familyMembers = [
  { name: "Your Name", bloodType: "O+" },
  // Add more members here...
];
```

## Making Your App Public (Deployment)

The easiest way to deploy your app is using **Vercel** (free and takes 2 minutes):

### Quick Deploy with Vercel:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repository on GitHub, then:
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub
   - Click "Add New Project" → Import your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"
   - Your app will be live at `https://your-app-name.vercel.app` in ~2 minutes!

3. **Automatic updates**: Every time you push to GitHub, Vercel automatically redeploys your app.

### Other Options:
- **Netlify**: Similar to Vercel, also free and easy
- **GitHub Pages**: Free hosting directly from GitHub
- See `DEPLOYMENT.md` for detailed instructions on all options

## Notes

- This app is for educational purposes only
- Not intended for real medical decisions
- Blood type compatibility follows standard ABO and Rh factor rules
- **Privacy Note**: When deployed, all family member data will be public

