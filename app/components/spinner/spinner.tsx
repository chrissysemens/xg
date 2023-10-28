import React from "react";
import Image from "next/image";
import spinner from "../../../public/assets/spinner.svg";
import styles from "./spinner.module.scss";

type Props = {
  height: number;
  width: number;
};

const Spinner = ({ height, width }: Props) => {
  return (
    <Image
      priority
      src={spinner}
      alt="Spinner"
      className={styles.spin}
      height={height}
      width={width}
    />
  );
};

export { Spinner };
