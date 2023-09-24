import { PagingParams } from "../types/paging.type";
import { ToastPosition } from "../types/toast.type";

const DefaultPaging: PagingParams = {
    pageIndex: 1,
    itemsPerPage: 5
}

const DefaultToast = {
    Position: "bottom-right" as ToastPosition,
    Duration: 500,
    ResetDuration: 1000
};

export {
    DefaultPaging,
    DefaultToast
}