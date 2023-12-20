import React, { useEffect, useState, Suspense, useRef } from 'react';
import { FadeLoader } from 'react-spinners';
import qrCodeImage from '../../../public/qrCode-pix-Lucas.jpeg'

export default function SuspenseComponentPix() {
    const [loading, setLoading] = useState(true);
    const targetRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 1000);

        if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        return () => clearTimeout(delay);
    }, []);
    const classNameGridBox = "flex flex-row sm:flex-col sm:h-64 items-center border-solid border-2 border-emerald-500 ";

    return (
        <>
        <h1 className='flex items-center justify-center pt-2 font-redressed w-full text-xl sm:text-3xl bg-emerald-200'> Nome: Lucas Oliveira Casal Teixeira</h1>
        <div ref={targetRef} className='grid grid-rows-2 sm:grid-cols-2 gap-x-5 p-3 bg-emerald-200 w-full h-72'>
            <Suspense >
                
                <div className={classNameGridBox}>
                    <p className='select-none w-full pl-7 font-redressed text-2xl'>QR Code:</p>

                    <div className='flex justify-center items-center h-auto mb-2 w-44 md:h-44 md:w-44 mt-2 mr-4 sm:mr-0 sm:mt-4 border-solid border-2 border-black rounded-3xl overflow-hidden'>
                        {loading ? (
                            <FadeLoader color="rgb(3, 131, 67)" />
                        ) : (
                            <img src={qrCodeImage.src} className="select-none w-full h-full" />

                        )}
                    </div>
                </div>

                <div className={classNameGridBox}>
                    <p className='select-none w-5/6 pl-7 font-redressed text-2xl'>Chave:</p>
                    <p className='font-redressed text-xl sm:text-2xl w-full sm:w-auto mr-5 mt-3 sm:mt-12'> <span className='select-none'>celular:</span> <br className='md:hidden'/> (21) 98108-4811</p>
                </div>
            </Suspense>
        </div>
        </>
    );
};

