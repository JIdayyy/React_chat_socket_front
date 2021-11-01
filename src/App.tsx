import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "redux/store";

import Home from "pages";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
