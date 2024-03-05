import intUser from './IUser';

export enum Category {
    unspecified = "unspecified",
    worry = "worry",
    answer = "answer"
}
  
export interface IContextValue {
    category: Category,
    setCategory: (category: Category) => void,
    userInfo: intUser,
    setUserInfo: (userInfo: intUser) => void,
}