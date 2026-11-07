import { site, whatsappUrl } from "@/lib/site";
import { Arrow } from "./arrow";

export function BookingLinks({
  program,
  plan,
}: {
  program?: string;
  plan?: string;
}) {
  return (
    <div className="booking-links">
      <a
        className="button"
        href={whatsappUrl(program, plan)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Đặt lịch qua WhatsApp <Arrow diagonal />
        <span className="sr-only"> (mở tab mới)</span>
      </a>
      <a
        className="button button-outline"
        href={site.telegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram <Arrow diagonal />
        <span className="sr-only"> (mở tab mới)</span>
      </a>
    </div>
  );
}

export function Consultation() {
  return (
    <section className="consultation">
      <div className="shell consultation-inner">
        <div>
          <h2>
            Bắt đầu bằng
            <br />
            <em>một cuộc trò chuyện.</em>
          </h2>
          <p>
            Chia sẻ điều bạn quan tâm. Cùng DIVA tìm hiểu một lộ trình phù hợp
            với bạn.
          </p>
        </div>
        <div>
          <BookingLinks />
          <p className="fine-print">
            Liên hệ mở cuộc trò chuyện; lịch hẹn chỉ được xác nhận sau khi DIVA
            phản hồi.
          </p>
        </div>
      </div>
    </section>
  );
}
