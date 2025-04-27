import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { errorMessages } from '../constants/error-message';

export class LoginPage extends BasePage {
	readonly koricnickoImeField: Locator;
	readonly lozinkaField: Locator;
	readonly prijaviSeBtn: Locator;
	readonly alertErrorLoginMessage: Locator;

	constructor(readonly page: Page) {
		super(page);
		this.koricnickoImeField = page.locator('#email');
		this.lozinkaField = page.locator('#password');
		this.prijaviSeBtn = page.getByRole('button', { name: 'Prijavi se' });
		this.alertErrorLoginMessage = page.getByRole('alert');
	}

	/**
	 * This method fills in the "Korisničko ime" (Username) field.
	 * @param lozinka - The username to enter.
	 */
	async enterKorisnickoIme(korisnickoIme: string): Promise<void> {
		await this.fillElement(
			this.koricnickoImeField,
			korisnickoIme,
			'Korisnicko ime'
		);
	}

	/**
	 * This method fills in the "Lozinka" (Password) field.
	 * @param lozinka - The password to enter.
	 */
	async enterLozinka(lozinka: string): Promise<void> {
		await this.fillElement(this.lozinkaField, lozinka, 'Lozinka');
	}

	/**
	 * This method clicks on Prijavi se button.
	 */
	async clickOnPrijaviSeButton(): Promise<void> {
		await this.clickOnElement(this.prijaviSeBtn, 'Prijavi se');
	}

	/**
	 * This method validates that the expected login error message is displayed inside the alert box.
	 */
	async validateErrorLoginMessages(): Promise<void> {
		const expectedErrorMessage = errorMessages.invalidUserData;
		// validate alert error message
		await this.validateElementText(
			this.alertErrorLoginMessage,
			expectedErrorMessage,
			'Alert error message for invalid user data'
		);
	}
}
