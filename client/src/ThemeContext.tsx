import { createContext, useState } from "react";

const ThemeContext = createContext({} as any);

function ThemeProvider(props: any) {
  const [category, setCategory] = useState("");
  const [userInfo, setUserInfo] = useState({});


  const value = {
    category: category,
    setCategory: setCategory,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };