import test from '@playwright/test';
import { TelefoniHelper } from '../helpers/TelefoniHelper';
import { HeaderHelper } from '../helpers/HeaderHelper';
import { menuItems, submenuItems } from '../constants/header-menu';
import { telefoniTestData } from '../test-data/telefoni-data';

let telefoni: TelefoniHelper;

test.beforeEach(async ({ page }) => {
	const header = new HeaderHelper(page);
	telefoni = new TelefoniHelper(page);

	await test.step('Navigate user to homepage', async () => {
		await header.navigateUserToHomePage();
	});
	await test.step('Navigate user to telefoni page', async () => {
		await header.navigateUserToPage(menuItems.uredjaji, submenuItems.telefoni);
	});
});

test.describe('Telefoni tests - search, add to kart, remove from cart', () => {
	test('Search for the phone', async ({ page }) => {
		await test.step('Search for the phone', async () => {
			telefoni = new TelefoniHelper(page);
			await telefoni.searchForThePhone(telefoniTestData.search);
		});

		await test.step('Validate search the phone', async () => {
			await telefoni.validateSearchForThePhone();
		});
	});

	test('Add phone to the cart', async ({ page }) => {
		await test.step('Search for the phone', async () => {
			await telefoni.searchForThePhone(telefoniTestData.search);
		});
		await test.step('Click on the phone and add to cart', async () => {
			await telefoni.addPhoneToCart(telefoniTestData.model);
		});
		await test.step('Validate the phone is in cart', async () => {
			await telefoni.validateThePhoneIsInCart();
		});
	});

	test('Remove phone from the cart', async ({ page }) => {
		await test.step('Search for the phone', async () => {
			await telefoni.searchForThePhone(telefoniTestData.search);
		});
		await test.step('Click on the phone and add to cart', async () => {
			await telefoni.addPhoneToCart(telefoniTestData.model);
		});
		await test.step('Validate the phone is in cart', async () => {
			await telefoni.validateThePhoneIsInCart();
		});
		await test.step('Remove phone from the cart and validate the shopping cart is empty', async () => {
			await telefoni.removeItemsFromCart();
		});
	});
});
