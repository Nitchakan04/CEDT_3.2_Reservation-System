import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.ts";
import { RegisterPage } from "../pages/register.page.ts";
import { user } from "../testdata/user.data.ts";

test.describe("Authentication Module", () => {
  test("TC-AUTH-01: User should register successfully with valid data", async ({
    page,
  }) => {
    const register = new RegisterPage(page);

    await register.goto();

    await register.register(
      user.newUser.fullName,
      user.newUser.email,
      user.newUser.password,
      user.newUser.phone,
    );

    await expect(register.isRegisterSuccess()).toBeVisible();
  });

  test("TC-AUTH-02: User should not login with invalid credentials", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(user.invalidUser.email, user.invalidUser.password);

    await expect(page.locator("text=Invalid")).toBeVisible();
  });
});


