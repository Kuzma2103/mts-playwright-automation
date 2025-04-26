import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Header extends BasePage {
	readonly userIcon: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.userIcon = page.locator('section.user-info');
	}

	/**
	 * This method clicks on user icon
	 */
	async clickOnUserIcon(): Promise<void> {
		await this.clickOnElement(this.userIcon, 'User icon');
	}
}
