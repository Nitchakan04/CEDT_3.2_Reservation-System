import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ReservationPage } from '../pages/reservation.page';
import { user, reservationData, commonData } from '../testdata/user.data';

test.describe('Reservation Module', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(user.validUser.email, user.validUser.password);
  });

  test('TC-RES-01: Complete reservation with special request', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests,
      reservationData.valid.specialRequest
    );

    await reserve.selectTable();
    await reserve.proceedToBook();
    await reserve.confirmReservation();

    await reserve.verifyConfirmation();

    // verify special request
    await expect(
      page.locator(`text=${reservationData.valid.specialRequest}`)
    ).toBeVisible();
  });

  test('TC-RES-02: Exceed capacity', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.exceedCapacity.date,
      reservationData.exceedCapacity.time,
      reservationData.exceedCapacity.guests,
      reservationData.exceedCapacity.specialRequest
    );

    await expect(
      page.locator('.table-card[style*="not-allowed"]')
    ).toBeVisible();
  });

  test('TC-RES-03: Past date', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.pastDate.date,
      reservationData.pastDate.time,
      reservationData.pastDate.guests,
      reservationData.pastDate.specialRequest
    );

    await expect(
      page.locator(`text=${commonData.messages.genericError}`)
    ).toBeVisible();
  });

  test('TC-RES-04: Outside operating hours', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToAvailability();
    await reserve.search(
      reservationData.outsideHours.date,
      reservationData.outsideHours.time,
      reservationData.outsideHours.guests,
      reservationData.outsideHours.specialRequest
    );

    await expect(
      page.locator(`text=${commonData.messages.genericError}`)
    ).toBeVisible();
  });

  test('TC-RES-05: Prevent double booking', async ({ page }) => {
    const reserve = new ReservationPage(page);

    // first booking
    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests,
      reservationData.valid.specialRequest
    );

    await reserve.selectTable();
    await reserve.proceedToBook();
    await reserve.confirmReservation();

    // try again
    await reserve.goToAvailability();
    await reserve.search(
      reservationData.valid.date,
      reservationData.valid.time,
      reservationData.valid.guests,
      reservationData.valid.specialRequest
    );

    await expect(
      page.locator(`text=${commonData.messages.tableUnavailable}`)
    ).toBeVisible();
  });

  test('TC-RES-06: Cancel reservation', async ({ page }) => {
    const reserve = new ReservationPage(page);

    await reserve.goToMyReservations();

    await page.click('text=Cancel');
    await page.click('text=Confirm Cancellation');

    await expect(
      page.locator(`text=${commonData.messages.cancelSuccess}`)
    ).toBeVisible();
  });


});