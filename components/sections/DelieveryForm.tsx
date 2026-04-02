"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { Button } from "../helpers/LetsTalkButton"
import LetsTalkButton from "../helpers/MainButton"

export default function LogisticsFormSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    message: "",
  })

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    // Optional entrance animation – you can also replace with a scroll-triggered animation
    gsap.fromTo(
      sectionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
  }, [])

  // Name: only letters, spaces, hyphens
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')
    setForm({ ...form, name: value })
  }

  // Generic text change for email, message
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Restrict to digits only for numeric fields
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const digits = value.replace(/\D/g, "")
    setForm({ ...form, [name]: digits })
  }

  // Phone formatter: +7 (XXX) XXX XX XX (10 digits after +7)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 0) {
      // Ensure starts with 7, and limit to 11 digits total (7 + 10)
      if (!value.startsWith("7")) value = "7" + value.slice(0, 10)
      value = value.slice(0, 11)

      // Format: +7 (XXX) XXX XX XX
      let formatted = "+7"
      if (value.length > 1) {
        formatted += " (" + value.slice(1, 4)
      }
      if (value.length >= 4) {
        formatted += ") " + value.slice(4, 7)
      }
      if (value.length >= 7) {
        formatted += " " + value.slice(7, 9)
      }
      if (value.length >= 9) {
        formatted += " " + value.slice(9, 11)
      }
      setForm({ ...form, phone: formatted })
    } else {
      setForm({ ...form, phone: "" })
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFiles([...files, ...Array.from(e.target.files)])
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/

    if (!phoneRegex.test(form.phone)) {
      alert("Введите номер в формате +7 (XXX) XXX XX XX")
      return
    }

    console.log(form, files)
    // Here you would send data to your API
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Есть идея? <span className="font-bold">Мы доставим решение.</span>
      </h2>

      <p className="text-gray-500 mt-2 mb-6 text-sm sm:text-base">
        Расскажите нам о вашем грузе и задаче
      </p>

      <form onSubmit={submit} className="space-y-5 sm:space-y-6">
        <input
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleNameChange}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="+7 (___) ___ __ __"
          value={form.phone}
          onChange={handlePhoneChange}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Ваш email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="weight"
            placeholder="Вес (кг)"
            value={form.weight}
            onChange={handleNumericChange}
            inputMode="numeric"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              name="length"
              placeholder="Длина"
              value={form.length}
              onChange={handleNumericChange}
              inputMode="numeric"
              className="border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
            />
            <input
              name="width"
              placeholder="Ширина"
              value={form.width}
              onChange={handleNumericChange}
              inputMode="numeric"
              className="border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
            />
            <input
              name="height"
              placeholder="Высота"
              value={form.height}
              onChange={handleNumericChange}
              inputMode="numeric"
              className="border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base"
            />
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Опишите ваш груз или задачу..."
          rows={3}
          value={form.message}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-blue-500 transition text-base"
        />

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-blue-400 transition">
          <p className="text-gray-500 mb-3 text-sm sm:text-base">
            Прикрепить файлы (инвойсы, фото, документы)
          </p>
          <input
            type="file"
            multiple
            onChange={handleFile}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {files.length > 0 && (
            <p className="text-sm mt-2 text-gray-600">
              Файлов выбрано: {files.length}
            </p>
          )}
        </div>
        <LetsTalkButton children="ОТПРАВИТЬ ЗАЯВКУ" />
        {/* <button
          type="submit"
          className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition text-base"
        >
          ОТПРАВИТЬ ЗАЯВКУ
        </button> */}
      </form>
    </section>
  )
}