import React from "react";
import { View } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

type EnergyChartPoint = {
  instante: number;
  hidraulica: number;
  nuclear: number;
  solar: number;
  termica: number;
  eolica: number;
};

type StackedEnergyChartProps = {
  data: EnergyChartPoint[];
  colors: { [key: string]: string };
};

export default function StackedEnergyChart({
  data,
  colors,
}: StackedEnergyChartProps) {
  return (
    <View style={{ height: 280 }}>
      <VictoryChart
        theme={VictoryTheme.material}
        height={300}
        padding={{ top: 20, bottom: 50, left: 50, right: 20 }}
        domainPadding={1}
      >
        <VictoryAxis
          tickFormat={(t) =>
            new Date(t).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        <VictoryAxis
          dependentAxis
          label="Geração GW"
          tickFormat={(t) => `${t / 1000}`}
          style={{
            axisLabel: { padding: 40 },
          }}
        />
        <VictoryStack
          colorScale={[
            colors.hydro,
            colors.nuclear,
            colors.solar,
            colors.thermal,
            colors.wind,
          ]}
        >
          <VictoryArea data={data} x="instante" y="hidraulica" />
          <VictoryArea data={data} x="instante" y="nuclear" />
          <VictoryArea data={data} x="instante" y="solar" />
          <VictoryArea data={data} x="instante" y="termica" />
          <VictoryArea data={data} x="instante" y="eolica" />
        </VictoryStack>
      </VictoryChart>
    </View>
  );
}
