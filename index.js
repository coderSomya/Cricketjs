#!/usr/bin/env node
import { program } from 'commander';
import { getMatches, getLiveScore, getScorecard, getCommentary } from './src/api.js';
import { displayMatches, displayLiveScore, displayScorecard, displayCommentary } from './src/display.js';
import chalk from 'chalk';

program
  .name('cricket')
  .description('CLI tool for live cricket scores')
  .version('1.0.0');

program
  .command('init')
  .description('Show live, recent, and upcoming cricket matches')
  .action(async () => {
    try {
      const matches = await getMatches();
      displayMatches(matches);
    } catch (error) {
      console.error(chalk.red('Error fetching matches:', error.message));
    }
  });

program
  .command('live')
  .argument('<id>', 'Match ID')
  .description('Show live score for a specific match')
  .action(async (id) => {
    try {
      const score = await getLiveScore(id);
      displayLiveScore(score);
    } catch (error) {
      console.error(chalk.red('Error fetching live score:', error.message));
    }
  });

program
  .command('scorecard')
  .argument('<id>', 'Match ID')
  .description('Show detailed scorecard for a specific match')
  .action(async (id) => {
    try {
      const scorecard = await getScorecard(id);
      displayScorecard(scorecard);
    } catch (error) {
      console.error(chalk.red('Error fetching scorecard:', error.message));
    }
  });

program
  .command('commentary')
  .argument('<id>', 'Match ID')
  .description('Show live commentary for a specific match')
  .action(async (id) => {
    try {
      const commentary = await getCommentary(id);
      displayCommentary(commentary);
    } catch (error) {
      console.error(chalk.red('Error fetching commentary:', error.message));
    }
  });

program.parse();
