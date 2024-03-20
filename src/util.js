export const ElemsHTML = R.transduce(R.__, R.concat, '', R.__);

export const Frag = html => {
  const tmplElem = document.createElement('template');
  tmplElem.innerHTML = html;
  return tmplElem.content;
};

export const preventDefault = event => (event.preventDefault(), event);

/** pseudo random id */
export const RndId = () => Math.random().toString(36).slice(2);

export const RndInt = R.curry(
  /**
   * return an integer x, min <= x < max
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  (min, max) => R.compose( R.add(min), Math.floor, R.multiply(max - min) )(Math.random())
);

export const isLeapYear = R.anyPass([
  R.compose( R.equals(0), R.modulo(R.__, 400) ),
  R.allPass([
    R.compose( R.equals(0), R.modulo(R.__, 4) ),
    R.compose( R.not, R.equals(0), R.modulo(R.__, 100) )
  ])
]);

export const DayNumOfMonth = R.cond([
  [R.compose( R.includes(R.__, [1,3,5,7,8,10,12]), R.inc, R.prop('monthIndex') ), R.always(31)],
  [R.compose( R.includes(R.__, [4,6,9,11]),        R.inc, R.prop('monthIndex') ), R.always(30)],
  [R.T, R.ifElse( R.compose( isLeapYear, R.prop('year') ), R.always(29), R.always(28) )]
]);

