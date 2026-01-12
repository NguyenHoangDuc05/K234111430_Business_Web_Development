import { canChiDay, canChiMonth, canChiYear, convertSolar2Lunar, jdFromDate, weekdayVN } from './lunar-calendar.util';

export type LunarDetail = {
  weekday: string;
  solarDate: string;
  lunarDate: string;
  lunarYearName: string;
  lunarMonthName: string;
  lunarDayName: string;
  isLeapMonth: boolean;
};

export class LunarYear {
  constructor(
    public day: number,
    public month: number,
    public calendarYear: number
  ) {}

  findLunarYearDetail(): LunarDetail {
    const solarJd = jdFromDate(this.day, this.month, this.calendarYear);
    const lunar = convertSolar2Lunar(this.day, this.month, this.calendarYear);

    const leapText = lunar.lunarLeap ? ' (Nhuận)' : '';

    return {
      weekday: weekdayVN(this.day, this.month, this.calendarYear),
      solarDate: `${this.day}/${this.month}/${this.calendarYear}`,
      lunarDate: `${lunar.lunarDay}/${lunar.lunarMonth}/${lunar.lunarYear}${leapText}`,
      lunarYearName: canChiYear(lunar.lunarYear),
      lunarMonthName: canChiMonth(lunar.lunarMonth, lunar.lunarYear) + (lunar.lunarLeap ? ' (Nhuận)' : ''),
      lunarDayName: canChiDay(solarJd),
      isLeapMonth: lunar.lunarLeap === 1,
    };
  }
}
