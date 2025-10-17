import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Imagen de fondo
const BACKGROUND_IMAGE = require('../assets/menu.png');

// Carrusel de imágenes (simulado)
const carruselImages = [
  require('../assets/Gueguense.jpg'),
  require('../assets/ElPadreSinCabeza.jpg'),
  require('../assets/ToroHuaco.jpg'),
];

// Bailes nicaragüenses
const bailes = [
  { nombre: 'Gueguense', imagen: require('../assets/Gueguense.jpg') },
  { nombre: 'Palo de mayo', imagen: require('../assets/PalodeMayo.jpg') },
  { nombre: 'Toro huaco', imagen: require('../assets/ToroHuaco.jpg') },
];

// Cuentos Nicas
const cuentos = [
  { nombre: 'El pájaro azul', imagen: require('../assets/ElPajaroAzul.jpg') },
  { nombre: 'La princesa', imagen: require('../assets/image 23.png') },
  { nombre: 'El padre', imagen: require('../assets/ElPadreSinCabeza.jpg') },
];

export default function PerfilScreen() {
  // Estado para el carrusel automático
  const [carruselIndex, setCarruselIndex] = useState(0);
  const carruselRef = useRef<FlatList>(null);

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

  // Navegación superior
  const goToPerfil = () => router.push('./perfil');
  const goToCalendario = () => router.push('./calendario');
  const goToJuegos = () => router.push('./juegos');

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.darkOverlay} />

      <View style={styles.topBar}>
        {/* Botón calendario */}
        <TouchableOpacity onPress={goToCalendario} style={styles.iconButton}>
          <Image source={require('../assets/imag1.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Botón juegos */}
        <TouchableOpacity onPress={goToJuegos} style={styles.iconButton}>
          <Image source={require('../assets/img2.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Perfil */}
        <TouchableOpacity onPress={goToPerfil} style={styles.profileContainer}>
          <Text style={styles.profileName}>Kryhesler</Text>
          <Image source={require('../assets/img3.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
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
        <Text style={styles.sectionTitle}>Bailes nicaragüenses</Text>
        <FlatList
          data={bailes}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.imagen} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.nombre}</Text>
            </View>
          )}
          keyExtractor={item => item.nombre}
        />

        {/* Sección Cuentos Nicas */}
        <Text style={styles.sectionTitle}>Cuentos Nicas</Text>
        <FlatList
          data={cuentos}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.imagen} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.nombre}</Text>
            </View>
          )}
          keyExtractor={item => item.nombre}
        />

        {/* Botón cerrar sesión */}
        <TouchableOpacity onPress={logout} style={{ marginTop: 20, alignSelf: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins_500Medium', fontSize: 16 }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/Noticias.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/punto.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/libro.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/escribir.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Estilos y comentarios explicativos
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    
    padding: 20,
    zIndex: 2,
  },
  icon: {
    width: 32,
    height: 32,
  },
  iconButton: {
    marginRight: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'Poppins_500Medium',
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
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  carruselContainer: {
    height: 140,
    marginBottom: 20,
  },
  carruselImage: {
    width: Dimensions.get('window').width - 40,
    height: 140,
    borderRadius: 12,
    marginRight: 10,
  },
  sectionTitle: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  itemContainer: {
    width: 110,
    marginRight: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 4,
  },
  itemText: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    paddingVertical: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 3,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 32,
    height: 32,
  },
});
