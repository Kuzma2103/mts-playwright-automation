import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { telefoniTestData } from '../test-data/telefoni-data';

export class Cart extends BasePage {
	readonly cartItemTitle: Locator;
	readonly deleteCartItemsButtons: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.cartItemTitle = page.locator(
			"//li[@class='cart-item mini-cart-item device']//p[@class='title']"
		);
		this.deleteCartItemsButtons = page.locator(
			'button.remove-device-btn.icon-mts-trash-gray.not-removable'
		);
	}

	/**
	 * This method validates that the expected item is present in the cart by checking its title.
	 */
	async validateItemIsInCart(): Promise<void> {
		await this.validateElementText(
			this.cartItemTitle,
			telefoniTestData.model,
			'Cart item title'
		);
	}

	/**
	 * This method deletes all items from the cart by clicking on each trash icon and logs each deletion.
	 * Safely exits if the cart becomes empty or if no trash icons are found.
	 */
	async emptyTheCart(): Promise<void> {
		const trashCount = await this.deleteCartItemsButtons.count();
		console.log(`Found ${trashCount} item(s) in the cart to delete.`);

		while (true) {
			const emptyCartMessage = this.page.locator('h3', {
				hasText: 'Tvoja korpa je prazna.',
			});
			if (await emptyCartMessage.isVisible()) {
				console.log('Cart is already empty. No more items to delete.');
				break;
			}
			const trashIconCount = await this.deleteCartItemsButtons.count();
			if (trashIconCount === 0) {
				console.log('No trash icons found. Exiting...');
				break;
			}
			const firstTrashIcon = this.deleteCartItemsButtons.first();
			await this.clickOnElement(firstTrashIcon, `Trash Icon`);
			console.log(`Deleted an item from cart.`);
			await this.waitForLoadersToDisappear();
		}
		console.log('All items have been successfully deleted from the cart.');
	}
}
