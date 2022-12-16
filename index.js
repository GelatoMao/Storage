function formatNum(num) {
  let str = num + "";
  const arr = str.split("").reverse();
  return arr.reduce((pre, cur, index) => {
    if (index % 3 === 0) {
      if (pre) {
        return cur + "," + val;
      } else {
        return cur;
      }
    } else {
      return cur + pre;
    }
  }, "");
}
