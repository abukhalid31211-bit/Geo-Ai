import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ProjectsTab: undefined;
  DetectorTab: undefined;
  ThreeDTab: undefined;
  SettingsTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Notifications: undefined;
};

export type ProjectsStackParamList = {
  ProjectsList: undefined;
  CreateProject: undefined;
  ProjectDetail: { projectId: string };
};

export type SurveyStackParamList = {
  SurveyModule: { projectId: string };
  TopoMap: { projectId: string };
  TopoImport: { projectId: string };
  TopoContour: { projectId: string };
  TopoExport: { projectId: string };
  GPRImport: { projectId: string };
  GPRRadargram: { projectId: string };
  GPRProcessing: { projectId: string };
  ERTInput: { projectId: string };
  ERTHeatmap: { projectId: string };
  ERTAnomaly: { projectId: string };
};

export type DetectorStackParamList = {
  DetectorMain: undefined;
  DetectorResults: { scanId: string };
  DetectorHistory: undefined;
};

export type ThreeDStackParamList = {
  ThreeDViewer: { projectId: string };
  ThreeDExport: { projectId: string };
};

export type ReportsStackParamList = {
  ReportsList: undefined;
  ReportTemplates: { projectId: string };
  ReportViewer: { reportId: string };
  ReportExport: { reportId: string };
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  Profile: undefined;
  EditProfile: undefined;
  SensorSettings: undefined;
  NotificationSettings: undefined;
  Privacy: undefined;
  Help: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>;
export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
export type ProjectsNavigationProp = NativeStackNavigationProp<ProjectsStackParamList>;
export type SurveyNavigationProp = NativeStackNavigationProp<SurveyStackParamList>;
export type DetectorNavigationProp = NativeStackNavigationProp<DetectorStackParamList>;
export type ThreeDNavigationProp = NativeStackNavigationProp<ThreeDStackParamList>;
export type ReportsNavigationProp = NativeStackNavigationProp<ReportsStackParamList>;
export type SettingsNavigationProp = NativeStackNavigationProp<SettingsStackParamList>;
