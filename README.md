# Contribution Graph Generator

Professional Node.js automation system that generates realistic GitHub contribution graphs programmatically.

## Overview

This repository provides a production-ready script designed to simulate GitHub activity across an entire year.
It intelligently distributes commits based on trends and configurable ratios creating human-like graphs.

## Features

- **Realistic Commit Patterns** – Seasonal behavior with active weekdays and light summer activity  
- **Year Configuration** – Generate commits for any selected year  
- **Smart Scheduling** – Pushes progress weekly or on Sundays  
- **Fully Automated** – Requires only one command to generate all commits  
- **Professional Documentation** – Complete setup, configuration, and security guidance

> [!TIP]  
> All generated commits are timestamped for authenticity and automatically pushed to the selected Git branch.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/contribution-graph.git
cd contribution-graph

# Install dependencies
npm install

# Configure project
nano config.js

# Generate commits
npm run generate
````

> [!WARNING]
> Ensure your Git repository is initialized and connected to a remote before running the generator.

## Configuration

Edit `config.js` to define:

* **year:** The target year for commit generation
* **targetCommits:** Approximate number of commits for the year
* **activeDaysPercentage:** Probability of active days (0–1 range)
* **pushOnSunday:** Whether to automatically push on Sundays

Example:

```js
export const CONFIG = {
  year: 2025,
  targetCommits: 1000,
  activeDaysPercentage: 0.7,
  pushOnSunday: true
};
```

## Documentation

* [**Setup Guide**](docs/SETUP_GUIDE.md) – Complete installation and usage instructions
* [**Troubleshooting**](docs/TROUBLESHOOTING.md) – Common errors and resolutions
* [**Eligibility**](docs/ELIGIBILITY.md) – Requirements for commit simulation and contribution visibility

## Requirements

* **Node.js** v16.0 or higher
* **Git** installed and configured
* **Internet connection** for pushing commits

> [!NOTE]
> Contribution Graph Generator is an educational tool designed for learning Git automation and techniques.

## License

This project is licensed under the [MIT License](LICENSE).
