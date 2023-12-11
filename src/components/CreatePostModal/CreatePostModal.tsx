import { useContext, useRef, useState } from 'react';
import { MouseEvent } from 'react';

import CreatePostForm from './CreatePostForm';
import { assertIsNode } from '../../guards/assertIsNode';
import { ModalContext, TypesOfModal } from '@/contexts/ModalContext';
import PixPage from './PixPage';

export default function CreatePostModal() {
  const ref = useRef<HTMLDivElement>(null);
  const [postModalClosing, setPostModalClosing] = useState(false);
  const {postModalOpen, setPostModalOpen, typeOfModal} = ModalContext();
  const [centralize, setCentralize] = useState(false)

  function handleClickOutsideModal(e: MouseEvent) {
    assertIsNode(e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      closeModal();
    }
  }

  function closeModal() {
    setPostModalClosing(true);
    setTimeout(() => {
      setCentralize(false)
      setPostModalOpen(false);
      setPostModalClosing(false);
    }, 200);
  }

  const fadein = postModalOpen ? ' animate-fadein ' : '';
  const fadeout = postModalClosing ? ' animate-fadeout ' : '';

  return (
    <div className={fadein + fadeout + 'relative'}>
      <div className='fixed inset-0 z-50 ' aria-hidden='true' />
      <div
        className='fixed inset-0 z-50 flex w-screen items-center justify-center'
        onClick={(e) => handleClickOutsideModal(e)}
      >{typeOfModal === TypesOfModal.CONFIRMATION ?
        <div
          ref={ref}
          className= {(centralize ? 'items-center' : 'items-start' ) + ' relative flex overflow-y-scroll mx-auto h-4/5 w-full md:w-3/5 rounded-3xl border-2 border-cyan-800  bg-emerald-100/80'}
        >
          <CreatePostForm choseAttendence={setCentralize}/>
        </div> :
        <div
        ref={ref}
        className= {(centralize ? 'items-center' : 'items-start' ) + ' relative flex overflow-y-scroll mx-auto h-4/5 w-full md:w-3/5 rounded-3xl border-2 border-cyan-800  bg-emerald-100/80'}
      >
        <PixPage />
      </div>
        }
      </div>
    </div>
  );
}
/*import Image from 'next/image'
import '@fontsource/aboreto';
import '@fontsource/gwendolyn';
import '@fontsource/redressed';
import { FaPlus } from "react-icons/fa";


const names = [
    'Amanda Alves Corrêa Peçanha',
    'Amanda Oliveira Casal Teixeira',
    'Anna Beatriz Oliveira Casal Teixeira',
    'Yasmin de Oliveira Marinho Teixeira',
    'Yasmin Ribeiro de Figueiredo Dourado'
]
export default function Home() {
    return (
    <main className='h-screen  bg-gradient-to-bl flex justify-center via-sky-400 from-blue-800 to-white'>
        <h1 className='fixed top-10 font-gwendolyn font-thin z-0 text-white-950 text-8xl'>Confirme aqui a sua presença</h1>

        <form className='fixed flex flex-col items-center gap-20 justify-start top-56 h-4/6 w-2/3 text-blue-950 '>
            <div className='h-1/6  w-full rounded-lg border-solid border- border-2'>
            <input className='h-full w-full font-thin text-5xl text-center bg-transparent text-opacity-100 font-redressed rounded-lg'/>
            </div>
            <div className='flex items-center justify-center h-1/6 w-3/5 font-gwendolyn hover:cursor-pointer text-center hover:font-semibold hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-700 text-5xl rounded-full bg-blue-200 hover:bg-blue-500 transition-colors delay-100'>
            <FaPlus />
            &nbsp;
                Adicionar acompanhante
            </div>
        </form>
    </main>
    )
}
*/