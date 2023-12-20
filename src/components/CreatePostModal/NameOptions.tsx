type NameOptionsProps = {
    name: string,
    id: Number,
    setChosenName: (name: string) => void
}
export default function NameOptions(props: NameOptionsProps){
    const {id, name, setChosenName} = props

    return (
        <div onClick={() => setChosenName(name)} className="cursor-pointer active:bg-emerald-200 sm:hover:bg-emerald-600 border-solid border-b-2 border-b-emerald-400 text-emerald-900 w-full min-h-10 max-h-max pl-5 pt-1 font-redressed text-xl">
        {name}
        </div>
    )
}