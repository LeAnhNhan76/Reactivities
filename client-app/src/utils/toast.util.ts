import {toast} from 'react-semantic-toasts'

type Props = {
    title?: string;
    description?: string;
}

const toastSuccess = ({ title, description }: Props) => toast({
    type: "success",
    title: title || "Success toast",
    description: description || "Success toast description!"
});

const toastWarning = ({ title, description }: Props) => toast({
    type: "warning",
    title: title || "Warning toast",
    description: description || "Warning toast description!"
})

export {
    toastSuccess,
    toastWarning
}
