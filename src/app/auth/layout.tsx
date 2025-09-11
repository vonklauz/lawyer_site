import Image from 'next/image';
import LogoImage from '../../../public/Logo.svg';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <main>

            <div className="h-100 flex justify-center items-center">
                <div>
                    <Image src={LogoImage} alt="Logo" />
                    {children}
                </div>
            </div>
        </main>
    </>
}