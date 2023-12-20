import React, { Suspense, useEffect, useRef } from 'react';

export default function SuspenseComponentTed() {
    const targetRef = useRef<HTMLDivElement>(null)
    const classNameGridBox = "flex flex-row sm:flex-col h-full sm:h-72 items-center border-solid border-2 border-emerald-500 ";

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
    },[])

    return (
        <div ref={targetRef} className='grid grid-rows-2 sm:grid-cols-2 gap-y-5 sm:gap-y-none sm:gap-x-5 p-3 bg-emerald-200 w-full h-auto sm:h-80'>
            <Suspense >
                <div className={classNameGridBox}>
                    <p className='select-none flex justify-center items-center h-full sm:h-auto w-2/3 sm:w-full sm:border-y-2 sm:border-solid border-emerald-500 bg-emerald-300 sm:pl-7 font-redressed text-2xl sm:mb-2 sm:mt-3'>Itaú:</p>

                    <p className='relative sm:pl-2 font-redressed text-xl grid gap-0 grid-flow-row grid-cols-1 sm:grid-cols-2 justify-center items-center w-full sm:w-auto h-full '>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Instituição:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>Itaú Unibanco S.A. (0341)</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>CPF:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>134.039.467-70</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Nome completo:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>Lucas Oliveira Casal Teixeira</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Agência:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>5631</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>C/C:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>21609-9</span>
                    </p>
                </div>

                <div className={classNameGridBox}>
                    <p className='select-none flex justify-center items-center h-full sm:h-auto w-2/3 sm:w-full sm:border-y-2 sm:border-solid border-emerald-500 bg-emerald-300 font-redressed text-2xl sm:mb-2 sm:mt-3'>Nubank:</p>

                    <p className='relative sm:pl-2 font-redressed text-xl grid gap-0 grid-flow-row grid-cols-1 sm:grid-cols-2 justify-center items-center w-full sm:w-auto  h-full '>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Instituição:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>Nu Pagamentos S.A. (0260)</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>CPF:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>134.039.467-70</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Nome completo:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>Lucas Oliveira Casal Teixeira</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>Agência:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>0001</span>
                        <span className='select-none pl-2 sm:pl-0 bg-emerald-300 sm:bg-transparent w-full sm:w-32'>C/C:</span> <span className='sm:w-auto pl-7 sm:-ml-12'>32130377-1</span>
                    </p>
                </div>
            </Suspense>
        </div>
    );
};

