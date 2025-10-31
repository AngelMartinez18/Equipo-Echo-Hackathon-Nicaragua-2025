import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setFocus,
  formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
    },
    mode: "onBlur", // valida al perder foco; también puedes usar "onChange" o "all"
  });

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
          rules={{
            required: "El nombre de usuario es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "No puede superar 20 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                placeholder="Ej: juan_perez"
                placeholderTextColor="#777"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}
            </>
          )}
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        {/* Campo: Correo electrónico */}
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

        <Text style={styles.label}>Contraseña</Text>
        {/* Campo: Contraseña */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
            maxLength: {
              value: 20,
              message: "No puede superar 20 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ position: "relative" }}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#777"
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
                  name={showPassword ? "eye" : "eye-slash"}
                  size={18}
                  color="#000"
                />
              </TouchableOpacity>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        

        {/* Fecha de nacimiento */}
        <Text style={styles.label}>¿Cuál es tu fecha de nacimiento?</Text>
        <View style={styles.birthContainer}>
          <View style={{ alignItems: 'center' }}>
            <Controller
              control={control}
              name="birthDay"
              rules={{ required: 'Día es obligatorio', pattern: { value: /^(0?[1-9]|[12][0-9]|3[01])$/, message: 'Día inválido' } }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={[styles.birthInput, errors.birthDay && styles.inputError]}
                    placeholder="DD"
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#777"
                  />
                  {errors.birthDay && (
                    <Text style={styles.errorText}>{errors.birthDay.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Controller
              control={control}
              name="birthMonth"
              rules={{ required: 'Mes es obligatorio', pattern: { value: /^(0?[1-9]|1[0-2])$/, message: 'Mes inválido' } }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={[styles.birthInput, errors.birthMonth && styles.inputError]}
                    placeholder="MM"
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#777"
                  />
                  {errors.birthMonth && (
                    <Text style={styles.errorText}>{errors.birthMonth.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Controller
              control={control}
              name="birthYear"
              rules={{ required: 'Año es obligatorio', pattern: { value: /^(19|20)\d{2}$/, message: 'Año inválido' } }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={[styles.birthInput, errors.birthYear && styles.inputError]}
                    placeholder="AAAA"
                    maxLength={4}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#777"
                  />
                  {errors.birthYear && (
                    <Text style={styles.errorText}>{errors.birthYear.message}</Text>
                  )}
                </>
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={async () => {
            // Forzar validación y luego actuar según el resultado
            const valid = await trigger();
            if (!valid) {
              // Obtener valores y errores actuales
              const values = getValues();
              const requiredFields: (keyof FormData)[] = [
                "username",
                "email",
                "password",
                "birthMonth",
                "birthDay",
                "birthYear",
              ];

              // Detectar los campos vacíos primero
              const missing = requiredFields.filter(
                (f) => !values[f] || String(values[f]).trim() === ""
              );

              if (missing.length > 0) {
                Alert.alert(
                  "Faltan campos",
                  "Por favor completa todos los campos requeridos."
                );
                // Enfocar el primer campo faltante
                setTimeout(() => setFocus(missing[0] as any), 50);
                return;
              }

              // Si no hay campos vacíos, pero la validación falla (formatos incorrectos)
              const errorFields = Object.keys(errors);
              if (errorFields.length > 0) {
                Alert.alert(
                  "Campos inválidos",
                  "Por favor corrige los campos indicados."
                );
                setTimeout(() => setFocus(errorFields[0] as any), 50);
                return;
              }

              // Fallback genérico
              Alert.alert(
                "Errores",
                "Por favor revisa los campos del formulario."
              );
              return;
            }

            handleSubmit(onSubmit)();
          }}
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
            ¿Ya tienes cuenta?{" "}
            <Text style={styles.regisLink}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Cambios en los estilos para adaptar la UI
const styles = StyleSheet.create({
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
