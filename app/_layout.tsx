
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from "expo-router";
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/registro" />
      <Stack.Screen name="home" />
      <Stack.Screen name="auth/forgotpassword" />
      <Stack.Screen name="auth/perfil" />
    </Stack>
  );
}
