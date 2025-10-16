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
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// 1. RUTA DE LA IMAGEN DE FONDO
// **¡RECUERDA CAMBIAR ESTA RUTA!**
const BACKGROUND_IMAGE = require("../../assets/imagenFon.png");

export default function LoginScreen() {
  // Credenciales por defecto definidas en app.json -> expo.extra.defaultCredentials
  const defaultCredentials = (Constants?.expoConfig as any)?.extra
    ?.defaultCredentials as { email?: string; password?: string } | undefined;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: defaultCredentials?.email ?? "",
      password: defaultCredentials?.password ?? "",
    },
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          "No hay usuario registrado. Puedes usar las credenciales de demo configuradas o registrarte."
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

        <Text style={styles.title}>Iniciar Sesión</Text>

        <Text style={styles.textcontent}>Correo</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            // Input con fondo blanco para visibilidad
            <TextInput
              style={styles.input}
              placeholder="Correo"
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#777"
            />
          )}
        />

        <Text style={styles.textcontent}>Password</Text>
        <View style={{ position: "relative" }}>
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
            style={{
              position: "absolute",
              right: 15,
              top: 12,
            }}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={18}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkContainer}>
          <Switch value={isChecked} onValueChange={setIsChecked} />
          <Text style={styles.checkLabel}>Recordar Contraseña</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}> Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.button}>
          <View style={styles.bbContent}>
            <FontAwesome name="google" size={20} color="white" />
            <Text style={styles.bbText}>Iniciar sesion con Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.bbContent}>
            <FontAwesome name="facebook" size={20} color="white" />
            <Text style={styles.bbText}>Iniciar sesión con Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/registro")}
          activeOpacity={0.7}
        >
          <Text style={styles.RegistroText}>
            ¿No tienes cuenta? <Text style={styles.regisLink}>Registrate</Text>
          </Text>
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
    fontSize: 16,
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
});
