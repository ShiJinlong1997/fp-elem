import { DayNumOfMonth } from '@/util.js';

const DateInfo = date => ({
  year: date.getFullYear(),
  monthIndex: date.getMonth(),
  dayOfMonth: date.getDate(),
  dayOfWeek: date.getDay(),
});

/** x年x月1日 `Date` */
const FstDateOfMonth = ({ year, monthIndex }) => new Date(year, monthIndex);

/** `DateInfo` 转成相邻月份1日 */
const toAdjacentMonth = (monthIndexCond, TF, RF) => (
  R.ifElse( R.compose( monthIndexCond, R.prop('monthIndex') ), TF, RF )
);

/**
 * x年x月1日 `DateInfo`
 * @param {Function} f 
 * @param {Date} date 
 * @returns {ReturnType<DateInfo>}
 */
const FstDateInfoOfMonth = (f, date) => R.compose( DateInfo, FstDateOfMonth, f, DateInfo )(date);

/** 本月和相邻月份1日 `Date` */
export const DateInfoDic = date => ({
  get prevMonth() {
    return FstDateInfoOfMonth(
      toAdjacentMonth(
        R.gt(R.__, 0),
        R.evolve({ monthIndex: R.dec }),
        R.evolve({ year: R.dec, monthIndex: R.always(11) })
      ),
      date
    )
  },

  get currMonth() { return FstDateInfoOfMonth(R.identity, date) },

  get nextMonth() {
    return FstDateInfoOfMonth(
      toAdjacentMonth(
        R.lt(R.__, 11),
        R.evolve({ monthIndex: R.inc }),
        R.evolve({ year: R.inc, monthIndex: R.always(0) })
      ),
      date
    )
  },
});

export const DatesDic = R.map(R.compose( R.range(1), R.inc, DayNumOfMonth ));
