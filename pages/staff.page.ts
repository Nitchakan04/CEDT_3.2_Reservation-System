import { Page, expect } from "@playwright/test";

export class StaffPage {
  constructor(private page: Page) {}

  async switchToStaff() {
    await this.page.click("text=Staff");
  }

  async createWalkIn(name: string) {
    await this.page.click("text=Walk-in Booking");
    await this.page.fill('input[placeholder="Walk-in customer name"]', name);
    await this.page.click("text=Create Walk-in Reservation");
  }

  async updateTableStatus(status: string) {
    await this.page.click("text=Table Status");
    await this.page.selectOption("select", status);
    await this.page.click("text=Save Status Changes");
  }
}
