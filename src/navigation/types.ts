import type { NavigatorScreenParams } from '@react-navigation/native';

// ── Auth Stack ───────────────────────────────────────────────
export type AuthStackParamList = {
  Splash:         undefined;
  Onboarding:     undefined;
  Login:          undefined;
  Register:       undefined;
  ForgotPassword: undefined;
};

// ── Home Stack ───────────────────────────────────────────────
export type HomeStackParamList = {
  HomeMain:      undefined;
  Notifications: undefined;
};

// ── Projects Stack ───────────────────────────────────────────
export type ProjectsStackParamList = {
  ProjectsList:  undefined;
  CreateProject: { step?: number };
  ProjectDetail: { projectId: string; tab?: 'overview' | 'files' | 'log' };
  FileViewer:    { fileId: string; projectId: string };
};

// ── Survey Stack ─────────────────────────────────────────────
export type SurveyStackParamList = {
  SurveyModule:     undefined;
  // Topographic
  TopoMap:          { projectId?: string };
  TopoImport:       { projectId?: string };
  TopoContour:      { projectId?: string };
  TopoExport:       { projectId?: string };
  TopoLayerManager: { projectId?: string };
  // GPR
  GPRImport:        { projectId?: string };
  GPRRadargram:     { fileId: string; projectId?: string };
  GPRProcessing:    { fileId: string; projectId?: string };
  // ERT
  ERTInput:         { projectId?: string };
  ERTHeatmap:       { projectId?: string };
  ERTAnomaly:       { projectId?: string };
};

// ── Detector Stack ───────────────────────────────────────────
export type DetectorStackParamList = {
  DetectorMain:    undefined;
  DetectorResults: { scanId: string };
  DetectorHistory: undefined;
  ScanDetail:      { scanId: string };
};

// ── 3D Stack ─────────────────────────────────────────────────
export type ThreeDStackParamList = {
  ThreeDViewer: { projectId?: string; scanId?: string };
  ThreeDExport: { projectId?: string };
};

// ── Reports Stack ────────────────────────────────────────────
export type ReportsStackParamList = {
  ReportsList:     undefined;
  ReportTemplates: { projectId: string };
  ReportViewer:    { reportId: string };
  ReportExport:    { reportId: string };
};

// ── Settings Stack ───────────────────────────────────────────
export type SettingsStackParamList = {
  SettingsMain:         undefined;
  Profile:              undefined;
  EditProfile:          undefined;
  SensorSettings:       undefined;
  NotificationSettings: undefined;
  Privacy:              undefined;
  Help:                 undefined;
  About:                undefined;
  Plans:                undefined;
  Payment:              { planId: string; cycle: 'monthly' | 'yearly' };
  BillingHistory:       undefined;
};

// ── Drawer ───────────────────────────────────────────────────
export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

// ── Main Bottom Tabs ─────────────────────────────────────────
export type MainTabParamList = {
  HomeTab:     NavigatorScreenParams<HomeStackParamList>;
  ProjectsTab: NavigatorScreenParams<ProjectsStackParamList>;
  DetectorTab: NavigatorScreenParams<DetectorStackParamList>;
  ThreeDTab:   NavigatorScreenParams<ThreeDStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

// ── Root ─────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth:        NavigatorScreenParams<AuthStackParamList>;
  Main:        NavigatorScreenParams<DrawerParamList>;
  // Survey and Reports are full flows reachable from Home's quick actions,
  // but aren't part of the bottom tab bar — pushed as root-level stacks.
  Survey:      NavigatorScreenParams<SurveyStackParamList>;
  Reports:     NavigatorScreenParams<ReportsStackParamList>;
  // Global modal routes accessible from anywhere
  Paywall:     { feature: string };
  ImageViewer: { uri: string; title?: string };
};

// ── Navigation prop helpers ──────────────────────────────────
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
