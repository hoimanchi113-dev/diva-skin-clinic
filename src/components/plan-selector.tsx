"use client";

import { useState } from "react";
import { formatUsd } from "@/lib/format";
import type { PlanName, Program } from "@/types/program";
import { BookingLinks } from "./booking-links";

const sections = [
  "Treatment Overview",
  "Treatment Goals",
  "Treatment Approach",
  "Basic / Intensive",
  "Homecare Included",
  "Treatment Journey",
  "Consultation & Booking",
];

export function TreatmentContent({ program }: { program: Program }) {
  const [selected, setSelected] = useState<PlanName>("basic");
  const plan = program.plans[selected];
  const content = [
    <div key="overview">
      <p>{program.description.text}</p>
      <details>
        <summary>Tình trạng da phù hợp</summary>
        {program.suitableFor.map((item) => (
          <p key={item.text}>{item.text}</p>
        ))}
      </details>
      <p className="content-status">
        Nội dung giới thiệu đề xuất · chờ DIVA duyệt
      </p>
    </div>,
    <div key="goals">
      <ul className="text-list">
        {program.goals.map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
      <p className="content-status">
        Mục tiêu đề xuất để trao đổi, không phải cam kết kết quả.
      </p>
    </div>,
    <div key="approach">
      {program.methods.map((item) => (
        <p key={item.text}>{item.text}</p>
      ))}
      <p className="content-status">Chưa có phác đồ được duyệt cho bản demo.</p>
    </div>,
    <div key="plans" className="plan-panel">
      <fieldset className="plan-switch">
        <legend className="sr-only">Chọn cấp gói</legend>
        {(["basic", "intensive"] as const).map((key) => (
          <label key={key} className={key === selected ? "selected" : ""}>
            <input
              type="radio"
              name="plan"
              value={key}
              checked={selected === key}
              onChange={() => setSelected(key)}
            />
            <span>{program.plans[key].label}</span>
          </label>
        ))}
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="plan-summary">
        <div className="price">
          <span
            className={
              plan.priceUsd === null ? "price-unpublished" : "price-value"
            }
          >
            {formatUsd(plan.priceUsd)}
          </span>
          <span>Gói {plan.label}</span>
        </div>
        <p className="demo-price-note">
          {plan.priceUsd === null
            ? "Liên hệ DIVA để xác nhận giá và quyền lợi."
            : "Giá V2 · chỉ dùng cho demo nội bộ"}
        </p>
        <dl className="plan-facts">
          <div>
            <dt>Thời hạn dự kiến</dt>
            <dd>{plan.duration ?? "Chờ xác nhận"}</dd>
          </div>
          <div>
            <dt>Số buổi dự kiến</dt>
            <dd>{plan.sessions ?? "Chờ xác nhận"}</dd>
          </div>
        </dl>
        <h3>Quyền lợi {plan.label}</h3>
        {plan.benefits.map((item) => (
          <p key={item.text}>{item.text}</p>
        ))}
      </div>
      <p className="fine-print">
        Chênh lệch giá không tự xác định số buổi, công nghệ hay sản phẩm đi kèm.
        DIVA sẽ xác nhận trước khi bạn quyết định.
      </p>
      <a className="text-link" href="#consultation-booking">
        Tư vấn về gói {plan.label}
      </a>
    </div>,
    <div key="homecare" aria-live="polite">
      <h3>Homecare · {plan.label}</h3>
      {plan.homecare.map((item) => (
        <p key={item.text}>{item.text}</p>
      ))}
      <details>
        <summary>Hướng dẫn & nhóm sản phẩm</summary>
        <p>
          Hướng dẫn sử dụng, nhóm sản phẩm và việc có bao gồm trong giá gói hay
          không đang chờ DIVA xác nhận. Bản demo chưa có danh mục được duyệt.
        </p>
      </details>
    </div>,
    <div key="journey">
      <ol className="journey-list">
        {program.journey.map((item, i) => (
          <li key={item.text}>
            <span>0{i + 1}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
      <p className="content-status">
        Quy trình đề xuất · lịch theo dõi chưa xác nhận.
      </p>
    </div>,
    <div key="booking">
      <p>
        Bạn đang quan tâm đến {program.name}, gói {plan.label}? Gửi một lời nhắn
        để DIVA tư vấn và xác nhận thông tin.
      </p>
      <BookingLinks program={program.name} plan={plan.label} />
      <p className="fine-print">
        Nút liên hệ mở cuộc trò chuyện, không tạo lịch hẹn tự động. Không có
        thanh toán trên bản demo này.
      </p>
    </div>,
  ];
  return (
    <div className="treatment-content">
      {sections.map((title, i) => (
        <section
          key={title}
          className="treatment-section"
          id={i === 6 ? "consultation-booking" : `section-${i + 1}`}
          aria-labelledby={`heading-${i}`}
        >
          <div className="section-heading">
            <span className="section-number">0{i + 1}</span>
            <h2 id={`heading-${i}`}>{title}</h2>
          </div>
          <div className="section-body">{content[i]}</div>
        </section>
      ))}
    </div>
  );
}
