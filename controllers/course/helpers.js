const addAvgRate = (courses) => {
  for (let course of courses) {
    course.avgRate = calcAvgRate(course);
  }
};

const addDurationText = (courses) => {
  for (let course of courses) {
    let duration = 0;
    for (let chap of course.chapter) {
      duration += chap.duration;
    }
    course.durationText = secondToHour(duration);
  }
};

const calcAvgRate = (course) => {
  if (course.rates.length <= 0) {
    return 0;
  }
  let avg = 0;
  for (let rate of course.rates) {
    avg += rate.score;
  }
  return avg / course.rates.length;
};

const secondToHour = (s) => {
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h${Math.floor(
    (s - Math.floor(s / 3600) * 3600) / 60
  )}m `;
};

const addAdditionalFields = (courses) => {
  addAvgRate(courses);
  addDurationText(courses);
};

module.exports = {
  calcAvgRate,
  secondToHour,
  addDurationText,
  addAvgRate,
  addAdditionalFields,
};
