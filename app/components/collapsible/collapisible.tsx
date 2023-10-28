import React from "react";
import styles from "./collapsible.module.scss";

type Props = {
  headerContent: React.ReactNode;
  collapsedContent: React.ReactNode;
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
};
const Collapsible = ({ headerContent, collapsedContent, setExpanded, expanded = false }: Props) => {
  return (
    <div className={styles.collapsible}>
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>{headerContent}</div>
      {expanded ? <div className={styles.content}>{collapsedContent}</div> : <></>}
    </div>
  );
};

export { Collapsible };
