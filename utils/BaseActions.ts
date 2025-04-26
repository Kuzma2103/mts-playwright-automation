import { test, Locator, Page, expect } from '@playwright/test';

export class BaseActions {
	constructor(readonly page: Page) {}

	/**
	 * Waits for the specified element to become visible within the given timeout.
	 * This is typically used as a prerequisite before interacting with elements
	 * to ensure the element is rendered and interactable in the DOM.
	 *
	 * @param locator - The Playwright Locator representing the target element.
	 * @param timeout - Maximum time in milliseconds to wait for the element to be visible.
	 * @throws Will throw an error if the element does not become visible within the timeout.
	 */
	private async waitForVisibility(
		locator: Locator,
		timeout: number
	): Promise<void> {
		await expect(locator).toBeVisible({ timeout });
	}

	/**
	 * This method clicks on a element using its Locator with step tracking.
	 * Ensures the element is visible before clicking on it.
	 * @param locator - Locator of the element.
	 * @param elementName - Name of the element for logging in report.
	 * @param timeout - Time to wait for element to be visible.
	 */
	async clickWrapper(
		locator: Locator,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Click on element [${elementName}] with locator [${locator.toString()}]`, async () => {
				console.log(`Attempting to click on element [${elementName}]`);
				await this.waitForVisibility(locator, timeout);
				await locator.click();
				console.log(
					`Successfully clicked on [${elementName}] with locator [${locator.toString()}]`
				);
			});
		} catch (error) {
			console.error(
				`Failed to click on element [${elementName}], with locator [${locator.toString()}]. Error: ${
					error.message
				}`
			);
			throw new Error(
				`Error clicking on element: [${elementName}]. Stack trace: ${error.stack}`
			);
		}
	}

	/**
	 * This method hovers over an element using its Locator with step tracking.
	 * Ensures the element is visible before performing the hover action.
	 * @param locator - Locator of the element.
	 * @param elementName - Name of the element for logging in report.
	 * @param timeout - Time to wait for element to be visible.
	 */
	async hoverOverElement(
		locator: Locator,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Hover over element [${elementName}] with locator [${locator.toString()}]`, async () => {
				console.log(`Attempting to hover over element [${elementName}]`);
				await this.waitForVisibility(locator, timeout);
				await locator.hover();
				console.log(
					`Successfully hovered over [${elementName}] with locator [${locator.toString()}]`
				);
			});
		} catch (error) {
			console.error(
				`Failed to hover over element [${elementName}], with locator [${locator.toString()}]. Error: ${
					error.message
				}`
			);
			throw new Error(
				`Error hovering over element: [${elementName}]. Stack trace: ${error.stack}`
			);
		}
	}

	async fillWrapper(
		locator: Locator,
		text: string,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Fill the element [${elementName}] with locator [${locator.toString()}] with text [${text}]`, async () => {
				console.log(`Attempting to enter text in element [${elementName}]`);
				await this.waitForVisibility(locator, timeout);
				console.log(`Entering [${text}] into [${elementName}] element`);
				await locator.fill(text);
				console.log(
					`Successfully filled text [${text}] into [${elementName}] with locator [${locator.toString()}]`
				);
			});
		} catch (error) {
			console.error(
				`Failed to fill the element [${elementName}] with locator [${locator.toString()}] with text[${text}]. Error: [${
					error.message
				}]`
			);
			throw new Error(
				`Error entering text in element [${elementName}]. Stack trace: [${error.stack}]`
			);
		}
	}

	/**
	 * This method retrieves and returns the trimmed text content of a given element.
	 * Ensures the element is visible before attempting to access its content.
	 * @param locator - Locator of the element whose text is to be retrieved.
	 * @param timeout - Wait time for element to be visible.
	 * @returns A `Promise<string>` that resolves to the trimmed text content of the element.
	 */
	async getElementText(locator: Locator, timeout: number): Promise<string> {
		try {
			await this.waitForVisibility(locator, timeout);
			const text = await locator.textContent();
			if (!text) {
				throw new Error(
					`Text content not found for element with locator [${locator.toString()}].`
				);
			}
			console.log(
				`Returned text from element with locator [${locator.toString()}]: [${text.trim()}]`
			);
			return text.trim();
		} catch (error) {
			console.error(
				`Failed to get text from element with locator [${locator.toString()}]. Error: [${
					error.message
				}]`
			);
			throw new Error(
				`Error retrieving text from element with locator [${locator.toString()}]. Stack trace: [${
					error.stack
				}]`
			);
		}
	}

	/**
	 * This method validates that the given element contains or exactly matches the expected text.
	 * Waits for the element to be visible before performing the assertion.
	 * @param locator - The Locator of the element to validate.
	 * @param expectedText - The expected text content to match against the element.
	 * @param elementName - Optional name of the element for logging purposes.
	 * @param timeout - Wait time for element to be visible.
	 */
	async validateElementHasText(
		locator: Locator,
		expectedText: string,
		elementName: string,
		timeout: number
	): Promise<void> {
		await test.step(`Validate [${elementName}] contains text [${expectedText}]`, async () => {
			console.log(`Checking if [${elementName}] has text [${expectedText}]`);
			await this.waitForVisibility(locator, timeout);
			await expect(locator).toHaveText(expectedText);
			console.log(
				`Validation passed: [${elementName}] contains [${expectedText}]`
			);
		});
	}
}
