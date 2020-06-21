export const DefaultOptions = {
  useBodyScroll: false,
  isLockX: false,
  isLoadFull: true,
  disablePullDown: false,
  defaultReloadCnt: 3,
  defaultReloadTimer: 300,
  down: {
    offset: 100,
    bounceTime: 300,
    dampRateBegin: 1,
    dampRate: 0.3,
    isLock: false
  },
  up: {
    offset: 0,
    isLock: false,
    isAutoLoad: true
  },
};

export const PER_SECOND = 1000 / 60;