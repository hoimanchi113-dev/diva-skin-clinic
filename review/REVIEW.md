# Bản xem xét DIVA Personalized Skin Treatment

## Phạm vi

Next.js App Router, React, TypeScript, Tailwind, npm và ESLint. Home, Treatment Programs, sáu trang theo slug, About và Contact. Dữ liệu tách khỏi UI; đủ bảy phần trên mỗi trang chi tiết. Chuyển Basic/Intensive cập nhật giá, trạng thái Homecare và nội dung liên hệ; không tải lại trang.

Giá V2 chỉ bật bằng `DIVA_INTERNAL_DEMO=true` ở server, mặc định ẩn. Thông tin lâm sàng, thời hạn, số buổi và quyền lợi chưa xác nhận không được tự điền. WhatsApp/Telegram chỉ mở cuộc trò chuyện.

## Kiểm chứng

- `npm install`: thành công; lockfile được lưu.
- `npm run lint`: không lỗi/cảnh báo sau khi sửa export cấu hình PostCSS.
- `npx tsc --noEmit`: đạt.
- `npm run build`: đạt, sáu trang chi tiết sử dụng route động.
- Playwright Chromium: 8/8 bài desktop/mobile đạt; kiểm tra cả demo bật/tắt.
- Kiểm tra thêm 5 trang ở 320, 360, 390, 768, 1024 và 1440px: không tràn ngang.
- Ảnh minh họa tải từ public, không phụ thuộc dịch vụ ảnh bên ngoài lúc chạy.
- `docker compose config --quiet`: đạt. Chưa build/chạy image Docker, chưa triển khai.
- `npm install` cuối báo 0 vulnerabilities. ESLint 9.39.5 được giữ vì các plugin import/react/a11y của Next hiện chưa khai báo tương thích ESLint 10; npm có cảnh báo hết hỗ trợ cho ESLint 9. Override minimatch của typescript-estree dùng bản vá 11.0.1 trở lên.

## Preview

Preview phát triển trong phiên bàn giao: `http://127.0.0.1:3120`. Cổng 3100 có dịch vụ đang dùng nên không thay đổi dịch vụ đó. Nếu tiến trình preview đã dừng:

```bash
DIVA_INTERNAL_DEMO=true npm run dev -- --port 3120
```

Xem từ máy cá nhân qua SSH tunnel:

```bash
ssh -N -L 3120:127.0.0.1:3120 USER@HOST
```

Mở `http://localhost:3120`. Chưa có URL công khai và chưa có domain mới.

## Hình ảnh và kiểm tra thiết kế

- [Home desktop](home-desktop.png), [Home mobile](home-mobile.png).
- [Danh sách desktop](programs-desktop.png), [tablet](programs-tablet.png).
- [Acne desktop](acne-desktop.png), [Acne mobile](acne-mobile.png).
- [Tham chiếu thiết kế tạo trong phiên](design-reference.png), [render ở chiều rộng gốc 1024px](programs-concept-size.png).

Đã dùng `view_image` xem trực tiếp concept và ảnh render mới nhất. Opera connector không cung cấp phiên trình duyệt sau hai lần thử xác thực, nên kiểm tra bằng Playwright Chromium. Viewport đối chiếu concept 1024×1536; thêm desktop 1440×1000 và mobile 390×844.

| Điểm đối chiếu | Kết quả / điều chỉnh có chủ ý |
| --- | --- |
| Bảng màu | Xanh #153d33, kem #f7f4ee, champagne #c6b18a; nền kem theo brief. |
| Typography | Serif Georgia cho tiêu đề, sans cho nội dung; không tải font bên ngoài; đã xem line-break mobile. |
| Bố cục | Hero hai cột trên desktop, một cột mobile; danh sách có đường phân cách, không dùng dashboard/card grid. |
| Ảnh | Thay ảnh concept AI bằng ảnh Pexels có giấy phép và chú thích minh họa; không phải hình cơ sở/kết quả thật. |
| Nội dung đầu trang | Giữ headline chương trình; bỏ eyebrow và lời hứa hiệu quả do concept tự sinh. Nội dung triển khai theo brief và trạng thái chưa duyệt. |
| Điều khiển | CTA chữ rõ, radio native, focus ring, details/summary; mũi tên SVG. Không dùng biểu tượng thương hiệu tự chế. |
| Responsive | Giá xuống hàng trên điện thoại, menu có Escape; không tràn ngang ở các viewport đã kiểm tra. |
| Chi tiết | Bảy phần đúng cấu trúc; giá và gói được kiểm tra tự động, thông tin chưa xác nhận giữ nhãn. |

Đã bỏ biểu tượng debug Next.js khỏi ảnh preview. Bản demo được nhắc tới là đã duyệt trước đây chưa có file/link trong repo hoặc cuộc trò chuyện, nên không khẳng định khớp pixel với bản đó. Đây là bản triển khai theo brief hiện tại, đã đối chiếu phong cách với concept trong phiên, chờ owner duyệt hình thức cuối cùng.

## Những việc chưa thực hiện

Không merge main, không kết nối domain, không sửa Nginx/PostgreSQL, không restart website/dịch vụ hiện có, không gửi tin nhắn cho khách. Docker chỉ được chuẩn bị với binding `127.0.0.1:3100:3000`. Không tự phê duyệt nội dung lâm sàng hay công bố giá V2 chính thức.
