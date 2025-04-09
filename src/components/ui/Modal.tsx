import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react'

interface IProps {
    isOpen: boolean;
    closeModal: () => void;
    title?: string;
    className?: string;
    children: ReactNode;
}

const Modal = ({isOpen, closeModal, children, title, className}: IProps) => {

return (
    <>
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal} __demoMode>
            <div className="fixed inset-0 z-10 w-screen bg-white/50 backdrop-blur-sm duration-300 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/70 border border-indigo-100 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        {
                            title && <DialogTitle as="h3" className={`text-base/7 font-medium text-indigo-600 ${className}`}>
                                    {title}
                                </DialogTitle>
                        }
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </>
)
}

export default Modal;
