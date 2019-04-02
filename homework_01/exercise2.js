function isWeekend() {
  const weekends = [0,5];
  const todayDate = new Date();
  const day = todayDate.getDay();

  return weekends.includes(day);
}

console.log(isWeekend());