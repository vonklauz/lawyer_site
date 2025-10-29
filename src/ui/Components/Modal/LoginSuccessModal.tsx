"use client"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { OTPInput } from '../Input/OTPInput'

interface LoginSuccessModalProps {
    isOpen: boolean
    error?: string
    onOtpSubmit: (otp: number) => void
}

export const LoginSuccessModal = ({ isOpen, onOtpSubmit, error }: LoginSuccessModalProps) => {

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font-light" onClose={() => { }}>
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-1 p-4-lg">
                    <DialogPanel
                        transition
                        className="w-full max-w-md  bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-black text-center mb-5">
                            Двухфакторная аутентификация
                        </DialogTitle>
                        <OTPInput onOtpSubmit={onOtpSubmit} />
                        {error && <p className='mt-2 text-sm red-font text-center'>{error}</p>}
                        <p className="text-black mt-5 text-center">
                            Введите код из приложения-генератора OTP кодов или письма на эл. почте, указанной при регистрации, чтобы продолжить.
                        </p>
                        {/* <div className="mt-4">
                            <p className="mt-2 text-sm font-normal text-center blue-font">
                                Не получили код проверки?
                            </p>
                        </div> */}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}