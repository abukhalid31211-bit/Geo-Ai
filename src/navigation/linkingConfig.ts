import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'samgold://',
    'https://samgold.app',
  ],
  config: {
    screens: {
      Auth: {
        screens: {
          Login:    'login',
          Register: 'register',
        },
      },
      Main: {
        screens: {
          MainTabs: {
            screens: {
              HomeTab: {
                screens: {
                  HomeMain:      'home',
                  Notifications: 'notifications',
                },
              },
              ProjectsTab: {
                screens: {
                  ProjectsList:  'projects',
                  ProjectDetail: 'projects/:projectId',
                  CreateProject: 'projects/new',
                },
              },
              DetectorTab: {
                screens: {
                  DetectorMain:    'detector',
                  DetectorHistory: 'detector/history',
                  DetectorResults: 'detector/results/:scanId',
                },
              },
            },
          },
        },
      },
      Paywall: 'paywall/:feature',
    },
  },
};
