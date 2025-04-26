import { Locator, Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class BasePage {
	private readonly actions: BaseActions;

	constructor(readonly page: Page) {
		this.actions = new BaseActions(page);
	}

	/**
	 * Navigates the user to the home page and logs the action.
	 */
	async navigateUserToHomePage(): Promise<void> {
		console.log('Navigating to home page...');
		await this.page.goto('/');
		console.log('Successfully navigated to home page.');
	}

	/**
	 * This method clicks on an element.
	 * @param locator - Locator of the element.
	 * @param elementName - Name of the element for report.
	 * @param timeout - Optional timeout (default: 5000ms).
	 */
	async clickOnElement(
		locator: Locator,
		elementName: string,
		timeout = 5000
	): Promise<void> {
		await this.actions.clickWrapper(locator, elementName, timeout);
	}

	/**
	 * This method hovers over an element.
	 * @param locator - Locator of the element.
	 * @param elementName - Name of the element for report.
	 * @param timeout - Optional timeout (default: 5000ms).
	 */
	async hoverOverElement(
		locator: Locator,
		elementName: string,
		timeout = 5000
	): Promise<void> {
		await this.actions.hoverOverElement(locator, elementName, timeout);
	}

	/**
	 * This method fills text into an input element.
	 * @param locator - Locator of the input.
	 * @param text - Text to fill.
	 * @param elementName - Name of the element for report.
	 * @param timeout - Optional timeout (default: 5000ms).
	 */
	async fillElement(
		locator: Locator,
		text: string,
		elementName: string,
		timeout = 5000
	): Promise<void> {
		await this.actions.fillWrapper(locator, text, elementName, timeout);
	}

	/**
	 * This method retrieves and returns text from an element.
	 * @param locator - Locator of the element.
	 * @param timeout - Optional timeout (default: 5000ms).
	 * @returns Trimmed text content.
	 */
	async getElementText(locator: Locator, timeout = 5000): Promise<string> {
		return await this.actions.getElementText(locator, timeout);
	}

	/**
	 * This method validates an element contains or matches expected text.
	 * @param locator - Locator of the element.
	 * @param expectedText - Text to match.
	 * @param elementName - Name of the element for report.
	 * @param timeout - Wait time for element to be visible. Default is 3000ms.
	 */
	async validateElementText(
		locator: Locator,
		expectedText: string,
		elementName: string,
		timeout: number = 3000
	): Promise<void> {
		await this.actions.validateElementHasText(
			locator,
			expectedText,
			elementName,
			timeout
		);
	}

	/**
	 * This method waits for specified loader elements to appear and then disappear.
	 * @param loaderSelectors - An array of CSS selectors representing loaders (default: ['.loader']).
	 * @param appearTimeoutMs - Maximum time in milliseconds to wait for a loader to appear (default: 3000ms).
	 * @param disappearTimeoutMs - Maximum time in milliseconds to wait for a loader to disappear (default: 20000ms).
	 *
	 * @throws Will not throw if loader doesn't appear — method safely skips if no loader is found.
	 */
	async waitForLoadersToDisappear(
		loaderSelectors: string[] = ['.loader'],
		appearTimeoutMs: number = 3000,
		disappearTimeoutMs: number = 20000
	): Promise<void> {
		for (const selector of loaderSelectors) {
			const loader: Locator = this.page.locator(selector);
			console.log(`Checking for loader: ${selector}`);
			try {
				await loader.waitFor({
					state: 'visible',
					timeout: appearTimeoutMs,
				});
				console.log(
					`Loader appeared (${selector}), waiting for it to disappear...`
				);
				await loader.waitFor({
					state: 'hidden',
					timeout: disappearTimeoutMs,
				});
				console.log(`Loader disappeared (${selector})`);
			} catch (error) {
				console.log(
					`Loader '${selector}' did not appear or disappeared quickly. Skipping...`
				);
			}
		}
	}
}
