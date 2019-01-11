import { SECONDS } from 'constants';
import { setDefaultOptions } from 'expect-puppeteer';

// Set maximum wait time for each element to 25 seconds
setDefaultOptions({ timeout: 25 * SECONDS });

class Login {
  run(page) {
    return new Promise(async (resolve, reject) => {
      try {
        // Go to project URL
        await page.goto(process.env.GENNY_URL);

        // Click the Log in button
        await expect(page).toClick('[data-testid="button"]');

        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Fill in user email and password
        await expect(page).toFill(
          '.input-email input',
          process.env.AGENT_A_USERNAME
        );
        await expect(page).toFill(
          'input[type="password"]',
          process.env.AGENT_A_PASSWORD
        );

        // click the submit button
        await expect(page).toClick('button[type="submit"]');

        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Login;
