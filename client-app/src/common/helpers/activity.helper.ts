import { SemanticCOLORS } from "semantic-ui-react";
import { ActivityStatusEnum } from "../../enums/common.enum";

const getStatusText = (status: ActivityStatusEnum | undefined) => {
    if (status === undefined) return '';

    switch (status) {
        case ActivityStatusEnum.Pending:
            return 'Comming';
        case ActivityStatusEnum.Active:
            return 'Active';
        case ActivityStatusEnum.InActive:
            return 'Inactive';
        default:
            return 'Draft';
    }
}

const getStatusColor = (status: ActivityStatusEnum | undefined): SemanticCOLORS| undefined => {
    if (status === undefined) return undefined;

    switch (status) {
        case ActivityStatusEnum.Pending:
            return 'yellow';
        case ActivityStatusEnum.Active:
            return 'green';
        case ActivityStatusEnum.InActive:
            return 'red';
        case ActivityStatusEnum.Draft:
            return 'grey';
    }
} 

export const ActivityHelper ={
    getStatusText,
    getStatusColor
};