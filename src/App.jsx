import {
  MyRoutes,
  Sidebar,
  Device,
  Light,
  Dark,
  AuthContextProvider,
  Menuambur,
  useUsuariosStore,
  Login,
  SpinnerLoader,
  // Fondo1
} from "./index";
import { useLocation } from "react-router-dom";
import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
export const ThemeContext = createContext(null);
function App() {
  const { mostrarUsuarios, datausuarios } = useUsuariosStore();

  const { pathname } = useLocation();
  // mantenemos un estado local para el tema y lo exponemos al contexto
  const [theme, setTheme] = useState("dark");
  // cunado el usuario llega o se actualiza el storem sincronizamos el tema
  React.useEffect(() => {
    const valor = String(datausuarios?.tema) === "0" ? "light" : "dark";
    setTheme(valor);
  }, [datausuarios]);
  // const theme = datausuarios?.tema === "0" ? "light" : (datausuarios?.tema === "1" ? "dark" : "light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // debug outputs para verificar que el store cambia
  // console.log("[App] datausuarios", datausuarios, "=> theme", theme);
  // useEffect(() => {
  //   console.log("[App] efecto datausuarios actual", datausuarios);
  // }, [datausuarios]);


  const { isLoading, error } = useQuery({queryKey:["mostrar usuarios"], queryFn:() =>
    mostrarUsuarios()}
  );
  if (isLoading) {
    return <SpinnerLoader/>;
  }
  if (error) {
    return <h1>Error..</h1>;
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            {pathname != "/login" ? (
              <Container className={sidebarOpen ? "active" : ""}>
                <div className="ContentSidebar">
                  <Sidebar
                    state={sidebarOpen}
                    setState={() => setSidebarOpen(!sidebarOpen)}
                  />
                </div>
                <div className="ContentMenuambur">
                  <Menuambur />
                </div>

                <Containerbody>    
                  <MyRoutes />
                </Containerbody>
              </Container>) : (<Login/>)}

            <ReactQueryDevtools initialIsOpen={true} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
`;
const Containerbody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
export default App;