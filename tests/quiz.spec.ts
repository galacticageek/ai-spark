import { test, expect } from '@playwright/test';

test.describe('Quiz System', () => {
  test('Complete the quiz and see the results', async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');

    // Ensure the page has loaded
    await expect(page.getByText('Launch Workspace', { exact: false }).first()).toBeVisible({ timeout: 10000 });

    // Enter workspace
    await page.getByText('Launch Workspace', { exact: false }).first().click();
    
    // Wait for the workspace and quiz button to be visible
    await expect(page.getByRole('button', { name: /Quiz/i }).first()).toBeVisible();

    // Start the quiz
    await page.getByRole('button', { name: /Quiz/i }).first().click();

    // Verify the quiz modal opened
    await expect(page.getByText('Knowledge Check', { exact: false })).toBeVisible();

    // Select the first option
    const firstOption = page.locator('button[id^="quiz-option-"]').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();

    // Click "Submit"
    const submitButton = page.locator('#submit-quiz-btn');
    await submitButton.click();

    // After the final submit, we should see the results state
    // We expect either "Correct Assessment" or "Needs Review"
    await expect(page.getByText(/Correct Assessment|Needs Review/i)).toBeVisible();

    // Wait for the AI Coach Feedback to appear
    await expect(page.getByText('AI Coach Feedback')).toBeVisible();

    // Close the modal
    const closeButton = page.locator('#continue-after-quiz-btn');
    await closeButton.click();

    // Modal should close
    await expect(page.getByText('AI Coach Feedback')).toBeHidden();
  });
});
