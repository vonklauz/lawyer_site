"use client"
import { MENU_LINKS } from "@/Consts";
import { RootState, store } from "@/Store";
import { HeaderComponent } from "./HeaderComponent";
import { useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";


export const Header = () => {
	const user = useSelector((state: RootState) => state.userSlice.user);

	const getLinks = useMemo(() => {
		if (user.userId) {
			return MENU_LINKS;
		}
		return MENU_LINKS.filter((item) => !item.isProtected);
	}, [user]);

	return <Provider store={store}><HeaderComponent links={getLinks} /></Provider>
}