import React from "react";
import styles from "./fixture-list.module.scss";
import { Fixture } from "./fixture";

type Props = {
  fixtures: Array<Fixture>;
  results: Array<Fixture>;
};

const FixtureList = ({ fixtures, results }: Props) => {
  return (
    <>
      <div className={styles.heading}>
      </div>
      <div className={styles.fixtureList}>
        <div className={styles.scrollContainer}>
          {fixtures.map((f: Fixture, i: number) => (
            <Fixture
              key={i}
              fixture={f}
              results={results}
              expandDefault={i == 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export { FixtureList };
