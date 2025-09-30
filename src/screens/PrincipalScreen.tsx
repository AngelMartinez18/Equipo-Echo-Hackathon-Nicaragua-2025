import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Principal'>;

export default function PrincipalScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a Kúentalo</Text>
        <Text style={styles.subtitle}>Esta es la pantalla principal. Aquí irá el contenido de tu app.</Text>

        <Pressable onPress={() => navigation.replace('Login')} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
          <Text style={styles.primaryButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1B3B' },
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  subtitle: { color: '#E5E7EB' },
  primaryButton: { height: 48, borderRadius: 10, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  buttonPressed: { opacity: 0.9 },
});
