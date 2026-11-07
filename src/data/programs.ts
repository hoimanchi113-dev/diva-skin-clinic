import "server-only";
import type { ContentItem, Plan, Program } from "@/types/program";
import { isInternalDemo } from "@/lib/demo";
const proposed = (text: string): ContentItem => ({ text, status: "proposed" });
const pending = (text: string): ContentItem => ({
  text,
  status: "pending-confirmation",
});
const plan = (label: Plan["label"], priceUsd: number): Plan => ({
  label,
  priceUsd: isInternalDemo ? priceUsd : null,
  priceStatus: "approved-internal-demo",
  duration: null,
  sessions: null,
  benefits: [pending(`Quyền lợi của gói ${label} đang chờ DIVA xác nhận.`)],
  homecare: [
    pending(
      `Danh mục sản phẩm, số lượng và phạm vi Homecare của gói ${label} chưa được xác nhận.`,
    ),
  ],
});

// Source: owner's project brief. Only names, USD prices and contact details
// are approved for internal demo. No clinical protocols or benefits are inferred.
const seeds = [
  ["acne-control", "Acne Control", "Chăm sóc da mụn", 380, 680, "mụn"],
  [
    "scar-texture",
    "Scar & Texture",
    "Sẹo & bề mặt da",
    480,
    880,
    "sẹo và bề mặt da",
  ],
  [
    "pigment-correction",
    "Pigment Correction",
    "Chăm sóc sắc tố da",
    480,
    880,
    "sắc tố và màu da",
  ],
  [
    "pore-skin-quality",
    "Pore & Skin Quality",
    "Lỗ chân lông & chất lượng da",
    480,
    780,
    "lỗ chân lông và chất lượng da",
  ],
  [
    "skin-recovery",
    "Skin Recovery",
    "Chăm sóc phục hồi da",
    280,
    580,
    "nhu cầu phục hồi da",
  ],
  [
    "total-skin-reset",
    "Total Skin Reset",
    "Chăm sóc da toàn diện",
    980,
    1680,
    "nhiều mối quan tâm về da",
  ],
] as const;

export const programs: Program[] = seeds.map(
  ([slug, name, nameVi, basic, intensive, concern], i) => ({
    id: `diva-${String(i + 1).padStart(2, "0")}`,
    slug,
    name,
    nameVi,
    nameViStatus: "proposed",
    description: proposed(
      `Một điểm khởi đầu để trao đổi cùng DIVA về ${concern}, nhu cầu của bạn và hướng chăm sóc cá nhân hóa.`,
    ),
    suitableFor: [
      proposed(
        `Dành cho người muốn tìm hiểu và trao đổi về ${concern}. Việc phù hợp với liệu trình cần được xác nhận khi tư vấn.`,
      ),
    ],
    goals: [
      proposed(`Làm rõ mong muốn của bạn về ${concern}.`),
      proposed("Thống nhất mục tiêu và cách đánh giá phù hợp sau khi tư vấn."),
    ],
    methods: [
      pending(
        "Công nghệ, hoạt chất, kỹ thuật và kế hoạch phục hồi cần được DIVA xác nhận theo từng trường hợp.",
      ),
    ],
    plans: {
      basic: plan("Basic", basic),
      intensive: plan("Intensive", intensive),
    },
    journey: [
      proposed("Chia sẻ mối quan tâm và lịch sử chăm sóc da."),
      proposed(
        "Trao đổi về kế hoạch, chi phí và lịch hẹn trước khi quyết định.",
      ),
      proposed(
        "Thống nhất lịch theo dõi và cách đánh giá tiến triển cùng DIVA.",
      ),
    ],
  }),
);

export const getProgram = (slug: string) =>
  programs.find((program) => program.slug === slug);
