import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import { CONFIG } from "./config.js";

const path = "./data.json";
const git = simpleGit();
const startDate = moment(`${CONFIG.year}-01-01`);
const endDate = moment(`${CONFIG.year}-12-31`);

const makeCommitsForDay = async (date, commitsCount) => {
  for (let i = 0; i < commitsCount; i++) {
    const commitDate = date.clone()
      .hour(random.int(8, 20))
      .minute(random.int(0, 59))
      .second(random.int(0, 59));

    const data = { date: commitDate.format() };
    await jsonfile.writeFile(path, data);
    await git.add(path);
    await git.commit(`Commit on ${commitDate.format()}`, { "--date": commitDate.format() });
  }
};

const run = async () => {
  let totalCommits = 0;
  const allDays = [];
  
  for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "day")) {
    allDays.push(date.clone());
  }

  const commitsDistribution = {
    0: 95,
    1: 85,
    2: 105,
    3: 100,
    4: 90,
    5: 75,
    6: 65,
    7: 55,
    8: 95,
    9: 100,
    10: 95,
    11: 80
  };

  for (const month in commitsDistribution) {
    let monthCommitsLeft = commitsDistribution[month];
    const daysInMonth = allDays.filter(d => d.month() === parseInt(month));
    const activeDays = daysInMonth.filter(() => random.bool(CONFIG.activeDaysPercentage));

    for (let i = 0; i < activeDays.length; i++) {
      if (monthCommitsLeft <= 0) break;
      
      const date = activeDays[i];
      const isWeekend = [0, 6].includes(date.day());
      const isSummer = [5, 6, 7].includes(date.month());
      const isWinterHolidays = (date.month() === 11 && date.date() >= 20) || (date.month() === 0 && date.date() <= 10);

      let commitsForDay;

      if (isSummer) {
        if (isWeekend) {
          commitsForDay = random.int(0, 1);
        } else {
          if (Math.random() < 0.8) {
            commitsForDay = random.int(1, 2);
          } else {
            commitsForDay = random.int(2, 4);
          }
        }
      } else if (isWinterHolidays) {
        commitsForDay = random.int(0, 1);
      } else if (isWeekend) {
        if (Math.random() < 0.6) {
          commitsForDay = random.int(0, 1);
        } else {
          commitsForDay = random.int(1, 3);
        }
      } else {
        const rand = Math.random();
        if (rand < 0.3) {
          commitsForDay = random.int(1, 3);
        } else if (rand < 0.7) {
          commitsForDay = random.int(3, 6);
        } else {
          commitsForDay = random.int(6, 10);
        }
      }

      commitsForDay = Math.min(commitsForDay, monthCommitsLeft);
      if (commitsForDay > 0) {
        monthCommitsLeft -= commitsForDay;
        await makeCommitsForDay(date, commitsForDay);
        totalCommits += commitsForDay;
      }

      if (CONFIG.pushOnSunday && date.day() === 0) {
        await git.push("origin", "main");
      }
    }
  }

  await git.push("origin", "main");
  console.log(`Total commits made: ${totalCommits}`);
  console.log(`Target was: ${CONFIG.targetCommits}`);
};

run().catch(console.error);