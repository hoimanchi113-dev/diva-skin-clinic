import Link from "next/link";
import { programs } from "@/data/programs";
import { formatUsd } from "@/lib/format";
import { isInternalDemo } from "@/lib/demo";
import { Arrow } from "./arrow";

export function ProgramList() {
  return (
    <div className="program-list">
      <div className="list-labels" aria-hidden="true">
        <span>CHƯƠNG TRÌNH</span>
        <span>
          {isInternalDemo ? "BASIC / INTENSIVE · USD · DEMO" : "THÔNG TIN GÓI"}
        </span>
      </div>
      {programs.map((program, i) => (
        <Link
          href={`/programs/${program.slug}`}
          key={program.id}
          className="program-row"
        >
          <span className="program-number">0{i + 1}</span>
          <div className="program-name">
            <h3>{program.name}</h3>
            <p>{program.nameVi}</p>
          </div>
          <div className="program-prices">
            {isInternalDemo ? (
              <>
                <span>
                  <span className="mobile-price-label">Basic </span>
                  {formatUsd(program.plans.basic.priceUsd)}
                </span>
                <span className="price-divider">/</span>
                <span>
                  <span className="mobile-price-label">Intensive </span>
                  {formatUsd(program.plans.intensive.priceUsd)}
                </span>
              </>
            ) : (
              <span className="fine-print">Liên hệ tư vấn</span>
            )}
          </div>
          <span className="row-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
