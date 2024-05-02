import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat)

export function formatDate(date, format = 'MMMM Do, YYYY', tz = 'America/Chicago') {
    if (!date) return '';
    return dayjs(date).tz(tz).format(format);
}