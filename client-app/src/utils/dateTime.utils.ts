import moment from "moment";
import { dateTimeFormat } from "../constants/dateTime.constants";

export const formatDate = (
    date: any,
    format = dateTimeFormat.momentDateFormat
  ) => (date ? moment(date).format(format) : date);
  
  export const formatDateTime = (
    date: any,
    format = dateTimeFormat.momentDateTimeFormat
  ) => (date ? moment(date).format(format) : date);
  
  export const formatDateTimeForAPI = (date: any) =>
    date ? moment(date).utc().format() : date;