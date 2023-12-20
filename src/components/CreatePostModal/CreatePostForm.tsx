
import { FaPlus } from "react-icons/fa";
import "@fontsource/redressed"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Input from "../Input";
import AttendanceBtn from "../AttendanceBtn";
import SendBtn from "../SendBtn";
import axios from "axios";

type FormProps = {
    choseAttendance: Dispatch<SetStateAction<boolean>>
}
const names = [
    'Amanda Alves Corrêa Peçanha',
    'Amanda Oliveira Casal Teixeira',
    'Anna Beatriz Oliveira Casal Teixeira',
    'Yasmin de Oliveira Marinho Teixeira',
    'Yasmin Ribeiro de Figueiredo Dourado'
]
let notFoundArray: string[] = [];

export default function CreatePostForm(props: FormProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const [attendance, setAttendance] = useState<Attendance | null>(null)
    const [name, setName] = useState('')
    const [temporary, setTemporary] = useState('')
    const [email, setEmail] = useState('')
    const [arrayGuests, setArrayGuests] = useState([{name: ''}]);
    const [writtenNames, setWrittenNames] = useState<string[]>([])
    const [notFoundState, setNotFoundState] = useState<string[]>([])
    const [check, setCheck] = useState(false)
    const {choseAttendance} = props

    useEffect(()=> {
        if (attendance === Attendance.TRUE){
            choseAttendance(false)
        }else{
            setArrayGuests([])
            choseAttendance(true)
        }
    }, [attendance])

    
    const handleSend = async () => {
        const sentNames: string[] = [];
        const cleanEmptyGuestNames = arrayGuests.filter(guest => {
            if(guest.name.trim()) {
                sentNames.push(guest.name)
                return true
            }
        })
        sentNames.push(name)
        setArrayGuests(cleanEmptyGuestNames)
        const SendObj = {
            names: sentNames,
            willAttend: attendance === Attendance.TRUE ? 'TRUE' : 'FALSE' ,
            email,
        }
        if (!name.trim()) return toast(`Houve um erro: o nome enviado não está preenchido`) 
        if (!SendObj.willAttend) return toast(`Houve um erro: você não selecionou sua presença`) 
        if (!SendObj.email.trim()) return toast(`Houve um erro: o e-mail enviado não está preenchido`) 
        
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/confirmation`, SendObj)
        
        const negative = attendance === Attendance.TRUE ? '' : 'não'
        const attendanceString = attendance === Attendance.TRUE ? 'comparecer à festa! Nos vemos lá!' : 'comparecer à festa...'

        if(cleanEmptyGuestNames.length > 0){
            const guests: string[] = []
            cleanEmptyGuestNames.forEach(guest => 
                guests.push(guest.name.split(' ')[0])
            )

            const guestsString = 
            guests.length > 1 ? ', ' + guests.slice(0, -1).join(', ') + ' e ' + guests[guests.length -1] + ` vão `
            : ' e ' + guests[guests.length -1] + ` vão `

            toast(`Confirmado que ${name}${guestsString} ${attendanceString}`)
        } else{
            toast(`Confirmado que ${name} ${negative} vai ${attendanceString}`)
        }
        if(check){
            setCheck(false)            
        } else{
            setCheck(true)
        }
    setNotFoundState([])
       } catch (error: any) {
        if (error.response?.status === 404){

        let message = error.response?.data?.message
        notFoundArray = message?.split(',')
        setNotFoundState(notFoundArray)
        message = message.replaceAll(',', ', ')
        
        alert(`Não foi possível encontrar ${
            (notFoundArray.length === 1) ? message :
            message = message.replace(/(.*), (.*)/, '$1 e $2')
        } na lista de convidados!`)

        if(check){
            setCheck(false)            
        } else{
            setCheck(true)
        }

        }
       }
    }
    

    const addNewGuest = () => {
        setArrayGuests(arrayGuests.concat([{ name: '' }]));
    }

    const handleText = (id: string | number, text: string) => {
        if (id === 'name') setName(text) ; 
        if (id === 'email') setEmail(text) ;
        setTemporary(text)
        if (typeof id === "number") { arrayGuests[id].name = text }
        const written: string[] = []
        arrayGuests.forEach(obj => {
            written.push(obj.name)
        })
        written.push(name)
        setWrittenNames(written)
        
    }

    useEffect(() => {
        const written: string[] = []
        arrayGuests.forEach(obj => {
            written.push(obj.name)
        })
        written.push(name)
        setWrittenNames(written)
    }, [arrayGuests])

    const verifyDuplicates = () => {
        const duplicatedNames: string[] = []
        writtenNames.forEach((name, index) => {
            if(writtenNames.indexOf(name) !== index) { 
                duplicatedNames.push(name)
            }
        })
        return duplicatedNames
    }
    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
    },[])

    const deleteInput = (id: number, name:string | null) => {
        setArrayGuests(arrayGuests.slice(0, id).concat(arrayGuests.slice(id+1)))
        setWrittenNames
    }
    return (
        <>
        <form className='absolute flex py-5 flex-col items-center justify-center h-auto w-full'>
            <h1 className="w-full text-center font-gwendolyn text-5xl text-black">Confirmação de presença</h1>
            <Input check={check} notFoundState={notFoundState} verifyDuplicates={verifyDuplicates} id='name' type='name' content='Nome' placeholder="Insira aqui o seu nome" setText={handleText} value={name} deleteInput={deleteInput}/>
            <Input check={check} notFoundState={notFoundState} verifyDuplicates={verifyDuplicates} id='email' type='email' content='E-mail' placeholder="Insira aqui o seu e-mail" setText={handleText} value={email} deleteInput={deleteInput}/>

            <div className="flex flex-row w-full items-center justify-evenly mt-4 sm:mt-10">
                <AttendanceBtn id={Attendance.TRUE} attendance={attendance} setAttendance={setAttendance} content='Vou comparecer' />
                <AttendanceBtn id={Attendance.FALSE} attendance={attendance} setAttendance={setAttendance} content='Não vou comparecer' />
            </div>

            {arrayGuests.map((guest, index) => {
                return (
                    <Input  check={check} notFoundState={notFoundState} verifyDuplicates={verifyDuplicates} key={index} id={index} type='name' content="Nome" value={guest.name} placeholder={`Acompanhante ${index + 1}`} setText={handleText} deleteInput={deleteInput} />
                )
            })}
            {attendance === Attendance.TRUE ? 
                <div onClick={() => addNewGuest()} className='flex select-none items-center text-emerald-950 mt-10 pl-3 pr-3 sm:text-3xl text-xl justify-center h-auto min-w-3/5 sm:w-3/5 font-redressed hover:cursor-pointer text-center sm:hover:font-semibold sm:hover:text-white sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:shadow-neutral-700 rounded-full bg-emerald-200 sm:hover:bg-emerald-500 transition-colors delay-100 active:text-emerald-100 active:bg-emerald-950 active:shadow-none active:translate-y-1'>

                    <FaPlus />
                    &nbsp;
                    Adicionar acompanhante
                </div>
            : ''
            }
            {attendance === Attendance.TRUE || attendance === Attendance.FALSE ? <SendBtn verifyDuplicates={verifyDuplicates} content='Enviar confirmação' handleSend={handleSend}/> : ''}
        </form>
        <ToastContainer/>
        </>
    )
}

export enum Attendance {
    TRUE,
    FALSE
}