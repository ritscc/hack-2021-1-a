import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getStartTime, getInterval, requestAlarm } from './lib/api';

dayjs.extend(duration);

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'interval_notification') {
    const startTime = await getStartTime();

    if (startTime === undefined) {
      throw new Error('startTime is undefined!');
    }

    const elapsedMillisecond = dayjs().diff(dayjs(startTime));

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'logo192.png',
      title: '定期通知 | 力がつくよみちゃん🌙',
      message: `経過時間：${dayjs
        .duration(elapsedMillisecond)
        .format('HH時間mm分ss秒')}\n頑張ってるね！🎉`,
    });

    playTsukuyomiVoice(elapsedMillisecond);

    // 定期実行の再設定
    const interval = await getInterval();

    if (interval === undefined) {
      throw new Error('startTime is undefined!');
    }

    requestAlarm(interval);
  }
});

function playTsukuyomiVoice(millisecond: number) {
  const second = millisecond * 1000;
  let path = '';

  if (second < 10) {
    path = 'voices/sec/voice_10sec.wav';
  } else if (second < 20) {
    path = 'voices/sec/voice_20sec.wav';
  } else if (second < 30) {
    path = 'voices/sec/voice_30sec.wav';
  } else if (second < 40) {
    path = 'voices/sec/voice_40sec.wav';
  } else if (second < 50) {
    path = 'voices/sec/voice_50sec.wav';
  } else if (second < 1 * 60) {
    path = 'voices/min/voice_1min.wav';
  } else if (second < 2 * 60) {
    path = 'voices/min/voice_2min.wav';
  } else if (second < 3 * 60) {
    path = 'voices/min/voice_3min.wav';
  } else if (second < 4 * 60) {
    path = 'voices/min/voice_4min.wav';
  } else if (second < 5 * 60) {
    path = 'voices/min/voice_5min.wav';
  } else if (second < 10 * 60) {
    path = 'voices/min/voice_10min.wav';
  } else if (second < 1 * 60 * 60) {
    path = 'voices/hour/voice_1hour.wav';
  } else if (second < 2 * 60 * 60) {
    path = 'voices/hour/voice_1hour.wav';
  } else if (second < 3 * 60 * 60) {
    path = 'voices/hour/voice_1hour.wav';
  } else if (second < 4 * 60 * 60) {
    path = 'voices/hour/voice_1hour.wav';
  } else if (second < 5 * 60 * 60) {
    path = 'voices/hour/voice_1hour.wav';
  } else {
    const pathes = [
      'voices/other/voice_02_a.wav',
      'voices/other/voice_03_a.wav',
      'voices/other/voice_03_b.wav',
      'voices/other/voice_04_a.wav',
      'voices/other/voice_05_a.wav',
      'voices/other/voice_05_b.wav',
      'voices/other/voice_06_a.wav',
      'voices/other/voice_07_a.wav',
      'voices/other/voice_07_b.wav',
      'voices/other/voice_08_a.wav',
      'voices/other/voice_08_b.wav',
      'voices/other/voice_09_a.wav',
      'voices/other/voice_14_a.wav',
    ];
    path = pathes[Math.floor(Math.random() * pathes.length)];
  }

  new Audio(path).play();
}
