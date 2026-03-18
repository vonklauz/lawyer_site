"use client";

import { ServiceOrderedList } from "@/features/serviceOrderedList";
import { SearchParamsProvider } from "@/Widgets/SearchParamsProvider";
import { Suspense } from "react";

export default function ServiceOrderedPage() {
  return (
    <Suspense>
      <SearchParamsProvider component={ServiceOrderedList} />
    </Suspense>
  );
}
