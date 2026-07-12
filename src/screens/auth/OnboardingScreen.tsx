import React, {
  useCallback,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { SplashUtils } from '@utils/splashUtils';

// Sub-components
import { OnboardingSlide1 } from './onboarding/OnboardingSlide1';
import { OnboardingSlide2 } from './onboarding/OnboardingSlide2';
import { OnboardingSlide3 } from './onboarding/OnboardingSlide3';
import { OnboardingDots }   from './onboarding/OnboardingDots';

type OnboardingNavProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

const TOTAL_SLIDES = 3;

const SLIDES = [
  {
    id:          1,
    title:       'حوّل هاتفك إلى\nمحطة ميدانية',
    description: 'استورد بيانات GPR وERT وخرائط الطبوغرافيا وحلّلها في الحقل مباشرةً — بدون اتصال بالإنترنت.',
    accentColor: Colors.primary,
  },
  {
    id:          2,
    title:       'الكاشف الذكي\nبالذكاء الاصطناعي',
    description: 'يحلل البصمة الجيوفيزيائية ويمنحك نسبة احتمالية دقيقة لنوع الهدف وعمقه تحت الأرض.',
    accentColor: Colors.info,
  },
  {
    id:          3,
    title:       'رؤية ثلاثية\nالأبعاد',
    description: 'شاهد ما تحت الأرض — طبقات جيولوجية ملونة وأهداف مكتشفة بعرض تفاعلي ثلاثي الأبعاد.',
    accentColor: Colors.success,
  },
] as const;

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingNavProp>();
  const { width }  = useWindowDimensions();
  const { light, success: successHaptic } = useHaptics();

  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const startX     = useSharedValue(0);
  // Slide1 progress placeholder (slide manages its own animations)
  const slide1Progress = useSharedValue(0);

  // ── Navigation helpers ──────────────────────────────────────
  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    translateX.value = withSpring(-clamped * width, Springs.default);
    setCurrentIndex(clamped);
  }, [width]);

  const handleNext = useCallback(() => {
    light();
    if (currentIndex < TOTAL_SLIDES - 1) {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, goToSlide, light]);

  const handleSkip = useCallback(() => {
    light();
    goToSlide(TOTAL_SLIDES - 1);
  }, [goToSlide, light]);

  const handleGetStarted = useCallback(async () => {
    successHaptic();
    await SplashUtils.markOnboardingDone();
    navigation.replace('Login');
  }, [navigation, successHaptic]);

  // ── Swipe Gesture ───────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      startX.value     = translateX.value;
    })
    .onUpdate((e) => {
      const newX = startX.value + e.translationX;
      const minX = -(TOTAL_SLIDES - 1) * width;
      const maxX = 0;

      if (newX > maxX) {
        translateX.value = maxX + (newX - maxX) * 0.15;
      } else if (newX < minX) {
        translateX.value = minX + (newX - minX) * 0.15;
      } else {
        translateX.value = newX;
      }
    })
    .onEnd((e) => {
      isDragging.value = false;
      const velocityThreshold  = 500;
      const distanceThreshold  = width * 0.3;
      const currentSlide       = Math.round(-startX.value / width);

      if (
        e.velocityX < -velocityThreshold ||
        e.translationX < -distanceThreshold
      ) {
        const next = Math.min(currentSlide + 1, TOTAL_SLIDES - 1);
        runOnJS(goToSlide)(next);
      } else if (
        e.velocityX > velocityThreshold ||
        e.translationX > distanceThreshold
      ) {
        const prev = Math.max(currentSlide - 1, 0);
        runOnJS(goToSlide)(prev);
      } else {
        runOnJS(goToSlide)(currentSlide);
      }
    })
    .activeOffsetX([-10, 10])
    .failOffsetY([-15, 15]);

  // ── Animated Styles ─────────────────────────────────────────
  const slidesStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const bgStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      [0, -width, -2 * width],
      [0, 1, 2],
      Extrapolation.CLAMP
    );
    return {
      backgroundColor: interpolateColor(
        progress,
        [0, 1, 2],
        [
          'rgba(245,166,35,0.04)',
          'rgba(6,182,212,0.04)',
          'rgba(34,197,94,0.04)',
        ]
      ),
    };
  });

  const skipStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      currentIndex === TOTAL_SLIDES - 1 ? 0 : 1,
      { duration: Duration.normal }
    ),
  }));

  const isLastSlide = currentIndex === TOTAL_SLIDES - 1;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />

      {/* Background tint */}
      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]} />

      {/* ── Top Bar ─────────────────────────────────────── */}
      <View style={[styles.topBar, { paddingTop: Spacing[12] }]}>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>SG</Text>
        </View>

        <Animated.View style={skipStyle} pointerEvents={isLastSlide ? 'none' : 'auto'}>
          <Pressable onPress={handleSkip} style={styles.skipButton} hitSlop={12}>
            <Text style={styles.skipText}>تخطي</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* ── Slides Container ────────────────────────────── */}
      <GestureDetector gesture={panGesture}>
        <View style={[styles.slidesContainer, { width }]}>
          <Animated.View style={[
            styles.slidesTrack,
            { width: width * TOTAL_SLIDES },
            slidesStyle,
          ]}>
            <View style={[styles.slide, { width }]}>
              <OnboardingSlide1
                isActive={currentIndex === 0}
                progress={slide1Progress}
                translateX={translateX}
                slideWidth={width}
                slideIndex={0}
              />
            </View>

            <View style={[styles.slide, { width }]}>
              <OnboardingSlide2
                isActive={currentIndex === 1}
                translateX={translateX}
                slideWidth={width}
                slideIndex={1}
              />
            </View>

            <View style={[styles.slide, { width }]}>
              <OnboardingSlide3
                isActive={currentIndex === 2}
                translateX={translateX}
                slideWidth={width}
                slideIndex={2}
              />
            </View>
          </Animated.View>
        </View>
      </GestureDetector>

      {/* ── Bottom Area ─────────────────────────────────── */}
      <View style={styles.bottomArea}>
        <SlideTextContent
          slides={SLIDES}
          currentIndex={currentIndex}
          translateX={translateX}
          width={width}
        />

        <OnboardingDots
          total={TOTAL_SLIDES}
          current={currentIndex}
          translateX={translateX}
          slideWidth={width}
        />

        <OnboardingButton
          isLastSlide={isLastSlide}
          onNext={handleNext}
          onGetStarted={handleGetStarted}
          currentIndex={currentIndex}
          translateX={translateX}
          slideWidth={width}
        />
      </View>
    </View>
  );
}

