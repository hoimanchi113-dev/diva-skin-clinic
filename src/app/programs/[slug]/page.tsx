import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram, programs } from "@/data/programs";
import { TreatmentContent } from "@/components/plan-selector";
import { EditorialImage } from "@/components/editorial-image";
import { Arrow } from "@/components/arrow";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Không tìm thấy liệu trình" };
  return {
    title: program.name,
    description: `${program.name} tại DIVA Skin Clinic Poipet. Khám phá Basic / Intensive và liên hệ tư vấn.`,
    alternates: { canonical: `/programs/${program.slug}` },
  };
}
export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const next = programs[(programs.indexOf(program) + 1) % programs.length];
  return (
    <div className="shell">
      <nav className="breadcrumb" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/programs">Liệu trình</Link>
        <span>/</span>
        <span aria-current="page">{program.name}</span>
      </nav>
      <section className="detail-hero">
        <div>
          <h1>{program.name}</h1>
          <p className="vietnamese-name">{program.nameVi}</p>
          <p>{program.description.text}</p>
          <p className="content-status">
            Bản giới thiệu đề xuất · chờ DIVA duyệt
          </p>
          <a className="text-link" href="#section-4">
            Khám phá Basic & Intensive <Arrow />
          </a>
        </div>
        <EditorialImage compact priority />
      </section>
      <TreatmentContent program={program} />
      <div className="next-treatment">
        <span>Khám phá tiếp</span>
        <Link href={`/programs/${next.slug}`}>
          {next.name}
          <Arrow />
        </Link>
        <Link className="text-link" href="/programs">
          Tất cả liệu trình
        </Link>
      </div>
    </div>
  );
}
