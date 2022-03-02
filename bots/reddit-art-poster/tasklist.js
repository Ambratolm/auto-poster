///==============================================================================
// ■ Reddit-Art-Poster-Tasklist (reddit-art-poster/tasklist.js)
//------------------------------------------------------------------------------
//     A class representing a list of reddit artwork posting tasks.
//==============================================================================
const Task = require("./task");
const { join, resolve } = require("path");
const writeFile = require("util").promisify(require("fs").writeFile);

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class Tasklist {
  _tasks = [];
  filePath = "./tasklist.json";

  constructor(tasklist = "") {
    if (typeof tasklist === "string") {
      tasklist = require(resolve((this.filePath = tasklist)));
    }
    this.add(tasklist);
  }

  get count() {
    return this._tasks.length;
  }

  get remainingDuration() {
    const intendedDates = this._tasks.map(task => task.schedule.intendedDate);
    const minIntendedDate = dayjs.min(intendedDates);
    const remaining = Math.abs(minIntendedDate.diff(dayjs())); // In milliseconds
    return dayjs.duration(remaining);
  }

  add(tasks = []) {
    if (Array.isArray(tasks)) {
      for (const task of tasks) {
        this._tasks.push(new Task(task));
      }
    } else {
      const task = tasks;
      this._tasks.push(new Task(task));
    }
  }

  async execute(options = {}) {
    const { save = true } = options;
    for (const [i, task] of this._tasks.entries()) {
      if (await task.execute()) await sleep(random(1000, 5000));
      if (i < this._tasks.length - 1) console.line();
    }
    if (save) await this.save();
  }

  async fetchSchedRefs(options = {}) {
    const { save = true, force } = options;
    for (const task of this._tasks) {
      if (await task.fetchScheduleReference({ force }))
        await sleep(random(1000, 5000));
    }
    if (save) await this.save();
  }

  async save() {
    const json = JSON.stringify(this._tasks, null, 2);
    if (json === undefined) throw Error("Invalid JSON format.");
    return writeFile(resolve(this.filePath), json, "utf-8");
  }

  log(options = {}) {
    const { spaced } = options;
    const countText = chalk.cyanBright(`${this.count} tasks`);
    console.log("RedditArtPoster/Tasklist", countText);
    for (const task of this._tasks) {
      if (spaced) console.line();
      console.log(`\t${task.toString("post")}.`);
      console.log(`\t\t${task.toString("schedule")}.`);
    }
    if (spaced) console.line();
  }
};
