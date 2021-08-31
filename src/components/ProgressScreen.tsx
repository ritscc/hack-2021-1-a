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
  const renderIntarvalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    renderIntarvalRef.current = setInterval(() => {
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
    <div>
      <div>
        {dayjs.duration(dayjs().diff(dayjs(startTime))).format('HH:mm:ss')}
      </div>
      <div>
        {stoppedTime === undefined && (
          <button
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

        {stoppedTime !== undefined && (
          <button
            onClick={() => {
              const durationText = dayjs
                .duration(stoppedTime.diff(dayjs(startTime)))
                .format('HH:mm:ss');

              openTwitter({
                text: `${durationText} の間がんばったよ〜`,
                url: 'http://ritsumei.ac.jp',
                hashtags: ['test'],
              });
            }}
          >
            ついーと！
          </button>
        )}
      </div>
    </div>
  );
};
