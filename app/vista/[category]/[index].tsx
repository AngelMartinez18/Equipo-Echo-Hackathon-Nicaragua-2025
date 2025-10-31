import VistaGeneral from '@/components/src/VistaGeneral'
import { bailes, CatalogItem, comidas, cuentos } from '@/constants/catalogData'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const collections: Record<string, CatalogItem[]> = {
  bailes,
  cuentos,
  comidas,
}

export default function ItemVista() {
  const params = useLocalSearchParams() as { category?: string; index?: string }
  const router = useRouter()
  const category = params.category || 'cuentos'
  const index = Number(params.index ?? 0)

  const items = collections[category] || cuentos
  const item = items[index] || items[0]

  return (
    <View style={{ flex: 1 }}>
      <VistaGeneral
        image={item.imagen}
        title={item.nombre}
        duration={(item as any).duration || '—'}
        format={(item as any).format || 'Texto'}
        description={item.description || ''}
        shortDescription={(item as any).shortDescription}
        youtubeLink={(item as any).youtubeLink}
        areaPath={(item as any).areaPath}
        areaParams={(item as any).areaParams}
        onPress={() => router.back()}
      />
    </View>
  )
}
