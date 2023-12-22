"use client";
import BackgroundPicture1 from '../../public/foto-amanda-e-lucas-3.jpeg'
import { FaArrowRight } from "react-icons/fa";
import '@fontsource/aboreto';
import '@fontsource/gwendolyn';
import { useEffect } from 'react';
import { ModalContext, TypesOfModal } from '@/contexts/ModalContext';
import CreatePostModal from '@/components/CreatePostModal/CreatePostModal';
import axios from 'axios';


export default function Home() {
  const { postModalOpen, setPostModalOpen, setTypeOfModal } = ModalContext()

  const handleModalOpen = (typeOfModal: TypesOfModal): void => {
    setTypeOfModal(typeOfModal)
    setPostModalOpen(true)
  }

  const getNames = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/guests`)
      localStorage.setItem('GL', JSON.stringify(response.data))
      return response
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNames()
  }, [])


  return (
    <>
      <main className="flex box-border h-screen flex-col items-center justify-between p-24 overflow-hidden">
        {postModalOpen ? <CreatePostModal /> : ''}
        <div className='fixed top-0 z-0 bg-black bg-opacity-40 overflow-hidden w-screen h-screen ' />
        <img alt='background-image' src={BackgroundPicture1.src} className={(postModalOpen ? 'blur-md' : '') + ' fixed sm:-top-72 -left-96 460:-left-80 -top-10 -z-10 max-w-none sm:w-bgphoto h-full sm:h-auto sm:-left-3/4 1245:left-0 1245:w-screen 1000:-left-64 md:-left-96 1245:-top-32 lg:-left-96 lg:-top-96 10xl:-top-3/4 '} />
        <h1 className={(postModalOpen ? 'hidden ' : '') + 'fixed top-0 -left-0 sm:top-10 text-center w-full font-gwendolyn font-medium z-0 text-white text-6xl sm:text-8xl'}>
          Amanda <br className='flex sm:hidden'/> e Lucas
        </h1>

        <div className="absolute bottom-0 sm:bottom-32 h-auto w-screen grid text-center gap-4 sm:gap-28 lg:max-w-7xl sm:w-11/12 lg:mb-0 sm:h-28 sm:grid-cols-2 lg:text-left">


          <div className='flex flex-col items-center justify-center'>

            <div
              className={(postModalOpen ? 'hidden ' : '') + "group sm:rounded-lg bg-opacity-50 bg-gradient-to-b text-white h-11/12 1000:h-28 to-emerald-800 from-emerald-500 w-full sm:bg-transparent sm:bg-none border-y-2 border-emerald-900 sm:border-transparent px-5 py-2 transition-colors hover:cursor-pointer hover:bg-opacity-50 hover:border-cyan-300 hover:bg-gradient-to-b  hover:text-white hover:shadow-cyan-500 hover:shadow-xl hover:to-blue-800 hover:from-green-300"}
              onClick={() => handleModalOpen(TypesOfModal.CONFIRMATION)}
            >
              <h2 className={`flex flex-row items-center justify-center w-full gap-1 mb-3 text-2xl font-redressed`}>
                Confirmar presença
                <span className="hidden sm:flex items-center transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <FaArrowRight />
                </span>
              </h2>
              <p className={`hidden sm:flex justify-center m-0 w-full text-center text-sm tracking-wide`}>
                Confirme a sua presença na nossa festa!
              </p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>

            <div
              className={(postModalOpen ? 'hidden ' : '') + "group sm:rounded-lg  bg-opacity-50 bg-gradient-to-b h-14 1000:h-28 text-white to-emerald-800 from-emerald-500 w-full sm:bg-transparent sm:bg-none border-y-2 border-emerald-900 sm:border-transparent px-5 py-2 transition-colors hover:cursor-pointer hover:bg-opacity-50 hover:border-cyan-300 hover:bg-gradient-to-b  hover:text-white hover:shadow-cyan-500 hover:shadow-xl hover:to-blue-800 hover:from-green-300"}
              onClick={() => handleModalOpen(TypesOfModal.GIFTS)}
            >
              <h2 className={`flex flex-row items-center justify-center gap-3 mb-3 text-2xl font-redressed`}>
                Presentes
                <span className="hidden sm:flex items-center transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <FaArrowRight />
                </span>
              </h2>
              <p className={`hidden sm:flex justify-center m-0 w-full text-center text-sm tracking-wide`}>
                Veja aqui como contribuir com a nossa cerimônia e nossa lua de mel!
              </p>
            </div>
          </div>


        </div>
      </main>
    </>)
}
