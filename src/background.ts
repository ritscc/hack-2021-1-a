import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getStartTime } from './lib/api';

dayjs.extend(duration);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text === 'alarm') {
    const milliseconds = request.milliseconds;

    chrome.alarms.create('interval_notification', {
      when: Date.now() + milliseconds,
    });

    sendResponse({ text: `alarm was set after ${milliseconds} milliseconds` });
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'interval_notification') {
    const startTime = await getStartTime();

    if (startTime === undefined) {
      throw new Error('startTime is undefined!');
    }

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'logo192.png',
      title: '定期通知 | 力がつくよみちゃん🥺',
      message: `経過時間：${dayjs
        .duration(dayjs().diff(dayjs(startTime)))
        .format('HH時間mm分ss秒')}\n頑張ってるね！🍺`,
    });

    new Audio('voices/voice_02_a.wav').play();
  }
});
