import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CompositeNavigationProp, DrawerActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing } from '@theme';
import { AnimatedView } from '@components/ui/animated/AnimatedView';
import {
  HomeHeader,
  QuickActionsBar,
  HeroDetectorCard,
  AIInsightsWidget,
  ActiveProjectsWidget,
  StatsBar,
  type QuickAction,
} from '@components/home';
import { useAuth } from '@hooks/useAuth';
import { useHomeStore } from '@store/homeStore';
import { useProjectsStore } from '@store/projectsStore';
import { useDetectorStore } from '@store/detectorStore';
import { useReportsStore } from '@store/reportsStore';
import { useNotificationsStore } from '@store/notificationsStore';
import type { HomeStackParamList, RootStackParamList } from '@navigation/types';
import type { Project } from '@apptypes/project.types';

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, displayName, initials, canAccess } = useAuth();

  const isRefreshing    = useHomeStore(s => s.isRefreshing);
  const aiInsight       = useHomeStore(s => s.aiInsight);
  const lastScanSummary = useHomeStore(s => s.lastScan);
  const refreshHomeData = useHomeStore(s => s.refreshHomeData);
  const setLastScan     = useHomeStore(s => s.setLastScan);

  const projects     = useProjectsStore(s => s.projects);
  const scanHistory  = useDetectorStore(s => s.scanHistory);
  const reports      = useReportsStore(s => s.reports);
  const unreadCount  = useNotificationsStore(s => s.unreadCount);

  const activeProjects = useMemo(
    () => projects.filter(p => p.status === 'active'),
    [projects],
  );

  const canUseDetector = canAccess('smart_detector');

  // Keep homeStore's lastScan mirror in sync with the real detector history,
  // so AI insight generation always reflects the most recent scan.
  useEffect(() => {
    const latest = scanHistory[0];
    const topTarget = latest?.targets?.[0];
    if (latest && topTarget) {
      setLastScan({
        depth:      topTarget.depth,
        confidence: Math.round(topTarget.dominantConfidence * 100),
        targetType: topTarget.dominantType,
        scannedAt:  latest.scannedAt,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanHistory.length]);

  const handleRefresh = useCallback(() => {
    void refreshHomeData();
  }, [refreshHomeData]);

  // ── Navigation helpers ─────────────────────────────────────────
  const goToDetector = useCallback(() => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: { screen: 'DetectorTab', params: { screen: 'DetectorMain' } },
    });
  }, [navigation]);

  const goToThreeD = useCallback(() => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: { screen: 'ThreeDTab', params: { screen: 'ThreeDViewer', params: {} } },
    });
  }, [navigation]);

  const goToProjectsList = useCallback(() => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: { screen: 'ProjectsTab', params: { screen: 'ProjectsList' } },
    });
  }, [navigation]);

  const goToCreateProject = useCallback(() => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: { screen: 'ProjectsTab', params: { screen: 'CreateProject', params: {} } },
    });
  }, [navigation]);

  const goToProjectDetail = useCallback((project: Project) => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: {
        screen: 'ProjectsTab',
        params: { screen: 'ProjectDetail', params: { projectId: project.id } },
      },
    });
  }, [navigation]);

  const goToSurveyModule = useCallback(() => {
    navigation.navigate('Survey', { screen: 'SurveyModule' });
  }, [navigation]);

  const goToGPRImport = useCallback(() => {
    navigation.navigate('Survey', { screen: 'GPRImport', params: {} });
  }, [navigation]);

  const goToReports = useCallback(() => {
    navigation.navigate('Reports', { screen: 'ReportsList' });
  }, [navigation]);

  const goToProfile = useCallback(() => {
    navigation.navigate('Main', {
      screen: 'MainTabs',
      params: { screen: 'SettingsTab', params: { screen: 'Profile' } },
    });
  }, [navigation]);

  const goToNotifications = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const goToPaywall = useCallback(() => {
    navigation.navigate('Paywall', { feature: 'smart_detector' });
  }, [navigation]);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const quickActions: QuickAction[] = useMemo(() => [
    { key: 'survey',   icon: 'map',    label: 'مسح جديد',      onPress: goToSurveyModule },
    { key: 'gpr',      icon: 'radar',  label: 'استيراد GPR',   onPress: goToGPRImport },
    { key: 'detector', icon: 'scan',   label: 'الكاشف الذكي',  onPress: goToDetector, isGold: true },
    { key: 'threed',   icon: 'cube',   label: 'عرض ثلاثي',     onPress: goToThreeD },
    { key: 'reports',  icon: 'report', label: 'التقارير',      onPress: goToReports },
  ], [goToSurveyModule, goToGPRImport, goToDetector, goToThreeD, goToReports]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HomeHeader
        userName={displayName}
        userAvatar={user?.avatar}
        userInitials={initials}
        unreadCount={unreadCount}
        onOpenDrawer={openDrawer}
        onPressBell={goToNotifications}
        onPressAvatar={goToProfile}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <AnimatedView animation="slideUp" delay={0}>
          <View style={styles.section}>
            <QuickActionsBar actions={quickActions} />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={100}>
          <View style={styles.section}>
            <HeroDetectorCard
              lastScan={lastScanSummary}
              locked={!canUseDetector}
              onStart={goToDetector}
              onUpgrade={goToPaywall}
            />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={200}>
          <View style={styles.section}>
            <AIInsightsWidget insightText={aiInsight?.text ?? null} />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={300}>
          <View style={styles.section}>
            <ActiveProjectsWidget
              projects={activeProjects}
              onPressProject={goToProjectDetail}
              onSeeAll={goToProjectsList}
              onCreate={goToCreateProject}
            />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={400}>
          <View style={styles.section}>
            <StatsBar
              totalProjects={projects.length}
              totalScans={scanHistory.length}
              totalReports={reports.length}
            />
          </View>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  section: {
    paddingHorizontal: Spacing[4],
    marginTop:         Spacing[4],
  },
});
