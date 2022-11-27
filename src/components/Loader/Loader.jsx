import { Bars } from 'react-loader-spinner';

import Styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={`${Styles['loader-container']} container`}>
      <Bars color='#3f0f65' width={'42px'} />
    </div>
  );
};
