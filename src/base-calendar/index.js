import { glue } from '@/util.js';
import { DateInfoDic, DatesDic } from './use-date-info.js';

export function BaseCalendar(props) {
  const tableSize = { row: 6, col: 7 };
  const countTds = R.compose( R.product, R.values )(tableSize);
  const dateInfoDic = DateInfoDic(props.date);
  const datesDic = DatesDic(dateInfoDic);

  // 本月1日在第 1 行 周x 列
  // 本月日期填完，若有空缺再填上个月和下个月的
  const splitEveryWeek = R.compose( R.splitEvery(tableSize.col), R.take(countTds), R.reduce(R.concat,[]) );
  const datesSliced = [
    /* 上个月天数往回推 本月1日的周x 个，再 +1 */
    R.slice(
      datesDic.prevMonth.length - dateInfoDic.currMonth.dayOfWeek + 1,
      Number.POSITIVE_INFINITY,
      datesDic.prevMonth
    ),
    datesDic.currMonth,
    datesDic.nextMonth
  ];

  function html() {
    return (
      `<table class="base-calendar">
        <thead>
          <tr>
          ${ glue(R.map(s => `<th>${ s }</th>`, ['一','二','三','四','五','六','日'])) }
          </tr>
        </thead>
        <tbody>
        ${glue(
          R.map(
            xs => (
              `<tr>${
                glue(R.map(n => (`<td>${ n }</td>`), xs))
              }</tr>`
            ),
            splitEveryWeek(datesSliced)
          )
        )}
        </tbody>
      </table>`
    );
  }

  function init() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      .base-calendar {
        text-align: center;
        border-collapse: collapse;

        &, th, td { border: 1px solid currentColor; }

        td {
          width: 2em;
          height: 2em;
        }
      }
    `)
    document.adoptedStyleSheets.push(sheet);
  }

  init();
  reef.component('#base-calendar', html);
}
