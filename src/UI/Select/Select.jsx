import React from 'react';
import cls from './Select.module.scss';

const Select = ({ options, defaultOption, value, onChange }) => {
  return (
    <select
      className={cls.select}
      value={value}
      onChange={({ target }) => onChange(target.value)}
    >
      <option disabled value="">
        {defaultOption}
      </option>
      {options.map(option => (
        <option value={option.value} key={Date.now() * Math.random()}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
