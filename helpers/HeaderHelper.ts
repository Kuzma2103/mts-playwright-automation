import { Page } from '@playwright/test';
import { Header } from '../pages/Header';
import { PageObjectManager } from '../managers/PageObjectManager';

/**
 * Helper class for user navigation actions related to the website header.
 */
export class HeaderHelper {
	readonly pageManager: PageObjectManager;
	readonly header: Header;

	constructor(readonly page: Page) {
		this.pageManager = new PageObjectManager(page);
		this.header = this.pageManager.getPage(Header);
	}

	/**
	 * This method navigates the user to the home page via the header.
	 */
	async navigateUserToHomePage(): Promise<void> {
		await this.header.navigateUserToHomePage();
	}

	/**
	 * This method navigates the user to a specific page by interacting with header menu and submenu items.
	 * @param menuItem - The visible text of the main menu item to hover over.
	 * @param submenuItem - The visible text of the submenu item to click on.
	 */
	async navigateUserToPage(
		menuItem: string,
		submenuItem: string
	): Promise<void> {
		await this.header.hoverThenClickOnHeaderMenuItem(menuItem, submenuItem);
	}
}
