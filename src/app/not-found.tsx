import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell not-found">
      <p>404</p>
      <h1>
        Trang này
        <br />
        <em>chưa có ở đây.</em>
      </h1>
      <p>Khám phá danh sách liệu trình hoặc trở về trang chủ.</p>
      <Link className="button" href="/programs">
        Xem các liệu trình
      </Link>
    </section>
  );
}
