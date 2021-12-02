import Weather from "./components/weather";
import {AnimateSharedLayout} from "framer-motion";
function App() {
  return (
    <AnimateSharedLayout>
      <Weather/>
    </AnimateSharedLayout>
  );
}

export default App;