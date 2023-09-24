import { SemanticToastContainer } from "react-semantic-toasts";
import { Outlet } from "react-router-dom";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

const App = () => {
  const { commonStore } = useStore();

  return (
    <>
      <Outlet />
      <SemanticToastContainer
        position={commonStore.toastPosition}
        animation="bounce"
      />
    </>
  );
};

export default observer(App);
