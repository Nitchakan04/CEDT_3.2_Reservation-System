import { Page, expect } from '@playwright/test';

export class ReservationPage {
  constructor(private page: Page) {}

  async goToAvailability() {
    await this.page.click('text=Check Availability');
  }

  async search(date: string, time: string, guests: string) {
    await this.page.fill('input[type="date"]', date);
    await this.page.fill('input[type="time"]', time);
    await this.page.fill('input[type="number"]', guests);
    await this.page.click('text=Search');
  }

  async selectTable() {
    await this.page.click('.table-card:has-text("T-03")');
  }

  async proceedToBook() {
    await this.page.click('text=Proceed to Book');
  }

  async confirmReservation() {
    await this.page.click('text=Confirm Reservation');
  }

  async verifyConfirmation() {
    await expect(this.page.locator('text=Reservation confirmed')).toBeVisible();
  }

  async goToMyReservations() {
    await this.page.click('text=My Reservations');
  }

  async verifyReservationExists() {
    await expect(this.page.locator('text=CONFIRMED')).toBeVisible();
  }
}