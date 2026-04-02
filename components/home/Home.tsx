import React from 'react'
import HeroSection from "../sections/HeroSection"
import ShippingMethodsPage from '../sections/ShippingMethods'
import DeliveryForm from '../sections/DelieveryForm'
// import LogisticsSteps from '../sections/delievery/LogisticsSteps'
import ServiceQAPage from '../sections/ServiceQAPage'
import NeonSection from '../helpers/NeonSection'
import WhyUs from '../sections/WhyUs'

// const slides =[
//   {
//     id:1,
//     title: "Найдем и выкупим любой товар под заказ",
//     description: "Работаем напрямую с фабриками и торговыми площадками. Организуем закупку, выкуп и доставку вашего заказа.",
//     imageUrl:"/images/fox.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:2,
//     title: "Склады в ключевых городах Китая",
//     description: "Принимаем товар от разных поставщиков.Работаем с грузами любого объема и габаритов.",
//     imageUrl:"/images/msc.jpeg",
//     altText: "Dsfsdf"
//   },
//   {
//     id:3,
//     title: "Легальная таможня и сертификация",
//     description: "Полный брокеридж «под ключ»: декларирование, подготовка разрешительной документации, сертификаты соответствия и ТР ТС.",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:4,
//     title: "Страхование 100% стоимости",
//     description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:5,
//     title: "Доставим до вашего склада или магазина",
//     description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
// ]


const slides = [
  {
    id: 1,
    title: 'Авиаперевозки',
    subtitle: 'Самый быстрый способ',
    duration: '3-7 дн.',
    suitableFor: ['Срочные грузы', 'Электроника', 'Документы', 'Образцы'],
    cost: 'Высокая',
    reliability: 5,
    description: 'Идеально для ценных и срочных отправлений. Полный трекинг.',
  },
  {
    id: 2,
    title: 'Железнодорожные',
    subtitle: 'Баланс цены и скорости',
    duration: '18-40 дн.',
    suitableFor: ['FCL контейнеры', 'Сборные грузы', 'Оборудование', 'Сырьё'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Надёжный и экономичный вариант для больших партий.',
  },
  {
    id: 3,
    title: 'Автомобильные',
    subtitle: 'Гибкость и универсальность',
    duration: '14-25 дн.',
    suitableFor: ['Дверь-дверь', 'Регионы', 'Температура', 'Частичные загрузки'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Прямая доставка от склада до склада без перегрузок.',
  },
  {
    id: 4,
    title: 'Морские контейнерные',
    subtitle: 'Максимальная экономия',
    duration: '30-60 дн.',
    suitableFor: ['Массовые грузы', 'Консолидация', 'Крупногабарит', 'Международные'],
    cost: 'Низкая',
    reliability: 3,
    description: 'Самый низкий тариф при перевозке больших объёмов.',
  },
];
const gradients = [
  "bg-gradient-to-br from-purple-900/80 to-blue-900/80",
  "bg-gradient-to-br from-teal-900/70 to-cyan-900/70",
  "bg-gradient-to-br from-amber-900/70 to-orange-900/70",
  "bg-gradient-to-br from-emerald-900/70 to-green-900/70",
];

const shippingMethods = [
  {
    id: 1,
    icon: <></>,                    // empty icon
    title: "Авиаперевозки",
    subtitle: "Самый быстрый способ",
    duration: "3-7 дн.",
    suitableFor: ["Образцы", "Электроника", "Мед. товары", "Документы"],
    cost: "Высокая" as const,
    reliability: 5,
    features: ["Скорость доставки", "Безопасность", "Трекинг", "Таможня"],
    imageSrc: "/images/airpng.png",
  },
  {
    id: 2,
    icon: <></>,
    title: "Железнодорожные",
    subtitle: "Баланс цены и скорости",
    duration: "18-40 дн.",
    suitableFor: ["Контейнеры FCL", "Сборные грузы LCL", "Оборудование", "Стройматериалы"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Оптимальная стоимость", "Надежность", "Контейнерные", "Сборные грузы"],
    imageSrc: "/images/train.jpg",
  },
  {
    id: 3,
    icon: <></>,
    title: "Автомобильные",
    subtitle: "Гибкий и универсальный",
    duration: "14-25 дн.",
    suitableFor: ["Региональные", "Междугородные", "Температура", "Частичные загрузки"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Гибкость маршрутов", "Дверь-дверь", "Экспедирование", "Мультимодальные"],
    imageSrc: "/images/truck-cargo.jpg",
  },
  {
    id: 4,
    icon: <></>,
    title: "Морские контейнерные",
    subtitle: "Самый экономичный",
    duration: "30-60 дн.",
    suitableFor: ["Международные", "Консолидация", "Крупногабаритные", "Сырье"],
    cost: "Низкая" as const,
    reliability: 3,
    features: ["Низкая стоимость", "Большие объёмы", "Международные", "Контейнеры"],
    imageSrc: "/images/cargo.jpg",
  },
];

function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
     

      
{/*       
       <NorthernFoxNavbar /> */}
        <HeroSection />
        {/* <Slider slides={slides} /> */}
       
    
       
        

        {/* <WhyChooseUs /> */}

     <NeonSection>
     
      <ServiceQAPage />
      <ShippingMethodsPage   />
      <WhyUs />
      </NeonSection>

     
        {/* <ServicesSection /> */}
     
        {/* <LogisticsSteps /> */}
        <DeliveryForm />
       
       
       
      
     </div>
  )
}

export default Home


// style={{
  //   background: `
  //     radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.09) 0%, transparent 50%),
  //     radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.07) 0%, transparent 60%),
  //     radial-gradient(ellipse at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 45%),
  //     linear-gradient(to bottom, #0f172a 0%, #0b1425 100%)
  //   `,
  // }}
  