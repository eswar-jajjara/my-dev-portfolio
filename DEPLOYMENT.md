# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **"GitHub Actions"**
4. Save the settings

### 2. Deploy
The site will automatically deploy when you push to the `master` branch. The GitHub Actions workflow will:
- Install dependencies
- Build the Next.js app with static export
- Create necessary files for GitHub Pages
- Deploy to the `gh-pages` branch

### 3. Access Your Site
Once deployed, your site will be available at:
```
https://eswar-jajjara.github.io/my-dev-portfolio/
```

## Configuration Details

- **Next.js Configuration**: Set up for static export with basePath `/my-dev-portfolio`
- **GitHub Actions Workflow**: Located at `.github/workflows/deploy.yml`
- **Build Output**: Static files are generated in the `out/` directory
- **GitHub Pages**: Configured to deploy from GitHub Actions

## Troubleshooting

### Build Failures
- Check the Actions tab in your GitHub repository for detailed logs
- Ensure all dependencies are properly listed in `package.json`
- Font loading issues have been resolved by using system fonts

### 404 Errors
- Verify the basePath configuration in `next.config.ts` matches your repository name
- Ensure GitHub Pages is configured to use "GitHub Actions" as the source

### Updates Not Appearing
- Check if the GitHub Actions workflow completed successfully
- Clear your browser cache
- Wait a few minutes for GitHub's CDN to update

## Additional Notes

- The site uses system fonts for better compatibility and performance
- Static export is used for optimal GitHub Pages compatibility
- All assets are properly configured with the correct basePath