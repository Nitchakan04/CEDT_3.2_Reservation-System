import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { ReservationPage } from '../pages/reservation.page.ts';
import { user, reservationData } from '../testdata/user.data.ts';


test.describe('Reservation Module', () => {

  test('TC-RES-01: User should complete reservation flow successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const reserve = new ReservationPage(page);

    await login.goto();
    await login.login(
      user.validUser.email,
      user.validUser.password
    );

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests
    );

    await reserve.selectTable();
    await reserve.proceedToBook();
    await reserve.confirmReservation();
    await reserve.verifyConfirmation();

    await reserve.goToMyReservations();
    await reserve.verifyReservationExists();
  });

  test('TC-RES-02: User should not select table when guest exceeds capacity', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.exceedCapacity.date,
      reservationData.exceedCapacity.time,
      reservationData.exceedCapacity.guests
    );

    await expect(page.locator('.table-card[style*="not-allowed"]')).toBeVisible();
  });

  test('TC-RES-03: User should not create reservation with past date', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.pastDate.date,
      reservationData.pastDate.time,
      reservationData.pastDate.guests
    );

    await expect(page.locator('text=error')).toBeVisible();
  });

  test('TC-RES-04: User should not create reservation outside operating hours', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.outsideHours.date,
      reservationData.outsideHours.time,
      reservationData.outsideHours.guests
    );

    await expect(page.locator('text=error')).toBeVisible();
  });

  test('TC-RES-05: System should prevent double booking', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests
    );

    await reserve.selectTable();
    await reserve.proceedToBook();
    await reserve.confirmReservation();

    // attempt booking same slot again
    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests
    );

    await expect(page.locator('text=Table not available')).toBeVisible();
  });

  test('TC-RES-06: User should cancel reservation successfully', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await page.goto('/');
    await reserve.goToMyReservations();

    await page.click('text=Cancel');
    await page.click('text=Confirm Cancellation');

    await expect(page.locator('text=CANCELLED')).toBeVisible();
  });

});