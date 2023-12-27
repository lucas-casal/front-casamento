import { useEffect, useState } from "react"

type NameOptionsProps = {
    name: string,
    id: Number,
    setChosenName: (name: string) => void
    focused: string
}
export default function NameOptions(props: NameOptionsProps){
    const {focused, id, name, setChosenName} = props
    const [spotlight, setSpotlight] = useState(false)

    useEffect(() => {
        if(name === focused) {
            setSpotlight(true)
        } else{
            setSpotlight(false)
        }

    }, [focused])

    
    return (
        <div onClick={() => setChosenName(name)} className={(spotlight ? 'bg-emerald-500' : '') + " cursor-pointer active:bg-emerald-200 sm:hover:bg-emerald-600 border-solid border-b-2 border-b-emerald-400 text-emerald-900 w-full min-h-10 max-h-max pl-5 pt-1 font-redressed text-xl"}>
        {name}
        </div>
    )
}