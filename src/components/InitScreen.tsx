import { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { storeInterval, requestAlarm, storeStartTime } from '../lib/api';

type Inputs = {
  minutes: string;
  seconds: string;
};

type Props = {
  onStart: (startTime: number) => void;
};

export const InitScreen: VFC<Props> = (props) => {
  const { register, handleSubmit } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    const milliseconds =
      (parseInt(data.minutes, 10) * 60 + parseInt(data.seconds, 10)) * 1000;

    const startTime = Date.now();
    await storeInterval(milliseconds);
    await storeStartTime(startTime);
    requestAlarm(milliseconds);
    console.log(milliseconds);
    props.onStart(startTime);
  }

  return (
    <div>
      <h2 className="InitScreen__title">力がつくよみちゃん</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inline-center">
          <button type="submit" className="InitScreen__start--button">
            作業開始！
          </button>
        </div>
        <div className="inline-center ">
          <div className="InitScreen__inputs">
            <input
              className="InitScreen__inputs--input"
              type="number"
              defaultValue="30"
              min="0"
              max="99"
              {...register('minutes', { required: true })}
            />

            <span>分</span>

            <input
              className="InitScreen__inputs--input"
              type="number"
              defaultValue="00"
              min="0"
              max="50"
              step="10"
              {...register('seconds', { required: true })}
            />

            <span>秒</span>
          </div>
        </div>
        <div className="inline-center">タイマー間隔を設定！</div>
      </form>
    </div>
  );
};
