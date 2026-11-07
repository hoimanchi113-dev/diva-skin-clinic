import type { Metadata } from "next";
import { ProgramList } from "@/components/program-list";
import { EditorialImage } from "@/components/editorial-image";
import { Consultation } from "@/components/booking-links";
export const metadata: Metadata = {
  title: "Treatment Programs",
  alternates: { canonical: "/programs" },
};
export default function ProgramsPage() {
  return (
    <>
      <section className="shell page-hero">
        <div>
          <h1>
            Một lộ trình riêng
            <br />
            <em>cho làn da của bạn.</em>
          </h1>
          <p>
            Sáu chương trình chăm sóc da tại DIVA. Khám phá lựa chọn Basic và
            Intensive, rồi cùng chúng tôi làm rõ điều phù hợp với bạn.
          </p>
        </div>
        <EditorialImage compact priority />
      </section>
      <section
        className="shell catalog-section"
        aria-label="Danh sách 6 liệu trình"
      >
        <div className="catalog-note">
          <p>Chọn một chương trình để tìm hiểu</p>
          <p>Personalized Skin Treatment</p>
        </div>
        <ProgramList />
        <p className="fine-print mt-6">
          Tên tiếng Việt và nội dung giới thiệu là đề xuất; thời hạn, số buổi,
          phương pháp và quyền lợi cần DIVA xác nhận.
        </p>
      </section>
      <Consultation />
    </>
  );
}
