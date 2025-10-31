import React from 'react'
import { FlatList, Image, Text, TouchableOpacity } from 'react-native'

type Item = {
    nombre: string
    imagen: any
}

type Props = {
    title: string
    items: Item[]
    styles: any
    onItemPress?: (index: number) => void
}

export default function CatalogoBailes({ title, items, styles, onItemPress }: Props) {
    return (
        <>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => onItemPress && onItemPress(index)}
                    >
                        <Image source={item.imagen} style={styles.itemImage} />
                        <Text style={[styles.itemText, { textAlign: 'center' }]}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.nombre}
            />
        </>
    )
}