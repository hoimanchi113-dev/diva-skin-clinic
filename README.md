# DIVA Personalized Skin Treatment

Website Next.js App Router cho **DIVA Skin Clinic Poipet**, giao diện Editorial Luxury: xanh đậm, kem, champagne; ưu tiên điện thoại. Bản MVP để xem xét, **chưa triển khai production**.

## Chạy preview nội bộ

Yêu cầu Node.js 22+ và npm. Từ thư mục repository:

```bash
npm install
DIVA_INTERNAL_DEMO=true npm run dev -- --port 3100
```

Mở http://localhost:3100. Máy chủ chỉ lắng nghe `127.0.0.1`.
Nếu cổng 3100 đang được sử dụng, đổi lệnh thành `DIVA_INTERNAL_DEMO=true npm run dev -- --port 3120` và mở http://localhost:3120. Bản preview trong phiên bàn giao dùng cổng 3120 để tránh dịch vụ hiện có; ánh xạ Docker vẫn giữ 3100.
Nếu chạy trên máy từ xa, dùng SSH tunnel từ máy cá nhân (thay USER và HOST):

```bash
ssh -N -L 3100:127.0.0.1:3100 USER@HOST
```

Sau đó mở http://localhost:3100 trên máy cá nhân. Không mở firewall, không đổi Nginx hoặc gắn domain.

**Giá V2 mặc định bị ẩn.** Chỉ `DIVA_INTERNAL_DEMO=true` mới bật giá. Cờ được đọc phía server; giá không được gửi xuống HTML/RSC/client khi tắt. Mọi trang đều noindex; noindex không phải cơ chế đăng nhập. Chỉ xem demo qua loopback/SSH tunnel; không công khai preview hoặc source có giá nếu cần giữ bí mật thương mại.

## Trang và chức năng

- `/`: Home.
- `/programs`: 6 chương trình với giá Basic / Intensive trong chế độ demo.
- `/programs/[slug]`: 6 URL riêng, bảy phần nội dung, chuyển gói không tải lại, Homecare và liên kết WhatsApp cập nhật theo lựa chọn.
- `/about`: About DIVA.
- `/contact`: WhatsApp, Telegram và thông tin liên hệ đã cung cấp.
- `/sitemap.xml`, `/robots.txt`, `/api/health`.
- Menu mobile, phím Escape, radio chọn gói hỗ trợ phím mũi tên, details/summary và skip link; hỗ trợ reduced motion.

| Program | Basic USD | Intensive USD |
| --- | ---: | ---: |
| Acne Control | 380 | 680 |
| Scar & Texture | 480 | 880 |
| Pigment Correction | 480 | 880 |
| Pore & Skin Quality | 480 | 780 |
| Skin Recovery | 280 | 580 |
| Total Skin Reset | 980 | 1680 |

Các giá trên chỉ được duyệt cho demo nội bộ. Thời hạn và số buổi là `null`; quyền lợi, kỹ thuật, sản phẩm Homecare chưa xác nhận. Tên tiếng Việt, mô tả và quy trình trao đổi được đánh dấu `proposed`, không phải thông tin lâm sàng hay cam kết kết quả. Nút liên hệ mở cuộc trò chuyện, không tự đặt lịch hoặc gửi tin nhắn.

## Cấu trúc và chỉnh sửa

```text
src/
  app/           Routes, layout, metadata, sitemap, CSS
  components/    Header, footer, danh sách, chọn gói, liên hệ
  data/          Nội dung và giá liệu trình (server-only)
  lib/           Chế độ demo, định dạng, thông tin liên hệ
  types/         Kiểu dữ liệu Program / Plan / ContentItem
public/images/   Ảnh minh họa và CREDITS.md
tests/           Kiểm thử trình duyệt
```

- Giá/nội dung: `src/data/programs.ts`. Giữ trạng thái duyệt của từng nội dung; không tự điền số buổi hoặc quyền lợi.
- Liên hệ: `src/lib/site.ts`; WhatsApp `855884768999`, Telegram `diva_glow_poipet`.
- Màu, typography, responsive: `src/app/globals.css`.
- `SITE_URL`: URL của môi trường xem xét, mặc định `http://localhost:3100`; dùng cho metadata/sitemap. Không tự gắn domain chính.
- Ảnh Pexels tải về cục bộ có nguồn và giấy phép trong `public/images/CREDITS.md`, luôn ghi rõ minh họa. Không dùng ảnh AI làm cơ sở hoặc kết quả điều trị thật.

## Kiểm tra

```bash
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm test
```

Playwright tự chạy hai production preview riêng tại `127.0.0.1:3117` (demo) và `127.0.0.1:3118` (ẩn giá), kiểm tra desktop/mobile, 6 slugs, 12 giá, 7 phần, radio bàn phím, menu, disclosures, URL liên hệ, ảnh, responsive, SEO và 404. Không gửi tin WhatsApp/Telegram.

Để xem bản build:

```bash
npm run build
DIVA_INTERNAL_DEMO=true npm run start -- --port 3100
```

## Docker — chuẩn bị cho lần triển khai được duyệt sau này

Dockerfile multi-stage dùng Node 22, Next standalone và user không phải root. `compose.yaml` chỉ chứa website, không có database/proxy, ánh xạ đúng `127.0.0.1:3100:3000`.

Lệnh dành cho môi trường riêng **sau khi được phép chạy container**:

```bash
docker compose build
DIVA_INTERNAL_DEMO=true docker compose up -d
```

Mặc định Compose ẩn giá. Không có workflow tự deploy, không thay đổi Nginx, PostgreSQL, domain hay dịch vụ đang hoạt động. Không merge vào `main` trước khi owner duyệt bản thay đổi.
