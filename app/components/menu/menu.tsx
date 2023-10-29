"use client";
import React, { useState } from "react";
import { Select } from "../dropdown/select";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import styles from './menu.module.scss';
import { Country, League, Season } from "@/types";

type Props = {
  setSelectedSeasons: (seasons: [number, number]) => void;
}

const Menu = ({ setSelectedSeasons}: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedLeague, setSelectedLeague] = useState<Country>();

  const {
    data: countries,
    isLoading: countriesLoading,
    error: countriesError,
  } = useSWR(`${process.env.NEXT_PUBLIC_RAPID_API_URL}/countries/`, (url) =>
    fetcher<Country>(url, { next: { revalidate: 3600 } })
  );

  const {
    data: leagues,
    isLoading: leaguesLoading,
    error: leaguesError,
  } = useSWR(
    selectedCountry
      ? `${process.env.NEXT_PUBLIC_RAPID_API_URL}/countries/${selectedCountry?.id}/tournaments/`
      : undefined,
    (url) => fetcher<League>(url, { next: { revalidate: 3600 } })
  );

  useSWR(
    selectedLeague
      ? `${process.env.NEXT_PUBLIC_RAPID_API_URL}/tournaments/${selectedLeague.id}/seasons/`
      : undefined,
    (url) => fetcher<Season>(url, { next: { revalidate: 3600 } }).then((seasons: Array<Season>) => {
      const lastSeason = seasons[seasons.length -2];
      const thisSeason = seasons[seasons.length -1];
      setSelectedSeasons([lastSeason.id, thisSeason.id]);
    })
  );

  return (
    <div className={styles.menu}>
      <Select<Country>
        options={countries ?? []}
        idKey="id"
        valueKey="name"
        placeholder="Select a country"
        onSelect={async (c: Country) => {
          setSelectedCountry(c);
          setSelectedLeague(undefined)
        }}
        selectedOption={selectedCountry}
        isLoading={countriesLoading}
        isDisabled={countriesLoading}
      />
      {selectedCountry ? (
        <Select<Country>
          options={leagues ?? []}
          idKey="id"
          valueKey="name"
          placeholder="Select a league"
          onSelect={async (l: League) => {
            setSelectedLeague(l)
          }}
          selectedOption={selectedLeague}
          isLoading={leaguesLoading}
          isDisabled={countriesLoading || !selectedCountry}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export { Menu };
