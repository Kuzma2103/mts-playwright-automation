import { Page } from '@playwright/test';

/**
 * A factory and cache for managing lazy-initialized instances of Page Object classes.
 * Ensures that each page object is instantiated only once per test run.
 */
export class PageObjectManager {
	readonly pageInstances: Map<string, any>;

	constructor(readonly page: Page) {
		this.pageInstances = new Map();
	}

	/**
	 * Returns an instance of the requested page object class.
	 * If the instance has already been created, it reuses it.
	 * @param pageClass - The page object class to retrieve or create.
	 * @returns An instance of the requested page object.
	 */
	getPage<T>(pageClass: new (page: Page) => T): T {
		const className = pageClass.name;
		if (!this.pageInstances.has(className)) {
			this.pageInstances.set(className, new pageClass(this.page));
		}
		return this.pageInstances.get(className) as T;
	}
}
