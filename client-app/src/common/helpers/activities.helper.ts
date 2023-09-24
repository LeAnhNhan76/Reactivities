import { SemanticCOLORS } from "semantic-ui-react";
import { ActivityStatusEnum } from "../../enums/common.enum";
import moment from "moment";
import { formatDateTimeConversational, now } from "../../utils/dateTime.util";
import { isNotNullOrUndefined } from "../../utils/common.util";

const getActivityStatusText = (status: ActivityStatusEnum | undefined) => {
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

const getActivityStatusColor = (status: ActivityStatusEnum | undefined): SemanticCOLORS| undefined => {
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

const formatActivityDateConversational = (date: Date) => {
    if (!isNotNullOrUndefined(date)) return '';
    
    return `Activity${moment(date).isAfter(now) ? '' : ' in'} ${formatDateTimeConversational(date)}`;
}

const showTextNoOneJoin = (date: Date) => moment(date).isBefore(now) ? "No one was joined, so sad!" : "Waiting first one member...";

export {
    getActivityStatusText,
    getActivityStatusColor,
    formatActivityDateConversational,
    showTextNoOneJoin
};