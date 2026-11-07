import type { Metadata } from "next";
import { EditorialImage } from "@/components/editorial-image";
import { Consultation } from "@/components/booking-links";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "About DIVA",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <section className="shell page-hero">
        <div>
          <h1>
            DIVA.
            <br />
            <em>
              Chăm sóc bắt đầu
              <br />
              từ lắng nghe.
            </em>
          </h1>
          <p>
            {site.name}
            <br />
            {site.location}
          </p>
          <p>
            Personalized Skin Treatment là nơi bạn khám phá các chương trình
            chăm sóc da và kết nối trực tiếp với DIVA để được tư vấn.
          </p>
        </div>
        <EditorialImage priority />
      </section>
      <section className="shell about-copy section-space">
        <h2>
          Một lựa chọn
          <br />
          <em>có đủ thông tin.</em>
        </h2>
        <div>
          <p>
            Bản trải nghiệm này giúp bạn tìm hiểu sáu chương trình, so sánh hai
            cấp gói và chuẩn bị câu hỏi trước buổi tư vấn.
          </p>
          <p>
            Các kỹ thuật, thời hạn, số buổi, sản phẩm và quyền lợi cần được DIVA
            xác nhận trước khi đặt liệu trình.
          </p>
          <a
            className="text-link"
            href={site.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
          >
            Truy cập divaskinclinic.com
            <span className="sr-only"> (mở tab mới)</span>
          </a>
        </div>
      </section>
      <Consultation />
    </>
  );
}
