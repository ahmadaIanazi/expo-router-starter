import { useContext, useState } from 'react';
import themeContext from '@context/theme';
import LOCALIZATION from '@context/locales';

export default function executePassUpdate({ handleAction, item, type }) {
  const [input, setInput] = useState(item?.value || 0);
  const color = useContext(themeContext);
  const l = useContext(LOCALIZATION)

  const LEVELS = parseInt(item?.levels);
  const VALUE = parseInt(item?.value);
  const MAX_VALUE = parseInt(item?.maxValue);
  const START_VALUE = parseInt(item?.startValue);
  const UNIT = item?.unit;
  const ELIGIBLE_FOR_REWARD = VALUE === MAX_VALUE;

  const GET_VALUE = input;

  let GET_LEVEL, GET_HEADER_VALUE, MAX_INPUT_LEVEL;
  if (type === 'stamps') {
    GET_LEVEL = GET_VALUE + 1;
    GET_HEADER_VALUE = `${GET_VALUE}/${MAX_VALUE}`;
    MAX_INPUT_LEVEL = MAX_VALUE
  } else if(type === 'storecard'){

    GET_LEVEL = Math.max(Math.min(Math.ceil((MAX_VALUE - GET_VALUE) / (MAX_VALUE / LEVELS)), LEVELS), 1);
    GET_HEADER_VALUE = `${GET_VALUE} ${UNIT}`;
    MAX_INPUT_LEVEL = null; // <--- CHECK THIS LATER

  } else if(type === 'giftcard' || type ==='loader') {
    GET_LEVEL = Math.max(Math.min(Math.ceil((START_VALUE - GET_VALUE) / (START_VALUE / LEVELS)), LEVELS), 1);
    GET_HEADER_VALUE = `${GET_VALUE} ${UNIT}`;
    MAX_INPUT_LEVEL = START_VALUE; // <--- CHECK THIS LATER
  }

  const MINI_BUTTON_1_CALCULATION = Math.max(input - 1, 0);
  const MINI_BUTTON_2_CALCULATION = Math.min(input + 1, MAX_INPUT_LEVEL);

  const handleMiniButton_1 = () => setInput(MINI_BUTTON_1_CALCULATION);
  const handleMiniButton_2 = () => setInput(MINI_BUTTON_2_CALCULATION);

  let VALUE_NEW = GET_VALUE;

  // [STAMPS] Reset value to 0 if eligible for reward
  if (type === 'stamps' && ELIGIBLE_FOR_REWARD) {
    VALUE_NEW = 0;
    GET_LEVEL = 1;
    GET_HEADER_VALUE = `${VALUE_NEW}/${MAX_VALUE}`;
  }

  const HEADER_VALUE = GET_HEADER_VALUE;
  const LEVEL_NEW = GET_LEVEL;
  const VALUE_OLD = VALUE;

  let submitButtonLabel = l.submit;
  if (type === 'stamps') {
    if (ELIGIBLE_FOR_REWARD) {
      submitButtonLabel = l.give_reward;
    } else {
      submitButtonLabel = l.submit;
    }
  }

  const handleSubmit = () => {
    console.log('HEADER:', HEADER_VALUE, ' LEVEL:', LEVEL_NEW, ' VALUE:', VALUE_NEW);
    handleAction(HEADER_VALUE, LEVEL_NEW, VALUE_NEW, VALUE_OLD);
  };

  return {
    input,
    setInput,
    color,
    LEVELS,
    VALUE,
    MAX_VALUE,
    UNIT,
    GET_VALUE,
    GET_LEVEL,
    GET_HEADER_VALUE,
    MINI_BUTTON_1_CALCULATION,
    MINI_BUTTON_2_CALCULATION,
    handleMiniButton_1,
    handleMiniButton_2,
    HEADER_VALUE,
    LEVEL_NEW,
    VALUE_NEW,
    VALUE_OLD,
    ELIGIBLE_FOR_REWARD,
    submitButtonLabel,
    handleSubmit,
  };
}
