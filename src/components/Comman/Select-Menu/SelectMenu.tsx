import React, { useState } from 'react';
import style from './selectStyle.module.css';
const SelectMenu: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('select Cat ');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    const dropdown = document.getElementById(
      'filter-switch'
    ) as HTMLInputElement;
    const isDropdownChild = (e.target as HTMLElement).closest(
      '.dropdown__filter'
    );

    if (!isDropdownChild) {
      dropdown.checked = false;
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className={style.dropdown}>
      <input type="checkbox" id="filter-switch" hidden />
      <label
        htmlFor="filter-switch"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <ul className={style.dropdown__filter} role="listbox" tabIndex={-1}>
          <li className={style.dropdown__filter_selected} aria-selected="true">
            {selectedOption}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={'24px'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                  fill="#b88b05"
                ></path>{' '}
              </g>
            </svg>
          </li>
          {isDropdownOpen && (
            <li>
              <ul className={style.dropdown__select}>
                <li
                  className={style.dropdown__select_option}
                  role="option"
                  onClick={() => handleOptionClick('Option 1')}
                >
                  Option 1
                </li>
                <li
                  className={style.dropdown__select_option}
                  role="option"
                  onClick={() => handleOptionClick('Option 2')}
                >
                  Option 2
                </li>
                <li
                  className={style.dropdown__select_option}
                  role="option"
                  onClick={() => handleOptionClick('Option 3')}
                >
                  Option 3
                </li>
                <li
                  className={style.dropdown__select_option}
                  role="option"
                  onClick={() => handleOptionClick('Option 4')}
                >
                  Option 4
                </li>
                <li
                  className={style.dropdown__select_option}
                  role="option"
                  onClick={() => handleOptionClick('Option 5')}
                >
                  Option 5
                </li>
              </ul>
            </li>
          )}
        </ul>
      </label>
    </div>
  );
};

export default SelectMenu;
