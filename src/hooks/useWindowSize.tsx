import { useState, useLayoutEffect } from 'react';

export interface WindowSizeObj {
  width: number | undefined;
  height: number | undefined;
  deviceSize: DeviceSize;
}

export enum DeviceSize {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  XMEDIUM = 'xmedium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  UNKNOWN = 'unknown',
}

export enum DeviceBreakpoints {
  XSMALL = 0,
  SMALL = 600,
  MEDIUM = 960,
  XMEDIUM = 1400,
  LARGE = 1280,
  XLARGE = 1920,
  UNKNOWN = 0,
}

export const DeviceMediaQuery = {
  XSMALL: `(min-width: ${DeviceBreakpoints.XSMALL}px)`,
  SMALL: `(min-width: ${DeviceBreakpoints.SMALL}px)`,
  MEDIUM: `(min-width: ${DeviceBreakpoints.MEDIUM}px)`,
  XMEDIUM: `(min-width: ${DeviceBreakpoints.XMEDIUM}px)`,
  LARGE: `(min-width: ${DeviceBreakpoints.LARGE}px)`,
  XLARGE: `(min-width: ${DeviceBreakpoints.XLARGE}px)`,
  LANDSCAPE: '(orientation: landscape)',
  PORTRAIT: '(orientation: portrait)',
};

/**
 * getDeviceSize returns the device size based on the window width
 * @param width : number;
 * @returns {DeviceSize}
 */
const getDeviceSize = (width: number): DeviceSize => {
  if (width < DeviceBreakpoints.SMALL) {
    return DeviceSize.XSMALL;
  }
  if (width >= DeviceBreakpoints.SMALL && width < DeviceBreakpoints.MEDIUM) {
    return DeviceSize.SMALL;
  }
  if (width >= DeviceBreakpoints.MEDIUM && width < DeviceBreakpoints.XMEDIUM) {
    return DeviceSize.MEDIUM;
  }
  if (width >= DeviceBreakpoints.XMEDIUM && width < DeviceBreakpoints.LARGE) {
    return DeviceSize.XMEDIUM;
  }
  if (width >= DeviceBreakpoints.LARGE && width < DeviceBreakpoints.XLARGE) {
    return DeviceSize.LARGE;
  }
  if (width >= DeviceBreakpoints.LARGE) {
    return DeviceSize.XLARGE;
  }

  return DeviceSize.UNKNOWN;
};

export const checkIsSmallDevice = (): boolean => {
  const deviceSize = getDeviceSize(window.innerWidth);
  return [DeviceSize.XSMALL].includes(deviceSize);
};

/**
 * useWindowSize hook returns the current window size
 * @returns {WindowSizeObj}
 */
export const useWindowSize = (): WindowSizeObj => {
  const [windowSize, setWindowSize] = useState<WindowSizeObj>({
    width: undefined,
    height: undefined,
    deviceSize: DeviceSize.UNKNOWN,
  });

  useLayoutEffect(() => {
    // TODO debounce width and height
    function handleResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        deviceSize: getDeviceSize(window.innerWidth),
      });
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * useIsSmallDevice returns true if the device is small
 * @returns {boolean}
 */
export const useIsSmallDevice = (): boolean => {
  const [isSmallDevice, setIsSmallDevice] = useState(checkIsSmallDevice());
  // const isPortrait = useMediaQuery(DeviceMediaQuery.PORTRAIT);

  useLayoutEffect(() => {
    function handleResize() {
      setIsSmallDevice(checkIsSmallDevice());
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallDevice;
};

/**
 * checkIsSmallDevice returns true if the device is small
 * @returns {boolean}
 */
