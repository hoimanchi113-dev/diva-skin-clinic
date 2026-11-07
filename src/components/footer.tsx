import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="shell footer">
      <div>
        <Link className="wordmark" href="/">
          DIVA<span>SKIN CLINIC POIPET</span>
        </Link>
        <p>{site.location}</p>
      </div>
      <div className="footer-links">
        <Link href="/programs">Liệu trình</Link>
        <Link href="/about">Về DIVA</Link>
        <Link href="/contact">Liên hệ</Link>
        <a
          href={site.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          Website chính thức <span className="sr-only">(mở tab mới)</span>
        </a>
      </div>
      <div className="footer-bottom">
        <p>Personalized Skin Treatment · Bản xem xét nội bộ</p>
        <p>
          Ảnh stock chỉ để minh họa, không phải cơ sở, khách hàng hay kết quả
          điều trị của DIVA.
        </p>
      </div>
    </footer>
  );
}
