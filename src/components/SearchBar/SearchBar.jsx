import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Styles from './SearchBar.module.css';

export const SearchBar = ({ current, callback }) => {
  const [criteria, setCriteria] = useState(current || '');

  const handleInput = (e) => {
    const { value } = e.target;
    setCriteria(value);
  };

  return (
    <form
      className={`${Styles.form} container`}
      onSubmit={(event) => {
        event.preventDefault();
        callback(criteria);
      }}
    >
      <label className={Styles.form__label} htmlFor='criteria'>
        Search a movie:
      </label>
      <div className={Styles.form__row}>
        <input
          className={Styles.form__input}
          type='text'
          name='criteria'
          id='criteria'
          placeholder='Avengers'
          onChange={handleInput}
          value={criteria}
        />
        <button className={Styles.form__submit}>
          <FiSearch color='white' size={'20px'} />
        </button>
      </div>
    </form>
  );
};
