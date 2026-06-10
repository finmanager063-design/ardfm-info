export type Locale = 'ru' | 'kk' | 'en'

export const DEFAULT_LOCALE: Locale = 'ru'

export const LOCALES: Locale[] = ['ru', 'kk', 'en']

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: 'Рус',
  kk: 'Қаз',
  en: 'Eng',
}

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English',
}

export interface I18nDict {
  nav: {
    home: string
    about: string
    services: string
    contacts: string
    payouts: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroBadge: string
    searchPlaceholder: string
    searchBtn: string
    servicesTitle: string
    servicesDesc: string
    featuresTitle: string
    featuresDesc: string
    guarantee: string
    guaranteeDesc: string
    ctaTitle: string
    ctaDesc: string
    ctaBtn: string
  }
  footer: {
    description: string
    sections: string
    contacts: string
    privacy: string
    allRights: string
  }
  common: {
    loading: string
    error: string
    back: string
    readMore: string
    showAll: string
    payouts: string
    check: string
    search: string
    noResults: string
  }
  org: {
    fullName: string
    shortName: string
  }
}

const RU: I18nDict = {
  nav: {
    home: 'Главная',
    about: 'О сервисе',
    services: 'Услуги',
    contacts: 'Контакты',
    payouts: 'Проверить выплаты',
  },
  home: {
    heroTitle: 'Проверка реквизитов и безопасный перевод средств',
    heroSubtitle: 'Сервис проверки финансовых операций — узнайте статус получателя, верифицируйте сделку и переводите деньги без риска',
    heroBadge: 'Сервис проверки операций',
    searchPlaceholder: 'Введите ИИН, БИН или номер дела',
    searchBtn: 'Проверить',
    servicesTitle: 'Наши услуги',
    servicesDesc: 'Полный спектр инструментов для безопасного сопровождения финансовых операций',
    featuresTitle: 'Почему выбирают нас',
    featuresDesc: 'Простота, скорость и надёжность — каждый шаг под защитой',
    guarantee: 'Гарантия безопасности',
    guaranteeDesc: 'Никаких скрытых комиссий. Все проверки проводятся в зашифрованном канале. Ваши данные не передаются третьим лицам.',
    ctaTitle: 'Готовы проверить получателя?',
    ctaDesc: 'Введите ИИН или номер дела — результат за секунду',
    ctaBtn: 'Проверить выплаты',
  },
  footer: {
    description: 'PayGuard — сервис проверки и безопасного сопровождения финансовых операций в Казахстане',
    sections: 'Разделы',
    contacts: 'Контакты',
    privacy: 'Политика конфиденциальности',
    allRights: 'Все права защищены',
  },
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    back: 'Назад',
    readMore: 'Подробнее',
    showAll: 'Все',
    payouts: 'Выплаты',
    check: 'Проверить',
    search: 'Поиск',
    noResults: 'Ничего не найдено. Попробуйте изменить запрос.',
  },
  org: {
    fullName: 'PayGuard — Сервис проверки финансовых операций',
    shortName: 'PayGuard',
  },
}

const KK: I18nDict = {
  nav: {
    home: 'Басты',
    about: 'Қызмет туралы',
    services: 'Қызметтер',
    contacts: 'Байланыс',
    payouts: 'Төлемдерді тексеру',
  },
  home: {
    heroTitle: 'Реквизиттерді тексеру және қауіпсіз аударым',
    heroSubtitle: 'Қаржылық операцияларды тексеру қызметі — алушының мәртебесін біліңіз, мәмілені растаңыз және ақшаны тәуекелсіз аударыңыз',
    heroBadge: 'Операцияларды тексеру қызметі',
    searchPlaceholder: 'ЖСН, БСН немесе іс нөмірін енгізіңіз',
    searchBtn: 'Тексеру',
    servicesTitle: 'Біздің қызметтер',
    servicesDesc: 'Қаржылық операцияларды қауіпсіз сүйемелдеуге арналған құралдардың толық спектрі',
    featuresTitle: 'Неліктен бізді таңдайды',
    featuresDesc: 'Қарапайымдылық, жылдамдық және сенімділік — әр қадам қорғауда',
    guarantee: 'Қауіпсіздік кепілдігі',
    guaranteeDesc: 'Жасырын комиссиялар жоқ. Барлық тексерулер шифрланған арнада жүргізіледі. Сіздің деректеріңіз үшінші тұлғаларға берілмейді.',
    ctaTitle: 'Алушыны тексеруге дайынсыз ба?',
    ctaDesc: 'ЖСН немесе іс нөмірін енгізіңіз — нәтиже секунд ішінде',
    ctaBtn: 'Төлемдерді тексеру',
  },
  footer: {
    description: 'PayGuard — Қазақстандағы қаржылық операцияларды тексеру және қауіпсіз сүйемелдеу қызметі',
    sections: 'Бөлімдер',
    contacts: 'Байланыс',
    privacy: 'Құпиялылық саясаты',
    allRights: 'Барлық құқықтар қорғалған',
  },
  common: {
    loading: 'Жүктелуде...',
    error: 'Қате',
    back: 'Артқа',
    readMore: 'Толығырақ',
    showAll: 'Барлығы',
    payouts: 'Төлемдер',
    check: 'Тексеру',
    search: 'Іздеу',
    noResults: 'Ештеңе табылмады. Сұранысты өзгертіп көріңіз.',
  },
  org: {
    fullName: 'PayGuard — Қаржылық операцияларды тексеру қызметі',
    shortName: 'PayGuard',
  },
}

const EN: I18nDict = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    contacts: 'Contact',
    payouts: 'Check Payouts',
  },
  home: {
    heroTitle: 'Verify Recipients & Transfer Funds Safely',
    heroSubtitle: 'Financial verification service — check recipient status, verify transactions, and send money without risk',
    heroBadge: 'Transaction Verification Service',
    searchPlaceholder: 'Enter IIN, BIN or case number',
    searchBtn: 'Check',
    servicesTitle: 'Our Services',
    servicesDesc: 'Complete toolkit for safe financial transaction support',
    featuresTitle: 'Why Choose Us',
    featuresDesc: 'Simple, fast, reliable — every step protected',
    guarantee: 'Safety Guarantee',
    guaranteeDesc: 'No hidden fees. All checks are encrypted. Your data is never shared with third parties.',
    ctaTitle: 'Ready to verify a recipient?',
    ctaDesc: 'Enter IIN or case number — result in seconds',
    ctaBtn: 'Check Payouts',
  },
  footer: {
    description: 'PayGuard — Financial transaction verification and safe support service in Kazakhstan',
    sections: 'Sections',
    contacts: 'Contact',
    privacy: 'Privacy Policy',
    allRights: 'All rights reserved',
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    back: 'Back',
    readMore: 'Read more',
    showAll: 'All',
    payouts: 'Payouts',
    check: 'Check',
    search: 'Search',
    noResults: 'Nothing found. Try changing your query.',
  },
  org: {
    fullName: 'PayGuard — Financial Transaction Verification Service',
    shortName: 'PayGuard',
  },
}

const DICTIONARIES: Record<Locale, I18nDict> = {
  ru: RU,
  kk: KK,
  en: EN,
}

export function getI18n(locale: string): I18nDict {
  const l = locale as Locale
  return DICTIONARIES[l] ?? DICTIONARIES.ru
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'en') return 'en'
  if (segments[0] === 'kk' || segments[0] === 'kz') return 'kk'
  return DEFAULT_LOCALE
}
