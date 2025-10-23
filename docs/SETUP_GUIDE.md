# Setup Guide

This guide explains how to install, configure, and execute the Contribution Graph Generator.

## Prerequisites

- Git installed and configured (`git --version`)
- Node.js v16+ installed (`node -v`)
- Active GitHub repository initialized

## Steps

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/contribution-graph.git
   cd contribution-graph
````

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure `config.js`
   Adjust the target year and activity settings.

4. Run the generator

   ```bash
   npm run generate
   ```

5. Push to remote repository
   Commits are automatically pushed if enabled in configuration.

> [!TIP]
> If you encounter Git authentication issues, re-authenticate using `git config --global user.name` and `git config --global user.email`.