import moment from "moment";

function parseDate(date: string): string {
  return moment(date).format("DD/MM/YYYY");
}

function parseDateAndTime(date: string): string {
  return moment(date).format("DD/MM/YYYY HH:mm");
}
export { parseDate, parseDateAndTime };
