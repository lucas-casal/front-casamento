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
    const classNameGridBox = "flex flex-col h-full items-center border-solid border-2 border-emerald-500 ";

    return (
        <>
        <h1 className='flex items-center justify-center pt-2 font-redressed w-full text-3xl bg-emerald-200'> Nome: Lucas Oliveira Casal Teixeira</h1>
        <div ref={targetRef} className='grid grid-cols-2 gap-x-5 p-3 bg-emerald-200 w-full h-72'>
            <Suspense >
                
                <div className={classNameGridBox}>
                    <p className='select-none w-full pl-7 font-redressed text-2xl'>QR Code:</p>

                    <div className='flex justify-center items-center mt-4 w-44 h-44 border-solid border-2 border-black rounded-3xl overflow-hidden'>
                        {loading ? (
                            <FadeLoader color="rgb(3, 131, 67)" />
                        ) : (
                            <img src={qrCodeImage.src} className="select-none w-44 h-44" />

                        )}
                    </div>
                </div>

                <div className={classNameGridBox}>
                    <p className='select-none w-full pl-7 font-redressed text-2xl'>Chave:</p>
                    <p className='font-redressed text-2xl mt-16'> <span className='select-none'>celular:</span> (21) 98108-4811</p>
                </div>
            </Suspense>
        </div>
        </>
    );
};

