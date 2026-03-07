"use client"
import { MENU_LINKS } from "@/Consts";
import { HeaderComponent } from "./HeaderComponent";
import { useMemo } from "react";

export const Header = () => {

	const getLinks = useMemo(() => {
		return MENU_LINKS;
	}, []);

	return <HeaderComponent links={getLinks} />
}