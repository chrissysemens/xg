export type Country = {
  id: number;
  name: string;
};

export type League = {
  id: number;
  name: string;
};

export type Season = {
  id: number;
  name: string;
};

export type Team = {
  id: number;
  name: string;
};

export type Tournament = {
  id: number;
  name: string;
};

export type Fixture = {
  id: number;
  status: "preview" | "finished" | "moved";
  startTime: number;
  updateTime: number;
  homeTeam: Team;
  awayTeam: Team;
  country: Country;
  tournament: Tournament;
  season: Season;
  events: [];
  xg: { home: number; away: number };
  homeScore: { final: number; halfTime: number };
  awayScore: { final: number; halfTime: number };
};
