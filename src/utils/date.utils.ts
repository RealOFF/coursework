import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DateUtils {
	static getUTCDate(date: string): Date {
		return dayjs(date).utc(true).toDate();
	}
}
