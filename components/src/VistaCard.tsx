import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  image: ImageSourcePropType
  title: string
  duration?: string
  format?: string
  shortDescription?: string
  areaPath?: string
  areaParams?: Record<string, any>
  style?: any
}

export default function VistaCard({ image, title, duration, format, shortDescription, areaPath, areaParams, style }: Props) {
  const router = useRouter()
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={() => {
      if (areaPath) router.push({ pathname: areaPath, params: areaParams } as any)
    }}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.meta}>{duration ? `Duración: ${duration}` : ''} {format ? ` • ${format}` : ''}</Text>
        {shortDescription ? <Text style={styles.short} numberOfLines={2}>{shortDescription}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    marginVertical: 8,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  meta: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 6,
  },
  short: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  }
})
