import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1. RUTA DE LA IMAGEN DE FONDO
const BACKGROUND_IMAGE = require("../../assets/imagenFon.png");

export default function LoginScreen() {
  const defaultCredentials = (Constants?.expoConfig as any)?.extra
    ?.defaultCredentials as { email?: string; password?: string } | undefined;

  // 1. Destructure errors aquí
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; newPassword: string }>({
    defaultValues: {
      email: defaultCredentials?.email ?? "",
      password: defaultCredentials?.password ?? "",
      newPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = async (data: any) => {
    // Obtener usuario guardado
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (
        data.email === userData.email &&
        data.password === userData.password
      ) {
        await AsyncStorage.setItem("userToken", "fake-token");
        router.replace("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      // Si no hay usuario registrado, permitir usar las credenciales por defecto (solo para demo)
      if (
        defaultCredentials?.email &&
        defaultCredentials?.password &&
        data.email === defaultCredentials.email &&
        data.password === defaultCredentials.password
      ) {
        await AsyncStorage.setItem("userToken", "fake-token");
        router.replace("/home");
      } else {
        alert(
          "No hay usuario registrado. Puedes Registrarte o Probar a iniciar sesion nuevamente."
        );
      }
    }
  };

  return (
    // 2. ImageBackground como contenedor principal
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* 3. CAPA OSCURA (darkOverlay) que cubre la imagen */}
      <View style={styles.darkOverlay} />

      {/* 4. CONTENEDOR DE CONTENIDO (todo tu formulario y lógica) */}
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logoUN.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Reestablecer Contraseña</Text>

        <Text style={styles.textcontent}>Correo electrónico</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "El correo es obligatorio",
            pattern: {
              value: emailRegex,
              message: "Formato de correo no válido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#777"
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />

        <Text style={styles.textcontent}>Contraseña anterior</Text>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
              />
            )}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
            accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={18}
              color="#000"
              paddingBottom={10}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.textcontent}>Nueva Contraseña</Text>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nueva Contraseña"
                secureTextEntry={!showNewPassword}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
              />
            )}
          />

          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.iconButton}
            accessibilityLabel={showNewPassword ? "Ocultar nueva contraseña" : "Mostrar nueva contraseña"}
          >
            <FontAwesome
              name={showNewPassword ? "eye-slash" : "eye"}
              size={18}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Confirmar Contraseña</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ----------------------------------------
  // NUEVOS ESTILOS PARA EL FONDO Y SUPERPOSICIÓN
  // ----------------------------------------
  backgroundImage: {
    flex: 1, // Ocupa toda la pantalla
    width: "100%",
    height: "100%",
    justifyContent: "center", // Centra el contenido verticalmente
  },
  darkOverlay: {
    position: "absolute", // Se superpone
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)", // 55% de oscuridad
    zIndex: 1, // Debajo del contenido
  },
  contentContainer: {
    padding: 20,
    zIndex: 2, // Encima del overlay
  },

  input: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white", // **Mejora:** Fondo blanco para que el texto sea legible
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  iconButton: {
    position: "absolute",
    right: 15,
    top: 12,
    zIndex: 3,
    padding: 6,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
  },
  textcontent: {
    margin: 4,
    fontFamily: "Poppins_500medium",
    fontSize: 15,
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
  },
  RegistroText: {
    textAlign: "center",
    fontFamily: "Poppins_500medium",
    padding: 5,
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
    fontSize: 14,
  },
  forgotPasswordText: {
    textAlign: "left",
    fontFamily: "Poppins_500medium",
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
    fontSize: 14,
  },
  regisLink: {
    color: "#FAB12F", // Enlace en color de acento para contraste
  },
  checkLabel: {
    marginLeft: 10,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
  },
  divider: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Más sutil sobre fondo oscuro
    marginVertical: 20,
  },
  // Resto de estilos sin cambios
  buttonContainer: {
    backgroundColor: "#FAB12F",
    padding: 12,
    borderRadius: 5,
    marginVertical: 4,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins_500medium",
    color: "white",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6E8CFB",
    padding: 12,
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
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
  },
});
