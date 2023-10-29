import react, { useEffect, useState } from "react";
import styles from "./fixture.module.scss";
import { Collapsible } from "../collapsible/collapisible";
import { Fixture } from "@/types";
import { calculateProbabilities } from "@/app/utils/maths";
import { ChartRadar } from "@/app/charts/radar";
import { ClickOutside } from "../clickoutside/click-outside";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Spinner } from "../spinner/spinner";
import { friendlyDate } from "@/app/utils/friendly-date";

type Props = {
  fixture: Fixture;
  results: Array<Fixture>;
  expandDefault: boolean;
};
const Fixture = ({ fixture, results, expandDefault = false }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(expandDefault);
  const [loading, setLoading] = useState<boolean>(false);

  const date = friendlyDate(new Date(fixture.startTime * 1000));

  const data = calculateProbabilities(
    fixture.homeTeam,
    fixture.awayTeam,
    results
  );

  useEffect(() => {
    if (expanded) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [expanded]);

  const homeSorted = [...data[0].probabilities];
  const awaySorted = [...data[1].probabilities];

  homeSorted.sort((p1, p2) => p1.probability - p2.probability).reverse();
  awaySorted.sort((p1, p2) => p1.probability - p2.probability).reverse();

  const homePrediction = homeSorted[0].goals;
  const awayPrediction = awaySorted[0].goals;

  return (
    <ClickOutside action={() => setExpanded(false)}>
      <div className={styles.fixture}>
        <Collapsible
          headerContent={
            <div className={styles.header}>
              <div className={styles.date}>{date}</div>
              <div className={styles.details}>
                  <div className={styles.home}>
                    {fixture.homeTeam.name}
                  </div>
                  <div className={styles.prediction}>
                    <span className={styles.homePrediction}>{homePrediction}</span>
                    <div className={styles.vs}>vs</div>
                    <span className={styles.awayPrediction}>{awayPrediction}</span>
                  </div>
                  <div className={styles.away}>
                    {fixture.awayTeam.name}
                  </div>
              </div>
              <div className={styles.chevron}>
                {expanded ? (
                  <ChevronUpIcon height={15} />
                ) : (
                  <ChevronDownIcon height={15} />
                )}
              </div>
            </div>
          }
          collapsedContent={
            <div className={styles.content}>
              {loading ? (
                <div className={styles.loading}>
                  <Spinner height={150} width={150} />
                </div>
              ) : (
                <>
                  <div className={styles.home}>
                    <ChartRadar
                      data={data[0].probabilities}
                      dataKey="probability"
                    />
                  </div>
                  <div className={styles.away}>
                    <ChartRadar
                      data={data[1].probabilities}
                      dataKey="probability"
                    />
                  </div>
                </>
              )}
            </div>
          }
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>
    </ClickOutside>
  );
};

export { Fixture };
