import { PageWrapper } from "@/components/layout/page-wrapper";
import { Panel } from "@/components/layout/panel";
import React from "react";

export default function HomePage() {
  return (
    <PageWrapper>
      <Panel className="flex flex-col gap-0 p-2">
        <p className="font-semibold">This is the home page.</p>
        <p className="px-1.5 border rounded-sm self-start text-gray-500">
          home
        </p>
      </Panel>
    </PageWrapper>
  );
}
