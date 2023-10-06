export function getCurTime() {
  const curTime = new Date();
  const formatter = new Intl.DateTimeFormat("us", {
    year: "numeric",
    month: "2-digit", // 2位数字表示月份
    day: "2-digit", // 2位数字表示日期
    hour: "2-digit", // 2位数字表示小时
    minute: "2-digit", // 2位数字表示分钟
    second: "2-digit", // 2位数字表示秒钟
  });
  return formatter.format(curTime);
}
