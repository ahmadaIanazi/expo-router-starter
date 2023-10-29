import { backfields_order_existingKeys } from '../../K/config/backfields_order';

export function replaceCardPassJSON(
  cardTemplateJSON,
  backgroundColor,
  description,
  expirationDate,
  foregroundColor,
  labelColor,
  logoText,
  organizationName,
  relevantDate
) {
  cardTemplateJSON.backgroundColor = backgroundColor;
  cardTemplateJSON.description = description;
  cardTemplateJSON.expirationDate = expirationDate;
  cardTemplateJSON.foregroundColor = foregroundColor;
  cardTemplateJSON.labelColor = labelColor;
  cardTemplateJSON.logoText = logoText;
  cardTemplateJSON.organizationName = organizationName;
  cardTemplateJSON.relevantDate = relevantDate;

  return cardTemplateJSON;
}

export function replacePassJson(passJson, type, value) {
  if (type == 'design') {
    passJson.logoText = value.logoText;
    passJson.backgroundColor = value.backgroundColor;
    passJson.description = value.description;
    passJson.foregroundColor = value.foregroundColor;
    passJson.labelColor = value.labelColor;
    passJson.logoText = value.logoText;
  }
  if (type == 'giftcard') {
    passJson.storeCard.headerFields[0].value = value;
  }
  if (type == 'stamps') {
    passJson.storeCard.headerFields[0].value = value;
  }
  if (type == 'counter') {
    passJson.storeCard.headerFields[0].value = value;
  }
  if (type == 'loader') {
    passJson.storeCard.headerFields[0].value = value;
  }
  if (type == 'coupon') {
    passJson.storeCard.headerFields[0].value = value;
  }
  if (type == 'notification') {
    const key = 'notification';
    const index = passJson.storeCard.backFields.findIndex((field) => field.key === key);
    if (index !== -1) {
      passJson.storeCard.backFields[index].value = value;
    } else {
      const newBackField = {
        key: 'notification',
        label: 'Latest Updates',
        value: value,
        changeMessage: '%@',
      };
      passJson.storeCard.backFields.push(newBackField);
    }
  }
  if (type == 'notificationSettings') {
    passJson.storeCard.headerFields[0].changeMessage = value.transaction;
    passJson.locations[0].relevantText = value.location;
  }
  if (type == 'notificationReward') {
    passJson.storeCard.backFields[1].value = value.transaction;
  }
  if (type == 'location') {
    passJson.locations[0].altitude = value.altitude;
    passJson.locations[0].latitude = value.latitude;
    passJson.locations[0].longitude = value.longitude;
  }

  if (type == 'details') {
    value.forEach((input) => {
      const index = passJson.storeCard.backFields.findIndex((field) => field.key === input.key);
      if (index !== -1) {
        if (input.label) {
          // passJson.storeCard.backFields[index].label = convertToLocalizedValue(input.label);
          passJson.storeCard.backFields[index].label = input.label;
        }
        if (input.value) {
          passJson.storeCard.backFields[index].value = input.value;
          // passJson.storeCard.backFields[index].value = convertToLocalizedValue(input.value);
        }
        if (input.attributedValue) {
          passJson.storeCard.backFields[index].attributedValue = input.attributedValue;
          // passJson.storeCard.backFields[index].attributedValue =
          //   convertToLocalizedValue(input.attributedValue);
        } else {
          delete passJson.storeCard.backFields[index].attributedValue;
        }
        // Remove the field from its current position
        const field = passJson.storeCard.backFields.splice(index, 1)[0];
        // Sort the existing keys array based on the order property
        backfields_order_existingKeys.sort((a, b) => a.order - b.order);
        // Find the index to insert the field based on the sorted existing keys
        const insertionIndex = backfields_order_existingKeys.findIndex(
          (key) => key.key === input.key
        );
        // // Find the index to insert the field based on the order of existing keys
        // const insertionIndex = passJson.storeCard.backFields.findIndex((field) => {
        //   const existingKey = backfields_order_existingKeys.find((key) => key.key === field.key);
        //   return existingKey ? true : false;
        // });

        // // Insert the field above the existing keys
        // if (insertionIndex !== -1) {
        //   passJson.storeCard.backFields.splice(insertionIndex, 0, field);
        // } else {
        //   // If none of the existing keys are found, insert at the end
        //   passJson.storeCard.backFields.push(field);
        // }
        // Insert the field at the appropriate position
        if (insertionIndex !== -1) {
          passJson.storeCard.backFields.splice(insertionIndex, 0, field);
        } else {
          // If the input key is not found in existing keys, insert at the end
          passJson.storeCard.backFields.push(field);
        }
      } else {
        if (
          input.key == 'website' ||
          input.key == 'link1' ||
          input.key == 'link2' ||
          input.key == 'link3'
        ) {
          const newBackField = {
            key: input.key,
            label: input.label,
            // label: convertToLocalizedValue(input.label),
            value: input.value,
            // value: convertToLocalizedValue(input.value),
            attributedValue: input.attributedValue,
            // attributedValue: convertToLocalizedValue(input.attributedValue),
            dataDetectorTypes: ['PKDataDetectorTypeLink'],
          };
          passJson.storeCard.backFields.push(newBackField);
        } else {
          const newBackField = {
            key: input.key,
            label: input.label,
            // label: convertToLocalizedValue(input.label),
            value: input.value,
            // value: convertToLocalizedValue(input.value),
          };
          passJson.storeCard.backFields.push(newBackField);
        }
      }
    });
  }

  return passJson;
}
