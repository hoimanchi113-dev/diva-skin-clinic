import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { EditorialImage } from "@/components/editorial-image";
import { ProgramList } from "@/components/program-list";
import { Consultation } from "@/components/booking-links";
export default function Home() {
  return (
    <>
      <section className="shell hero">
        <div className="hero-copy">
          <h1>
            Làn da của bạn.
            <br />
            <em>Một lộ trình riêng.</em>
          </h1>
          <p>
            Personalized Skin Treatment tại DIVA Skin Clinic Poipet. Khám phá
            các chương trình và bắt đầu từ điều bạn quan tâm.
          </p>
          <Link href="/programs" className="button">
            Khám phá liệu trình <Arrow />
          </Link>
          <span className="hero-footnote">
            Cá nhân hóa bắt đầu từ việc lắng nghe.
          </span>
        </div>
        <EditorialImage priority />
      </section>
      <section className="shell section-space">
        <div className="section-intro">
          <h2>
            Sáu chương trình.
            <br />
            <em>Một sự quan tâm: bạn.</em>
          </h2>
          <div>
            <p>
              Từ một mối quan tâm cụ thể đến nhu cầu chăm sóc toàn diện. Khám
              phá từng chương trình để chuẩn bị cho buổi tư vấn.
            </p>
            <p className="fine-print">
              Nội dung giới thiệu đang đề xuất, chờ DIVA duyệt.
            </p>
          </div>
        </div>
        <ProgramList />
      </section>
      <section className="philosophy">
        <div className="shell philosophy-inner">
          <span className="section-number">DIVA</span>
          <div>
            <h2>
              Không bắt đầu từ một gói.
              <br />
              <em>Bắt đầu từ bạn.</em>
            </h2>
            <p>
              Trao đổi cùng DIVA để xác nhận kế hoạch chăm sóc, thời gian và
              quyền lợi trước khi quyết định.
            </p>
            <Link href="/about" className="text-link">
              Tìm hiểu về DIVA <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <Consultation />
    </>
  );
}
