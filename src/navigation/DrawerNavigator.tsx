import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient }    from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
  Gradients,
} from '@theme';
import { useHaptics }           from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '@components/ui/icons/AppIcon';
import { DrawerParamList }      from './types';
import MainNavigator            from './MainNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

// ── Drawer menu items ──────────────────────────────────────
interface DrawerItem {
  key:        string;
  label:      string;
  icon:       AppIconName;
  tabRoute?:  string;
  color?:     string;
  badge?:     string;
  onPress?:   () => void;
  separator?: boolean;
}

const DRAWER_ITEMS: DrawerItem[] = [
  { key: 'home',     label: 'الصفحة الرئيسية',       icon: 'home',         tabRoute: 'HomeTab'     },
  { key: 'projects', label: 'مشاريعي',                icon: 'projects',     tabRoute: 'ProjectsTab' },
  { key: 'detector', label: 'الكاشف الذكي',           icon: 'radar',        tabRoute: 'DetectorTab', color: Colors.primary },
  { key: 'threed',   label: 'العرض ثلاثي الأبعاد',   icon: 'cube',         tabRoute: 'ThreeDTab'   },
  { key: 'sep1',     label: '',  icon: 'info', separator: true },
  { key: 'reports',  label: 'تقاريري',                icon: 'report'                                 },
  { key: 'plans',    label: 'الاشتراكات',             icon: 'subscription', tabRoute: 'SettingsTab',
    badge: 'PRO', color: Colors.primary },
  { key: 'sep2',     label: '',  icon: 'info', separator: true },
  { key: 'settings', label: 'الإعدادات',              icon: 'settings',     tabRoute: 'SettingsTab' },
  { key: 'help',     label: 'المساعدة',               icon: 'info'                                   },
];

// ── Drawer Menu Item ───────────────────────────────────────
function DrawerMenuItem({
  item,
  onPress,
}: {
  item:    DrawerItem;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97, Springs.snappy); }}
      onPressOut={() => { scale.value = withSpring(1,    Springs.default); }}
    >
      <Animated.View style={[styles.drawerItem, animStyle]}>
        <View style={[
          styles.drawerItemIcon,
          item.color ? { backgroundColor: `${item.color}15` } : {},
        ]}>
          <AppIcon
            name={item.icon}
            size={20}
            color={item.color ?? Colors.textSecondary}
          />
        </View>

        <Text style={[
          styles.drawerItemLabel,
          item.color ? { color: item.color } : {},
        ]}>
          {item.label}
        </Text>

        {item.badge && (
          <View style={styles.drawerBadge}>
            <Text style={styles.drawerBadgeText}>{item.badge}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

// ── Drawer Content ─────────────────────────────────────────
function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const insets  = useSafeAreaInsets();
  const { light } = useHaptics();

  const handleItemPress = useCallback((item: DrawerItem) => {
    light();
    navigation.closeDrawer();
    if (item.tabRoute) {
      navigation.navigate('MainTabs', { screen: item.tabRoute } as any);
    }
    item.onPress?.();
  }, [navigation]);

  return (
    <View style={[styles.drawerContainer, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={Gradients.heroCard.colors as any}
        style={styles.drawerHeader}
      >
        {/* Logo mark */}
        <View style={styles.drawerLogo}>
          <Text style={styles.drawerLogoText}>SG</Text>
        </View>

        <Text style={styles.drawerAppName}>SAMGOLD</Text>
        <Text style={styles.drawerTagline}>المسح الشامل والكشف الذكي</Text>

        {/* User row */}
        <Pressable
          style={styles.drawerUserRow}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainTabs', {
              screen: 'SettingsTab',
              params: { screen: 'Profile' },
            } as any);
          }}
        >
          <View style={styles.drawerAvatar}>
            <AppIcon name="user" size={20} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.drawerUserName}>المستخدم</Text>
            <Text style={styles.drawerUserEmail}>مشترك احترافي</Text>
          </View>
          <AppIcon name="chevronLeft" size={18} color={Colors.textSecondary} />
        </Pressable>
      </LinearGradient>

      {/* Menu */}
      <ScrollView style={styles.drawerMenu} showsVerticalScrollIndicator={false}>
        {DRAWER_ITEMS.map((item) => {
          if (item.separator) {
            return <View key={item.key} style={styles.drawerSeparator} />;
          }
          return (
            <DrawerMenuItem
              key={item.key}
              item={item}
              onPress={() => handleItemPress(item)}
            />
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.drawerFooter, { paddingBottom: insets.bottom + Spacing[2] }]}>
        <Text style={styles.drawerVersion}>الإصدار 1.0.0</Text>
      </View>
    </View>
  );
}

// ── Drawer Navigator ───────────────────────────────────────
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown:         false,
        drawerType:          'slide',
        drawerPosition:      'right',
        overlayColor:        Colors.overlay,
        drawerStyle: {
          width:           '80%',
          backgroundColor: Colors.bgPrimary,
        },
        sceneContainerStyle: {
          backgroundColor: Colors.bgPrimary,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },
  drawerHeader: {
    padding:           Spacing[5],
    paddingTop:        Spacing[6],
    gap:               Spacing[1],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  drawerLogo: {
    width:           48,
    height:          48,
    borderRadius:    14,
    backgroundColor: Colors.primary,
    alignItems:      'center',
    justifyContent:  'center',
    marginBottom:    Spacing[2],
  },
  drawerLogoText: {
    fontSize:   20,
    fontWeight: '800',
    color:      Colors.textInverse,
  },
  drawerAppName: {
    ...Typography.displaySmall,
    color:      Colors.primary,
    fontWeight: '800',
  },
  drawerTagline: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: -Spacing[0.5],
  },
  drawerUserRow: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            Spacing[3],
    marginTop:      Spacing[4],
    paddingTop:     Spacing[3],
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  drawerAvatar: {
    width:           40,
    height:          40,
    borderRadius:    20,
    backgroundColor: Colors.primaryGlowDim,
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    alignItems:      'center',
    justifyContent:  'center',
  },
  drawerUserName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  drawerUserEmail: {
    ...Typography.caption,
    color: Colors.primary,
  },
  drawerMenu: {
    flex:    1,
    padding: Spacing[3],
  },
  drawerItem: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            Spacing[3],
    padding:        Spacing[3],
    borderRadius:   Radius.cardMd,
    marginVertical: Spacing[0.5],
  },
  drawerItemIcon: {
    width:           40,
    height:          40,
    borderRadius:    10,
    backgroundColor: Colors.surfaceSecondary,
    alignItems:      'center',
    justifyContent:  'center',
  },
  drawerItemLabel: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    flex:  1,
  },
  drawerBadge: {
    paddingHorizontal: Spacing[2],
    paddingVertical:   2,
    borderRadius:      Radius.badge,
    backgroundColor:   Colors.primaryGlowDim,
    borderWidth:       1,
    borderColor:       Colors.borderGold,
  },
  drawerBadgeText: {
    ...Typography.labelSmall,
    color:      Colors.primary,
    fontWeight: '700',
  },
  drawerSeparator: {
    height:           1,
    backgroundColor:  Colors.borderSubtle,
    marginVertical:   Spacing[2],
    marginHorizontal: Spacing[2],
  },
  drawerFooter: {
    padding:        Spacing[4],
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  drawerVersion: {
    ...Typography.caption,
    color:     Colors.textDisabled,
    textAlign: 'center',
  },
});
