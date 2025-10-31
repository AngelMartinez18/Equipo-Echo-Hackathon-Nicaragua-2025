import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


type FormData = {
  username: string;
  email: string;
  password: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
};

export default function PerfilScreen() {
  const [userName, setUserName] = useState<string | null>("Invitado");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const activeUserString = await AsyncStorage.getItem("activeUser");
        if (activeUserString) {
          const activeUser = JSON.parse(activeUserString);
          const name = activeUser?.username || activeUser?.email || "Invitado";
          setUserName(name);
        }
      } catch (e) {
        console.warn("Error leyendo activeUser desde AsyncStorage", e);
      }
    };
    fetchUserName();
  }, []);
  return (
    <ImageBackground
      source={require("../../assets/RegistroImg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      <View style={styles.contentContainer}>
        <View style={styles.ConImgDes}>
          <Image
            source={require("../../assets/logoUN.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Crear cuenta</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

// Cambios en los estilos para adaptar la UI
const styles = StyleSheet.create({
  ConImgDes: {
    flex: 1,
    alignItems: "flex-start",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Más sutil sobre fondo oscuro
    marginVertical: 10,
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
    flex: 1,
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
    fontSize: 14,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
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
    fontFamily: "Poppins_500Medium",
    padding: 5,
    color: "white", // **Mejora:** Texto blanco sobre fondo oscuro
    fontSize: 16,
  },
  regisLink: {
    color: "#FAB12F", // Enlace en color de acento para contraste
  },
});
