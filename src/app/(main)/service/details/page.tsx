"use client";

import { InstanceDetailForm } from "@/features/instaceDetailForm/ui/InstanceDetailForm";
import { SearchParamsProvider } from "@/Widgets/SearchParamsProvider";
import { Suspense } from "react";

export default function ServiceFormPage() {
  return (
    <Suspense>
      <SearchParamsProvider component={InstanceDetailForm} />
    </Suspense>
  );
}
