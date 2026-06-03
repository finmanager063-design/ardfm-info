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
    activities: string
    documents: string
    press: string
    finOrgs: string
    consumerProtection: string
    contacts: string
    aboutSub: string[]
    activitiesSub: string[]
    pressSub: string[]
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroAlert: string
    heroAlertLink: string
    mainNews: string
    allMaterials: string
    important: string
    hotline: string
    submitAppeal: string
    registry: string
    keyMetrics: string
    projects: string
    newsTitle: string
    services: string
    servicesDesc: string
  }
  search: {
    placeholder: string
    search: string
    noResults: string
  }
  footer: {
    sections: string
    appeals: string
    disclaimer: string
    disclaimerShort: string
    privacy: string
    accessibility: string
    allRights: string
    lastUpdate: string
    sourceInfo: string
    officialResources: string
  }
  common: {
    loading: string
    error: string
    back: string
    readMore: string
    showAll: string
    sortBy: string
    filter: string
    download: string
    date: string
    noData: string
    onlineReception: string
    submitComplaint: string
  }
  org: {
    fullName: string
    shortName: string
  }
}

const RU: I18nDict = {
  nav: {
    home: 'Главная',
    about: 'Об Агентстве',
    activities: 'Деятельность',
    documents: 'Документы',
    press: 'Пресс-центр',
    finOrgs: 'Финансовые организации',
    consumerProtection: 'Защита прав потребителей',
    contacts: 'Контакты',
    aboutSub: ['История', 'Руководство', 'Структура'],
    activitiesSub: ['Регулирование', 'Надзор', 'Лицензирование', 'Защита прав'],
    pressSub: ['Новости', 'Пресс-релизы', 'События'],
  },
  home: {
    heroTitle: 'Защита ваших финансов — наша главная задача',
    heroSubtitle: 'Агентство Республики Казахстан по регулированию и развитию финансового рынка обеспечивает стабильность и прозрачность финансовой системы',
    heroAlert: 'Осторожно, мошенники!',
    heroAlertLink: 'Как распознать финансовую пирамиду',
    mainNews: 'Главные новости',
    allMaterials: 'Все материалы',
    important: 'Важно',
    hotline: 'Горячая линия',
    submitAppeal: 'Подать обращение',
    registry: 'Реестр лицензий',
    keyMetrics: 'Финансовый рынок в цифрах',
    projects: 'Реализуемые проекты',
    newsTitle: 'Новости и пресс-релизы',
    services: 'Услуги Агентства',
    servicesDesc: 'Полный спектр услуг для граждан и участников финансового рынка',
  },
  search: {
    placeholder: 'Поиск по сайту...',
    search: 'Найти',
    noResults: 'Ничего не найдено. Попробуйте изменить запрос.',
  },
  footer: {
    sections: 'Разделы сайта',
    appeals: 'Обращения',
    disclaimer: '',
    disclaimerShort: 'АРРФР',
    privacy: 'Политика конфиденциальности',
    accessibility: 'Версия для слабовидящих',
    allRights: 'Все права защищены',
    lastUpdate: 'Последнее обновление',
    sourceInfo: '',
    officialResources: 'Государственные ресурсы',
  },
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    back: 'Назад',
    readMore: 'Подробнее',
    showAll: 'Все',
    sortBy: 'Сортировать',
    filter: 'Фильтр',
    download: 'Скачать',
    date: 'Дата',
    noData: 'Нет данных',
    onlineReception: 'Онлайн-приёмная',
    submitComplaint: 'Подать жалобу',
  },
  org: {
    fullName: 'Агентство Республики Казахстан по регулированию и развитию финансового рынка',
    shortName: 'АРРФР',
  },
}

