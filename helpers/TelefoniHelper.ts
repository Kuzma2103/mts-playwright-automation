import { Page } from '@playwright/test';
import { Header } from '../pages/Header';
import { PageObjectManager } from '../managers/PageObjectManager';
import { UredjajiPage } from '../pages/UredjajiPage';
import { telefoniTestData } from '../test-data/telefoni-data';
import { PojedinacniUredjajiPage } from '../pages/PojedinacniUredjajiPage';
import { Cart } from '../pages/Cart';

/**
 * Helper class for actions related to phone search, cart management,
 * and interactions on the "Uređaji" and "Pojedinačni Uređaji" pages.
 */
export class TelefoniHelper {
	readonly pageManager: PageObjectManager;
	readonly header: Header;
	readonly uredjaji: UredjajiPage;
	readonly pojedinacniUredjaji: PojedinacniUredjajiPage;
	readonly cart: Cart;

	constructor(readonly page: Page) {
		this.pageManager = new PageObjectManager(page);
		this.header = this.pageManager.getPage(Header);
		this.uredjaji = this.pageManager.getPage(UredjajiPage);
		this.pojedinacniUredjaji = this.pageManager.getPage(
			PojedinacniUredjajiPage
		);
		this.cart = this.pageManager.getPage(Cart);
	}

	/**
	 * This method searches for the specified phone model using the search field.
	 * @param phone - The model of the phone to search for.
	 */
	async searchForThePhone(phone: string): Promise<void> {
		await this.uredjaji.istrazi(phone);
		await this.uredjaji.waitForLoadersToDisappear();
	}

	/**
	 * This method validates that the searched phone model is correctly displayed in the search results.
	 */
	async validateSearchForThePhone(): Promise<void> {
		await this.uredjaji.validateElementText(
			this.uredjaji.deviceName,
			telefoniTestData.model,
			'Device name'
		);
	}

	/**
	 * This method adds the specified phone to the shopping cart.
	 * @param phone - The model name of the phone to add to the cart.
	 */
	async addPhoneToCart(phone: string): Promise<void> {
		await this.uredjaji.clickOnUredjaj(phone);
		await this.uredjaji.waitForLoadersToDisappear();
		await this.pojedinacniUredjaji.clickOnDodajUKorpuButton();
		await this.pojedinacniUredjaji.waitForLoadersToDisappear();
		await this.pojedinacniUredjaji.validatePhoneAddedToCart();
	}

	/**
	 * Validates that the added phone is present in the shopping cart.
	 */
	async validateThePhoneIsInCart(): Promise<void> {
		await this.header.clickOnCartIcon();
		await this.cart.validateItemIsInCart();
	}

	/**
	 * Removes all items from the shopping cart.
	 */
	async removeItemsFromCart(): Promise<void> {
		await this.cart.emptyTheCart();
	}
}
