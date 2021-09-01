import { useEffect, useState } from 'react';
import { InitScreen } from './components/InitScreen';
import { Layout } from './components/Layout';
import { ProgressScreen } from './components/ProgressScreen';

import { getStartTime } from './lib/api';

type Screen = 'LOADING' | 'INITIAL' | 'PROGRESS';

function App() {
  const [screen, setScreen] = useState<Screen>('LOADING');
  const [startTime, setStartTime] = useState<number | undefined>();

  useEffect(() => {
    getStartTime().then((startTime) => {
      if (startTime === undefined) {
        console.log('setscreen initial');
        setScreen('INITIAL');
      } else {
        console.log('setscreen progress');
        setScreen('PROGRESS');
        setStartTime(startTime);
      }
    });
  }, []);

  return (
    <Layout>
      <div>
        {screen === 'LOADING' && <p></p>}
        {screen === 'INITIAL' && (
          <InitScreen
            onStart={(startTime) => {
              setScreen('PROGRESS');
              setStartTime(startTime);
            }}
          />
        )}
        {screen === 'PROGRESS' && startTime !== undefined && (
          <ProgressScreen startTime={startTime} />
        )}
      </div>
    </Layout>
  );
}

export default App;
