import { action, observable } from "mobx";

export default class ModalStore {
    @observable isOpen = false;
    @observable children : JSX.Element| undefined;

    @action openModal = (element: JSX.Element) => {
        this.isOpen = true;
        this.children = element;
    }

    @action closeModal = () => {
        this.isOpen = false;
        this.children = undefined;
    }
}