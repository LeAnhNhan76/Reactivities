import moment from 'moment';

const formatDate = (date: Date, format = 'MMMM D, YYYY') =>
  date ? moment(date).format(format) : date;

const formatDateTime = (date: Date, format = 'MMMM D, YYYY, h:mm A') =>
  date ? moment(date).format(format) : date;

const formatDateTimeForAPI = (date: Date) =>
  date
    ? moment(date)
        .utc()
        .format()
    : date;

const formatDateTimeConversational = (date: Date) => (date ? moment(date).fromNow() : date);

export {
  formatDate,
  formatDateTime,
  formatDateTimeForAPI,
  formatDateTimeConversational
}
