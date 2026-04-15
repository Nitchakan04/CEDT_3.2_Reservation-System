import { Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/register");
  }

  async fillFullName(fullName: string) {
    await this.page.fill('input[name="fullName"]', fullName);
  }

  async fillEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async fillPhone(phone: string) {
    await this.page.fill('input[name="phone"]', phone);
  }

  async submit() {
    await this.page.click('button:has-text("Register")');
  }

  async register(
    fullName: string,
    email: string,
    password: string,
    phone: string,
  ) {
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillPhone(phone);
    await this.submit();
  }

  isRegisterSuccess() {
    return this.page.locator("text=Registration successful");
  }
}
