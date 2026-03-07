import { MyRoutes } from "./index";
import { createContext, useState } from "react";
import { Light, Dark, AuthContextProvider } from "./index";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {styled} from "styled-components";
export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <Container>

              <Containerbody>
                <MyRoutes />
              </Containerbody>
            </Container>
            
            <ReactQueryDevtools initialIsOpen={true} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
display: grid;
grid-template-columns: 65px 1fr;
`;
const Containerbody = styled.div`
grid-column: 2;
width: 100%;
`;
export default App;
