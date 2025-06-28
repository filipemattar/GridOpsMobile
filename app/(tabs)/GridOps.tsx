import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Card from "../../components/ui/Card";
import { useEnergyData } from "../../hooks/useEnergyData";

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();

  const { energyData, isLoading, error } = useEnergyData();

  const { hidraulica, nuclear, solar, termica, eolica } = energyData;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#a6a09b" />
        <Text>Loading Energy Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar dados:</Text>
        <Text style={styles.errorText}>
          {error.message || "Unknowen Error"}
        </Text>
        <Text>Please, try again later.</Text>
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

  const date = new Date(hidraulica[0]?.instante);
  const day = date.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
  });
  const time = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lastUpdate = `${day} at ${time}`;

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

  const carouselData = [
    { type: "total", total: totalEnergy, lastUpdate },
    {
      type: "sources",
      data: {
        hydroNow,
        nuclearNow,
        solarNow,
        thermalNow,
        windNow,
        totalEnergy,
      },
    },
  ];

  return (
    <Carousel
      width={screenWidth}
      data={carouselData}
      renderItem={({ item }) => {
        if (item.type === "total") {
          return (
            <View style={styles.totalCardContainer}>
              <View style={styles.totalCard}>
                <Card
                  source="Total "
                  data={item.total || 0}
                  date={item.lastUpdate}
                  backgroundColor="#f5f5f4"
                />
              </View>
            </View>
          );
        }

        if (item.type === "sources") {
          return (
            <View style={styles.sourcesPage}>
              <View style={styles.cardWrapper}>
                <Card
                  source="Hydropower"
                  data={item.data?.hydroNow || 0}
                  percentage={
                    item.data?.hydroNow !== undefined && item.data?.totalEnergy
                      ? (item.data.hydroNow / item.data.totalEnergy) * 100
                      : 0
                  }
                  backgroundColor={sourceColors["hydro"]}
                  icon={sourceIcon["hydro"]}
                />
              </View>
              <View style={styles.cardWrapper}>
                <Card
                  source="Solar Power"
                  data={item.data?.solarNow || 0}
                  percentage={
                    item.data?.solarNow !== undefined && item.data?.totalEnergy
                      ? (item.data.solarNow / item.data.totalEnergy) * 100
                      : 0
                  }
                  backgroundColor={sourceColors["solar"]}
                  icon={sourceIcon["solar"]}
                />
              </View>
              <View style={styles.cardWrapper}>
                <Card
                  source="Wind Power"
                  data={item.data?.windNow || 0}
                  percentage={
                    item.data?.windNow !== undefined && item.data?.totalEnergy
                      ? (item.data.windNow / item.data.totalEnergy) * 100
                      : 0
                  }
                  backgroundColor={sourceColors["wind"]}
                  icon={sourceIcon["wind"]}
                />
              </View>
              <View style={styles.cardWrapper}>
                <Card
                  source="Thermal Power"
                  data={item.data?.thermalNow || 0}
                  percentage={
                    item.data?.thermalNow !== undefined &&
                    item.data?.totalEnergy
                      ? (item.data.thermalNow / item.data.totalEnergy) * 100
                      : 0
                  }
                  backgroundColor={sourceColors["thermal"]}
                  icon={sourceIcon["thermal"]}
                />
              </View>
              <View style={styles.cardWrapper}>
                <Card
                  source="Nuclear Power"
                  data={item.data?.nuclearNow || 0}
                  percentage={
                    item.data?.nuclearNow !== undefined &&
                    item.data?.totalEnergy
                      ? (item.data.nuclearNow / item.data.totalEnergy) * 100
                      : 0
                  }
                  backgroundColor={sourceColors["nuclear"]}
                  icon={sourceIcon["nuclear"]}
                />
              </View>
            </View>
          );
        }

        return <View />;
      }}
      loop={true}
    />
  );
}

const styles = StyleSheet.create({
  sourcesPage: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  totalCardContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 5,
    width: "100%",
    height: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignSelf: "center",
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  totalCard: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  sourceCard: {
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
