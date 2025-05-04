import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const BlurTabBarBackground = (): React.JSX.Element => {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
};
export default BlurTabBarBackground;

export const useBottomTabOverflow = (): number => {
  return useBottomTabBarHeight();
};
