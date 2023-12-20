import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Attendance } from "./CreatePostModal/CreatePostForm";

type BtnProps = {
    id: Attendance,
    setAttendance: Dispatch<SetStateAction<Attendance | null>>,
    content: string,
    attendance: Attendance | null
}

export default function AttendanceBtn(props: BtnProps) {
    const [selected, setSelected] = useState(false)
    const {id, attendance, setAttendance, content} = props
    useEffect(() => {
        if(attendance === id){
            setSelected(true)
        } else{
            setSelected(false)
        }
    })
    return (
        <div id={id.toString()}
        onClick={() => attendance === id ? setAttendance(null) : setAttendance(id)} 
        className={
            (selected ? 
            ' font-semibold text-white -translate-y-1 shadow-lg shadow-neutral-700 bg-emerald-500 ' : 
            'text-emerald-950 bg-emerald-200') + 
            ' select-none flex flex-row items-center ml-2 mr-2 justify-center rounded-full text-2xl sm:text-3xl sm:h-20 w-36 sm:w-auto pl-5 pr-5 font-redressed hover:cursor-pointer text-center sm:hover:font-semibold sm:hover:text-white sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:shadow-neutral-700 sm:hover:bg-emerald-500 transition-colors delay-100 active:text-emerald-100 active:bg-emerald-950 active:shadow-none active:translate-y-1'}
        >
            {content}
        </div>
    )
}