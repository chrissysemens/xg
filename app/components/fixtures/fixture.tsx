import react, { useState } from "react";
import styles from "./fixture.module.scss";
import { Collapsible } from "../collapsible/collapisible";
import { Fixture } from "@/types";
import { calculateProbabilities } from "@/app/utils/maths";
import { ChartRadar } from "@/app/charts/radar";

type Props = {
  fixture: Fixture;
  results: Array<Fixture>;
  expandDefault: boolean;
};
const Fixture = ({ fixture, results, expandDefault = false }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(expandDefault);

  const date = new Date(fixture.startTime * 1000).toUTCString();
  const data = calculateProbabilities(
    fixture.homeTeam,
    fixture.awayTeam,
    results
  );

  const homeSorted = [...data[0].probabilities];
  const awaySorted = [...data[1].probabilities];

  homeSorted.sort((p1, p2) => p1.probability - p2.probability).reverse();
  awaySorted.sort((p1, p2) => p1.probability - p2.probability).reverse();

  const homePrediction = homeSorted[0].goals
  const awayPrediction = awaySorted[0].goals

  return (
    <div className={styles.fixture}>
      <Collapsible
        headerContent={
          <div className={styles.header}>
            <div className={styles.details}>
              <div className={styles.date}>{date}</div>
              <div className={styles.teams}>
                <div className={styles.home}>{fixture.homeTeam.name}<span>{homePrediction}</span></div>
                <div className={styles.vs}>vs</div>
                <div className={styles.away}><span>{awayPrediction}</span>{fixture.awayTeam.name}</div>
              </div>
            </div>
          </div>
        }
        collapsedContent={
        <div className={styles.content}>
          <div className={styles.home}>
            <ChartRadar data={data[0].probabilities} dataKey='probability'/>
          </div>
          <div className={styles.away}>
            <ChartRadar data={data[1].probabilities} dataKey='probability'/>
          </div>
        </div>}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </div>
  );
};

export { Fixture };
