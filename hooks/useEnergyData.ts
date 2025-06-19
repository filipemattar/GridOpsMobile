import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:3000/energy"
    : "http://10.0.2.2:3000/energy";

interface EnergyPoint {
  instante: string;
  source: string;
  geracao: number;
}
function removeSpaces(str: string) {
  return str.split(" ").join("");
}

export function useEnergyData(region = "sin") {
  const [energyData, setEnergyData] = useState<{
    hydro: EnergyPoint[];
    nuclear: EnergyPoint[];
    solar: EnergyPoint[];
    thermal: EnergyPoint[];
    wind: EnergyPoint[];
  }>({
    hydro: [],
    nuclear: [],
    solar: [],
    thermal: [],
    wind: [],
  });

  const fetchSource = useCallback(
    async (source: string) => {
      try {
        const response = await fetch(
          `${BASE_URL}/${removeSpaces(region)}/${source}`
        );

        if (!response.ok) {
          console.warn(`Response error on ${source}: ${response.status}`);
          return [];
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching data from ${source}:`, error);
        return [];
      }
    },
    [region]
  );

  const fetchAll = useCallback(async () => {
    const [hydro, nuclear, solar, thermal, wind] = await Promise.all([
      fetchSource("hidraulica"),
      fetchSource("nuclear"),
      fetchSource("solar"),
      fetchSource("termica"),
      fetchSource("eolica"),
    ]);
    setEnergyData({ hydro, nuclear, solar, thermal, wind });
  }, [fetchSource]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 3000000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return energyData;
}
