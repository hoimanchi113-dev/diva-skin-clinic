export const site = {
  name: "DIVA Skin Clinic Poipet",
  location: "Poipet, Banteay Meanchey, Cambodia",
  whatsapp: "855884768999",
  whatsappDisplay: "+855 88 476 8999",
  telegram: "https://t.me/diva_glow_poipet",
  officialWebsite: "https://divaskinclinic.com",
};

export function whatsappUrl(program?: string, plan?: string) {
  const message = program
    ? `Xin chào DIVA, tôi muốn được tư vấn về ${program}${plan ? `, gói ${plan}` : ""}. Tôi đang xem bản demo nội bộ; vui lòng xác nhận giá, quyền lợi và lịch hẹn thực tế.`
    : "Xin chào DIVA, tôi muốn được tư vấn liệu trình chăm sóc da và lịch hẹn phù hợp.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function siteUrl() {
  const url = new URL(process.env.SITE_URL || "http://localhost:3100");
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("SITE_URL must be an http(s) URL");
  return url.origin;
}
