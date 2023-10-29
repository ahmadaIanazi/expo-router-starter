import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { onboardBones, onboardBonesAR } from '@constants/onboard_setup';
import OnboardingButton from '../widgets/OnboardingButton';

import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardSlider from '../widgets/OnboardSlider';
import SliderIndicator from '../widgets/SliderIndicator';
import { useNavigationStore } from '../stores/useNavigationStore';
import { useRemoteStore } from '../stores/useRemoteStore';
import LOCALIZATION from '@/xSetup/context/locales';
import { useTheme } from 'react-native-paper';
import { router } from 'expo-router';

export default function Onboarding  () {
  const colors = useTheme();
  const l = useContext(LOCALIZATION)
  const { shared } = useRemoteStore();
  const setSeenOnboard = useNavigationStore((state) => state.setSeenOnboard);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [lastSlide, setLastSlide] = useState(false);
  const [loading, setLoading] = useState(false);
  const { height, width } = Dimensions.get('window');
  const slidesRef = useRef();

  const SKIP = shared?.stop_onboard;

  const data = l.l == 'ar' ? onboardBonesAR : onboardBones;

  useEffect(() => {
    if (currentSlideIndex == data?.length - 1) {
      setLastSlide(true);
    } else {
      setLastSlide(false);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    if (SKIP) {
      console.log('SKIP')
      setSeenOnboard(true);
      setLoading(true);
      router.replace('/Welcome')
    }
  }, [SKIP])
  
  const handleOnPress = () => {
    if (currentSlideIndex == data?.length - 1) {
      setSeenOnboard(true);
      setLoading(true);
      router.replace('/Welcome');
    } else {
      goNextSlide();
    }
  };

  const onMomentum = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const nextSlideOffset = nextSlideIndex * width;
    slidesRef?.current?.scrollToOffset({ offset: nextSlideOffset });
    setCurrentSlideIndex(nextSlideIndex);
  };

  const RENDEROnboardSlider = ({ item }) => <OnboardSlider item={item} />;

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: colors.colors.tertiaryContainer }]}>
      <View style={{ height: height * 0.8, width: width }}>
        <FlatList
          ref={slidesRef}
          style={{ width: width, height: height * 0.75 }}
          horizontal
          pagingEnabled
          data={data}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentum}
          renderItem={RENDEROnboardSlider}
        />
      </View>
      <View style={styles.indicators}>
        {data?.map((_, index) => (
          <SliderIndicator currentSlideIndex={currentSlideIndex} key={index} index={index} />
        ))}
      </View>
      <OnboardingButton
        loading={loading}
        lastSlide={lastSlide}
        handleOnPress={handleOnPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 3,
  },
  indicators: {
    bottom: 70,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
