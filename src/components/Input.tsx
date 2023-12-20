import { ChangeEvent, use, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import NameOptions from "./CreatePostModal/NameOptions";
import { toast } from "react-toastify";


type InputProps = {
    id: string | number,
    setText: (id: string | number, text: string) => void,
    content: string,
    type: string,
    placeholder: string,
    deleteInput: (id: number, value: string | null) => void,
    value: string,
    verifyDuplicates: () => string[],
    notFoundState: string[],
    check: boolean
}


export default function Input(props: InputProps) {
    const { check, notFoundState, id, setText, content, type, value, placeholder, deleteInput, verifyDuplicates } = props
    const [open, setOpen] = useState(false)
    const [chosenName, setChosenName] = useState('')
    const [duplicated, setDuplicated] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)
    const names = JSON.parse(localStorage.getItem('GL')!)
    let count = 0;
    const showOptions = () => {
        if (value.trim() !== '') {
            setOpen(true)

        } else {
            setOpen(false)
        }
    }

    const slowBlur = () => {
        setTimeout(() => setOpen(false), 200)

    }

    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        count = 0
        setChosenName('')
        setText(id, e.target.value)
    }

    const alertDuplicates = () => {
        const duplicates = verifyDuplicates()
        if (duplicates.length > 0) {
            if (duplicates.length === 1) {
                toast(`O nome "${duplicates[0]}" está digitado em mais de um campo! Remova de um deles!`)
            } else {
                toast('Alguns nomes estão repetidos! Por favor, escreva apenas uma vez cada nome.')
            }
            
        }

    }

    useEffect(() => {
        if(notFoundState.indexOf(value) >= 0) {
            setUnauthorized(true)
        } else{
            setUnauthorized(false)
        }
    },[check])

    useEffect(() => {

        const duplicates = verifyDuplicates()

        if (duplicates.indexOf(value) >= 0) {
            setDuplicated(true)

        } else{
            setDuplicated(false)
        }
    }, [verifyDuplicates])

    useEffect(() => {
        if (!open) count = 0
    }, [open])

    useEffect(() => {
        if (chosenName) {
            setText(id, chosenName)
        }

    }, [chosenName])

    return (
        <div
            className={(value ? (duplicated || unauthorized ? 'border-red-500' : 'border-emerald-400') : 'border-emerald-900') + ' relative flex flex-row rounded-tr-none rounded-bl-none justify-start h-16 sm:h-10 w-11/12 sm:w-5/6 ' + (typeof id === "number" ? 'mt-10' : 'mt-8') + ' sm:mt-10 rounded-lg border-solid border-2'}
            onKeyUp={() => showOptions()}
            onBlur={() => slowBlur()}
            onFocus={duplicated ? () => {} : () => alertDuplicates()}
        >
            <label
                className={' absolute top-0 w-20 lg:top-0 left-0 flex font-gwendolyn text-xl sm:text-3xl text-emerald-950 items-center justify-center sm:w-1/6'}
            >{content}:
            </label>
            <input
                autoComplete="off"
                onChange={(e) => handleText(e)}
                id={id.toString()}
                type={type}
                value={value}
                placeholder={placeholder}
                className='absolute sm:right-0 h-full w-full sm:pr-0 sm:w-5/6 font-thin sm:text-3xl text-xl text-emerald-950 text-center bg-transparent text-opacity-100 font-redressed rounded-lg'
            />
            {typeof id === 'number' ?
                <div onClick={() => deleteInput(id, value)} className={(value ? (duplicated || unauthorized ? 'bg-red-500' : 'bg-emerald-400') : 'bg-emerald-900') + " absolute flex items-center justify-center sm:rounded-full rounded-t-md -right-0.5 -top-5 sm:top-1 sm:-right-10 text-white sm:text-3xl text-xl w-5 h-5 sm:h-6 sm:w-6 sm:bg-transparent sm:text-red-600 hover:cursor-pointer sm:hover:text-white sm:hover:bg-red-600 active:bg-red-950"}>
                    <RxCross2 />
                </div> : ''}
            {open && (id === 'name' || typeof id === 'number') && value ? <div className="absolute w-full sm:w-5/6 flex flex-col items-start justify-start pb-2 box-content bg-emerald-200 border-solid border-2 rounded-b-md border-emerald-400 top-14 sm:top-9 -right-0.5 min-h-full max-h-28 overflow-y-scroll z-50">
                {
                    names.map((name, index) => {
                        const valueFixed = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                        const nameFixed = (name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toLowerCase();
                        if (nameFixed.includes(valueFixed) || (nameFixed.includes(valueFixed.split(' ')[0]) && nameFixed.includes(' ' + valueFixed.split(' ')[1]))) {
                            count++
                            return (
                                <NameOptions key={index} id={index} name={name} setChosenName={setChosenName} />
                            )
                        }

                    })}
                {

                    count === 0 ?
                        <p className="font-redressed text-xl text-emerald-900 pl-4 pt-2 ">
                            O nome digitado não foi encontrado na lista de convidados</p>
                        :
                        ''
                }
            </div> : ''}
        </div>
    )
}