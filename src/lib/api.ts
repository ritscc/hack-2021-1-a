/**
 * storageからの開始時間(ミリ秒)の取得;
 *
 * @example
 * const startTime: number | undefined = await getStartTime();
 */
export const getStartTime = (): Promise<number | undefined> =>
  new Promise((resolve) =>
    chrome.storage.local.get('startTime', ({ startTime }) => {
      resolve(startTime);
    }),
  );

/**
 * storageからの通知間隔(ミリ秒)の取得
 *
 * @example
 * const interval: number | undefined = await getInterval();
 */
export const getInterval = (): Promise<number | undefined> =>
  new Promise((resolve) =>
    chrome.storage.local.get('interval', ({ interval }) => {
      resolve(interval);
    }),
  );

/**
 * storageへの開始時間(ミリ秒)の登録
 *
 * @example
 * await storeStartTime(new Date().getTime())
 */
export const storeStartTime = (startTime: number): Promise<void> =>
  new Promise((resolve) =>
    chrome.storage.local.set({ startTime }, () => {
      resolve(undefined);
    }),
  );

/**
 * storageへの通知間隔(ミリ秒)の登録
 *
 * @example
 * await storeInterval(10*1000)
 */
export const storeInterval = (interval: number): Promise<void> =>
  new Promise((resolve) =>
    chrome.storage.local.set({ interval }, () => {
      resolve(undefined);
    }),
  );

/**
 * storageで保持する全ての値を破棄
 *
 * @example
 * await deleteStorage()
 */
export const deleteStorage = () => chrome.storage.local.clear();

/**
 * mミリ秒後の定期実行の依頼
 *
 * @example
 * requestAlarm(10*1000)
 */
export const requestAlarm = (milliseconds: number) =>
  // chrome.runtime.sendMessage({ text: 'alarm', milliseconds }, (response) => {
  //   resolve(undefined);
  // }),
  chrome.alarms.create('interval_notification', {
    when: Date.now() + milliseconds,
  });

/**
 * 定期実行の破棄
 *
 * @example
 * await resetAlarm()
 */
export const resetAlarm = () => chrome.alarms.clearAll();
