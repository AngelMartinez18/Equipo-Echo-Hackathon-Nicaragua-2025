import BottomNav from "@/components/src/BottomNav";
import CatalogoBailes from "@/components/src/Catalogo";
import VistaCard from "@/components/src/VistaCard";
import { bailes, comidas, cuentos } from "@/constants/catalogData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Imagen de fondo
const BACKGROUND_IMAGE = require("../assets/menu.png");

// Carrusel de imágenes (simulado)
const carruselImages = [
  require("../assets/Gueguense.jpg"),
  require("../assets/ElPadreSinCabeza.jpg"),
  require("../assets/ToroHuaco.jpg"),
];

// (Los datos del catálogo se importan desde constants/catalogData.ts)

export default function PerfilScreen() {
  // Estado para el carrusel automático
  const [carruselIndex, setCarruselIndex] = useState(0);
  const carruselRef = useRef<FlatList>(null);
  const [userName, setUserName] = useState<string | null>("Invitado");

  // Auto-scroll del carrusel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (carruselIndex + 1) % carruselImages.length;
      setCarruselIndex(nextIndex);
      carruselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [carruselIndex]);

  // Cerrar sesión
  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/auth/login");
  };

  // Leer nombre de usuario desde AsyncStorage al montar
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

  // Navegación superior
  const goToPerfil = () => router.push("./auth/perfil");
  const goToCalendario = () => router.push("./auth/calendario");
  const goToJuegos = () => router.push("./auth/juegos");

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      <View style={styles.topBar}>
        {/* Botón calendario */}
        <TouchableOpacity onPress={goToCalendario} style={styles.iconButton}>
          <Image
            source={require("../assets/calendario.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Botón juegos */}
        <TouchableOpacity onPress={goToJuegos} style={styles.iconButton}>
          <Image source={require("../assets/Juegos.png")} style={styles.icon} />
        </TouchableOpacity>
        {/* Perfil */}
        <TouchableOpacity onPress={goToPerfil} style={styles.profileContainer}>
          <Text style={styles.profileName}>{userName ?? "Usuario"}</Text>
          <Image
            source={require("../assets/img3.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <Text style={styles.title}>KUENTALO</Text>
          {/* Carrusel automático */}
          <View style={styles.carruselContainer}>
            <FlatList
              ref={carruselRef}
              data={carruselImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={item} style={styles.carruselImage} />
              )}
              keyExtractor={(_, idx) => idx.toString()}
            />
          </View>

          {/* Sección Bailes nicaragüenses */}
          <CatalogoBailes
            title="Bailes nicaragüenses"
            items={bailes}
            styles={styles}
            onItemPress={(index) =>
              router.push({
                pathname: "/vista/[category]/[index]",
                params: { category: "bailes", index },
              } as any)
            }
          />

          {/* Sección Cuentos Nicas */}
          <CatalogoBailes
            title="Cuentos Nicas"
            items={cuentos}
            styles={styles}
            onItemPress={(index) =>
              router.push({
                pathname: "/vista/[category]/[index]",
                params: { category: "cuentos", index },
              } as any)
            }
          />

          {/* Sección Comida típica */}
          <CatalogoBailes
            title="Comida típica"
            items={comidas}
            styles={styles}
            onItemPress={(index) =>
              router.push({
                pathname: "/vista/[category]/[index]",
                params: { category: "comidas", index },
              } as any)
            }
          />

          {/* Ejemplo de VistaGeneral usando el primer cuento */}
          <VistaCard
            image={cuentos[0].imagen}
            title={cuentos[0].nombre}
            duration={(cuentos[0] as any).duration || "15 min"}
            format={(cuentos[0] as any).format || "Texto"}
            shortDescription={(cuentos[0] as any).shortDescription}
            areaPath={(cuentos[0] as any).areaPath}
            areaParams={(cuentos[0] as any).areaParams}
            style={{ marginTop: 12 }}
          />

          {/* Botón cerrar sesión */}
          <TouchableOpacity
            onPress={logout}
            style={{ marginTop: 20, alignSelf: "center" }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
              }}
            >
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomNav
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        items={[
          {
            icon: require("../assets/home.png"),
            onPress: () => console.log("Home Pressed"),
          },
          {
            icon: require("../assets/Noticias.png"),
            onPress: () => console.log("Noticias Pressed"),
          },
          {
            icon: require("../assets/punto.png"),
            onPress: () => console.log("Punto Pressed"),
          },
          {
            icon: require("../assets/libro.png"),
            onPress: () => console.log("Libro Pressed"),
          },
          {
            icon: require("../assets/escribir.png"),
            onPress: () => console.log("Escribir Pressed"),
          },
        ]}
      />
    </ImageBackground>
  );
}

// Estilos y comentarios explicativos
const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",

    padding: 20,
    zIndex: 2,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  iconButton: {
    marginRight: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    justifyContent: "flex-end",
  },
  profileName: {
    color: "white",
    fontSize: 16,
    marginRight: 8,
    fontFamily: "Poppins_500Medium",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    justifyContent: "flex-start",
  },
  title: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  carruselContainer: {
    height: 140,
    marginBottom: 20,
  },
  carruselImage: {
    width: Dimensions.get("window").width - 40,
    height: 140,
    borderRadius: 12,
    marginRight: 10,
  },
  sectionTitle: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  itemContainer: {
    width: 110,
    marginRight: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 4,
  },
  itemText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    textAlign: "center",
  },
});
