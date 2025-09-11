import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export const RegisterSuccessModal = ({ isOpen }: { isOpen: boolean }) => {

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                            Завершение регистрации
                        </DialogTitle>
                        <p className="mt-2 text-sm/6 text-black">
                            На указанную Вами эл. почту была отправлена ссылка для подтверждения регистрации. Перейдите по ней, чтобы активировать аккаунт.
                        </p>
                        <div className="mt-4">
                            <p className="mt-2 text-sm/6 text-black">
                                Через 3 секунды Вы будете перенаправлены на главную страницу...
                            </p>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}