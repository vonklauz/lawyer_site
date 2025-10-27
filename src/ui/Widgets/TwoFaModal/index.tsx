"use client"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { TwoFaForm } from './components/TwoFaForm'

export const TwoFaModal: React.FC = ({ isOpen }) => (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font-light" onClose={() => { }}>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-1 p-4-lg">
                <DialogPanel
                    transition
                    className="w-full max-w-md  bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                    <DialogTitle as="h3" className="text-base/7 font-medium text-black text-center mb-5">
                        Подключение 2FA по номеру телефона
                    </DialogTitle>
                    <TwoFaForm />
                </DialogPanel>
            </div>
        </div>
    </Dialog>

)