import { useState, useEffect, useRef, VFC } from 'react';
import { resetAlarm, deleteStorage } from '../lib/api';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const openTwitter = ({
  text,
  url,
  hashtags,
}: {
  text: string;
  url: string;
  hashtags: string[];
}) =>
  chrome.windows.create({
    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(
      hashtags.join(','),
    )}`,
    type: 'popup',
  });

type Props = {
  startTime: number;
};

export const ProgressScreen: VFC<Props> = ({ startTime }) => {
  const [stoppedTime, setStoppedTime] = useState<Dayjs | undefined>();

  // only for re-rendering
  const [, setCount] = useState<number>(0);
  const renderIntarvalRef = useRef<number | undefined>();

  useEffect(() => {
    renderIntarvalRef.current = window.setInterval(() => {
      setCount((x) => x + 1);
    }, 1000);

    return () => {
      if (renderIntarvalRef.current === undefined) {
        return;
      }

      renderIntarvalRef.current = undefined;

      clearInterval(renderIntarvalRef.current);
    };
  }, []);

  return (
    <div className="ProgressScreen--outer">
      <div className="ProgressScreen--inner">
        <div className="inline-center ProgressScreen--time">
          {dayjs.duration(dayjs().diff(dayjs(startTime))).format('HH:mm:ss')}
        </div>
        <div>
          <div className="inline-center">
            {stoppedTime === undefined && (
              <button
                className="InitScreen__start--button"
                onClick={async () => {
                  setStoppedTime(dayjs());

                  if (renderIntarvalRef.current !== undefined) {
                    clearInterval(renderIntarvalRef.current);
                    renderIntarvalRef.current = undefined;
                  }

                  await resetAlarm();
                  await deleteStorage();
                }}
              >
                作業終了！
              </button>
            )}
          </div>

          <div className="inline-center">
            {stoppedTime !== undefined && (
              <button
                className="ProgressScreen--tweetbutton"
                onClick={() => {
                  const durationText = dayjs
                    .duration(stoppedTime.diff(dayjs(startTime)))
                    .format('HH:mm:ss');

                  openTwitter({
                    text: `💮 ${durationText} の間がんばったよ🌙`,
                    url: 'https://github.com/ritscc/hack-2021-1-a',
                    hashtags: ['つくよみちゃん'],
                  });
                }}
              >
                Tweet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
