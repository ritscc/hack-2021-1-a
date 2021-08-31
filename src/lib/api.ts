// storageからの開始時間の取得;
export const getStartTime = (): number | undefined => {
  let startTime: number | undefined;

  chrome.storage.local.get('startTime', (res) => {
    startTime = res.startTime;
    console.log('startTime', startTime);
  });

  return startTime;
};

// storageからの通知間隔の取得
export const getInterval = (): number | undefined => {
  let interval: number | undefined;

  chrome.storage.local.get('interval', (res) => {
    interval = res.interval;
    console.log('interval', interval);
  });

  return interval;
};

// storageへの開始時間の登録
export const storeStartTime = (startTime: number) => {
  chrome.storage.local.set({ startTime }, () => {
    console.log('startTime was added');
  });
};

// storageへの通知間隔の登録
export const storeInterval = (interval: number) => {
  chrome.storage.local.set({ interval }, () => {
    console.log('interval was added');
  });
};

// storageで保持する全ての値を破棄
export const deleteStorage = () => {
  chrome.storage.local.clear();
};
