import Link from "next/link";

export default function KazakhHomePage() {
  return (
    <div className="premium-root">
      <section className="relative bg-premium-navy-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,83,0.06)_0%,_transparent_60%)]" />
        <div className="premium-container relative text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">PayGuard</h1>
          <p className="text-white/60 max-w-xl mx-auto mb-6">
            Қазақстандағы қаржылық операцияларды тексеру және қауіпсіз ақша аударымы қызметі
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/client-payouts" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all">
              Төлемдерді тексеру
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all">
              Қызмет туралы
            </Link>
          </div>
        </div>
      </section>
      <div className="premium-container py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="premium-card p-6">
            <h2 className="font-bold text-premium-navy-800 mb-2">PayGuard туралы</h2>
            <p className="text-sm text-premium-text-secondary mb-3">
              PayGuard — Қазақстанда алушыларды тексеруге, төлем мәртебесін білуге және қауіпсіз
              ақша аударымдарын жасауға көмектесетін қаржылық верификация қызметі.
            </p>
            <Link href="/about" className="text-green-600 text-sm font-medium hover:underline">Толығырақ →</Link>
          </div>
          <div className="premium-card p-6">
            <h2 className="font-bold text-premium-navy-800 mb-2">Жылдам сілтемелер</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/client-payouts" className="text-green-600 hover:underline">📋 Төлемдерді тексеру</Link></li>
              <li><a href="https://t.me/payguard_support_bot" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">✈️ Қолдау қызметі</a></li>
              <li><Link href="/about" className="text-green-600 hover:underline">ℹ️ Қызмет туралы</Link></li>
              <li><Link href="/privacy" className="text-green-600 hover:underline">🔒 Құпиялылық саясаты</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
