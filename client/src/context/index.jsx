import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Truyền dữ liệu (ví dụ: user)
  const [theme, setTheme] = useState("light"); // Truyền theme

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
