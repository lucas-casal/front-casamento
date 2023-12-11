import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { useState } from "react";
import { TypesOfGift } from "./PixPage";
import SuspenseComponentPix from "./SuspenseComponentPix";
import SuspenseComponentTed from "./SuspenseComponentTed";
type OptionComponentProps = {
    typeOfGift: TypesOfGift
}
export default function OptionComponent(props: OptionComponentProps) {
    const [open, setOpen] = useState(false)
    const { typeOfGift } = props

    const toggleSuspension = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className="text-black flex mb-5 flex-col">
            <div onClick={() => toggleSuspension()} className="relative hover:cursor-pointer font-redressed flex border-solid border-t-2 border-b-2 border-emerald-500 items-center select-none pl-2 justify-center bg-emerald-300 text-3xl w-full h-10">
                {open ? <MdArrowDropDown className='absolute left-0 ' /> : <MdArrowRight className='absolute left-0 ' />} 
                {typeOfGift === TypesOfGift.PIX ? 'Pix' : 'Transferência bancária'}
            </div>
            {open ?
                (typeOfGift === TypesOfGift.PIX ? <SuspenseComponentPix /> : <SuspenseComponentTed /> ):
                <></>
            }
        </div>
    )
}