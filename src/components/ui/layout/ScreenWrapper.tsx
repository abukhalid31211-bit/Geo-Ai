import React, { PropsWithChildren } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@theme';

interface ScreenWrapperProps extends PropsWithChildren {
  // Layout
  scroll?: boolean;
  keyboard?: boolean;
  safeArea?: boolean;

  // Styling
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
  padH?: boolean;
  padTop?: boolean;
  padBottom?: boolean;

  // Scroll options
  onRefresh?: () => void;
  refreshing?: boolean;
  showScrollIndicator?: boolean;

  // Header space
  withHeader?: boolean;
}

export function ScreenWrapper({
  children,
  scroll = false,
  keyboard = false,
  safeArea = true,
  style,
  contentStyle,
  backgroundColor = Colors.bgPrimary,
  padH = false,
  padTop = false,
  padBottom = true,
  onRefresh,
  refreshing = false,
  showScrollIndicator = false,
  withHeader = false,
}: ScreenWrapperProps) {
  const Container = safeArea ? SafeAreaView : View;

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
  };

  const innerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: padH ? Spacing[4] : 0,
    paddingTop: padTop ? Spacing[4] : withHeader ? Spacing[2] : 0,
    paddingBottom: padBottom ? Spacing[4] : 0,
  };

  const content = scroll ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        innerStyle,
        { flexGrow: 1 },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={showScrollIndicator}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[innerStyle, contentStyle]}>
      {children}
    </View>
  );

  const wrappedContent = keyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {content}
    </KeyboardAvoidingView>
  ) : content;

  return (
    <Container style={[containerStyle, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
      />
      {wrappedContent}
    </Container>
  );
}
