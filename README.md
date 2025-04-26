# Introduction

This project is an automation testing framework built using Playwright for mts web application.
The framework is designed to facilitate the testing of web application with a focus on maintainability, scalability, and detailed reporting.
It implements best practices such as the Page Object Model (POM), reusable helpers, and step tracking with test.step for clear test execution flow.

The primary objective of this project is to streamline the process of creating, validating, and managing automated tests while providing detailed insights into test execution through robust reporting.

# Getting started

Follow these steps to set up and run the framework on your local system:

## Installation process

Clone the repository:

```bash
git clone https://github.com/Kuzma2103/mts-playwright-automation.git

```

Install project dependencies:

```bash
npm install

```

Ensure Playwright browsers are installed:

```bash
npx playwright install

```

## Software Dependencies

Node.js: Ensure you have Node.js installed (v18 or higher recommended).

Playwright: The framework leverages Playwright for browser automation.

Additional dependencies are listed in the package.json file.

## Running Tests

Execute all tests with:

```bash
  npx playwright test

```

Run tests in a specific file:

```bash
  npx playwright test tests/your-test-file.spec.ts

```

After running tests, generate and view detailed HTML reports:

```bash
  npx playwright show-report

```

## Documentation

Refer to the official Playwright Documentation for in-depth API details.

[Playwright typescript documentation](https://playwright.dev/docs/intro)

## Authors

- Ivan Kuzmanovic
