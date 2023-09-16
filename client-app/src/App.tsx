import { SemanticToastContainer } from "react-semantic-toasts";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Outlet />
      <SemanticToastContainer position="bottom-right" animation="bounce" />
    </>
  );
};

export default App;
