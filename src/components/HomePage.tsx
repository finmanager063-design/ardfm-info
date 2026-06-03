import type { CSSProperties } from "react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { HOME_IMPORTANT_LINKS } from "@/lib/home-data";
import { getDiversePhoto } from "@/lib/photo-pool";
import { GovImage } from "@/components/GovImage";

function formatDate(dateStr: string, locale: string = "ru"): string {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === "en" ? "en-US" : locale === "kk" ? "kk-KZ" : "ru-RU",
      { year: "numeric", month: "long", day: "numeric" },
    );
  } catch {
    return dateStr;
  }
}

export function HomePage() {
  const { news, projects, pressReleases, meta } = getContent();
  const allNews = [...pressReleases, ...news].slice(0, 8);
  const featuredNews = allNews.slice(0, 1);
  const sidebarNews = allNews.slice(1, 7);

  const metrics = [
    { value: "21", label: "Банков второго уровня", trend: "stable" },
    { value: "28", label: "Страховых организаций", trend: "up" },
    { value: "190+", label: "Микрофинансовых организаций", trend: "up" },
    { value: "75", label: "Лицензий выдано в 2026", trend: "up" },
  ];

  const services = [
    {
      icon: "📋",
      title: "Проверить лицензию",
      desc: "Поиск в реестре лицензированных финансовых организаций",
      href: "/financial-organizations",
    },
    {
      icon: "🛡️",
      title: "Подать обращение",
      desc: "Отправить жалобу или обращение через Telegram-бот",
      href: "https://t.me/finance_regulator_bot",
    },
    {
      icon: "⚠️",
      title: "Сообщить о мошенничестве",
      desc: "Информация о нелегальной деятельности и финансовых пирамидах",
      href: "/consumer-protection",
    },
    {
      icon: "📄",
      title: "Документы Агентства",
      desc: "Нормативные правовые акты и проекты документов",
      href: "/documents/1",
    },
    {
      icon: "💬",
      title: "Часто задаваемые вопросы",
      desc: "Ответы на популярные вопросы о финансовом рынке",
      href: "/about/faq",
    },
    {
      icon: "📊",
      title: "Финансовая грамотность",
      desc: "Образовательные материалы и программы повышения грамотности",
      href: "/activities/directions",
    },
  ];

  const banners = projects.filter((p) => p.icon || p.heropic).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="rz-hero">
        <div className="rz-hero-inner">
          <div>
            <Link href="/consumer-protection" className="rz-hero-alert">
              <span>⚠️</span>
              <span>Осторожно, мошенники! Как распознать финансовую пирамиду →</span>
            </Link>
            <h1 className="rz-hero-title">
              Защита ваших финансов —<br />наша главная задача
            </h1>
            <p className="rz-hero-subtitle">
              Агентство Республики Казахстан по регулированию и развитию финансового рынка
              обеспечивает стабильность, прозрачность и защиту прав потребителей
              финансовых услуг
            </p>
            <div className="rz-hero-actions">
              <Link
                href="https://t.me/finance_regulator_bot"
                className="rz-btn rz-btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Подать обращение
              </Link>
              <Link href="/financial-organizations" className="rz-btn rz-btn-secondary">
                Реестр лицензий
              </Link>
              <a
                href="https://t.me/finance_regulator_bot"
                target="_blank"
                rel="noreferrer"
                className="rz-btn rz-btn-secondary"
              >
                ✈️ @finance_regulator_bot
              </a>
            </div>
            <div className="rz-hero-stats">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="rz-hero-stat animate-in"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <div className="rz-hero-stat-value">{m.value}</div>
                  <div className="rz-hero-stat-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rz-hero-image-area">
            <img
              src="https://www.gov.kz/uploads/2026/5/29/518e96329765736f21493303d78d85e3_original.84693.jpg"
              alt="Астана"
              className="rz-hero-image"
              style={{ maxHeight: 420, objectFit: "cover", borderRadius: 16 }}
            />
          </div>
        </div>
      </section>

      {/* Alert Bar */}
      <div className="rz-section" style={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }}>
        <div className="rz-alert-bar">
          <span className="rz-alert-bar-icon">📢</span>
          <div className="rz-alert-bar-content">
            <p className="rz-alert-bar-title">
              Внимание! Защита от финансового мошенничества
            </p>
            <p className="rz-alert-bar-text">
              Агентство призывает граждан быть бдительными. Не передавайте личные данные
              и коды подтверждения третьим лицам. Сообщите о подозрительной деятельности
              через{" "}
              <a
                href="https://t.me/finance_regulator_bot"
                target="_blank"
                rel="noreferrer"
              >
                Telegram-бот
              </a>{" "}
              или через <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer">Telegram-бот</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <section className="rz-section" style={{ paddingTop: "1rem" }}>
        <div className="rz-section-header">
          <div>
            <h2 className="rz-section-title">Финансовый рынок в цифрах</h2>
            <p className="rz-section-subtitle">
              Основные показатели финансового сектора Республики Казахстан
            </p>
          </div>
        </div>

        <div className="rz-metrics">
          <div className="rz-metric-card animate-in animate-in-delay-1">
            <div className="rz-metric-value">46,3 трлн</div>
            <div className="rz-metric-label">Активы банковского сектора</div>
            <span className="rz-metric-trend up">▲ +12,4%</span>
          </div>
          <div className="rz-metric-card animate-in animate-in-delay-2">
            <div className="rz-metric-value">2,8 трлн</div>
            <div className="rz-metric-label">Страховые премии</div>
            <span className="rz-metric-trend up">▲ +8,7%</span>
          </div>
          <div className="rz-metric-card animate-in animate-in-delay-3">
            <div className="rz-metric-value">1 247</div>
            <div className="rz-metric-label">Финансовых организаций</div>
            <span className="rz-metric-trend up">▲ +3,2%</span>
          </div>
          <div className="rz-metric-card animate-in animate-in-delay-4">
            <div className="rz-metric-value">99,8%</div>
            <div className="rz-metric-label">Доля застрахованных депозитов</div>
            <span className="rz-metric-trend up">▲ +0,1%</span>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="rz-section" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="rz-section-header">
          <div>
            <h2 className="rz-section-title">Новости и пресс-релизы</h2>
            <p className="rz-section-subtitle">
              Актуальная информация о деятельности Агентства
            </p>
          </div>
          <Link href="/press/news" className="rz-section-link">
            Все материалы →
          </Link>
        </div>

        {featuredNews.length > 0 && (
          <div className="rz-news-grid">
            <div className="rz-news-featured animate-in animate-in-delay-1">
              {featuredNews[0].heropic && (
                <GovImage
                  src={featuredNews[0].heropic}
                  alt=""
                  className="rz-news-featured-img"
                />
              )}
              <div className="rz-news-featured-body">
                <span className="rz-news-featured-date">
                  {formatDate(featuredNews[0].created_date || "")}
                </span>
                <h3 className="rz-news-featured-title">
                  <Link href={`/press/releases/details/${featuredNews[0].id}`}>
                    {featuredNews[0].title}
                  </Link>
                </h3>
                {featuredNews[0].short_description && (
                  <p className="rz-news-featured-excerpt">
                    {featuredNews[0].short_description.slice(0, 200)}
                  </p>
                )}
              </div>
            </div>

            <div className="rz-news-sidebar animate-in animate-in-delay-2">
              {sidebarNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/press/releases/details/${item.id}`}
                  className="rz-news-sidebar-item"
                >
                  <span className="rz-news-sidebar-date">
                    {formatDate(item.created_date || "")}
                  </span>
                  <span className="rz-news-sidebar-title">{item.title}</span>
                </Link>
              ))}
              <Link href="/press/news" className="rz-news-all-link">
                Все новости и пресс-релизы →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="rz-section">
        <div className="rz-section-header">
          <div>
            <h2 className="rz-section-title">Услуги Агентства</h2>
            <p className="rz-section-subtitle">
              Полный спектр услуг для граждан и участников финансового рынка
            </p>
          </div>
        </div>

        <div className="rz-services-grid">
          {services.map((service, i) => (
            <a
              key={service.title}
              href={service.href}
              className={`rz-service-card animate-in animate-in-delay-${Math.min(i + 1, 5)}`}
              target={service.href.startsWith("http") ? "_blank" : undefined}
              rel={service.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <div className="rz-service-icon">{service.icon}</div>
              <h3 className="rz-service-title">{service.title}</h3>
              <p className="rz-service-desc">{service.desc}</p>
              <span className="rz-service-arrow">Перейти →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Important Links */}
      <section
        className="rz-section"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="rz-section-header">
          <div>
            <h2 className="rz-section-title">Важная информация</h2>
            <p className="rz-section-subtitle">
              Ключевые материалы и ресурсы Агентства
            </p>
          </div>
        </div>

        <div className="rz-quick-links">
          {HOME_IMPORTANT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rz-quick-link"
              target={"external" in link && link.external ? "_blank" : undefined}
              rel={"external" in link && link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Projects */}
      {banners.length > 0 && (
        <section className="rz-section">
          <div className="rz-section-header">
            <div>
              <h2 className="rz-section-title">Реализуемые проекты</h2>
              <p className="rz-section-subtitle">
                Проекты, направленные на развитие финансового рынка
              </p>
            </div>
          </div>

          <div className="rz-gallery-grid">
            {banners.slice(0, 4).map((p, i) => {
              const img = p.icon || p.heropic || getDiversePhoto(`project-${p.id}`);
              return (
                <Link
                  key={p.id}
                  href={`/projects/details/${p.id}`}
                  className={`rz-gallery-item animate-in animate-in-delay-${Math.min(i + 1, 5)}`}
                >
                  {img && <GovImage src={img} alt="" className="rz-gallery-img" />}
                  <div className="rz-gallery-caption">{p.title}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Bot CTA */}
      <section
        className="rz-section"
        style={{
          background: "linear-gradient(135deg, var(--color-navy-800), var(--color-navy-700))",
          color: "#fff",
          borderRadius: 0,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              margin: "0 0 0.75rem",
            }}
          >
            Нужна помощь или консультация?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              opacity: 0.85,
              margin: "0 0 1.5rem",
              lineHeight: 1.6,
            }}
          >
            Направьте обращение через Telegram-бот Агентства по регулированию и развитию
            финансового рынка
          </p>
          <a
            href="https://t.me/finance_regulator_bot"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.85rem 2rem",
              background: "var(--color-gold-500)",
              color: "var(--color-navy-900)",
              borderRadius: "var(--radius-sm)",
              fontSize: "1.25rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ✈️ @finance_regulator_bot
          </a>
          <p style={{ fontSize: "0.82rem", opacity: 0.6, marginTop: "0.75rem" }}>
            Круглосуточно • Быстрый ответ • Конфиденциально
          </p>
        </div>
      </section>
    </div>
  );
}
