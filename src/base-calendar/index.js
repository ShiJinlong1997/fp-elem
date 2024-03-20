import { ElemsHTML, Frag } from '@/util.js';

export function BaseCalendar(props) {
  function render() {
    // 本月1日在第 1 行 周x 列
    // 本月日期填完，若有空缺再填上个月和下个月的
    
    const dateInfoDic = props.DateInfoDic(state.date);
    const datesDic = props.DatesDic(dateInfoDic);

    R.compose(
      R.addIndex(R.forEach)((n, i) => (state.tds[i].innerText = n)),
      R.take(state.tds.length)
    )([
      /* 上个月天数往回推 本月1日的周x 个，再 +1 */
      ...datesDic.prevMonth.slice(datesDic.prevMonth.length - dateInfoDic.currMonth.dayOfWeek + 1),
      ...datesDic.currMonth,
      ...datesDic.nextMonth
    ])
  }

  function init() {
    props.date && (state.date = props.date);

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

    const tableSize = { row: 6, col: 7, };
    identity.querySelector('tbody').innerHTML = ElemsHTML(
      R.map(() => (
        `<tr>${
          ElemsHTML(R.map(() => `<td></td>`), R.range(0, tableSize.col))
        }</tr>`)
      ),
      R.range(0, tableSize.row)
    )
    render();
  }

  const identity = Frag(
    `<table class="base-calendar">
      <thead>
        <tr>
        ${ ElemsHTML(R.map(s => `<th>${ s }</th>`), ['一', '二', '三', '四', '五', '六', '日']) }
        </tr>
      </thead>
      <tbody><!-- --></tbody>
    </table>`
  )
  .firstElementChild;

  const state = {
    date: new Date(),
    get tds() {
      return identity.querySelectorAll('tbody td');
    },
  };

  init();

  return {
    identity,
    render,
  }
}
