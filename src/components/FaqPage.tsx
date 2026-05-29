import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/sections";

export function FaqPage() {
  return (
    <>
      <nav className="breadcrumb">
        <Link href="/">Главная</Link> / <Link href="/about">Об Агентстве</Link> / FAQ
      </nav>
      <h1 className="page-title">Часто задаваемые вопросы</h1>
      <p className="section-lead">
        Ответы на типовые вопросы о полномочиях АРРФР, защите прав потребителей и порядке обращений.
      </p>
      <dl className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="faq-item">
            <dt>{item.q}</dt>
            <dd dangerouslySetInnerHTML={{ __html: item.a }} />
          </div>
        ))}
      </dl>
      <section className="ardfm-section">
        <h2>Не нашли ответ?</h2>
        <p>
          <Link href="/contacts" className="btn">
            Контакты
          </Link>
        </p>
      </section>
    </>
  );
}
