import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";



type InputProps = {
    id: string | number,
    setText: (id: string | number, text: string) => void,
    content: string,
    type: string,
    placeholder: string,
    deleteInput: (id: number) => void,
    value: string
}


export default function Input(props: InputProps) {
    const {id, setText, content, type, value, placeholder, deleteInput} = props

    return (
        <div 
        className={(value? 'border-emerald-400' : 'border-emerald-950') + ' relative flex flex-row justify-start h-24 sm:h-10 w-11/12 sm:w-5/6 mt-10 rounded-lg border-solid border-2'}>
            <label 
            className={'absolute top-0 w-20 lg:top-0 left-0 flex font-gwendolyn text-3xl text-emerald-950 items-center justify-center sm:w-1/6'}
            >{content}:
            </label>
            <input 
            onChange={(e) => setText(id, e.target.value)} 
            id={id.toString()} 
            type={type}
            value={value}
            placeholder={placeholder}
            className='absolute sm:right-0 h-full w-full pr-8 sm:pr-0 sm:w-5/6 font-thin text-3xl text-emerald-950 text-center bg-transparent text-opacity-100 font-redressed rounded-lg'
            />
            {typeof id === 'number' ? 
            <div onClick={() => deleteInput(id)} className="absolute flex items-center justify-center sm:rounded-full rounded-r-md right-0 top-0 sm:top-0 sm:-right-10 bg-red-600 text-white text-2xl w-8 h-full sm:h-8 sm:bg-transparent sm:text-red-600 sm:hover:cursor-pointer sm:hover:text-white sm:hover:bg-red-600 active:bg-red-950">
            <RxCross2 />
            </div> : ''}
        </div>
    )
}