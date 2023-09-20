import moment from 'moment';

export const formatDate = (date: Date, format = 'MMMM D, YYYY') =>
  date ? moment(date).format(format) : date;

export const formatDateTime = (date: Date, format = 'MMMM D, YYYY, h:mm A') =>
  date ? moment(date).format(format) : date;

export const formatDateTimeForAPI = (date: Date) =>
  date
    ? moment(date)
        .utc()
        .format()
    : date;

export const formatDateTimeConversational = (date: Date) => (date ? moment(date).fromNow() : date);
