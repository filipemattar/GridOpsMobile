import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:3000/energy/sin"
    : "http://localhost:3000/energy/sin";

interface EnergyPoint {
  instante: string;
  source: string;
  geracao: number;
}
interface EnergyData {
  hidraulica: EnergyPoint[];
  nuclear: EnergyPoint[];
  solar: EnergyPoint[];
  termica: EnergyPoint[];
  eolica: EnergyPoint[];
}

export function useEnergyData() {
  const [energyData, setEnergyData] = useState<EnergyData>({
    hidraulica: [],
    nuclear: [],
    solar: [],
    termica: [],
    eolica: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchSource = useCallback(async (source: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${source}`);

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
  }, []);

  useEffect(() => {
    const fetchDataAndSetInterval = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [hidraulica, nuclear, solar, termica, eolica] = await Promise.all(
          [
            fetchSource("hidraulica"),
            fetchSource("nuclear"),
            fetchSource("solar"),
            fetchSource("termica"),
            fetchSource("eolica"),
          ]
        );
        setEnergyData({ hidraulica, nuclear, solar, termica, eolica });
      } catch (err) {
        setError(err);
        console.error("Failed to fetch all energy data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndSetInterval();
    const interval = setInterval(fetchDataAndSetInterval, 3000000);
    return () => clearInterval(interval);
  }, [fetchSource]);

  return { energyData, isLoading, error };
}
