'use client'
import React from 'react'
import FinchStyleBorderCard from '../helpers/AnimatedBorder'
import LogisticsForm from '../helpers/DelieveryForm'
import LogisticsProcess from '../helpers/LogisticsProcess'
import WhiteVsGrayDelivery from '../helpers/WhiteVsGrey'

const WhyUs = () => {
  return (
    <div className='flex flex-col md:flex-row items-stretch  gap-6 p-4 md:p-10'>
  {/* Finch Card - на мобильных сверху, на десктопе слева */}
  <div className='w-full md:w-1/4 lg:w-1/3'>
    <FinchStyleBorderCard borderRadius={20}>
      <WhiteVsGrayDelivery />
    </FinchStyleBorderCard>
  </div>
  
    {/* Колонка с маленькими карточками - на мобильных снизу, на десктопе справа */}
    <div className='flex w-full md:w-4/1 lg:w-4/1'>
       <LogisticsProcess />
      {/* Первая маленькая карточка */}
      {/* <div
        className={`
          group relative h-auto min-h-[260px] w-full
          bg-gradient-to-br from-[#0a0a0f]/96 via-teal-950/60 via-cyan-900/45 via-emerald-900/30 to-[#0b0b13]/94
          backdrop-blur-2xl bg-opacity-65
          rounded-2xl md:rounded-3xl
          overflow-hidden
          transition-all duration-700 ease-out
          hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60
          hover:border-cyan-500/15
          cursor-pointer
        `}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight leading-tight">
                Заголовок 1
              </h3>
              <p className="text-xs md:text-sm text-cyan-200/70 mt-1 font-light">
                Подзаголовок 1
              </p>
            </div>
          </div>
        </div>
      </div> */}
  
    </div>
  </div>
  )
}

export default WhyUs