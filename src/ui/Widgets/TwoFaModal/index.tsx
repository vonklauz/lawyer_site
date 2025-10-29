"use client"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { TwoFaForm } from './components/TwoFaForm'

interface TwoFaModalProps {
    isOpen: boolean
    mode: string | null;
    isChosenMode: boolean;
    handleClose: () => void
    onChange2FaMethod: (twoFaState: string, mode: string | null) => void
}

const config = {
    totp: {
        title: 'Подключение 2FA через приложение-генератор OTP кодов'
    },
    email: {
        title: 'Подключение 2FA по электронной почте',
    }
}

export const TwoFaModal = ({ isOpen, mode, isChosenMode, handleClose, onChange2FaMethod }: TwoFaModalProps) => {

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font-light" onClose={handleClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-1 p-4-lg">
                    <DialogPanel
                        transition
                        className="w-full max-w-md  bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-black text-center mb-5">
                            {/**@ts-expect-error позже типизировать */}
                            {config[mode]?.title}
                        </DialogTitle>
                        <TwoFaForm mode={mode} isChosenMode={isChosenMode} onChange2FaMethod={onChange2FaMethod} handleClose={handleClose}/>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}