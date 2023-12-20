"use client";
import BackgroundPictureVertical from '../../public/foto-lucas-e-amanda-2.jpeg'
import BackgroundPicture from '../../public/foto-amanda-e-lucas-3.jpeg'
import { FaArrowRight } from "react-icons/fa";
import '@fontsource/aboreto';
import '@fontsource/gwendolyn';
import { useEffect, useState } from 'react';
import { ModalContext, TypesOfModal } from '@/contexts/ModalContext';
import CreatePostModal from '@/components/CreatePostModal/CreatePostModal';
import axios from 'axios';


export default function Home() {
  const { postModalOpen, setPostModalOpen, setTypeOfModal } = ModalContext()
  const [allGuestsArray, setAllGuestsArray] = useState<string[]>([])

  const handleModalOpen = (typeOfModal: TypesOfModal): void => {
    setTypeOfModal(typeOfModal)
    setPostModalOpen(true)
  }

  const getNames = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/guests`)
      localStorage.setItem('GL', JSON.stringify(response.data))
      setAllGuestsArray(response.data)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNames()
  }, [])

  const defineBGImage = () => {
    /*if (typeof window !== undefined) {
       console.log(typeof window)
       const screenWidth = window?.innerWidth
 
       if (screenWidth >= 640) return BackgroundPicture.src
 
       
 
     }
     return BackgroundPictureVertical.src
     */
    return BackgroundPicture.src
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
        {postModalOpen ? <CreatePostModal /> : ''}
        <div className='fixed top-0 z-0 bg-black bg-opacity-40 overflow-hidden w-screen h-screen ' />
        <img alt='background-image' src={defineBGImage()} className={(postModalOpen ? 'blur-md' : '') + ' fixed sm:-top-72 -z-10 max-w-none -left-16 top-0 sm:w-bgphoto h-full sm:h-auto sm:-left-3/4 1245:left-0 1245:w-screen 1000:-left-64 md:-left-96 1245:-top-32 lg:-top-72 10xl:-top-3/4 '} />
        <h1 className={(postModalOpen ? 'hidden ' : '') + 'fixed top-0 left-0 sm:top-10 text-center sm:w-full font-gwendolyn font-thin z-0 text-white-950 text-8xl'}>
          Amanda e Lucas
        </h1>

        <div className="absolute bottom-32 grid gap-5 text-center sm:gap-28 lg:max-w-7xl sm:w-11/12 lg:mb-0 h-28 sm:grid-cols-2 lg:text-left">


          <div className='flex flex-col items-center justify-center'>

            <div
              className={(postModalOpen ? 'hidden ' : '') + "group rounded-lg border bg-opacity-50 border-cyan-300 bg-gradient-to-b text-white h-11/12 1000:h-28 to-emerald-800 from-emerald-500 w-5/6 sm:bg-transparent sm:bg-none sm:border-transparent px-5 py-4 transition-colors hover:cursor-pointer hover:bg-opacity-50 hover:border-cyan-300 hover:bg-gradient-to-b  hover:text-white hover:shadow-cyan-500 hover:shadow-xl hover:to-blue-800 hover:from-green-300"}
              onClick={() => handleModalOpen(TypesOfModal.CONFIRMATION)}
            >
              <h2 className={`flex flex-row items-center justify-center gap-3 mb-3 text-2xl font-semibold`}>
                Confirmar presença
                <span className="flex items-center transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <FaArrowRight />
                </span>
              </h2>
              <p className={`m-0 w-full text-center text-sm tracking-wide`}>
                Confirme a sua presença na nossa festa!
              </p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>

            <div
              className={(postModalOpen ? 'hidden ' : '') + "group rounded-lg border bg-opacity-50 border-cyan-300 bg-gradient-to-b h-11/12 1000:h-28 text-white h-28 to-emerald-800 from-emerald-500 w-5/6 sm:bg-transparent sm:bg-none sm:border-transparent px-5 py-4 transition-colors hover:cursor-pointer hover:bg-opacity-50 hover:border-cyan-300 hover:bg-gradient-to-b  hover:text-white hover:shadow-cyan-500 hover:shadow-xl hover:to-blue-800 hover:from-green-300"}
              onClick={() => handleModalOpen(TypesOfModal.GIFTS)}
            >
              <h2 className={`flex flex-row items-center justify-center gap-3 mb-3 text-2xl font-semibold`}>
                Presentes
                <span className="flex items-center transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <FaArrowRight />
                </span>
              </h2>
              <p className={`m-0 w-full text-center text-sm tracking-wide`}>
                Veja aqui como contribuir com a nossa cerimônia e nossa lua de mel!
              </p>
            </div>
          </div>


        </div>
      </main>
    </>)
}
