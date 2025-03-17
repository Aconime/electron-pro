import { Panel } from "@/components/layout/panel";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/utils/cn";
import {
  faArrowRightLong,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import React, { ReactNode, createContext, useContext, useState } from "react";

export interface IPage {
  name: string;
  page: ReactNode;
}

function importAllPages(): IPage[] {
  const context = require.context("@/pages", true, /\.(tsx|jsx)$/);
  return context.keys().map((key) => {
    const Component = context(key).default;
    const name = key.replace(/^\.\/|\.tsx$|\.jsx$/g, "");
    return { name, page: <Component /> };
  });
}

interface NavigatorContextType {
  currentPage: string;
  setPage: (pageName: string) => void;
  pages: IPage[];
}

const NavigatorContext = createContext<NavigatorContextType | undefined>(
  undefined
);

export const NavigatorProvider = ({
  children,
  defaultPage,
}: {
  children?: ReactNode;
  defaultPage: string;
}) => {
  const pages = importAllPages();
  const [currentPage, setCurrentPage] = useState<string>(
    localStorage.getItem("currentPage") || defaultPage
  );

  const setPage = (pageName: string) => {
    setCurrentPage(pageName);
    localStorage.setItem("currentPage", pageName);
  };

  return (
    <NavigatorContext.Provider value={{ currentPage, setPage, pages }}>
      {children}
      <PageRenderer pageName={currentPage} pages={pages} />
    </NavigatorContext.Provider>
  );
};

export const useNavigator = () => {
  const context = useContext(NavigatorContext);
  if (!context) {
    throw new Error("useNavigator must be used within a NavigatorProvider");
  }
  return context;
};

export const PageRenderer = ({
  pageName,
  pages,
}: {
  pageName: string;
  pages: IPage[];
}) => {
  const selectedPage = pages.find((p) => p.name === pageName);
  return selectedPage ? <>{selectedPage.page}</> : <ErrorPage mode="dev" />;
};

export const ErrorPage = ({ mode }: { mode?: "dev" | "prod" }) => {
  const { setPage } = useNavigator();
  const pages = importAllPages();

  return (
    <div className="p-4">
      <Panel className="p-2 flex flex-col gap-2">
        <p className="text-red-500 font-bold text-lg">
          Error 404 - Page not found
        </p>

        <p className="text-sm font-medium text-gray-700 p-1.5 border-l-2 border-red-500 bg-gray-100">
          The page you navigated to could not be found.
          <br />
          Please make sure you have spelled it correctly and ensure the page
          component is located inside the `/pages` folder.
        </p>

        {mode === "dev" && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">All available pages:</p>

            <div className="flex flex-col gap-0">
              {pages.length > 0 ? (
                pages.map((page, idx) => (
                  <div
                    key={`page-${idx}`}
                    className="flex flex-row items-center gap-1"
                    onClick={() => setPage(page.name)}
                  >
                    <Icon
                      icon={faExternalLink}
                      className="mt-[2px] text-gray-500"
                    />
                    <p
                      className={cn(
                        "flex-1",
                        "pl-1",
                        "font-semibold text-gray-500",
                        "hover:bg-gray-100",
                        "cursor-pointer"
                      )}
                    >
                      {page.name}
                    </p>
                  </div>
                ))
              ) : (
                <p>
                  No available pages found. Ensure that all your page components
                  are inside the `/pages` folder.
                </p>
              )}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
};
