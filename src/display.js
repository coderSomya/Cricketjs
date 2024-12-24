import chalk from 'chalk';
import { table } from 'table';

export function displayMatches(matches) {
  if (!matches || matches.length === 0) {
    console.log(chalk.yellow('\nNo matches found. This could be due to:'));
    console.log('1. API rate limit exceeded');
    console.log('2. No live matches at the moment');
    console.log('3. API key issues');
    console.log('\nPlease check your API key and try again.');
    return;
  }

  console.log(chalk.bold.blue('\nCurrent Matches:'));
  matches.forEach(match => {
    console.log(chalk.green(`ID: ${match.id}`));
    console.log(chalk.green(`${match.name}`));
    console.log(chalk.white(`Type: ${match.matchType?.toUpperCase()}`));
    console.log(chalk.white(`Venue: ${match.venue}`));
    if (match.score) {
      match.score.forEach(score => {
        console.log(chalk.yellow(`${score.inning}: ${score.r}/${score.w} (${score.o})`));
      });
    }
    console.log(chalk.gray(`Status: ${match.status}`));
    console.log(chalk.gray(`Date: ${new Date(match.dateTimeGMT).toLocaleString()}`));
    console.log(chalk.gray('---'));
  });
}

export function displayLiveScore(score) {
  console.log(chalk.bold.yellow('\nMatch Information:'));
  console.log(chalk.green(`Match: ${score.name}`));
  console.log(chalk.white(`Type: ${score.matchType?.toUpperCase()}`));
  console.log(chalk.white(`Venue: ${score.venue}`));
  console.log(chalk.white(`Date: ${new Date(score.dateTimeGMT).toLocaleString()}`));
  
  if (score.score) {
    console.log(chalk.bold.yellow('\nScores:'));
    score.score.forEach(inningScore => {
      console.log(chalk.green(`${inningScore.inning}:`));
      console.log(chalk.green(`${inningScore.r}/${inningScore.w} (${inningScore.o} overs)`));
    });
  }
  
  console.log(chalk.gray(`\nStatus: ${score.status}`));
}

export function displayScorecard(scorecard) {
  console.log(chalk.bold.yellow('\nScorecard:'));
  // Format depending on the fantasy scorecard API response
  if (scorecard.score) {
    scorecard.score.forEach(inning => {
      console.log(chalk.bold.blue(`\n${inning.inning}:`));
      console.log(chalk.green(`${inning.r}/${inning.w} (${inning.o} overs)`));
    });
  }
}

export function displayCommentary(match) {
  console.log(chalk.bold.yellow('\nMatch Commentary:'));
  console.log(chalk.green(`${match.name}`));
  console.log(chalk.white(`Status: ${match.status}`));
  if (match.score) {
    match.score.forEach(inning => {
      console.log(chalk.yellow(`\n${inning.inning}: ${inning.r}/${inning.w} (${inning.o})`));
    });
  }
}