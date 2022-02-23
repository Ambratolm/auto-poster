///==============================================================================
// ■ Schedule (schedule.js)
//------------------------------------------------------------------------------
//     A class representing a schedule of an intended time.
//==============================================================================

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class Schedule {
  interval = "P1D"; // Duration in ISO-8601 format (P_Y_M_DT_H_M_S)
  reference = ""; // Date in Milliseconds (Since Unix epoch)

  constructor(schedule = {}) {
    const { interval, reference } = schedule;
    if (interval) this.interval = interval;
    if (reference) this.reference = reference;
  }

  get intervalDuration() {
    const intervalDuration = dayjs.duration(this.interval);
    return dayjs.isDuration(intervalDuration) ? intervalDuration : null;
  }

  get referenceDate() {
    const referenceDate = dayjs(this.reference);
    return referenceDate.isValid() ? referenceDate : null;
  }

  get intendedDate() {
    return this.referenceDate && this.intervalDuration
      ? this.referenceDate.add(this.intervalDuration)
      : dayjs();
  }

  get isAlready() {
    return !this.intendedDate.isAfter(dayjs()); // Is by now or before
  }

  toString() {
    let intervalText = chalk.grey("no recurrence");
    let referenceText = chalk.grey("never done");
    let intendedText = this.intendedDate.fromNow();

    if (this.intervalDuration) {
      intervalText = this.intervalDuration
        .humanize()
        .replace("a ", "")
        .replace("an ", "");
      intervalText = chalk.whiteBright(`every ${intervalText}`);
    }

    if (this.referenceDate) {
      referenceText = this.referenceDate.fromNow();
      referenceText = chalk.whiteBright(`lately done ${referenceText}`);
    }

    if (this.isAlready) {
      intendedText = `is ready ${intendedText}`;
      intendedText = chalk.green(intendedText);
    } else {
      intendedText = `will be ready ${intendedText}`;
      intendedText = chalk.red(intendedText);
    }

    return `${intervalText}, ${referenceText}, ${intendedText}`;
  }
};
