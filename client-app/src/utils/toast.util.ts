import { toast, ToastOptions, } from 'react-semantic-toasts';

type Props = ToastOptions & {
    title?: string;
    description?: string;
}

const toastSuccess = ({ title, description, ...otherOptions }: Props) => toast({
    type: "success",
    title: title || "Success toast",
    description: description || "Success toast description!",
    time: 500,
    ...otherOptions,
});

const toastWarning = ({ title, description, ...otherOptions }: Props) => toast({
    type: "warning",
    title: title || "Warning toast",
    description: description || "Warning toast description!",
    time: 500,
    ...otherOptions
})

export {
    toastSuccess,
    toastWarning
};

