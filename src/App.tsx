import { HelmetProvider } from "react-helmet-async";
import { useRoutes } from "react-router-dom";
import { petRoutesConfig } from "./routes/pets-routes-config";

function App() {
  const routes = useRoutes(petRoutesConfig);

  return <HelmetProvider>{routes}</HelmetProvider>;
}
export default App;
