import React, { useEffect, useCallback } from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const languages = [
  {
    key: 'English',
    text: 'English',
    value: 'en',
  },
  {
    key: 'French',
    text: 'French',
    value: 'fr',
  },
  {
    key: 'Kinyarwanda',
    text: 'Kinyarwanda',
    value: 'rw',
  },
];

const SelectLanguage = ({ defaultValue }) => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    value => {
      i18n.changeLanguage(value);
      localStorage.language = value = 'en';
    },
    [i18n],
  );

  useEffect(() => {
    changeLanguage(defaultValue);
  }, [defaultValue, changeLanguage]);

  return (
    <div className="SelectLanguage" style={{backgroundColor: 'white', color: 'black'}}>
      <Icon name="world" />
      <Dropdown
        options={languages}
        onChange={(e, { value }) => changeLanguage(value)}
        icon="caret down"
        // defaultValue={languages[0].value}
        defaultValue={defaultValue}
      />
    </div>
  );
};

SelectLanguage.propTypes = {
  defaultValue: PropTypes.string,
};

SelectLanguage.defaultProps = {
  defaultValue: localStorage.language || 'en',
};

export default SelectLanguage;
