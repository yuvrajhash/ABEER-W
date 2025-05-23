const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const siteName = 'abeer12';

console.log('Starting Netlify deployment process...');

try {
  // Check if Netlify CLI is installed
  try {
    execSync('netlify --version', { stdio: 'ignore' });
    console.log('Netlify CLI is already installed.');
  } catch (error) {
    console.log('Installing Netlify CLI...');
    execSync('npm install netlify-cli -g', { stdio: 'inherit' });
  }

  // Build the project
  console.log('Building the project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Reminder about Formspree
  console.log('\n⚠️ IMPORTANT: Make sure your Formspree form is set up correctly:');
  console.log('  1. Create a Formspree form at https://formspree.io/');
  console.log('  2. Update the form ID in app/contact/page.tsx');
  console.log('  3. Test the form before deploying');
  console.log('\nSee FORMSPREE_SETUP.md for detailed instructions.\n');

  // Deploy to Netlify
  console.log(`Deploying to Netlify with site name: ${siteName}...`);
  
  const deployCommand = `netlify deploy --dir=out --prod --site=${siteName}`;
  console.log(`Running: ${deployCommand}`);
  
  // Ask for confirmation before proceeding
  rl.question('Press Enter to continue with deployment or Ctrl+C to cancel...', () => {
    execSync(deployCommand, { stdio: 'inherit' });
    console.log('Deployment completed successfully!');
    rl.close();
  });
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} 