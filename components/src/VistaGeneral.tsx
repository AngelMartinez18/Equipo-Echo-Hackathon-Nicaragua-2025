import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ImageSourcePropType, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BottomNav from './BottomNav'

type Props = {
  image: ImageSourcePropType
  title: string
  duration?: string
  format?: string
  description?: string
  onPress?: () => void
  style?: any
  shortDescription?: string
  youtubeLink?: string
  areaPath?: string
  areaParams?: Record<string, any>
  showBottomNav?: boolean
  fullWidth?: boolean
}

export default function VistaGeneral({
  image,
  title,
  duration,
  format,
  description,
  onPress,
  style,
  shortDescription,
  youtubeLink,
  areaPath,
  areaParams,
  showBottomNav = true,
  fullWidth = false,
}: Props) {
  const router = useRouter()

  const extractYouTubeID = (url: string | undefined) => {
    if (!url) return null
    try {
      const u = url.trim()
      const short = u.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/)
      if (short && short[1]) return short[1]
      const long = u.match(/(?:v=|\/v\/|embed\/)([a-zA-Z0-9_-]{6,})/)
      if (long && long[1]) return long[1]
      const last = u.split('/').pop()
      if (last && last.length >= 6) return last
    } catch {
      return null
    }
    return null
  }

  const videoId = extractYouTubeID(youtubeLink)
  const [showPlayer, setShowPlayer] = useState(false)
  const [WebViewComponent, setWebViewComponent] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    // dynamic import of react-native-webview when available
    // @ts-ignore
    import('react-native-webview')
      .then((mod) => {
        if (mounted) setWebViewComponent(() => mod.WebView)
      })
      .catch(() => {
        if (mounted) setWebViewComponent(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (fullWidth) {
    return (
      <ImageBackground source={require('../../assets/menu.png')} style={[styles.background, style]} resizeMode="cover">
        <View style={styles.overlay} />

        <View style={styles.fullContentWrap}>
          <Image source={image} style={styles.bannerImage} resizeMode="cover" />

          <View style={styles.fullTextArea}>
            <Text style={styles.titleFull}>{title}</Text>

            <View style={styles.metaRow}>
              {duration ? <Text style={styles.metaText}>Duración: {duration}</Text> : null}
              {format ? <Text style={[styles.metaText, { marginLeft: 12 }]}>{format}</Text> : null}
            </View>

            {(description || shortDescription) ? (
              <Text style={[styles.description, styles.descriptionFull]}>{(description || '') + '\n\n' + (shortDescription || '')}</Text>
            ) : null}

            {youtubeLink ? (
              <TouchableOpacity style={styles.youtubePreview} onPress={() => { if (WebViewComponent && videoId) setShowPlayer(true); else Linking.openURL(youtubeLink) }}>
                {videoId ? (
                  <Image source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }} style={styles.previewImage} />
                ) : (
                  <View style={[styles.previewImage, styles.previewPlaceholder]}>
                    <Text style={styles.previewText}>Ver video</Text>
                  </View>
                )}
                <View style={styles.playOverlay} pointerEvents="none">
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </TouchableOpacity>
            ) : null}

            {showPlayer && WebViewComponent && videoId ? (
              <View style={styles.webviewInlineWrapper}>
                <View style={styles.playerSpacer} />
                <View style={styles.webviewInlineContainer}>
                  <View style={styles.webviewInlineHeader}>
                    <TouchableOpacity onPress={() => setShowPlayer(false)} style={styles.inlineClose}>
                      <Text style={styles.closeText}>Cerrar ✕</Text>
                    </TouchableOpacity>
                  </View>
                  <WebViewComponent style={styles.webviewInline} source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1` }} javaScriptEnabled domStorageEnabled />
                </View>
              </View>
            ) : null}

          </View>
        </View>

        {showBottomNav ? (
          <BottomNav
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            items={[
              { icon: require('../../assets/home.png'), onPress: () => router.push({ pathname: '/' } as any) },
              { icon: require('../../assets/Noticias.png'), onPress: () => router.push({ pathname: '/noticias' } as any) },
              { icon: require('../../assets/punto.png'), onPress: () => router.push({ pathname: '/punto' } as any) },
              { icon: require('../../assets/libro.png'), onPress: () => router.push({ pathname: '/libro' } as any) },
              { icon: require('../../assets/escribir.png'), onPress: () => router.push({ pathname: '/escribir' } as any) },
            ]}
          />
        ) : null}

      </ImageBackground>
    )
  }

  return (
    <ImageBackground source={require('../../assets/menu.png')} style={[styles.background, style]} resizeMode="cover">
      <View style={styles.overlay} />

      <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
        <View style={styles.leftColumn}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => {
            if (areaPath) {
              if (areaParams) router.push({ pathname: areaPath, params: areaParams } as any)
              else router.push({ pathname: areaPath } as any)
            } else if (onPress) {
              onPress()
            }
          }}>
            <Image source={image} style={styles.leftImage} />
          </TouchableOpacity>

          {shortDescription ? (
            <Text style={styles.shortDescription} numberOfLines={2}>{shortDescription}</Text>
          ) : null}
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>

          <View style={styles.metaRow}>
            {duration ? <Text style={styles.metaText}>Duración: {duration}</Text> : null}
            {format ? <Text style={[styles.metaText, { marginLeft: 12 }]}>{format}</Text> : null}
          </View>

          {description || shortDescription ? (
            <Text style={styles.description} numberOfLines={3}>{(description || shortDescription || '')}</Text>
          ) : null}

          {youtubeLink ? (
            <TouchableOpacity style={styles.youtubePreview} onPress={() => { if (WebViewComponent && videoId) setShowPlayer(true); else Linking.openURL(youtubeLink) }}>
              {videoId ? (
                <Image source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }} style={styles.previewImage} />
              ) : (
                <View style={[styles.previewImage, styles.previewPlaceholder]}>
                  <Text style={styles.previewText}>Ver video</Text>
                </View>
              )}
              <View style={styles.playOverlay} pointerEvents="none">
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          ) : null}

        </View>
      </TouchableOpacity>

      {!fullWidth && showPlayer && WebViewComponent && videoId ? (
        <View style={styles.webviewContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPlayer(false)}>
            <Text style={styles.closeText}>Cerrar ✕</Text>
          </TouchableOpacity>
          {WebViewComponent ? (
            <WebViewComponent style={styles.webview} source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1` }} javaScriptEnabled domStorageEnabled />
          ) : null}
        </View>
      ) : null}

      {showBottomNav ? (
        <BottomNav
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          items={[
            { icon: require('../../assets/home.png'), onPress: () => router.push({ pathname: '/' } as any) },
            { icon: require('../../assets/Noticias.png'), onPress: () => router.push({ pathname: '/noticias' } as any) },
            { icon: require('../../assets/punto.png'), onPress: () => router.push({ pathname: '/punto' } as any) },
            { icon: require('../../assets/libro.png'), onPress: () => router.push({ pathname: '/libro' } as any) },
            { icon: require('../../assets/escribir.png'), onPress: () => router.push({ pathname: '/escribir' } as any) },
          ]}
        />
      ) : null}

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    padding: 18,
    paddingTop: 40,
    alignItems: 'flex-start',
  },
  leftImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  rightContent: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)'
  },
  leftColumn: {
    width: 140,
    alignItems: 'center',
    marginRight: 12,
  },
  fullContentWrap: {
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 260,
  },
  fullTextArea: {
    padding: 18,
    paddingTop: 14,
  },
  titleFull: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
  },
  descriptionFull: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  shortDescription: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  youtubePreview: {
    marginTop: 14,
    width: '100%',
    maxWidth: 760,
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  previewPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  playOverlay: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  playIcon: {
    color: 'white',
    fontSize: 24,
  },
  webviewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '94%',
    height: '56%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webviewInlineContainer: {
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webviewInline: {
    width: '92%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webviewInlineHeader: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  inlineClose: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 6,
    marginRight: 6,
  },
  webviewInlineWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  playerSpacer: {
    height: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 28,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    zIndex: 11,
  },
  closeText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  description: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 18,
  },
})
