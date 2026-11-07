"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/programs", label: "Liệu trình" },
  { href: "/about", label: "Về DIVA" },
  { href: "/contact", label: "Liên hệ" },
];

export function Header({ internalDemo = false }: { internalDemo?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <div className="demo-notice">
        {internalDemo ? (
          <>
            Demo nội bộ <span aria-hidden="true">·</span> Giá V2 chưa công bố
            chính thức
          </>
        ) : (
          "Bản xem xét nội bộ · Liên hệ DIVA để xác nhận thông tin"
        )}
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label="DIVA — Trang chủ"
            onClick={() => setOpen(false)}
          >
            DIVA<span>SKIN CLINIC POIPET</span>
          </Link>
          <nav aria-label="Điều hướng chính" className="desktop-nav">
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="header-book desktop-book">
            Đặt lịch tư vấn
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen(!open)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={open ? "m6 6 12 12M6 18 18 6" : "M3 7h18M3 12h18M3 17h18"}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Điều hướng di động"
          className="mobile-nav"
          hidden={!open}
        >
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            Đặt lịch tư vấn
          </Link>
        </nav>
      </header>
    </>
  );
}
