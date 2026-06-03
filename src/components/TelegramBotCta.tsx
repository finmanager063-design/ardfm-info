import { getSiteContacts } from "@/lib/contacts";

type Props = {
  variant?: "page" | "footer" | "inline";
};

export function TelegramBotCta({ variant = "page" }: Props) {
  const { telegram } = getSiteContacts();

  if (variant === "footer") {
    return (
      <p className="contacts-bot-footer">
        <a href={telegram.url} target="_blank" rel="noreferrer">
          {telegram.handle}
        </a>
        <span> — бот для обращений</span>
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <a href={telegram.url} className="contacts-bot-inline" target="_blank" rel="noreferrer">
        {telegram.handle}
      </a>
    );
  }

  return (
    <section className="ardfm-section contacts-bot-hero">
      <h2>Обращения в Агентство</h2>
      <p className="contacts-bot-lead">
        По любым вопросам, жалобам, запросам и проблемам на финансовом рынке используйте
        единый государственный бот в Telegram.
      </p>
      <a href={telegram.url} className="btn contacts-bot-btn" target="_blank" rel="noreferrer">
        Написать в {telegram.handle}
      </a>
      <p className="contacts-bot-hint">
        Бот принимает обращения граждан и организаций: банки, страхование, МФО, мошенничество,
        лицензии, защита прав потребителей финансовых услуг.
      </p>
    </section>
  );
}
