import * as moment from "moment";

export class DateUtils {
  static formatUtc(date: Date): string {
    let inUTC = moment.utc(date).toDate();
    let local = moment(inUTC).local();
    return local.format("DD MMM YYYY HH:mm:ss.SSS");
  }
}
