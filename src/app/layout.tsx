import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import { isInternalDemo } from "@/lib/demo";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "DIVA Personalized Skin Treatment",
    template: "%s | DIVA Skin Clinic Poipet",
  },
  description:
    "Khám phá 6 chương trình chăm sóc da cá nhân hóa tại DIVA Skin Clinic Poipet. Bản xem xét nội bộ.",
  robots: { index: false, follow: false, nocache: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <a className="skip-link" href="#main">
          Bỏ qua điều hướng
        </a>
        <Header internalDemo={isInternalDemo} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
