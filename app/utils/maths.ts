import { Fixture, Team } from "@/types";
import { poisson } from "./poisson";

export const sumHomeGoalsForFixtures = (fixtures: Array<Fixture>): number => {
  return fixtures.reduce((acc: number, fixture: Fixture) => {
    return acc + (fixture as Fixture).homeScore.final;
  }, 0);
};

export const sumAwayGoalsForFixtures = (fixtures: Array<Fixture>): number => {
  return fixtures.reduce((acc: number, fixture: Fixture) => {
    return acc + (fixture as Fixture).awayScore.final;
  }, 0);
};

type GoalProbability = {
  goals: number;
  probability: number;
};

type Probabilities = {
  team: Team;
  probabilities: Array<GoalProbability>;
};

export const calculateProbabilities = (
  homeTeam: Team,
  awayTeam: Team,
  results: Array<Fixture>
): [Probabilities, Probabilities] => {
  const homeTeamHomeResults = [...results].filter(
    (f: Fixture) => f.homeTeam.id === homeTeam.id
  );
  const awayTeamAwayResults = [...results].filter(
    (f: Fixture) => f.awayTeam.id === awayTeam.id
  );

  const leagueHomeGPG = sumHomeGoalsForFixtures(results) / results.length;
  const leagueAwayGPG = sumAwayGoalsForFixtures(results) / results.length;

  const homeTeamGPG =
    sumHomeGoalsForFixtures(homeTeamHomeResults) / homeTeamHomeResults.length;
  const awayTeamGPG =
    sumAwayGoalsForFixtures(awayTeamAwayResults) / awayTeamAwayResults.length;
  const homeTeamCPG =
    sumAwayGoalsForFixtures(homeTeamHomeResults) / homeTeamHomeResults.length;
  const awayTeamCPG =
    sumHomeGoalsForFixtures(awayTeamAwayResults) / awayTeamAwayResults.length;

  const homeAttackStrength = homeTeamGPG / leagueHomeGPG;
  const homeDefenceStrength = homeTeamCPG / leagueAwayGPG;
  const awayAttackStrength = awayTeamGPG / leagueAwayGPG;
  const awayDefenceStrength = awayTeamCPG / leagueHomeGPG;

  const homeXg = homeAttackStrength * awayDefenceStrength * leagueHomeGPG;
  const awayXg = awayAttackStrength * homeDefenceStrength * leagueAwayGPG;

  const toTest = [0, 1, 2, 3, 4, 5, 6];

  const homeProbabilities: Probabilities = {
    team: homeTeam,
    probabilities: [],
  };

  const awayProbabilities: Probabilities = {
    team: awayTeam,
    probabilities: [],
  };

  toTest.forEach((g: number) => {
    const result: GoalProbability = {
      goals: g,
      probability: poisson(homeXg, g),
    };

    homeProbabilities.probabilities.push(result);
  });

  toTest.forEach((g: number) => {
    const result: GoalProbability = {
      goals: g,
      probability: poisson(awayXg, g),
    };

    awayProbabilities.probabilities.push(result);
  });

  return [homeProbabilities, awayProbabilities];
};
