"use client";

import { Inter } from 'next/font/google'
import './globals.css'
import { MyGlobalContext, TypesOfModal } from '@/contexts/ModalContext'
import { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [typeOfModal, setTypeOfModal] = useState<TypesOfModal | null>(null)

  return (
    <html lang="en">
      <head>
        <title>Amanda e Lucas</title>
        <meta property="og:title" content="Amanda e Lucas" key="title" />
      </head>
      <MyGlobalContext.Provider value={{postModalOpen, setPostModalOpen, typeOfModal, setTypeOfModal}}>
        <body className={inter.className}>{children}</body>
      </MyGlobalContext.Provider>
    </html>
  )
}
