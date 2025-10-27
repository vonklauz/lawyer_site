"use client"
import { MENU_LINKS } from "@/Consts";
import { HeaderComponent } from "./HeaderComponent";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export const Header = () => {

	const getLinks = useMemo(() => {
		return MENU_LINKS;
	}, []);

	return <QueryClientProvider client={queryClient}><HeaderComponent links={getLinks} /></QueryClientProvider>
}