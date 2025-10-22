import React, {useRef} from 'react';
import {
  AppRegistry,
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = height * 0.7;

const parallaxData = [
  {
    title: '🌄 Mountain Vista',
    subtitle: 'Explore the peaks',
    colors: ['#FF6B6B', '#FF8E53', '#FFA726'],
  },
  {
    title: '🌊 Ocean Depths',
    subtitle: 'Dive into the blue',
    colors: ['#4FACFE', '#00F2FE', '#43E97B'],
  },
  {
    title: '🌆 City Lights',
    subtitle: 'Urban nightscape',
    colors: ['#667EEA', '#764BA2', '#F093FB'],
  },
  {
    title: '🌸 Cherry Blossom',
    subtitle: 'Spring awakening',
    colors: ['#FA709A', '#FEE140', '#FFB88C'],
  },
  {
    title: '🌌 Galaxy Dreams',
    subtitle: 'Stars and beyond',
    colors: ['#1A2980', '#26D0CE', '#667EEA'],
  },
];

const ParallaxGalleryApp = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parallax Gallery</Text>
        <Text style={styles.headerSubtitle}>Smooth scroll experience</Text>
      </View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {parallaxData.map((item, index) => {
          const inputRange = [
            (index - 1) * CARD_HEIGHT,
            index * CARD_HEIGHT,
            (index + 1) * CARD_HEIGHT,
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [CARD_HEIGHT * 0.3, 0, -CARD_HEIGHT * 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.cardContainer,
                {
                  transform: [{scale}, {translateY}],
                  opacity,
                },
              ]}>
              <LinearGradient
                colors={item.colors}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  
                  {/* Decorative circles */}
                  <View style={styles.decorativeCircles}>
                    <View style={[styles.circle, styles.circle1]} />
                    <View style={[styles.circle, styles.circle2]} />
                    <View style={[styles.circle, styles.circle3]} />
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardNumber}>0{index + 1}</Text>
                    <Text style={styles.cardTotal}>/ 0{parallaxData.length}</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0A0E27',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  cardContainer: {
    height: CARD_HEIGHT,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 25,
  },
  cardContent: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  decorativeCircles: {
    position: 'absolute',
    top: '40%',
    right: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 15,
  },
  circle1: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  circle2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 40,
  },
  circle3: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardTotal: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 10,
  },
});

AppRegistry.registerComponent('ParallaxGalleryApp', () => ParallaxGalleryApp);
export default ParallaxGalleryApp;



