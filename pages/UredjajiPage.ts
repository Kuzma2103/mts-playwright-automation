import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class UredjajiPage extends BasePage {
	readonly istraziField: Locator;
	readonly deviceName: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.istraziField = page.locator("//label[@class='search-label']/input");
		this.deviceName = page.locator('.device-name');
	}

	/**
	 * This method searches for a device by entering the item name and submitting the search.
	 * @param itemName - The name of the device to search for.
	 */
	async istrazi(itemName: string): Promise<void> {
		await this.fillElement(this.istraziField, itemName, 'Istrazi');
		await this.istraziField.press('Enter');
	}

	/**
	 * This method clicks on a specific device in the list based on its name.
	 * @param item - The name of the device to click on.
	 */
	async clickOnUredjaj(item: string) {
		const deviceLocator = this.page.locator(
			`//a[@class='device-item']//h4[contains(., '${item}')]`
		);
		await this.clickOnElement(deviceLocator, item);
	}
}
