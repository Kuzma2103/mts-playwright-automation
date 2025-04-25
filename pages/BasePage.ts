import { Locator, Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class BasePage {
	private readonly actions: BaseActions;

	constructor(readonly page: Page) {
		this.actions = new BaseActions(page);
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
	 */
	async validateElementText(
		locator: Locator,
		expectedText: string,
		elementName: string
	): Promise<void> {
		await this.actions.validateElementHasText(
			locator,
			expectedText,
			elementName
		);
	}
}
