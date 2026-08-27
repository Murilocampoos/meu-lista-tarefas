import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 p-4">
      <Text className="text-2xl font-bold text-white text-center">
        Meu Lista de Tarefas 🚀
      </Text>
      <Text className="text-slate-400 mt-2 text-center">
        Expo Router + NativeWind + SQLite
      </Text>
    </View>
  );
}
