import { StyleSheet, View } from "react-native";
import { useEnergyData } from "../../hooks/useEnergyData";
import Card from "./components/ui/Card";

export default function HomeScreen(region: string) {
  const { hydro, nuclear, solar, thermal, wind } = useEnergyData("sin");

  const { hydroNow, nuclearNow, solarNow, thermalNow, windNow } = {
    hydroNow: hydro[0]?.geracao || 0,
    nuclearNow: nuclear[0]?.geracao || 0,
    solarNow: solar[0]?.geracao || 0,
    thermalNow: thermal[0]?.geracao || 0,
    windNow: wind[0]?.geracao || 0,
  };

  const totalEnergy = hydroNow + nuclearNow + solarNow + thermalNow + windNow;

  const sourceColors: Record<string, string> = {
    hydro: "#00d2ff",
    nuclear: "#00ec64",
    solar: "#ffbf0f",
    thermal: "#a6a09b",
    wind: "#00d5be",
  };

  const sourceIcon: Record<string, any> = {
    hydro: require("../../assets/energy-icons/hydro-power.png"),
    nuclear: require("../../assets/energy-icons/radiation.png"),
    solar: require("../../assets/energy-icons/solar-panel.png"),
    thermal: require("../../assets/energy-icons/energy-source.png"),
    wind: require("../../assets/energy-icons/wind-turbine.png"),
  };
  return (
    <>
      <View style={styles.gridContainer}>
        <Card
          source="Total Energy"
          data={totalEnergy}
          backgroundColor={"white"}
        />
        <Card
          source="Hydropower"
          data={hydroNow}
          percentage={(hydroNow / totalEnergy) * 100}
          backgroundColor={sourceColors["hydro"]}
          icon={sourceIcon["hydro"]}
        />
        <Card
          source="Nuclear Power"
          data={nuclearNow}
          percentage={(nuclearNow / totalEnergy) * 100}
          backgroundColor={sourceColors["nuclear"]}
          icon={sourceIcon["nuclear"]}
        />
        <Card
          source="Solar Power"
          data={solarNow}
          percentage={(solarNow / totalEnergy) * 100}
          backgroundColor={sourceColors["solar"]}
          icon={sourceIcon["solar"]}
        />
        <Card
          source="Thermal Power"
          data={thermalNow}
          percentage={(thermalNow / totalEnergy) * 100}
          backgroundColor={sourceColors["thermal"]}
          icon={sourceIcon["thermal"]}
        />
        <Card
          source="Wind Power"
          data={windNow}
          percentage={(windNow / totalEnergy) * 100}
          backgroundColor={sourceColors["wind"]}
          icon={sourceIcon["wind"]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
