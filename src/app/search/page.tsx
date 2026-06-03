import { Suspense } from "react";
import { SearchPageClient } from "@/components/SearchPageClient";

export default function SearchPage() {
  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <h1 className="rz-page-title">Поиск по сайту</h1>
          <p className="rz-page-desc">
            Поиск по намерению: действия, документы, организации, новости
          </p>
        </div>
      </div>
      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <Suspense fallback={<p style={{ color: "var(--color-text-secondary)" }}>Загрузка…</p>}>
          <SearchPageClient />
        </Suspense>
      </div>
    </div>
  );
}
