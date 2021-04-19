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
}
