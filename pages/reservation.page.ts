import { Page, expect } from '@playwright/test';

export class ReservationPage {
  constructor(private page: Page) {}

  async goToAvailability() {
    await this.page.click('text=Find a Table');
  }

  async search(
    date: string,
    time: string,
    guests: string,
    specialRequest?: string
  ) {
    await this.page.fill('#date', date);
    await this.page.fill('#time', time);
    await this.page.fill('#guests', guests);

    if (specialRequest) {
      await this.page.fill('#special-request', specialRequest);
    }

    await this.page.click('button[type="submit"]');
  }

  async selectTable() {
    await this.page.click('.table-card:not([style*="not-allowed"])');
  }

  async proceedToBook() {
    await this.page.click('text=Book Now');
  }

  async confirmReservation() {
    await this.page.click('text=Confirm');
  }

  async verifyConfirmation() {
    await expect(this.page.locator('text=Reservation confirmed')).toBeVisible();
  }

  async goToMyReservations() {
    await this.page.click('text=My Reservations');
  }

  async verifyReservationExists() {
    await expect(this.page.locator('.reservation-item')).toBeVisible();
  }
}