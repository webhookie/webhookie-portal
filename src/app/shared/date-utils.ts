import * as moment from "moment";
import {Moment} from "moment";

export class DateUtils {
  static format(localDate: Date): string {
    return moment(localDate).format("DD MMM YYYY HH:mm:ss.SSS");
  }

  static toLocal(utcDate: Date): Moment {
    return moment(moment.utc(utcDate)).local();
  }

  static toLocalDate(utcDate: Date): Date {
    return DateUtils.toLocal(utcDate).toDate();
  }

  static utcString(localDate: Date, localTime: Date): string {
    let d = new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      localTime.getHours(),
      localTime.getMinutes(),
      0, 0
    );
    return moment(d).utc().format()
  }
}
