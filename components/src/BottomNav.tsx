import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'


type NavItem = {
  icon: ImageSourcePropType
  onPress: () => void
}

interface BottomNavProps {
  items: NavItem[]
  style?: ViewStyle
}

const BottomNav: React.FC<BottomNavProps> = ({ items, style }) => {
  return (
    <View style={[styles.bottomBar, style]}> 
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navButton}
          onPress={item.onPress}
        >
          <Image source={item.icon} style={styles.navIcon} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 3,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
   navIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
})

export default BottomNav