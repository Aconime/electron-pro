import { Button } from "@/components/core/button";
import { useNavigator } from "@/lib/navigator";
import { cn } from "@/utils/cn";
import {
  faCircleUser,
  faLongArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Header() {
  const { currentPage, setPage } = useNavigator();

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "flex flex-row items-center justify-between",
          "p-2 pl-4",
          "bg-gray-100",
          "border-b shadow-sm"
        )}
      >
        <h3 className="text-lg font-bold tracking-wide">Welcome!</h3>
        {currentPage === "user/profile" ? (
          <Button onClick={() => setPage("home")} icon={faLongArrowLeft}>
            Back to Home
          </Button>
        ) : (
          <Button onClick={() => setPage("user/profile")} icon={faCircleUser}>
            My Profile
          </Button>
        )}
      </div>
    </div>
  );
}
