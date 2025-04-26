import { test } from '@playwright/test';
import { LoginHelper } from '../helpers/LoginHelper';

test.describe('Login user tests', () => {
	let loginHelper: LoginHelper;

	test('User logs in with invalid credentials', async ({ page }) => {
		loginHelper = new LoginHelper(page);

		await test.step('User tries to log in with invalid data', async () => {
			await loginHelper.loginUser('ronaldinho2103', 'ronaldinho2103');
		});

		await test.step('Validate the alert message for invalid credentials', async () => {
			await loginHelper.validateErrorMessage();
		});
	});

	// Other login scenarios would be implemented here.
	// Skipping them because the application is running in production mode.
	// To test login or registration, valid real data such as JMBG must be used.
});
