import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
    data: Array<any>;
    dataKey: string;
}

const ChartRadar = ({data, dataKey}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="goals" />
        <PolarRadiusAxis tickFormatter={(va: string, index: number) => ''} />
        <Radar
          name="Home goals"
          dataKey={dataKey}
          stroke=" #2FC723"
          fill=" #2FC723"
          fillOpacity={0.6}
          height={100}
          width={100}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export { ChartRadar };
