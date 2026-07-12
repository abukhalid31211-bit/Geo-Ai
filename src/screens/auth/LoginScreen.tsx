import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput as RNTextInput,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
} from '@theme';
import { useHaptics }  from '@hooks/useHaptics';
import { useAuth }     from '@hooks/useAuth';
import { useSnackbar } from '@components/ui/feedback';
import type { AuthStackParamList } from '@navigation/types';

// Components
import { TextInput }     from '@components/ui/inputs';
import { PasswordInput } from '@components/ui/inputs';
import { PrimaryButton } from '@components/ui/buttons/PrimaryButton';
import { GhostButton }   from '@components/ui/buttons/GhostButton';
import { CheckboxInput } from '@components/ui/inputs';

// ─────────────────────────────────────────────────────────────
type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

// ── Validation Schema ─────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ── Animation timing (ms) ─────────────────────────────────────
const A = {
  LOGO:     0,
  TITLE:    200,
  SUBTITLE: 350,
  FORM:     500,
  DIVIDER:  700,
  GOOGLE:   800,
  REGISTER: 900,
} as const;

// ─────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();
  const { width }  = useWindowDimensions();
  const { light, success: successHaptic, error: errorHaptic } = useHaptics();
  const { login, loginWithGoogle, isLoading, error, clearError } = useAuth();
  const { show: showSnackbar } = useSnackbar();

  const [rememberMe, setRememberMe] = useState(false);
  const passwordRef = useRef<RNTextInput>(null);

  // ── Form ──────────────────────────────────────────────────────
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver:      zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // ── Shared Values ─────────────────────────────────────────────
  const logoOpacity  = useSharedValue(0);
  const logoScale    = useSharedValue(0.5);
  const logoY        = useSharedValue(-20);
  const titleOpacity = useSharedValue(0);
  const titleY       = useSharedValue(16);
  const subtitleOp   = useSharedValue(0);
  const formOpacity  = useSharedValue(0);
  const formY        = useSharedValue(24);
  const dividerOp    = useSharedValue(0);
  const googleOp     = useSharedValue(0);
  const registerOp   = useSharedValue(0);
  const shakeX       = useSharedValue(0);
  const bgRotation   = useSharedValue(0);

  // ── Entrance Animations ───────────────────────────────────────
  useEffect(() => {
    logoOpacity.value = withDelay(A.LOGO,  withTiming(1, { duration: 500 }));
    logoScale.value   = withDelay(A.LOGO,  withSpring(1, Springs.bouncy));
    logoY.value       = withDelay(A.LOGO,  withSpring(0, Springs.default));

    titleOpacity.value = withDelay(A.TITLE, withTiming(1, { duration: 400 }));
    titleY.value       = withDelay(A.TITLE, withSpring(0, Springs.default));

    subtitleOp.value = withDelay(A.SUBTITLE, withTiming(1, { duration: 400 }));
    formOpacity.value = withDelay(A.FORM, withTiming(1, { duration: 500 }));
    formY.value       = withDelay(A.FORM, withSpring(0, Springs.default));
    dividerOp.value   = withDelay(A.DIVIDER, withTiming(1, { duration: 300 }));
    googleOp.value    = withDelay(A.GOOGLE,  withTiming(1, { duration: 300 }));
    registerOp.value  = withDelay(A.REGISTER, withTiming(1, { duration: 300 }));

    // Slow background rotation — loops via long duration
    bgRotation.value = withTiming(360, {
      duration: 40000,
      easing:   Easing.linear,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auth errors → shake + snackbar ───────────────────────────
  useEffect(() => {
    if (error) {
      triggerShake();
      errorHaptic();
      showSnackbar({ message: error, type: 'error' });
      clearError();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // ── Shake ─────────────────────────────────────────────────────
  const triggerShake = useCallback(() => {
    shakeX.value = withSequence(
      withTiming(-10, { duration: 60 }),
      withTiming(10,  { duration: 60 }),
      withTiming(-8,  { duration: 60 }),
      withTiming(8,   { duration: 60 }),
      withTiming(-4,  { duration: 60 }),
      withTiming(0,   { duration: 60 }),
    );
  }, [shakeX]);

  // ── Submit ────────────────────────────────────────────────────
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      const success = await login(data.email, data.password);
      if (success) {
        successHaptic();
        showSnackbar({
          message:  'مرحباً بعودتك! 👋',
          type:     'success',
          duration: 2000,
        });
        // RootNavigator reacts to isAuthenticated → auto-navigates to Main
      }
    },
    [login, showSnackbar, successHaptic],
  );

  // ── Google Sign-in ────────────────────────────────────────────
  const handleGoogleLogin = useCallback(async () => {
    light();
    const success = await loginWithGoogle();
    if (success) {
      successHaptic();
      showSnackbar({
        message:  'تم الدخول عبر Google بنجاح',
        type:     'success',
        duration: 2000,
      });
    }
  }, [loginWithGoogle, light, showSnackbar, successHaptic]);

  // ── Animated Styles ───────────────────────────────────────────
  const logoStyle = useAnimatedStyle(() => ({
    opacity:   logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoY.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity:   titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOp.value,
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity:   formOpacity.value,
    transform: [{ translateY: formY.value }, { translateX: shakeX.value }],
  }));

  const dividerStyle  = useAnimatedStyle(() => ({ opacity: dividerOp.value }));
  const googleStyle   = useAnimatedStyle(() => ({ opacity: googleOp.value }));
  const registerStyle = useAnimatedStyle(() => ({ opacity: registerOp.value }));

  const bgRotStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bgRotation.value}deg` }],
  }));

  // ─────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >

          {/* ── Background decoration ────────────────────── */}
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {/* Top gold circle — rotates slowly */}
            <Animated.View style={[
              styles.bgCircleTop,
              {
                width:  width * 0.8,
                height: width * 0.8,
                top:    -width * 0.4,
                right:  -width * 0.2,
              },
              bgRotStyle,
            ]} />

            {/* Bottom accent circle */}
            <View style={[
              styles.bgCircleBottom,
              {
                width:  width * 0.6,
                height: width * 0.6,
                bottom: -width * 0.3,
                left:   -width * 0.2,
              },
            ]} />

            {/* Radar ring hints */}
            {[0.15, 0.3, 0.45].map((r, i) => (
              <View
                key={i}
                style={{
                  position:     'absolute',
                  width:        width * r * 2,
                  height:       width * r * 2,
                  borderRadius: width * r,
                  borderWidth:  0.3,
                  borderColor:  'rgba(245,166,35,0.04)',
                  top:          width * 0.1 - width * r,
                  right:        width * 0.1 - width * r,
                }}
              />
            ))}
          </View>

          {/* ── Logo ─────────────────────────────────────── */}
          <Animated.View style={[styles.logoArea, logoStyle]}>
            <LinearGradient
              colors={['#FFD27A', '#F5A623', '#C47D0E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoCircle}
            >
              <Text style={styles.logoLetters}>SG</Text>
            </LinearGradient>
          </Animated.View>

          {/* ── Title ────────────────────────────────────── */}
          <Animated.View style={[styles.titleArea, titleStyle]}>
            <Text style={styles.welcomeText}>مرحباً بعودتك</Text>
            <Text style={styles.appTitle}>SAMGOLD</Text>
          </Animated.View>

          {/* ── Subtitle ─────────────────────────────────── */}
          <Animated.View style={subtitleStyle}>
            <Text style={styles.subtitle}>سجّل دخولك للمتابعة</Text>
          </Animated.View>

          {/* ── Form card ────────────────────────────────── */}
          <Animated.View style={[styles.formCard, formStyle]}>

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="البريد الإلكتروني"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                  leftIcon="user"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  required
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <PasswordInput
                  ref={passwordRef}
                  label="كلمة المرور"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  required
                />
              )}
            />

            {/* Remember me + Forgot password */}
            <View style={styles.optionsRow}>
              <CheckboxInput
                checked={rememberMe}
                onToggle={setRememberMe}
                label="تذكّرني"
              />
              <GhostButton
                label="نسيت كلمة المرور؟"
                onPress={() => navigation.navigate('ForgotPassword')}
                size="sm"
                underline
                color={Colors.primary}
              />
            </View>

            {/* Login button */}
            <PrimaryButton
              label="تسجيل الدخول"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              icon="chevronLeft"
              iconPosition="left"
              size="lg"
            />

          </Animated.View>

          {/* ── Divider ──────────────────────────────────── */}
          <Animated.View style={[styles.divider, dividerStyle]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* ── Google button ─────────────────────────────── */}
          <Animated.View style={[styles.fullWidth, googleStyle]}>
            <GoogleSignInButton
              onPress={handleGoogleLogin}
              loading={isLoading}
            />
          </Animated.View>

          {/* ── Register link ─────────────────────────────── */}
          <Animated.View style={[styles.registerRow, registerStyle]}>
            <Text style={styles.registerPrompt}>ليس لديك حساب؟</Text>
            <GhostButton
              label="سجّل الآن"
              onPress={() => navigation.navigate('Register')}
              size="md"
              color={Colors.primary}
            />
          </Animated.View>

          {/* Bottom padding */}
          <View style={{ height: Spacing[6] }} />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Google Sign-in Button ─────────────────────────────────────
function GoogleSignInButton({
  onPress,
  loading,
}: {
  onPress: () => void;
  loading: boolean;
}) {
  const { light } = useHaptics();
  const scale     = useSharedValue(1);

  const pressIn  = () => { scale.value = withSpring(0.97, Springs.snappy); };
  const pressOut = () => { scale.value = withSpring(1,    Springs.bouncy); };
  const press    = () => {
    if (loading) return;
    light();
    onPress();
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity:   loading ? 0.7 : 1,
  }));

  return (
    <Pressable
      onPress={press}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={loading}
    >
      <Animated.View style={[styles.googleButton, animStyle]}>
        <View style={styles.googleLogoWrap}>
          <Text style={styles.googleLogoG}>G</Text>
        </View>
        <Text style={styles.googleText}>
          {loading ? 'جارٍ الدخول...' : 'الدخول بحساب Google'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: { flex: 1 },
  fullWidth: { width: '100%' },

  safeArea: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },

  scroll: { flex: 1 },

  scrollContent: {
    flexGrow:          1,
    paddingHorizontal: Spacing[5],
    paddingTop:        Spacing[6],
    alignItems:        'center',
    gap:               Spacing[5],
  },

  // Background
  bgCircleTop: {
    position:        'absolute',
    borderRadius:    9999,
    backgroundColor: Colors.primaryGlowDim,
    opacity:         0.5,
  },

  bgCircleBottom: {
    position:        'absolute',
    borderRadius:    9999,
    backgroundColor: 'rgba(6,182,212,0.03)',
  },

  // Logo
  logoArea: {
    alignItems:     'center',
    justifyContent: 'center',
    marginTop:      Spacing[4],
  },

  logoCircle: {
    width:          80,
    height:         80,
    borderRadius:   24,
    alignItems:     'center',
    justifyContent: 'center',
    shadowColor:    Colors.primary,
    shadowOpacity:  0.4,
    shadowRadius:   20,
    shadowOffset:   { width: 0, height: 4 },
    elevation:      8,
  },

  logoLetters: {
    fontSize:      30,
    fontWeight:    '900',
    color:         Colors.textInverse,
    letterSpacing: -1,
  },

  // Title
  titleArea: {
    alignItems: 'center',
    gap:        Spacing[1],
  },

  welcomeText: {
    ...Typography.titleMedium,
    color: Colors.textSecondary,
  },

  appTitle: {
    fontSize:      28,
    fontWeight:    '900',
    color:         Colors.primary,
    letterSpacing: 4,
  },

  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },

  // Form card
  formCard: {
    width:           '100%',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardXl,
    padding:         Spacing[5],
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
    gap:             Spacing[4],
  },

  optionsRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems:    'center',
    width:         '100%',
    gap:           Spacing[3],
  },

  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: Colors.borderDefault,
  },

  dividerText: {
    ...Typography.caption,
    color: Colors.textDisabled,
  },

  // Google button
  googleButton: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    gap:               Spacing[3],
    height:            52,
    borderRadius:      Radius.buttonLg,
    borderWidth:       1.5,
    borderColor:       Colors.borderDefault,
    backgroundColor:   Colors.surfaceSecondary,
    paddingHorizontal: Spacing[5],
    width:             '100%',
  },

  googleLogoWrap: {
    width:           28,
    height:          28,
    borderRadius:    14,
    backgroundColor: Colors.surfaceElevated,
    alignItems:      'center',
    justifyContent:  'center',
  },

  googleLogoG: {
    fontSize:   16,
    fontWeight: '800',
    color:      Colors.primary,
  },

  googleText: {
    ...Typography.buttonMedium,
    color: Colors.textPrimary,
  },

  // Register row
  registerRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing[1],
  },

  registerPrompt: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
});
