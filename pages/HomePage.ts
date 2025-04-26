import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
	constructor(readonly page: Page) {
		super(page);
	}
}
