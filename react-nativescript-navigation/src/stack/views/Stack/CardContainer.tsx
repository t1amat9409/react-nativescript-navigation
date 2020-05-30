import * as React from 'react';
// import { Animated, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Route } from '@react-navigation/core';
import { Props as HeaderContainerProps } from '../Header/HeaderContainer';
import Card from './Card';
import HeaderHeightContext from '../../../utils/HeaderHeightContext';
import {
  Scene,
  Layout,
  StackHeaderMode,
  StackCardMode,
  TransitionPreset,
} from '../../types';
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";

type RNSStyle = ViewBaseAttributes["style"];
type StyleProp<T> = T;

type Props = TransitionPreset & {
  index: number;
  active: boolean;
  focused: boolean;
  closing: boolean;
  layout: Layout;
  // gesture: Animated.Value;
  previousScene?: Scene<Route<string>>;
  scene: Scene<Route<string>>;
  safeAreaInsetTop: number;
  safeAreaInsetRight: number;
  safeAreaInsetBottom: number;
  safeAreaInsetLeft: number;
  cardOverlay?: (props: { style: StyleProp<RNSStyle> }) => React.ReactNode;
  cardOverlayEnabled?: boolean;
  cardShadowEnabled?: boolean;
  cardStyle?: StyleProp<RNSStyle>;
  getPreviousRoute: (props: {
    route: Route<string>;
  }) => Route<string> | undefined;
  getFocusedRoute: () => Route<string>;
  renderHeader: (props: HeaderContainerProps) => React.ReactNode;
  renderScene: (props: { route: Route<string> }) => React.ReactNode;
  onOpenRoute: (props: { route: Route<string> }) => void;
  onCloseRoute: (props: { route: Route<string> }) => void;
  onTransitionStart?: (
    props: { route: Route<string> },
    closing: boolean
  ) => void;
  onTransitionEnd?: (props: { route: Route<string> }, closing: boolean) => void;
  onPageChangeStart?: () => void;
  onPageChangeConfirm?: () => void;
  onPageChangeCancel?: () => void;
  gestureEnabled?: boolean;
  gestureResponseDistance?: {
    vertical?: number;
    horizontal?: number;
  };
  gestureVelocityImpact?: number;
  mode: StackCardMode;
  headerMode: StackHeaderMode;
  headerShown?: boolean;
  headerTransparent?: boolean;
  headerHeight: number;
  onHeaderHeightChange: (props: {
    route: Route<string>;
    height: number;
  }) => void;
};

const EPSILON = 0.1;

function CardContainer({
  active,
  cardOverlay,
  cardOverlayEnabled,
  cardShadowEnabled,
  cardStyle = {},
  cardStyleInterpolator,
  closing,
  // gesture,
  focused,
  // gestureDirection,
  gestureEnabled,
  gestureResponseDistance,
  gestureVelocityImpact,
  getPreviousRoute,
  getFocusedRoute,
  mode,
  headerMode,
  headerShown,
  // headerStyleInterpolator,
  headerTransparent,
  headerHeight,
  onHeaderHeightChange,
  index,
  layout,
  onCloseRoute,
  onOpenRoute,
  onPageChangeCancel,
  onPageChangeConfirm,
  onPageChangeStart,
  onTransitionEnd,
  onTransitionStart,
  previousScene,
  renderHeader,
  renderScene,
  safeAreaInsetBottom,
  safeAreaInsetLeft,
  safeAreaInsetRight,
  safeAreaInsetTop,
  scene,
  // transitionSpec,
}: Props) {
  React.useEffect(() => {
    onPageChangeConfirm?.();
  }, [active, onPageChangeConfirm]);

  const handleOpen = () => {
    onTransitionEnd?.({ route: scene.route }, false);
    onOpenRoute({ route: scene.route });
  };

  const handleClose = () => {
    onTransitionEnd?.({ route: scene.route }, true);
    onCloseRoute({ route: scene.route });
  };

  const handleTransitionStart = ({ closing }: { closing: boolean }) => {
    if (active && closing) {
      onPageChangeConfirm?.();
    } else {
      onPageChangeCancel?.();
    }

    onTransitionStart?.({ route: scene.route }, closing);
  };

  const insets = {
    top: safeAreaInsetTop,
    right: safeAreaInsetRight,
    bottom: safeAreaInsetBottom,
    left: safeAreaInsetLeft,
  };

  // const { colors } = useTheme();

  // const [pointerEvents, setPointerEvents] = React.useState<'box-none' | 'none'>(
  //   'box-none'
  // );

  // React.useEffect(() => {
  //   // `addListener` may not exist on web and older versions of React Native
  //   // @ts-ignore
  //   const listener = scene.progress.next?.addListener?.(
  //     ({ value }: { value: number }) => {
  //       setPointerEvents(value <= EPSILON ? 'box-none' : 'none');
  //     }
  //   );

  //   return () => {
  //     if (listener) {
  //       // @ts-ignore
  //       scene.progress.next?.removeListener?.(listener);
  //     }
  //   };
  // }, [pointerEvents, scene.progress.next]);

  return (
    <Card
      index={index}
      // gestureDirection={gestureDirection}
      layout={layout}
      insets={insets}
      // gesture={gesture}
      // current={scene.progress.current}
      // next={scene.progress.next}
      closing={closing}
      onOpen={handleOpen}
      onClose={handleClose}
      // @ts-ignore 
      overlay={cardOverlay}
      overlayEnabled={cardOverlayEnabled}
      shadowEnabled={cardShadowEnabled}
      onTransitionStart={handleTransitionStart}
      onGestureBegin={onPageChangeStart}
      onGestureCanceled={onPageChangeCancel}
      gestureEnabled={gestureEnabled}
      gestureResponseDistance={gestureResponseDistance}
      gestureVelocityImpact={gestureVelocityImpact}
      // transitionSpec={transitionSpec}
      styleInterpolator={cardStyleInterpolator}
      accessibilityElementsHidden={!focused}
      // importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
      // pointerEvents={active ? 'box-none' : pointerEvents}
      // pageOverflowEnabled={headerMode === 'screen' && mode === 'card'}
      pageOverflowEnabled={false}
      containerStyle={
        {}
        // headerMode === 'float' && !headerTransparent && headerShown !== false
        //   ? { marginTop: headerHeight }
        //   : null
      }
      // contentStyle={[{ backgroundColor: colors.background }, cardStyle]}
      contentStyle={cardStyle}
      style={styles.fill}
    >
      {/* <flexboxLayout style={styles.scene}> */}
        <HeaderHeightContext.Provider value={headerHeight}>
          {renderScene({ route: scene.route })}
        </HeaderHeightContext.Provider>
      {/* </flexboxLayout> */}
    </Card>
  );
}

export default React.memo(CardContainer);

const styles = {
  fill: {
    width: "100%",
    height: "100%",
  } as RNSStyle,
  scene: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  } as RNSStyle,
};