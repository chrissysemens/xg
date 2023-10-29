import React from "react";
import styles from "./collapsible.module.scss";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  headerContent: React.ReactNode;
  collapsedContent: React.ReactNode;
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
};
const Collapsible = ({ headerContent, collapsedContent, setExpanded, expanded = false }: Props) => {

  const spring = useSpring({
    maxHeight: expanded ? "400px" : "0px",
    delay: 50,
    config: { tension: 290 },
  });

  return (
    <div className={styles.collapsible}>
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>{headerContent}</div>
      {expanded && (
          <animated.div
          className={`${styles.content} ${expanded && styles.expanded}`}
          style={{
            maxHeight: spring.maxHeight as any,
          }}
      >
      {collapsedContent}
      </animated.div>)}
    </div>
  );
};

export { Collapsible };
