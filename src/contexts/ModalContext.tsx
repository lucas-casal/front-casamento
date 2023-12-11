import { Dispatch, SetStateAction, createContext, useContext } from "react";
export const MyGlobalContext = createContext<{
    postModalOpen: boolean | null,
    setPostModalOpen: (postModalOpen: boolean) => void,
    typeOfModal: TypesOfModal | null,
    setTypeOfModal: (typeOfModal: TypesOfModal | null) => void
}>({
    postModalOpen: null,
    setPostModalOpen: () => undefined,
    typeOfModal: null,
    setTypeOfModal: () => undefined
})
export const ModalContext = () => useContext(MyGlobalContext)

export enum TypesOfModal  {
    'CONFIRMATION',
    'GIFTS'
}
