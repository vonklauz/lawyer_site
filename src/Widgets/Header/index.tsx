"use client";
import { Link } from "@/shared/models/types";
import { HeaderComponent } from "./HeaderComponent";
import { useMemo } from "react";

const MENU_LINKS: Link[] = [
  {
    label: "Главная",
    path: "/",
    isProtected: true,
  },
  {
    label: "Мои организации",
    path: "/organizations",
    isProtected: false,
  },
  {
    label: "Суды",
    path: "/trials",
    isProtected: false,
  },
  {
    label: "Штрафы",
    path: "/fines",
    isProtected: true,
  },
  {
    label: "Услуги",
    path: "/service",
    isProtected: true,
  },
];

export const Header = () => {
  const getLinks = useMemo(() => {
    return MENU_LINKS;
  }, []);

  return <HeaderComponent links={getLinks} />;
};
