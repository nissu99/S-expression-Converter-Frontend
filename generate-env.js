#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse .env file
const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

// Generate .env.js file
const configContent = `// Auto-generated from .env file
// Do not edit manually
window.ENV = {
    API_BASE_URL: '${envVars.VITE_API_BASE_URL || 'http://127.0.0.1:8080'}',
    ENVIRONMENT: '${envVars.VITE_ENVIRONMENT || 'development'}'
};`;

fs.writeFileSync(path.join(__dirname, '.env.js'), configContent);
console.log('Environment configuration updated from .env file');
