import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const { height } = Dimensions.get('window');

interface EmptyStateProps {
  iconName?: ComponentProps<typeof Ionicons>['name'];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onAction?: () => void;
  freeHeight?: boolean;
}

const NoListItem: React.FC<EmptyStateProps> = ({
  iconName = 'alert-circle-outline',
  title = 'Nothing here yet',
  subtitle = "It's looking a little empty.\nCheck back soon.",
  ctaLabel,
  freeHeight = false,
  onAction,
}) => {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(1200),
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[styles.container, { height: freeHeight ? 'auto' : height * 0.6,opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
    >
      <Animated.View style={[styles.iconWrapper, { transform: [{ scale: pulseAnim }] }]}>
        <Ionicons name={iconName} size={52} color={Colors.orange.primary} />
      </Animated.View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {onAction && ctaLabel && (
        <TouchableOpacity style={styles.ctaButton} onPress={onAction} activeOpacity={0.8}>
          <Text style={styles.ctaText}>{ctaLabel}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.orange.opacity,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaButton: {
    marginTop: 12,
    backgroundColor: Colors.orange.primary,
    paddingHorizontal: 32,
    paddingVertical: 13,
    borderRadius: 50,
  },
  ctaText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default NoListItem;