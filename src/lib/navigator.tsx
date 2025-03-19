import { Button } from "@/components/core/button";
import { Separator } from "@/components/core/separator";
import { Icon, LuIcon } from "@/components/shared/icon";
import { cn } from "@/utils/cn";
import {
  faArrowLeftLong,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import { ArrowLeft } from "lucide-react";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IPage {
  name: string;
  page: ReactNode;
}

function importAllPages(): IPage[] {
  const context = require.context("@/pages", true, /\.(tsx|jsx)$/);
  return context
    .keys()
    .map((key) => {
      const module = context(key);
      const Component = module?.default;
      const name = key.replace(/^\.\/|\.tsx$|\.jsx$/g, "");
      return (
        Component &&
        typeof Component === "function" && { name, page: <Component /> }
      );
    })
    .filter(Boolean);
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
  className,
}: {
  children?: ReactNode;
  defaultPage: string;
  className?: string;
}) => {
  const pages = importAllPages() || [];

  const [currentPage, setCurrentPage] = useState<string>(
    localStorage.getItem("currentPage") || defaultPage
  );
  const [currentPageExists, setCurrentPageExists] = useState(true);

  const setPage = (pageName: string) => {
    setCurrentPage(pageName);
    localStorage.setItem("currentPage", pageName);
  };

  useEffect(() => {
    const exists = pages.some((p) => p.name === currentPage);
    setCurrentPageExists(exists);
  }, [currentPage, pages]);

  return (
    <NavigatorContext.Provider value={{ currentPage, setPage, pages }}>
      <div className={cn(currentPageExists && className)}>
        {currentPageExists && children}
        <PageRenderer pageName={currentPage} pages={pages} />
      </div>
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
  pages = [],
}: {
  pageName: string;
  pages: IPage[];
}) => {
  const selectedPage = pages.find((p) => p.name === pageName);

  useEffect(() => {
    if (!selectedPage) localStorage.removeItem("currentPage");
  }, [pages, pageName, selectedPage]);

  return selectedPage ? <>{selectedPage.page}</> : <ErrorPage mode="dev" />;
};

export const ErrorPage = ({ mode }: { mode?: "dev" | "prod" }) => {
  const { setPage } = useNavigator();
  const pages = importAllPages() || [];

  return (
    <div className="p-4 w-full h-screen overflow-x-hidden bg-background">
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <p className="text-red-500 font-bold text-lg">
            Error 404 - Page not found
          </p>

          <p className="self-start text-sm font-medium bg-zinc-100 text-zinc-700 px-2 py-1 border-l-4 rounded-sm border-red-500">
            The page you navigated to could not be found.
          </p>
        </div>

        <p className="self-start text-sm font-medium text-zinc-700">
          Please make sure you have spelled it correctly, and ensure the page
          component is located inside the pages folder.
          <br />
          All pages require a <span className="font-bold">
            default export
          </span>{" "}
          in order to be recognized.
        </p>

        <Separator />

        {mode === "dev" && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-0">
              {pages.length > 0 ? (
                <>
                  <p className="text-sm font-bold">All available pages:</p>
                  {pages.map((page, idx) => (
                    <div
                      key={`page-${idx}`}
                      className="flex flex-row items-center gap-1"
                      onClick={() => setPage(page.name)}
                    >
                      <Icon
                        icon={faExternalLink}
                        className="mt-[2px] text-zinc-500"
                      />
                      <p
                        className={cn(
                          "flex-1",
                          "pl-1",
                          "font-semibold text-zinc-500",
                          "hover:bg-gray-100",
                          "cursor-pointer"
                        )}
                      >
                        {page.name}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-zinc-500 italic">
                    No available pages found. Ensure that all your page
                    components are inside the{" "}
                    <span className="inline-block px-1.5 py-[1px] rounded-sm bg-zinc-100 text-zinc-700 font-medium">
                      /pages
                    </span>{" "}
                    folder.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
