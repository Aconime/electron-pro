import React from "react";
import { NavigatorProvider } from "@/lib/navigator";
import Header from "./components/base/header";

const App = () => {
  return (
    <NavigatorProvider mainPageName="home">
      <Header />
    </NavigatorProvider>
  );
};

export default App;
