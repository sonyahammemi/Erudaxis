/*import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
//import dotenv from 'dotenv';

//dotenv.config();
BeforeAll(async function () {
  console.log('Starting Cucumber tests...');
  const browser = await chromium.launch({ 
    headless: false,
    //args: ['--start-maximized'],
      // Ouvrir en plein écran
      args: [
        '--start-fullscreen',
        '--disable-blink-features=AutomationControlled'
      ]
  });
  (global as any).browser = browser;
  console.log('Browser launched');
});

AfterAll(async function () {
  console.log('Cucumber tests completed.');
  // Attendre 5 secondes avant de fermer pour voir le résultat
  await new Promise(resolve => setTimeout(resolve, 5000));
  if ((global as any).browser) {
    await (global as any).browser.close();
  }
});*/

import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

BeforeAll(async function () {
  console.log('Starting Cucumber tests...');

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--start-fullscreen',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  (global as any).browser = browser;

  console.log('Browser launched');
});

AfterAll(async function () {
  console.log('Cucumber tests completed.');

  await new Promise(resolve => setTimeout(resolve, 5000));

  if ((global as any).browser) {
    await (global as any).browser.close();
  }
});