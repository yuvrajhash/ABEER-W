const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Default values
const defaults = {
  SMTP_HOST: 'smtpout.secureserver.net',
  SMTP_PORT: '587',
  SMTP_SECURE: 'false',
  SMTP_USER: 'pratik@aipl.org.in',
  RECIPIENT_EMAIL: 'pratik@aipl.org.in'
};

// Questions to ask
const questions = [
  {
    name: 'SMTP_HOST',
    question: `SMTP Host (default: ${defaults.SMTP_HOST}): `,
    default: defaults.SMTP_HOST
  },
  {
    name: 'SMTP_PORT',
    question: `SMTP Port (default: ${defaults.SMTP_PORT}): `,
    default: defaults.SMTP_PORT
  },
  {
    name: 'SMTP_SECURE',
    question: `SMTP Secure (default: ${defaults.SMTP_SECURE}): `,
    default: defaults.SMTP_SECURE
  },
  {
    name: 'SMTP_USER',
    question: `SMTP Username (default: ${defaults.SMTP_USER}): `,
    default: defaults.SMTP_USER
  },
  {
    name: 'SMTP_PASSWORD',
    question: 'SMTP Password (required): ',
    isPassword: true
  },
  {
    name: 'RECIPIENT_EMAIL',
    question: `Recipient Email (default: ${defaults.RECIPIENT_EMAIL}): `,
    default: defaults.RECIPIENT_EMAIL
  }
];

console.log('\n===== Contact Form Environment Setup =====\n');
console.log('This script will create a .env.local file with your email settings.');
console.log('Your password will be stored locally and won\'t be committed to Git.');
console.log('\nPress Enter to use the default value shown in parentheses.\n');

// Store answers
const answers = {};

// Ask questions sequentially
function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[index];
  rl.question(q.question, (answer) => {
    // Use default if no answer provided
    if (answer.trim() === '' && q.default) {
      answers[q.name] = q.default;
    } else {
      answers[q.name] = answer;
    }

    // Validate password
    if (q.name === 'SMTP_PASSWORD' && answers[q.name].trim() === '') {
      console.log('Password is required. Please enter a password.');
      askQuestion(index); // Ask the same question again
      return;
    }

    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = Object.entries(answers)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const envFilePath = path.join(process.cwd(), '.env.local');
  
  fs.writeFileSync(envFilePath, envContent);
  
  console.log('\n✅ .env.local file created successfully!');
  console.log(`File location: ${envFilePath}`);
  console.log('\nYour email settings are now configured. The contact form should work when you restart the application.\n');
  
  rl.close();
}

// Start asking questions
askQuestion(0); 