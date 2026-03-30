// tests/utils/wait-helper.ts

import { Locator } from "@playwright/test";

export async function waitForElement(locator: Locator, timeout: number = 10000) {
    await locator.waitFor({ state: "visible", timeout });
}