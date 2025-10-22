import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();
const startDate = moment("2022-01-01");
const endDate = moment("2022-12-31");
const TARGET_TOTAL = 980;

const makeCommitsForDay = async (date, commitsCount) => {
  console.log(`📅 Creating ${commitsCount} commits for ${date.format("YYYY-MM-DD")}`);
  for (let i = 0; i < commitsCount; i++) {
    const commitDate = date.clone()
      .hour(random.int(8, 20))
      .minute(random.int(0, 59))
      .second(random.int(0, 59));

    const data = { date: commitDate.format() };
    await jsonfile.writeFile(path, data);
    await git.add(path);
    await git.commit(`Commit on ${commitDate.format()}`, { "--date": commitDate.format() });
    console.log(`✅ Commit ${i + 1}/${commitsCount} on ${commitDate.format("YYYY-MM-DD HH:mm:ss")}`);
  }
};

const run = async () => {
  let totalCommits = 0;
  const allDays = [];
  
  console.log("📊 Generating days for entire 2022...");
  for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "day")) {
    allDays.push(date.clone());
  }

  const commitsDistribution = {
    0: 95,    // Ιανουάριος
    1: 85,    // Φεβρουάριος
    2: 105,   // Μάρτιος
    3: 100,   // Απρίλιος
    4: 90,    // Μάιος
    5: 75,    // Ιούνιος
    6: 65,    // Ιούλιος
    7: 55,    // Αύγουστος
    8: 95,    // Σεπτέμβριος
    9: 100,   // Οκτώβριος
    10: 95,   // Νοέμβριος
    11: 80    // Δεκέμβριος
  };

  console.log("🎯 Monthly distribution:", commitsDistribution);

  for (const month in commitsDistribution) {
    const monthName = moment().month(month).format("MMMM");
    console.log(`\n🌙 Starting month: ${monthName}`);
    
    let monthCommitsLeft = commitsDistribution[month];
    const daysInMonth = allDays.filter(d => d.month() === parseInt(month));
    const activeDays = daysInMonth.filter(() => random.bool(0.70));

    console.log(`📅 ${activeDays.length} active days in ${monthName}`);

    for (let i = 0; i < activeDays.length; i++) {
      if (monthCommitsLeft <= 0) {
        console.log(`⚡ Month ${monthName} target reached!`);
        break;
      }
      
      const date = activeDays[i];
      const isWeekend = [0, 6].includes(date.day());
      const isSummer = [5, 6, 7].includes(date.month());
      const isWinterHolidays = (date.month() === 11 && date.date() >= 20) || (date.month() === 0 && date.date() <= 10);

      let commitsForDay;

      if (isSummer) {
        if (isWeekend) {
          commitsForDay = random.int(0, 1);
          console.log(`🏖️  Summer weekend: ${commitsForDay} commits`);
        } else {
          if (Math.random() < 0.8) {
            commitsForDay = random.int(1, 2);
            console.log(`☀️  Summer workday (low): ${commitsForDay} commits`);
          } else {
            commitsForDay = random.int(2, 4);
            console.log(`☀️  Summer workday (high): ${commitsForDay} commits`);
          }
        }
      } else if (isWinterHolidays) {
        commitsForDay = random.int(0, 1);
        console.log(`🎄 Winter holidays: ${commitsForDay} commits`);
      } else if (isWeekend) {
        if (Math.random() < 0.6) {
          commitsForDay = random.int(0, 1);
          console.log(`😴 Weekend rest: ${commitsForDay} commits`);
        } else {
          commitsForDay = random.int(1, 3);
          console.log(`📚 Weekend work: ${commitsForDay} commits`);
        }
      } else {
        const rand = Math.random();
        if (rand < 0.3) {
          commitsForDay = random.int(1, 3);
          console.log(`📉 Low activity day: ${commitsForDay} commits`);
        } else if (rand < 0.7) {
          commitsForDay = random.int(3, 6);
          console.log(`📊 Normal day: ${commitsForDay} commits`);
        } else {
          commitsForDay = random.int(6, 10);
          console.log(`🚀 High activity day: ${commitsForDay} commits`);
        }
      }

      commitsForDay = Math.min(commitsForDay, monthCommitsLeft);
      if (commitsForDay > 0) {
        monthCommitsLeft -= commitsForDay;
        await makeCommitsForDay(date, commitsForDay);
        totalCommits += commitsForDay;

        console.log(`📈 ${date.format("YYYY-MM-DD")}: ${commitsForDay} commits | Month left: ${monthCommitsLeft} | Total: ${totalCommits}`);
      }

      // Κάνε push ΚΑΘΕ Κυριακή για ανέβασμα όλων των αλλαγών
      if (date.day() === 0) {
        console.log(`🔄 Sunday push - uploading all changes from week ${date.week()} to GitHub...`);
        await git.push("origin", "main");
        console.log(`✅ Weekly contribution graph updated for ${date.format("YYYY-MM-DD")}`);
      }
    }

    console.log(`🎉 Month ${monthName} completed: ${commitsDistribution[month] - monthCommitsLeft} commits`);
  }

  console.log(`\n🚀 Final push to GitHub...`);
  await git.push("origin", "main");
  console.log(`🎊 FINISHED!`);
  console.log(`📊 Total commits made: ${totalCommits}`);
  console.log(`🎯 Target was: ${TARGET_TOTAL}`);
  console.log(`📈 Difference: ${totalCommits - TARGET_TOTAL}`);
};

run().catch(console.error);