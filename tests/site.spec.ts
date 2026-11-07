import { test, expect } from "@playwright/test";

const programs = [
  ["acne-control", "Acne Control", "$380", "$680"],
  ["scar-texture", "Scar & Texture", "$480", "$880"],
  ["pigment-correction", "Pigment Correction", "$480", "$880"],
  ["pore-skin-quality", "Pore & Skin Quality", "$480", "$780"],
  ["skin-recovery", "Skin Recovery", "$280", "$580"],
  ["total-skin-reset", "Total Skin Reset", "$980", "$1,680"],
];

test("all six routes, twelve prices, seven sections and context-aware booking", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/programs");
  await expect(page.locator(".program-row")).toHaveCount(6);
  for (const [slug, name, basic, intensive] of programs) {
    await page.goto(`/programs/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await expect(page.locator(".treatment-section")).toHaveCount(7);
    await expect(page.locator(".price-value")).toHaveText(basic);
    const timeOrigin = await page.evaluate(() => performance.timeOrigin);
    await page.getByText("Intensive", { exact: true }).click();
    await expect(
      page.getByRole("radio", { name: "Intensive", exact: true }),
    ).toBeChecked();
    await expect(page.locator(".price-value")).toHaveText(intensive);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin);
    await expect(
      page.getByRole("heading", { name: "Homecare · Intensive" }),
    ).toBeVisible();
    const url = new URL(
      (await page
        .getByRole("link", { name: /Đặt lịch qua WhatsApp/ })
        .getAttribute("href"))!,
    );
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/855884768999");
    expect(url.searchParams.get("text")).toContain(name);
    expect(url.searchParams.get("text")).toContain("Intensive");
    await expect(page.getByRole("link", { name: /Telegram/ })).toHaveAttribute(
      "href",
      "https://t.me/diva_glow_poipet",
    );
    await page.getByText("Basic", { exact: true }).click();
    await expect(page.locator(".price-value")).toHaveText(basic);
    await expect(page.locator(".plan-facts")).toContainText("Chờ xác nhận");
  }
  expect(errors).toEqual([]);
});

test("mobile menu, Escape, keyboard selection and disclosures", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Mở menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Điều hướng di động" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Mở menu" })).toBeFocused();
    await page.getByRole("button", { name: "Mở menu" }).click();
    await page
      .getByRole("navigation", { name: "Điều hướng di động" })
      .getByRole("link", { name: "Liệu trình", exact: true })
      .click();
    await expect(page).toHaveURL(/\/programs$/);
    await expect(page.getByRole("button", { name: "Mở menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  } else {
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Bỏ qua điều hướng" }),
    ).toBeFocused();
  }
  await page.goto("/programs/acne-control");
  await page.getByRole("radio", { name: "Basic", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".price-value")).toHaveText("$680");
  await page.getByText("Tình trạng da phù hợp", { exact: true }).click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.getByText("Tình trạng da phù hợp", { exact: true }).click();
  await expect(page.locator("details").first()).not.toHaveAttribute("open");
});

test("responsive pages, loaded image, SEO and missing slug", async ({
  page,
  request,
}) => {
  for (const route of [
    "/",
    "/programs",
    "/programs/acne-control",
    "/about",
    "/contact",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator("main img").all()) {
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
        .toBeGreaterThan(0);
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  }
  const missing = await request.get("/programs/not-a-program");
  expect(missing.status()).toBe(404);
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/programs/total-skin-reset");
  expect((await request.get("/programs")).headers()["x-robots-tag"]).toContain(
    "noindex",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});

test("default non-demo mode sends no V2 prices to HTML or client payload", async ({
  page,
  request,
}) => {
  for (const [slug] of programs) {
    const response = await request.get(
      `http://127.0.0.1:3118/programs/${slug}`,
    );
    const html = await response.text();
    expect(html).not.toMatch(/priceUsd(?:\\?"|&quot;)*\s*:\s*\d/);
    expect(html).not.toContain("$380");
    expect(html).not.toContain("$1,680");
  }
  await page.goto("http://127.0.0.1:3118/programs/acne-control");
  await expect(page.locator(".price-unpublished")).toHaveText("Liên hệ tư vấn");
  await page.getByText("Intensive", { exact: true }).click();
  await expect(page.locator(".price-unpublished")).toHaveText("Liên hệ tư vấn");
  await expect(page.locator(".price-value")).toHaveCount(0);
});
