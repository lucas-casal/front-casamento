
import "@fontsource/redressed"
import 'react-toastify/dist/ReactToastify.css';
import OptionComponent from "./OptionComponent";
export enum TypesOfGift {
    PIX,
    TED
}
export default function PixPage() {
    
    return (
        <div 
        className="h-auto w-full"
        >
            <h1 className="w-full text-center font-gwendolyn text-5xl text-black mt-5">
                Cota de Lua de Mel
            </h1>
            <h2 className="w-full text-center font-redressed mb-5 text-4xl text-black mt-5">
                Você pode contribuir com:
            </h2>
            <OptionComponent typeOfGift={TypesOfGift.PIX} />
            <OptionComponent typeOfGift={TypesOfGift.TED} />
            
        </div>
    )
}