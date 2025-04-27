import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { notification } from '../constants/notification-message';

export class PojedinacniUredjajiPage extends BasePage {
	readonly dodajUKorpuBtn: Locator;
	readonly cartNotificationHeader: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.dodajUKorpuBtn = page.locator(
			"//div[@class='items-wrapper']//button[contains(., 'Dodaj u korpu')]"
		);
		this.cartNotificationHeader = page.locator('.cart-notification-header');
	}

	/**
	 * This method clicks on the "Dodaj u korpu" button.
	 */
	async clickOnDodajUKorpuButton() {
		await this.clickOnElement(this.dodajUKorpuBtn, 'Dodaj u korpu');
	}

	/**
	 * This method validates that the notification message for adding a phone to the cart is displayed.
	 */
	async validatePhoneAddedToCart() {
		await this.validateElementText(
			this.cartNotificationHeader,
			notification.addedToCartNotificationMessage,
			'Cart notification header'
		);
	}
}
