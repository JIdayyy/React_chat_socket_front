import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "redux/store";
import { Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/annie-use-your-telescope";
import "@fontsource/roboto";

import Join from "components/Join";
import Chat from "components/Chat";

const theme = extendTheme({
  fonts: {
    heading: "Annie Use Your Telescope",
    body: "Roboto",
  },
  colors: {
    orange: {
      default: "#F69826",
    },
    purple: {
      default: "#3C2F58",
    },
  },
});

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Join />
              </Route>
              <Route exact path="/chat" component={Chat} />
            </Switch>
          </div>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
