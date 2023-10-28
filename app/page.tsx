"use client";
import { sumAwayGoalsForFixtures, sumHomeGoalsForFixtures } from "./utils/maths";
import { poisson } from "./utils/poisson";
import { Menu } from "./components/menu/menu";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
import { FixtureList } from "./components/fixtures/fixture-list";
import styles from "./page.module.scss";
import { Fixture } from "@/types";

const Home = () => {
  const [selectedSeasons, setSelectedSeasons] = useState<
    [number, number] | undefined
  >();

  const {
    data: lastSeason,
    isLoading: lastSeasonLoading,
    error: lastSeasonError,
  } = useSWR(
    selectedSeasons
      ? `${process.env.NEXT_PUBLIC_RAPID_API_URL}/seasons/${selectedSeasons[0]}/fixtures/`
      : undefined,
    (url) => fetcher<Fixture>(url, { cache: "force-cache" })
  );

  const {
    data: thisSeason,
    isLoading: thisSeasonLoading,
    error: thisSeasonError,
  } = useSWR(
    selectedSeasons
      ? `${process.env.NEXT_PUBLIC_RAPID_API_URL}/seasons/${selectedSeasons[1]}/fixtures/`
      : undefined,
    (url) => fetcher<Fixture>(url, { cache: "force-cache" })
  );

  const upcoming = [...(lastSeason ?? []), ...(thisSeason ?? [])]
    .filter((f: Fixture) => f.status === "preview")
    .sort((f1, f2) => f1.startTime - f2.startTime)
    .splice(0, 10);

    const results = [...(lastSeason ?? []), ...(thisSeason ?? [])]
    .filter((f: Fixture) => f.status === "finished")
    .sort((f1, f2) => f1.startTime - f2.startTime)

  return (
    <main className={styles.home}>
      <div className={styles.menu}>
        <Menu setSelectedSeasons={setSelectedSeasons} />
      </div>
      <div className={styles.main}>
        <FixtureList fixtures={upcoming} results={results}/>
      </div>
    </main>
  );
};

export default Home;