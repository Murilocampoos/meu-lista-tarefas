import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 p-4">
      <StatusBar style="light" />
      <Image
        source={require('../assets/construct.jpg')}
        className="w-64 h-64"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-white mt-6">
        Em Construção!
      </Text>
    </View>
  );
}
