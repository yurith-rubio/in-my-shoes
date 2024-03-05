import { createContext, useState } from "react";
import IUser from "./typings/IUser";
import {IContextValue, Category} from "./typings/IContextValue";

const ThemeContext = createContext({} as any);

const userTemplate: IUser = {
  nickname: "",
  age: 10,
  country: "",
  email: "",
};

function ThemeProvider(props: any) {
  const [category, setCategory] = useState(Category.unspecified);
  const [userInfo, setUserInfo] = useState(userTemplate);

  const value: IContextValue = {
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