
import { FaPlus } from "react-icons/fa";
import "@fontsource/redressed"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Input from "../Input";
import AttendenceBtn from "../AttendenceBtn";
import SendBtn from "../SendBtn";

type FormProps = {
    choseAttendence: Dispatch<SetStateAction<boolean>>
}

export default function CreatePostForm(props: FormProps) {
    const [attendence, setAttendence] = useState('')
    const [name, setName] = useState('')
    const [temporary, setTemporary] = useState('')
    const [email, setEmail] = useState('')
    const [countGuests, setCountGuests] = useState(0);
    const [arrayGuests, setArrayGuests] = useState([{name: ''}]);
    const {choseAttendence} = props

    useEffect(()=> {
        if (attendence === 'willAttend'){
            choseAttendence(false)
        }else{
            setArrayGuests([])
            choseAttendence(true)
        }
    }, [attendence])
    useEffect(()=> {
        setCountGuests(arrayGuests.length)
    }, [arrayGuests.length])
    
    const handleSend = () => {
        const cleanEmptyGuestNames = arrayGuests.filter(guest => {
            if(guest.name.trim()) return true
        })
        const SendObj = {
            name,
            attendence,
            email,
            arrayGuests: cleanEmptyGuestNames
        }
        if (!SendObj.name.trim()) return toast(`Houve um erro: o nome enviado não está preenchido`) 
        if (!SendObj.attendence) return toast(`Houve um erro: você não selecionou sua presença`) 
        if (!SendObj.email.trim()) return toast(`Houve um erro: o e-mail enviado não está preenchido`) 
        
        const negative = attendence === 'willAttend' ? '' : 'não'
        const attendenceString = attendence === 'willAttend' ? 'comparecer à festa! Nos vemos lá!' : 'comparecer à festa...'
        
        if(SendObj.arrayGuests.length > 0){
            const guests: string[] = []
            SendObj.arrayGuests.forEach(guest => 
                guests.push(guest.name.split(' ')[0])
            )

            const guestsString = 
            guests.length > 1 ? ', ' + guests.slice(0, -1).join(', ') + ' e ' + guests[guests.length -1] + ` vão `
            : ' e ' + guests[guests.length -1] + ` vão `

            toast(`Confirmado que ${name}${guestsString} ${attendenceString}`)
        } else{
            toast(`Confirmado que ${name} ${negative} vai ${attendenceString}`)
        }
        
        console.log(SendObj)
    }

    const addNewGuest = () => {
        setArrayGuests(arrayGuests.concat([{ name: '' }]));
    }
    const handleText = (id: string | number, text: string) => {
        if (id === 'name') setName(text) ; 
        if (id === 'email') setEmail(text) ;
        setTemporary(text)
        if (typeof id === "number") { arrayGuests[id].name = text }

    }

    const deleteInput = (id: number) => {
        setArrayGuests(arrayGuests.slice(0, id).concat(arrayGuests.slice(id+1)))
    }
    return (
        <>
        <form className='absolute flex flex-col items-center justify-center h-auto w-full'>
            <h1 className="w-full text-center font-gwendolyn text-5xl text-black mt-5">Confirmação de presença</h1>
            <Input id='name' type='name' content='Nome' placeholder="Insira aqui o seu nome" setText={handleText} value={name} deleteInput={deleteInput}/>
            <Input id='email' type='email' content='E-mail' placeholder="Insira aqui o seu e-mail" setText={handleText} value={email} deleteInput={deleteInput}/>

            <div className="flex flex-row w-full items-center justify-evenly mt-10">
                <AttendenceBtn id='willAttend' attendence={attendence} setAttendence={setAttendence} content='Vou comparecer' />
                <AttendenceBtn id='willNotAttend' attendence={attendence} setAttendence={setAttendence} content='Não vou comparecer' />
            </div>

            {arrayGuests.map((guest, index) => {
                return (
                    <Input key={index} id={index} type='name' content="Nome" value={guest.name} placeholder={`Insira aqui o nome do acompanhante ${index + 1}`} setText={handleText} deleteInput={deleteInput} />
                )
            })}
            {attendence === 'willAttend' ? 
                <div onClick={() => addNewGuest()} className='flex items-center text-emerald-950 mt-10 pl-3 pr-3 text-3xl justify-center h-auto min-w-3/5 sm:w-3/5 font-redressed hover:cursor-pointer text-center sm:hover:font-semibold sm:hover:text-white sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:shadow-neutral-700 rounded-full bg-emerald-200 sm:hover:bg-emerald-500 transition-colors delay-100 active:bg-emerald-950 active:shadow-none active:translate-y-1'>

                    <FaPlus />
                    &nbsp;
                    Adicionar acompanhante
                </div>
            : ''
            }
            {attendence ? <SendBtn content='Enviar confirmação' handleSend={handleSend}/> : ''}
        </form>
        <ToastContainer/>
        </>
    )
}