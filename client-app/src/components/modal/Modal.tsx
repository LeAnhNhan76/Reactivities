import { Modal as ModalSemantic} from 'semantic-ui-react'
import { useModalStore } from '../../stores/store'
import { observer } from 'mobx-react-lite';

const Modal = () => {
  const {isOpen, children, closeModal} = useModalStore();

  if (!isOpen || children === undefined) return <></>;

  return (
    <ModalSemantic
       open={true}
       onClose={closeModal}
    >
        {children}
    </ModalSemantic>
  )
}

export default observer(Modal);