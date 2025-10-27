"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINK_NAMES } from "./consts";

export const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (!segments.length) {
        return null;
    }

    return (
        <nav className="text-sm text-gray-500 mb-5">
            <ul className="flex items-center gap-2">
                <li>
                    <Link href="/" className="blue-font">
                        Главная
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;
                    // делаем первую букву заглавной
                    const label =
                        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
                    const linkText = LINK_NAMES[segment as keyof typeof LINK_NAMES] || label;



                    return (
                        <li key={href} className="flex items-center gap-2">
                            <span>/</span>
                            {isLast ? (
                                <span className="gray-font">{linkText}</span>
                            ) : (
                                <Link href={href} className="gray-font">
                                    {linkText}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}