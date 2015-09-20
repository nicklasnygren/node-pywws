// Get a range of dates starting at start and ending at end 
//
export function dateRange(start, end) {
  if (!start || !end) {
    throw new TypeError('range.date called with invalid aguments');
  }
  var res     = [];
  var curDate = (new Date(start*1));

  do {
    res.push(curDate.toISOString().split('T')[0]);
    curDate = new Date((new Date(curDate)).setDate(curDate.getDate() + 1));
  }
  while (curDate <= end);
  return res;
};

// Get a range of ints starting at min and ending at max
//
export function intRange(min, max) {
  var num = max - min + 1;
  return Array.apply(null, Array(num)).
    map(function (_, i) {
    return i + min;
  });
};

