import Image from 'next/image';
import LogoImage from '../../../public/Logo.svg';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <main>
            <div className="dynamic-full-height flex justify-center items-center p-[16px]">
                <div className='w-full max-w-[520px]'>
                    <div className=" flex justify-center pb-[40px]">
                        <Image src={LogoImage} alt="Logo"/>
                    </div>
                    {children}
                </div>
            </div>
        </main>
    </>
}