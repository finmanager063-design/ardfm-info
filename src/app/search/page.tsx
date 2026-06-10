import { Suspense } from "react";
import { SearchPageClient } from "@/components/SearchPageClient";

export default function SearchPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#001128] to-[#002f6c] text-white py-12">
        <div className="premium-container">
          <h1 className="text-3xl font-bold tracking-tight">Поиск</h1>
          <p className="mt-2 text-white/70 max-w-xl">
            Поиск по выплатам, документам и информации
          </p>
        </div>
      </div>
      <div className="premium-section">
        <div className="premium-container">
          <Suspense fallback={<p className="text-[var(--color-premium-text-secondary)]">Загрузка…</p>}>
            <SearchPageClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
