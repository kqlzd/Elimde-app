import { HelmetProvider } from "react-helmet-async";
import { AppRouter } from "./AppRouter";
function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <AppRouter />
      </div>
    </HelmetProvider>
  );
}
export default App;
