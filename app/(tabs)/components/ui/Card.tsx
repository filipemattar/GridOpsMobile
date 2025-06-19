import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

type CardProps = {
  source: string;
  data: number;
  percentage?: number;
  backgroundColor: string;
  icon?: any;
};

export default function Card({
  source,
  data,
  percentage,
  backgroundColor,
  icon,
}: CardProps) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        {icon ? (
          <Image source={icon} style={styles.icon} />
        ) : (
          <Feather name="zap" size={30} color="black" />
        )}
        <Text style={styles.title}>{source}</Text>
      </View>
      <Text style={styles.value}>{(data / 1000)?.toFixed(2)} GW</Text>
      {percentage ? (
        <Text style={styles.value}>{percentage?.toFixed(2)} %</Text>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
