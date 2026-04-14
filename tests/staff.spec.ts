import { test, expect } from '@playwright/test';
import { StaffPage } from '../pages/staff.page.ts';
import { staffData, commonData } from '../testdata/user.data.ts';



test.describe('Staff Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('TC-STF-01: Staff should create walk-in reservation successfully', async ({ page }) => {
    const staff = new StaffPage(page);

    await staff.switchToStaff();

    await staff.createWalkIn(
      staffData.walkInCustomer.name
    );

    await expect(
      page.locator(`text=${staffData.walkInCustomer.name}`)
    ).toBeVisible();
  });

  staffData.tableStatusOptions.forEach((status) => {

    test(`TC-STF-02: Staff should update table status to "${status}"`, async ({ page }) => {
      const staff = new StaffPage(page);

      await staff.switchToStaff();

      await staff.updateTableStatus(status);

      await expect(
        page.locator(`text=${status}`)
      ).toBeVisible();
    });

  });

});