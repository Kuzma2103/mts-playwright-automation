import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Header extends BasePage {
	readonly userIcon: Locator;
	readonly cartIcon: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.userIcon = page.locator('section.user-info');
		this.cartIcon = page.locator('.cart-icon.icon-shopping-cart');
	}

	/**
	 * This method clicks on user icon
	 */
	async clickOnUserIcon(): Promise<void> {
		await this.clickOnElement(this.userIcon, 'User icon');
	}

	/**
	 * This method clicks on cart icon
	 */
	async clickOnCartIcon(): Promise<void> {
		await this.clickOnElement(this.cartIcon, 'Cart icon');
	}

	/**
	 * This method hovers over a specified main menu item in the header and clicks on the specified submenu item.
	 * @param hoverOverMenuItem - The text of the main menu item to hover over.
	 * @param headerMenuItem - The text of the submenu item to click on.
	 */
	async hoverThenClickOnHeaderMenuItem(
		hoverOverMenuItem: string,
		headerMenuItem: string
	) {
		const menuItemLocator = this.page.locator(
			`//ul[@class='main-nav-list']//a[contains(., '${hoverOverMenuItem}')]`
		);
		await this.hoverOverElement(menuItemLocator, hoverOverMenuItem);
		const subMenuItemLocator = this.page
			.locator(
				`//li[contains(@class, 'third-level-nav-item')]/a[contains(., '${headerMenuItem}')]`
			)
			.first();
		await this.clickOnElement(subMenuItemLocator, headerMenuItem);
	}
}
