import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from 'react-native-paper';
import Home from "./src/screens/Home";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Home />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
