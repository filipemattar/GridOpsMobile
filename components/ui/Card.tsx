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
  const isTotal = source === "Total ";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
        isTotal ? styles.totalCardOverride : styles.sourceCardFlex,
        isTotal && { gap: 180, paddingTop: 16 },
      ]}
    >
      <View style={styles.header}>
        <View>
          {icon ? (
            <Image source={icon} style={styles.icon} />
          ) : (
            <PlugZap size={60} color={"#79716b"} />
          )}
        </View>
        <View>
          {percentage ? (
            <Text style={styles.percentage}>{percentage?.toFixed(2)} %</Text>
          ) : (
            <>
              <Text style={styles.logo}>GridOps</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        {!isTotal && (
          <View>
            <Text style={styles.title}>{source}</Text>
          </View>
        )}

        <View style={{ alignItems: isTotal ? "flex-start" : "flex-end" }}>
          <Text
            style={[
              styles.value,
              isTotal && { color: "#79716b", fontSize: 65 },
            ]}
          >
            {(data / 1000)?.toFixed(2)} GW
          </Text>
          {isTotal && date && (
            <Text style={[styles.date, { marginTop: 8 }]}>
              Last Update at: {date}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 30,
    padding: 16,
    gap: 5,
  },
  // New style to allow the total card to respect its parent's height
  totalCardOverride: {
    // No flex: 1 here, height will be controlled by parent (HomeScreen's totalCard style)
  },
  // Style for other source cards to maintain their flex behavior
  sourceCardFlex: {
    flex: 1, // Keep flex: 1 for source cards to distribute space
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
    color: "#79716b",
  },
  logo: {
    fontSize: 45,
    fontWeight: "bold",
    alignItems: "center",
    color: "#79716b",
  },
});
