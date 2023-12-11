
type BtnProps = {
    handleSend: () => void,
    content: string
}

export default function SendBtn(props: BtnProps) {
    const { content, handleSend} = props

    return (
        <div
        onClick={() => handleSend()} 
        className=' flex flex-row items-center mt-10 mb-5 bg-emerald-200 text-emerald-950 justify-center rounded-full text-3xl h-20 w-auto pl-5 pr-5 font-redressed hover:cursor-pointer text-center hover:font-semibold hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-700 hover:bg-emerald-500 transition-colors delay-100 active:bg-emerald-950 active:shadow-none active:translate-y-1'
        >
            {content}
        </div>
    )
}