import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { SemanticToastContainer } from "react-semantic-toasts";
import { useStore } from "./stores/store";

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
