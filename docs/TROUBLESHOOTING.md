# Troubleshooting Guide

Common problems and their solutions.

### 1. Commits not appearing on GitHub graph
- Verify that the commit timestamps are within the target year  
- Ensure commits are pushed to the correct branch (e.g., `main`)  
- GitHub may take a few minutes to update graphs

### 2. Permission denied (publickey)
- Run `ssh-add ~/.ssh/id_rsa` or reconfigure Git credentials

### 3. Missing dependencies
- Run `npm install` again to reinstall missing packages

### 4. Script exits unexpectedly
- Ensure you have internet access  
- Check your Git repository is initialized and connected

### 5. JSON file locked or corrupted
- Delete `data.json` and let the script regenerate it automatically