const KK: I18nDict = {
  nav: {
    home: 'Басты',
    about: 'Агенттік туралы',
    activities: 'Қызмет',
    documents: 'Құжаттар',
    press: 'Баспасөз орталығы',
    finOrgs: 'Қаржы ұйымдары',
    consumerProtection: 'Тұтынушылар құқығын қорғау',
    contacts: 'Байланыс',
    aboutSub: ['Тарих', 'Басшылық', 'Құрылым'],
    activitiesSub: ['Реттеу', 'Қадағалау', 'Лицензиялау', 'Құқық қорғау'],
    pressSub: ['Жаңалықтар', 'Пресс-релиздер', 'Оқиғалар'],
  },
  home: {
    heroTitle: 'Сіздің қаржыңызды қорғау – біздің басты міндетіміз',
    heroSubtitle: 'Қазақстан Республикасының Қаржы нарығын реттеу және дамыту жөніндегі агенттігі қаржы жүйесінің тұрақтылығы мен ашықтығын қамтамасыз етеді',
    heroAlert: 'Абайлаңыз, алаяқтар!',
    heroAlertLink: 'Қаржы пирамидасын қалай тануға болады',
    mainNews: 'Басты жаңалықтар',
    allMaterials: 'Барлық материалдар',
    important: 'Маңызды',
    hotline: 'Байланыс орталығы',
    submitAppeal: 'Өтініш беру',
    registry: 'Лицензия тізілімі',
    keyMetrics: 'Қаржы нарығы сандарда',
    projects: 'Жүзеге асырылатын жобалар',
    newsTitle: 'Жаңалықтар мен пресс-релиздер',
    services: 'Агенттік қызметтері',
    servicesDesc: 'Азаматтар мен қаржы нарығына қатысушыларға арналған қызметтердің толық спектрі',
  },
  search: {
    placeholder: 'Сайттан іздеу...',
    search: 'Іздеу',
    noResults: 'Ештеңе табылмады. Сұранысты өзгертіп көріңіз.',
  },
  footer: {
    sections: 'Сайт бөлімдері',
    appeals: 'Өтініштер',
    disclaimer: '',
    disclaimerShort: 'АРРФР',
    privacy: 'Құпиялылық саясаты',
    accessibility: 'Нашар көретіндерге арналған нұсқа',
    allRights: 'Барлық құқықтар қорғалған',
    lastUpdate: 'Соңғы жаңарту',
    sourceInfo: '',
    officialResources: 'Мемлекеттік ресурстар',
  },
  common: {
    loading: 'Жүктелуде...',
    error: 'Қате',
    back: 'Артқа',
    readMore: 'Толығырақ',
    showAll: 'Барлығы',
    sortBy: 'Сұрыптау',
    filter: 'Сүзгі',
    download: 'Жүктеу',
    date: 'Күні',
    noData: 'Деректер жоқ',
    onlineReception: 'Онлайн қабылдау',
    submitComplaint: 'Шағым беру',
  },
  org: {
    fullName: 'Қазақстан Республикасының Қаржы нарығын реттеу және дамыту жөніндегі агенттігі',
    shortName: 'ҚР ҚНРДА',
  },
}

const EN: I18nDict = {
  nav: {
    home: 'Home',
    about: 'About Agency',
    activities: 'Activities',
    documents: 'Documents',
    press: 'Press Center',
    finOrgs: 'Financial Organizations',
    consumerProtection: 'Consumer Protection',
    contacts: 'Contacts',
    aboutSub: ['History', 'Leadership', 'Structure'],
    activitiesSub: ['Regulation', 'Supervision', 'Licensing', 'Protection'],
    pressSub: ['News', 'Press Releases', 'Events'],
  },
  home: {
    heroTitle: 'Protecting Your Finances is Our Mission',
    heroSubtitle: 'Agency of the Republic of Kazakhstan for Regulation and Development of Financial Markets ensures stability and transparency of the financial system',
    heroAlert: 'Beware of fraudsters!',
    heroAlertLink: 'How to recognize a financial pyramid',
    mainNews: 'Main News',
    allMaterials: 'All materials',
    important: 'Important',
    hotline: 'Hotline',
    submitAppeal: 'Submit Appeal',
    registry: 'License Registry',
    keyMetrics: 'Financial Market in Numbers',
    projects: 'Ongoing Projects',
    newsTitle: 'News and Press Releases',
    services: 'Agency Services',
    servicesDesc: 'Full range of services for citizens and financial market participants',
  },
  search: {
    placeholder: 'Search website...',
    search: 'Search',
    noResults: 'Nothing found. Try changing your query.',
  },
  footer: {
    sections: 'Sections',
    appeals: 'Appeals',
    disclaimer: '',
    disclaimerShort: 'ARDFR',
    privacy: 'Privacy Policy',
    accessibility: 'Accessibility',
    allRights: 'All rights reserved',
    lastUpdate: 'Last update',
    sourceInfo: '',
    officialResources: 'Government Resources',
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    back: 'Back',
    readMore: 'Read more',
    showAll: 'All',
    sortBy: 'Sort by',
    filter: 'Filter',
    download: 'Download',
    date: 'Date',
    noData: 'No data',
    onlineReception: 'Online Reception',
    submitComplaint: 'Submit Complaint',
  },
  org: {
    fullName: 'Agency of the Republic of Kazakhstan for Regulation and Development of Financial Markets',
    shortName: 'ARDFM',
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
