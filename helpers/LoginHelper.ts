import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../pages/Header';
import { HomePage } from '../pages/HomePage';
import { PageObjectManager } from '../managers/PageObjectManager';

/**
 * Helper class for user login actions and validations.
 * Encapsulates all steps needed to perform login and handle login-related flows.
 */
export class LoginHelper {
	readonly pageManager: PageObjectManager;
	readonly homePage: HomePage;
	readonly header: Header;
	readonly loginPage: LoginPage;

	constructor(readonly page: Page) {
		this.pageManager = new PageObjectManager(page);
		this.homePage = this.pageManager.getPage(HomePage);
		this.header = this.pageManager.getPage(Header);
		this.loginPage = this.pageManager.getPage(LoginPage);
	}

	/**
	 * This method logs in a user using provided username and password.
	 * Navigates to the home page, opens the login form, fills in credentials,
	 * submits the form, and waits for loaders to disappear.
	 * @param korisnickoIme - The username to login with.
	 * @param lozinka - The password to login with.
	 */
	async loginUser(korisnickoIme: string, lozinka: string): Promise<void> {
		await this.homePage.navigateUserToHomePage();
		await this.header.clickOnUserIcon();
		await this.loginPage.enterKorisnickoIme(korisnickoIme);
		await this.loginPage.enterLozinka(lozinka);
		await this.loginPage.clickOnPrijaviSeButton();
		await this.loginPage.waitForLoadersToDisappear();
	}

	/**
	 * This method validates that an appropriate error message is displayed after a failed login attempt.
	 */
	async validateErrorMessage(): Promise<void> {
		await this.loginPage.validateErrorLoginMessages();
	}
}
