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
          className= {(centralize ? 'sm:items-center' : 'sm:items-start' ) + ' relative items-start flex overflow-y-scroll mx-auto h-4/5 w-full md:w-4/5 rounded-3xl border-2 border-cyan-800  bg-emerald-100/80'}
        >
          <div className="absolute flex flex-col rounded-xl items-center justify-center top-0 right-14 w-auto h-32">
                <p className="hidden 1000:flex text-emerald-600 text-medium text-xl font-redressed">
                    Data: 27/01/24
                </p>
                <p className="hidden 1000:flex text-emerald-600 text-medium text-xl font-redressed">
                    às 19:00
                </p>
            </div>
          <CreatePostForm choseAttendance={setCentralize}/>
        </div> :
        <div
        ref={ref}
        className= {(centralize ? 'sm:items-center' : 'sm:items-start' ) + ' relative flex overflow-y-scroll mx-auto h-4/5 w-full md:w-4/5 rounded-3xl border-2 border-cyan-800  bg-emerald-100/80'}
      >
        <PixPage />
      </div>
        }
      </div>
    </div>
  );
}