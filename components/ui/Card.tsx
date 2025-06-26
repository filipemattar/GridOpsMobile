import { PlugZap } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

type CardProps = {
  source: string;
  data: number;
  percentage?: number;
  backgroundColor: string;
  icon?: any;
  date?: string;
};

export default function Card({
  source,
  data,
  percentage,
  backgroundColor,
  icon,
  date,
}: CardProps) {
  const isTotal = source === "Total Energy";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
        isTotal && { gap: 500, paddingTop: 30 },
      ]}
    >
      <View style={styles.header}>
        <View>
          {icon ? (
            <Image source={icon} style={styles.icon} />
          ) : (
            <PlugZap size={45} color={"#085C44"} />
          )}
        </View>
        <View>
          {percentage ? (
            <Text style={styles.percentage}>{percentage?.toFixed(2)} %</Text>
          ) : (
            <>
              <Text style={styles.date}>Last Update: {date}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={[styles.title, isTotal && { color: "#085C44" }]}>
            {source}
          </Text>
        </View>
        <Text
          style={[styles.value, isTotal && { color: "#085C44", fontSize: 40 }]}
        >
          {(data / 1000)?.toFixed(2)} GW
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    borderRadius: 30,
    padding: 16,
    gap: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  percentage: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "center",
    color: "#085C44",
  },
});
