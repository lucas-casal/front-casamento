import React, { Suspense, useEffect, useRef } from 'react';

export default function SuspenseComponentTed() {
    const targetRef = useRef<HTMLDivElement>(null)
    const classNameGridBox = "flex flex-col h-full items-center border-solid border-2 border-emerald-500 ";

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
    },[])

    return (
        <div ref={targetRef} className='grid grid-cols-2 gap-x-5 p-3 bg-emerald-200 w-full h-72'>
            <Suspense >
                <div className={classNameGridBox}>
                    <p className='select-none w-full border-t-2 border-b-2 border-solid border-emerald-500 bg-emerald-300 pl-7 font-redressed text-2xl mb-2 mt-3'>Itaú:</p>

                    <p className='relative pl-2 font-redressed text-xl grid gap-0 grid-flow-row grid-cols-2 justify-center items-center w-auto h-44 '>
                        <span className='select-none w-32'>Instituição:</span> <span className='w-56 -ml-12'>Itaú Unibanco S.A. (0341)</span>
                        <span className='select-none w-32'>CPF:</span> <span className='w-56 -ml-12'>134.039.467-70</span>
                        <span className='select-none w-32'>Nome completo:</span> <span className='w-56 -ml-12'>Lucas Oliveira Casal Teixeira</span>
                        <span className='select-none w-32'>Agência:</span> <span className='w-56 -ml-12'>5631</span>
                        <span className='select-none w-32'>C/C:</span> <span className='w-56 -ml-12'>21609-9</span>
                    </p>
                </div>

                <div className={classNameGridBox}>
                    <p className='select-none w-full border-t-2 border-b-2 border-solid border-emerald-500 bg-emerald-300 pl-7 font-redressed text-2xl mb-2 mt-3'>Nubank:</p>

                    <p className='relative pl-2 font-redressed text-xl grid gap-0 grid-flow-row grid-cols-2 justify-center items-center w-auto h-44 '>
                        <span className='select-none w-32'>Instituição:</span> <span className='w-56 -ml-12'>Nu Pagamentos S.A. (0260)</span>
                        <span className='select-none w-32'>CPF:</span> <span className='w-56 -ml-12'>134.039.467-70</span>
                        <span className='select-none w-32'>Nome completo:</span> <span className='w-56 -ml-12'>Lucas Oliveira Casal Teixeira</span>
                        <span className='select-none w-32'>Agência:</span> <span className='w-56 -ml-12'>0001</span>
                        <span className='select-none w-32'>C/C:</span> <span className='w-56 -ml-12'>32130377-1</span>
                    </p>
                </div>
            </Suspense>
        </div>
    );
};

