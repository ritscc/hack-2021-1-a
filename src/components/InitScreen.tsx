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
      <h2>徹夜チキンレース</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">作業開始！</button>
        <div>
          <input
            type="number"
            defaultValue="30"
            min="0"
            max="99"
            {...register('minutes', { required: true })}
          />
          分
          <input
            type="number"
            defaultValue="00"
            min="0"
            max="50"
            step="10"
            {...register('seconds', { required: true })}
          />
          秒
        </div>
      </form>
      <div>タイマー間隔を設定！</div>
    </div>
  );
};

const A: VFC = () => {
  return <div></div>;
};
