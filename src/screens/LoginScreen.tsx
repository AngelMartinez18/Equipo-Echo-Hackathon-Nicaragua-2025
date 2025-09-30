import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, SafeAreaView, Image, ImageBackground } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Ingresa tu correo y contraseña.');
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      Alert.alert('Correo inválido', 'Revisa que el correo tenga un formato válido.');
      return;
    }
    navigation.replace('Principal');
  };

  const onForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Navegar a pantalla de recuperación.');
  };

  const onGoToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ImageBackground
            source={require('../../imagenes/Fondo.png')}
            style={styles.cardBg}
            imageStyle={styles.cardBgImage}
            resizeMode="cover"
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.appName}>Kúentalo</Text>
              <Image
                source={require('../../assets/icon.png')}
                style={styles.logoImageHeader}
                resizeMode="contain"
                accessibilityLabel="Logo de Kúentalo"
              />
              <Text style={styles.title}>Iniciar sesión</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu@email.com"
                  placeholderTextColor="#9aa0a6"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  accessibilityLabel="Campo de correo electrónico"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9aa0a6"
                  secureTextEntry
                  textContentType="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  accessibilityLabel="Campo de contraseña"
                />
              </View>

              <Pressable onPress={onForgotPassword} style={styles.linkPressable} accessibilityRole="button">
                <Text style={styles.linkText}>Olvidé mi contraseña</Text>
              </Pressable>

              <Pressable onPress={onLogin} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]} accessibilityRole="button">
                <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>o continuar con</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialGroup}>
                <Pressable onPress={() => Alert.alert('Google', 'Iniciar sesión con Google')}
                  style={({ pressed }) => [styles.socialButton, styles.googleButton, pressed && styles.buttonPressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Iniciar sesión con Google"
                >
                  <Text style={[styles.socialButtonText, styles.googleText]}>Continuar con Google</Text>
                </Pressable>

                <Pressable onPress={() => Alert.alert('Facebook', 'Iniciar sesión con Facebook')}
                  style={({ pressed }) => [styles.socialButton, styles.facebookButton, pressed && styles.buttonPressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Iniciar sesión con Facebook"
                >
                  <Text style={[styles.socialButtonText, styles.facebookText]}>Continuar con Facebook</Text>
                </Pressable>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                <Pressable onPress={onGoToRegister} style={styles.linkInline} accessibilityRole="link">
                  <Text style={[styles.linkText, styles.linkInlineText]}>Crear cuenta</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1B3B',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardBg: {
    width: '100%',
  },
  cardBgImage: {
    borderRadius: 16,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardContent: {
    padding: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 2 },
  },
  logoImageHeader: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#f3f4f6',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#111827',
  },
  linkPressable: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 16,
  },
  linkText: {
    color: '#E0E7FF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(229,231,235,0.7)',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#E5E7EB',
    fontSize: 12,
  },
  socialGroup: {
    gap: 10,
    marginBottom: 8,
  },
  socialButton: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  googleText: {
    color: '#1f2937',
  },
  facebookText: {
    color: '#ffffff',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  footerText: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  linkInline: {
    marginLeft: 6,
  },
  linkInlineText: {
    textDecorationLine: 'underline',
  },
});
