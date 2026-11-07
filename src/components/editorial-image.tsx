import Image from "next/image";

export function EditorialImage({
  compact = false,
  priority = false,
}: {
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={`editorial-image ${compact ? "compact-image" : ""}`}>
      <div className="photo-frame">
        <Image
          src="/images/skincare.jpg"
          alt="Ảnh stock minh họa thao tác chăm sóc da, không phải khách hàng DIVA"
          fill
          sizes={
            compact
              ? "(max-width: 767px) 100vw, 45vw"
              : "(max-width: 767px) 100vw, 50vw"
          }
          priority={priority}
        />
      </div>
      <figcaption>
        Ảnh minh họa ·{" "}
        <a
          href="https://www.pexels.com/photo/a-woman-applying-a-skin-care-product-on-her-face-6925477/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mike Murray / Pexels<span className="sr-only"> (mở tab mới)</span>
        </a>
      </figcaption>
    </figure>
  );
}
