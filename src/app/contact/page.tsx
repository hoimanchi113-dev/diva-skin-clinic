import type { Metadata } from "next";
import { BookingLinks } from "@/components/booking-links";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact & Booking",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <section className="shell contact-page">
      <div className="contact-heading">
        <h1>
          Hãy kể DIVA nghe
          <br />
          <em>về làn da của bạn.</em>
        </h1>
        <p>
          Chọn cách liên hệ thuận tiện. Chia sẻ chương trình bạn quan tâm và
          thời gian mong muốn để bắt đầu cuộc trò chuyện.
        </p>
        <BookingLinks />
        <p className="fine-print">
          DIVA sẽ xác nhận lịch hẹn và thông tin liệu trình khi phản hồi. Chưa
          có lịch hẹn được tạo khi bạn nhấn nút.
        </p>
      </div>
      <div className="contact-details">
        <h2>DIVA Skin Clinic Poipet</h2>
        <dl>
          <div>
            <dt>Địa điểm</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd>{site.whatsappDisplay}</dd>
          </div>
          <div>
            <dt>Telegram</dt>
            <dd>@diva_glow_poipet</dd>
          </div>
          <div>
            <dt>Website chính thức</dt>
            <dd>
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                divaskinclinic.com<span className="sr-only"> (mở tab mới)</span>
              </a>
            </dd>
          </div>
        </dl>
        <details>
          <summary>Tôi nên chuẩn bị thông tin gì?</summary>
          <p>
            Bạn có thể chia sẻ điều đang quan tâm, tên chương trình muốn tìm
            hiểu và thời gian thuận tiện. Thông tin được gửi qua kênh liên hệ
            bạn chọn, không qua biểu mẫu trên website này.
          </p>
        </details>
        <details>
          <summary>Giá demo có phải giá chính thức?</summary>
          <p>
            Giá V2 chỉ được duyệt cho demo nội bộ. Vui lòng xác nhận giá và
            quyền lợi trực tiếp với DIVA trước khi quyết định.
          </p>
        </details>
      </div>
    </section>
  );
}
