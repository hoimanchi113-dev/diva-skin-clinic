export type PlanName = "basic" | "intensive";
export type ReviewStatus =
  "approved-internal-demo" | "proposed" | "pending-confirmation";
export type ContentItem = { text: string; status: ReviewStatus };
export type Plan = {
  label: "Basic" | "Intensive";
  priceUsd: number | null;
  priceStatus: "approved-internal-demo";
  duration: string | null;
  sessions: number | null;
  benefits: ContentItem[];
  homecare: ContentItem[];
};
export type Program = {
  id: string;
  slug: string;
  name: string;
  nameVi: string;
  nameViStatus: "proposed";
  description: ContentItem;
  suitableFor: ContentItem[];
  goals: ContentItem[];
  methods: ContentItem[];
  plans: Record<PlanName, Plan>;
  journey: ContentItem[];
};
