"use client";
import React, { useState } from "react";
import styles from "./select.module.scss";
import { useSpring, animated } from "@react-spring/web";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Spinner } from "../spinner/spinner";
import { ClickOutside } from "../clickoutside/click-outside";

type Select<T> = {
  options: Array<T>;
  idKey: string;
  valueKey: string;
  placeholder: string;
  onSelect: (option: T) => void;
  selectedOption?: any;
  isLoading: boolean;
  isDisabled: boolean;
};

const Select = <T,>({
  options,
  idKey,
  valueKey,
  placeholder,
  selectedOption,
  onSelect,
  isLoading,
  isDisabled,
}: Select<T>) => {
  // Type guard.
  // Allow any but show friendly error if wrong key or value props passed
  options &&
    options.forEach((o: any) => {
      if (o[idKey] == undefined || o[valueKey] == undefined) {
        throw new TypeError("Unable to find key or value property");
      }
    });

  const [isOpen, setIsOpen] = useState<boolean>();
  const spring = useSpring({
    maxHeight: isOpen ? "200px" : "0px",
    delay: 50,
    config: { tension: 290 },
  });

  return (
    <ClickOutside action={() => setIsOpen(false)}>
      <div className={`${styles.select} ${isDisabled && styles.isDisabled}`}>
        <div
          className={styles.selected}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{selectedOption ? selectedOption[valueKey] : placeholder}</span>
          {isLoading ? (
            <span className={styles.spinner}>
              <Spinner height={20} width={20} />
            </span>
          ) : (
            <span>
              <ChevronDownIcon height={15} />
            </span>
          )}
        </div>
        <animated.div
          className={`${styles.options} ${isOpen && styles.isOpen}`}
          style={{
            maxHeight: spring.maxHeight as any,
          }}
        >
          {isOpen &&
            options &&
            options.map((o: any) => (
              <div
                key={o[idKey]}
                className={`${styles.option} ${
                  o[idKey] === selectedOption && styles.selected
                }`}
                onClick={() => {
                  setIsOpen(false);
                  onSelect(o);
                }}
              >
                {o[`${valueKey}`]}
              </div>
            ))}
        </animated.div>
      </div>
    </ClickOutside>
  );
};

export { Select };
