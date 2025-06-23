import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import { useEnergyData } from "../../hooks/useEnergyData";
import Card from "./components/ui/Card";
import StackedEnergyChart from "./components/ui/Chart";

interface EnergyPoint {
  instante: string;
  source: string;
  geracao: number;
}

export default function HomeScreen() {
  const { energyData, isLoading, error } = useEnergyData();

  const { hidraulica, nuclear, solar, termica, eolica } = energyData;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados de energia...</Text>
      </View>
    );
  }

  if (error) {
    // Você pode usar um Alert ou exibir uma mensagem de erro na tela
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar dados:</Text>
        <Text style={styles.errorText}>
          {error.message || "Erro desconhecido"}
        </Text>
        <Text>Por favor, tente novamente mais tarde.</Text>
      </View>
    );
  }

  const { hydroNow, nuclearNow, solarNow, thermalNow, windNow } = {
    hydroNow: hidraulica[0]?.geracao || 0,
    nuclearNow: nuclear[0]?.geracao || 0,
    solarNow: solar[0]?.geracao || 0,
    thermalNow: termica[0]?.geracao || 0,
    windNow: eolica[0]?.geracao || 0,
  };

  const lastUpdate = new Date(hidraulica[0]?.instante).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

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

  const sources = { hidraulica, nuclear, solar, termica, eolica };

  const allPoints = Object.values(sources).flat();

  function transformToChartData(rawData: EnergyPoint[]) {
    const grouped: { [timestamp: string]: any } = {};

    rawData.forEach(({ instante, source, geracao }) => {
      const timestamp = new Date(instante).getTime();
      if (!grouped[timestamp]) {
        grouped[timestamp] = { instante: timestamp };
      }
      grouped[timestamp][source] = geracao;
    });

    const sourceKeys = Object.keys(sources);
    const completed = Object.values(grouped).map((entry) => {
      sourceKeys.forEach((key) => {
        if (entry[key] === undefined) {
          entry[key] = 0;
        }
      });
      return entry;
    });

    return completed.sort((a, b) => a.instante - b.instante);
  }

  const chartData = transformToChartData(allPoints);
  chartData.pop();

  return (
    <>
      <Text style={styles.date}>Last Update: {lastUpdate}</Text>
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
      <View style={styles.chartContainer}>
        <StackedEnergyChart data={chartData} colors={sourceColors} />
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
  chartContainer: {
    marginTop: 20,
    padding: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  date: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
