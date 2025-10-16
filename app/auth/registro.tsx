import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // Guardar usuario en AsyncStorage
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    alert("Registrado correctamente");
    router.replace("/auth/login");
  };

  return (
    <ImageBackground
      source={require("../../assets/RegistroImg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      <View style={styles.contentContainer}>
        {/* Logo */}

        <Image
          source={require("../../assets/logoUN.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Kúentanos sobre ti</Text>
        {/* Campo: Nombre de usuario */}
        <Text style={styles.label}>Nombre de usuario</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#777"
            />
          )}
        />
        {/* Texto informativo bajo el campo de usuario */}
        <Text style={styles.infoText}>
          No tienes que usar tu nombre real, puedes usar otro nombre para
          proteger tu privacidad
        </Text>

        {/* Campo: Correo electrónico */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#777"
            />
          )}
        />

        {/* Campo: Contraseña */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#777"
            />
          )}
        />

        {/* Fecha de nacimiento */}
        <Text style={styles.label}>¿Cuál es tu fecha de nacimiento?</Text>
        <View style={styles.birthContainer}>
          <Controller
            control={control}
            name="birthMonth"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.birthInput}
                placeholder="MM"
                maxLength={2}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
              />
            )}
          />
          <Controller
            control={control}
            name="birthDay"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.birthInput}
                placeholder="DD"
                maxLength={2}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
              />
            )}
          />
          <Controller
            control={control}
            name="birthYear"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.birthInput}
                placeholder="AAAA"
                maxLength={4}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Botón Facebook */}
        <TouchableOpacity style={styles.button}>
          <View style={styles.bbContent}>
            <FontAwesome name="google" size={20} color="white" />
            <Text style={styles.bbText}>Registrarse con Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.bbContent}>
            <FontAwesome name="facebook" size={20} color="white" />
            <Text style={styles.bbText}>Registrarse con Facebook</Text>
          </View>
        </TouchableOpacity>
        {/* Texto: Ya tengo cuenta */}
        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
          <Text style={styles.RegistroText}>
            ¿Ya tienes cuenta? <Text style={styles.regisLink}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Cambios en los estilos para adaptar la UI
const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Más sutil sobre fondo oscuro
    marginVertical:10,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    zIndex: 1,
  },
  contentContainer: {
    padding: 20,
    zIndex: 2,
  },
  title: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  infoText: {
    color: "#fff",
    fontSize: 11,
    marginBottom: 10,
    marginLeft: 2,
  },
  label: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 2,
  },
  birthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  birthInput: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    width: 60,
    padding: 10,
    fontSize: 13,
    textAlign: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
    justifyContent: "center",
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins_500Medium",
  },
  buttonContainer: {
    backgroundColor: "#FAB12F",
    padding: 12,
    borderRadius: 5,
    marginVertical: 4,
    alignItems: "center",
    fontSize: 16,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins_500medium",
    color: "white",
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6E8CFB",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  bbContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bbText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginLeft: 8,
  },
    RegistroText: {
    textAlign: "center",
    fontFamily: "Poppins_500medium",
    padding: 5,
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
    fontSize: 16,
  },
  regisLink: {
    color: "#FAB12F", // Enlace en color de acento para contraste
  },
});
