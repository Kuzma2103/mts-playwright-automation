import { Page } from '@playwright/test';

export class BaseActions {
	constructor(readonly page: Page) {}
}
