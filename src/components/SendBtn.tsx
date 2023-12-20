import { RefObject, useEffect, useRef } from "react"
import { toast } from "react-toastify"

type BtnProps = {
    handleSend: () => void,
    content: string,
    verifyDuplicates: () => string[]

    
}

export default function SendBtn(props: BtnProps) {
    const { content, handleSend, verifyDuplicates } = props
    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
    },[])

    const alertDuplicates = () => {
        const duplicates = verifyDuplicates()
        if (duplicates.length > 0) {
            if (duplicates.length === 1) {
                toast(`O nome "${duplicates[0]}" está digitado em mais de um campo! Remova de um deles para enviar a confirmação!`)
            } else {
                toast('Alguns nomes estão repetidos! Por favor, escreva apenas uma vez cada nome para enviar a confirmação.')
            }
            return true
        }
        return false
    }

    const handleClick = () => {
        if (alertDuplicates()) return false
        handleSend()
    }

    return (
        <div
        ref={targetRef}
        onClick={() => handleClick()} 
        className=' select-none flex flex-row items-center mt-10 mb-5 bg-emerald-200 text-emerald-950 justify-center rounded-full sm:text-3xl text-2xl h-16 w-auto pl-5 pr-5 font-redressed cursor-pointer text-center hover:font-semibold hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-700 hover:bg-emerald-500 transition-colors delay-100 active:bg-emerald-950 active:shadow-none active:translate-y-1'
        >
            {content}
        </div>
    )
}