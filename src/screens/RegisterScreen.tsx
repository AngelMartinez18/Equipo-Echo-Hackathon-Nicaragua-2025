import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Alert, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Campos requeridos', 'Completa nombre, correo y contraseña.');
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      Alert.alert('Correo inválido', 'Revisa el formato del correo.');
      return;
    }
    Alert.alert('Registro exitoso', `Bienvenido/a, ${name}`);
    navigation.replace('Principal');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Crear cuenta</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="tu@email.com" />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry placeholder="••••••••" />
        </View>

        <Pressable onPress={onRegister} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
          <Text style={styles.primaryButtonText}>Registrarme</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.linkPressable}>
          <Text style={styles.linkText}>Ya tengo cuenta, iniciar sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1B3B' },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 16 },
  fieldGroup: { marginBottom: 12 },
  label: { color: '#E5E7EB', marginBottom: 6 },
  input: { height: 48, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#d1d5db' },
  primaryButton: { height: 48, borderRadius: 10, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  buttonPressed: { opacity: 0.9 },
  linkPressable: { marginTop: 16, alignSelf: 'center' },
  linkText: { color: '#E0E7FF', textDecorationLine: 'underline' },
});
