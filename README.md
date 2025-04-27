# Introduction

This project is an automation testing framework built using Playwright Typescript for mts web application.
The framework is designed to facilitate the testing of web application with a focus on maintainability, scalability, and detailed reporting.
It implements best practices such as the Page Object Model (POM), reusable helpers, and step tracking with test.step for clear test execution flow.

## Covered Functionalities

### 1. User Login

- Attempt login with invalid credentials.
- Validate correct error messages are displayed.
- **Note**:
  - Other login scenarios (successful login, registration) are skipped because the web application is running in production mode.
  - To fully test login or registration, valid real data (e.g., JMBG) must be used.

### 2. Device Management (Pojedinačni uređaji)

- Search for a device (phone models).
- Select a device from search results.
- Add a device to the cart.

### 3. Shopping Cart (Korpa)

- Add devices to the cart.
- Validate the cart displays added items correctly.
- Remove devices from the cart.
- Validate the cart becomes empty after deletions.

## Test Data Strategy

- Test data is externalized using constants.
- Separate test data files like:
  - `/test-data/telefoni-data.ts`
  - `/constants/error-message.ts`
  - `/constants/notification-message.ts`
- Enables easy adjustment of test inputs without modifying test scripts.

## Test Report and Analysis

- Test results are automatically generated using **Playwright’s HTML Reporter**.
- After running tests, an HTML report is available in the `test-results` folder.
- The report includes:
  - Test steps.
  - Screenshots (for failures).
  - Videos (retained on failure).

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

## Author

- Ivan Kuzmanovic
