
import { STAMPS_JSON_TEMPLATE,
GIFTCARD_JSON_TEMPLATE,
PROGRESS_JSON_TEMPLATE,
COUNTER_JSON_TEMPLATE } from '../../K/Templates/templates_pass_json'
import { TEMPLATES_ARRAY, TEMPLATES_ARRAY_DATA } from '../../K/Templates/templates_array';

export const getPassImageByTemplateId = (templateId, level) => {
  const foundItem = TEMPLATES_ARRAY.find(
    (item) => item.templateId === templateId && item.level === level
  );

  if (foundItem) {
    return foundItem.strip;
  } else {
    return '';
  }
};

export const getPassCategoryByTemplateId = (templateId) => {
  const foundItem = TEMPLATES_ARRAY_DATA.find((item) => item.templateId === templateId);
  if (foundItem) {
    return foundItem.programId;
  } else {
    return '';
  }
};

export const getPublicValue = (cardCategory) => {
  const a = cardCategory;
  if (a == 'stamps') {
    return true;
  }
  if (a == 'giftcard') {
    return false;
  }
  if (a == 'loader') {
    return false;
  }
  if (a == 'counter') {
    return false;
  }
  if (a == 'coupon') {
    return false;
  }
};

export const getTemplateJSON = (cardCategory) => {
  const a = cardCategory;
  if (a == 'stamps') {
    return STAMPS_JSON_TEMPLATE;
  }
  if (a == 'giftcard') {
    return GIFTCARD_JSON_TEMPLATE;
  }
  if (a == 'loader') {
    return PROGRESS_JSON_TEMPLATE;
  }
  if (a == 'counter') {
    return COUNTER_JSON_TEMPLATE;
  }
  if (a == 'coupon') {
    return GIFTCARD_JSON_TEMPLATE;
  }
};

export const getTemplateData = (templateId) => {
  const foundItem = TEMPLATES_ARRAY_DATA.find((item) => item.templateId === templateId);
  if (foundItem) {
    return foundItem;
  } else {
    return TEMPLATES_ARRAY_DATA[0];
  }
};

/* ========== CALCULATIONS ============== */
export const getBalanceNumbers = (str) => {
  const numericValue = str.match(/\d+/);
  if (numericValue) {
    return parseInt(numericValue[0]);
  }
  return '';
};



export const getCurrency = (inputString) => {
  const currencyRegex = /[A-Z]{3}$/;
  const matches = inputString.match(currencyRegex);
  if (matches && matches?.length > 0) {
    return matches[0];
  }
  return '';
};

export function getTotalFromCards(objects, extractNumbersOfThisField) {
  const filteredNumbers = objects
    .map((obj) => obj.extractNumbersOfThisField)
    .filter((value) => {
      if (typeof value === 'number' && !isNaN(value)) {
        return true;
      } else if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue);
      }
      return false;
    });

  const total = filteredNumbers.reduce((sum, value) => sum + parseFloat(value), 0);

  return total;
}

export const getStampsTotal = (inputString) => {
  if (typeof inputString !== 'string') {
    inputString = String(inputString);
  }

  const trimmedString = inputString.trim();
  const parts = trimmedString.split('/');

  if (parts?.length < 2) {
    return 0;
  }

  const numberString = parts[1].trim();

  if (!numberString.match(/^\d+$/)) {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  }

  return parseInt(numberString, 10);
};

export const getStampsNumber = (inputString) => {
  if (typeof inputString !== 'string') {
    inputString = String(inputString);
  }

  const trimmedString = inputString.trim();
  const parts = trimmedString.split('/');
  const numberString = parts[0].trim();

  if (!numberString.match(/^\d+$/)) {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  }

  return parseInt(numberString, 10);
};