// ── Slide Text Content ───────────────────────────────────────
// Each slide's text fades+slides on translateX change.
function SlideTextContent({
  slides,
  translateX,
  width,
}: {
  slides:       typeof SLIDES;
  currentIndex: number;
  translateX:   Animated.SharedValue<number>;
  width:        number;
}) {
  return (
    <View style={styles.textArea}>
      {slides.map((slide, index) => (
        <AnimatedSlideText
          key={slide.id}
          slide={slide}
          index={index}
          translateX={translateX}
          width={width}
        />
      ))}
    </View>
  );
}

function AnimatedSlideText({
  slide,
  index,
  translateX,
  width,
}: {
  slide:      (typeof SLIDES)[number];
  index:      number;
  translateX: Animated.SharedValue<number>;
  width:      number;
}) {
  const animStyle = useAnimatedStyle(() => {
    const inputRange = [
      -(index + 1) * width,
      -index * width,
      -(index - 1) * width,
    ];
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [20, 0, -20],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
      position:  index === 0 ? ('relative' as const) : ('absolute' as const),
      top:       index === 0 ? undefined : 0,
      left:      0,
      right:     0,
    };
  });

  return (
    <Animated.View style={animStyle}>
      <Text style={[styles.slideTitle, { color: slide.accentColor }]}>
        {slide.title}
      </Text>
      <Text style={styles.slideDescription}>{slide.description}</Text>
    </Animated.View>
  );
}

// ── Onboarding CTA Button ────────────────────────────────────
function OnboardingButton({
  isLastSlide,
  onNext,
  onGetStarted,
}: {
  isLastSlide:  boolean;
  onNext:       () => void;
  onGetStarted: () => void;
  currentIndex: number;
  translateX:   Animated.SharedValue<number>;
  slideWidth:   number;
}) {
  const { medium } = useHaptics();
  const scale      = useSharedValue(1);

  const handlePressIn  = () => { scale.value = withSpring(0.96, Springs.snappy); };
  const handlePressOut = () => { scale.value = withSpring(1, Springs.bouncy); };
  const handlePress    = () => {
    medium();
    isLastSlide ? onGetStarted() : onNext();
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={buttonStyle}>
        <LinearGradient
          colors={['#FFD27A', '#F5A623', '#C47D0E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>
            {isLastSlide ? 'ابدأ الآن 🚀' : 'التالي →'}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },

  topBar: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: Spacing[5],
    paddingBottom:     Spacing[3],
  },

  logoMark: {
    width:           36,
    height:          36,
    borderRadius:    10,
    backgroundColor: Colors.primary,
    alignItems:      'center',
    justifyContent:  'center',
  },

  logoText: {
    fontSize:   14,
    fontWeight: '900',
    color:      Colors.textInverse,
  },

  skipButton: {
    paddingVertical:   Spacing[1.5],
    paddingHorizontal: Spacing[3],
    borderRadius:      Radius.buttonRound,
    borderWidth:       1,
    borderColor:       Colors.borderDefault,
  },

  skipText: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
  },

  slidesContainer: {
    flex:     1,
    overflow: 'hidden',
  },

  slidesTrack: {
    flex:          1,
    flexDirection: 'row',
  },

  slide: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    overflow:       'hidden',
  },

  bottomArea: {
    paddingHorizontal: Spacing[6],
    paddingBottom:     Spacing[12],
    gap:               Spacing[6],
    alignItems:        'center',
  },

  textArea: {
    width:     '100%',
    minHeight: 120,
    position:  'relative',
  },

  slideTitle: {
    ...Typography.displayMedium,
    textAlign:    'center',
    lineHeight:   36,
    marginBottom: Spacing[3],
  },

  slideDescription: {
    ...Typography.bodyLarge,
    color:      Colors.textSecondary,
    textAlign:  'center',
    lineHeight: 26,
  },

  ctaButton: {
    height:            56,
    paddingHorizontal: Spacing[12],
    borderRadius:      Radius.buttonRound,
    alignItems:        'center',
    justifyContent:    'center',
    shadowColor:       Colors.primary,
    shadowOpacity:     0.4,
    shadowRadius:      12,
    shadowOffset:      { width: 0, height: 4 },
    elevation:         8,
    minWidth:          200,
  },

  ctaText: {
    ...Typography.buttonLarge,
    color: Colors.textInverse,
  },
});
