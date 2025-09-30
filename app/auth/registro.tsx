import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BACKGROUND_IMAGE = require('../../assets/RegistroImg.png'); 
export default function RegisterScreen() {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // Guardar usuario en AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    alert("Registrado correctamente");
    router.replace("/auth/login");
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      <View style={styles.contentContainer}> 
        <Text style={styles.title}>Cuéntanos acerca de ti</Text>

        {/* Campo: Nombre de usuario */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Nombre de usuario" onChangeText={onChange} value={value} placeholderTextColor="#777"/>
          )}
        />
        {/* Texto informativo bajo el campo de usuario */}
        <Text style={styles.infoText}>
          No tienes que usar tu nombre real, puedes usar otro nombre para proteger tu privacidad
        </Text>

        {/* Campo: Correo electrónico */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Correo electrónico" onChangeText={onChange} value={value} placeholderTextColor="#777"/>
          )}
        />

        {/* Campo: Contraseña */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#777"/>
          )}
        />

        {/* Fecha de nacimiento */}
        <Text style={styles.label}>¿Cuál es tu fecha de nacimiento?</Text>
        <View style={styles.birthContainer}>
          <Controller
            control={control}
            name="birthMonth"
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.birthInput} placeholder="MM" maxLength={2} keyboardType="numeric" onChangeText={onChange} value={value} placeholderTextColor="#777"/>
            )}
          />
          <Controller
            control={control}
            name="birthDay"
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.birthInput} placeholder="DD" maxLength={2} keyboardType="numeric" onChangeText={onChange} value={value} placeholderTextColor="#777"/>
            )}
          />
          <Controller
            control={control}
            name="birthYear"
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.birthInput} placeholder="AAAA" maxLength={4} keyboardType="numeric" onChangeText={onChange} value={value} placeholderTextColor="#777"/>
            )}
          />
        </View>

        {/* Texto: Ya tengo cuenta */}
        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={styles.haveAccount}>ya tengo cuenta</Text>
        </TouchableOpacity>

        {/* Botón Google */}
        <TouchableOpacity style={styles.socialButton}>
          {/* Imagen eliminada por error de módulo */}
          <Text style={styles.socialText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        {/* Botón Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          {/* Imagen eliminada por error de módulo */}
          <Text style={styles.socialText}>Iniciar sesión con Facebook</Text>
        </TouchableOpacity>

        {/* Botón Registrar */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Cambios en los estilos para adaptar la UI
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1,
  },
  contentContainer: { 
    padding: 20,
    zIndex: 2,
  },
  title: {
    color:"white",
    fontFamily: 'Poppins_500Medium',
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    fontSize:13,
    fontFamily: 'Poppins_500Medium',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  infoText: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 10,
    marginLeft: 2,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 2,
  },
  birthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  birthInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    width: 60,
    padding: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  haveAccount: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_500Medium',
  },
  buttonContainer: {
    backgroundColor: '#FAB12F', 
    padding: 12,
    borderRadius: 5,
    marginVertical: 4,
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 16,
    fontFamily: 'Poppins_500medium',
    color: 'white',
  },
});

