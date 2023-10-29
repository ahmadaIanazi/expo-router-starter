import { backfields_order_existingKeys } from '../../K/config/backfields_order';

// Function to create a deep copy of an array or object
const deepCopy = (value) => {
  if (Array.isArray(value)) {
    return value.map(deepCopy); // Recursively copy each element
  } else if (typeof value === 'object' && value !== null) {
    const copy = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = deepCopy(value[key]); // Recursively copy each property
      }
    }
    return copy;
  } else {
    return value; // Return primitive values as is
  }
};


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

export function replacePassJson(passJson, type, receivedValue) {
  const value = deepCopy(receivedValue);

  if (type == 'updatePass') {
    const headerValue = value.find((item) => item.key === 'header')?.value;
    const isCompleted = value.find((item) => item.key === 'completed')?.value;
    const completedMessage = value.find((item) => item.key === 'completedMessage')?.value;
    const unitValue = value.find((item) => item.key === 'unit')?.value;
    const headerKey = 'header';

    const headerIndex = passJson.storeCard.headerFields.findIndex((field) => field.key === headerKey);
    
    if (headerIndex !== -1) {
      passJson.storeCard.headerFields[headerIndex].value = headerValue;
      passJson.storeCard.headerFields[headerIndex].label = unitValue;
    }

    if (isCompleted) {
      passJson.storeCard.headerFields[headerIndex].changeMessage = completedMessage;
    }
  }

  if (type == 'design') {
    const nameValue = value.find((item) => item.key === 'name')?.value;
    if (nameValue) {
      passJson.logoText = nameValue;
      passJson.organizationName = nameValue;
    }

    const unitValue = value.find((item) => item.key === 'unit')?.value;
    if (unitValue) {
      const headerKey = 'header';
      const headerIndex = passJson.storeCard.headerFields.findIndex(
        (field) => field.key === headerKey
      );

      if (headerIndex !== -1) {
        passJson.storeCard.headerFields[headerIndex].label = unitValue;
      }
    }

    const backgroundColorValue = value.find((item) => item.key === 'backgroundColor')?.value;
    if (backgroundColorValue) {
      passJson.backgroundColor = backgroundColorValue;
    }

    const foregroundColorValue = value.find((item) => item.key === 'valueColor')?.value;
    if (foregroundColorValue) {
      passJson.foregroundColor = foregroundColorValue;
    }

    const labelColorValue = value.find((item) => item.key === 'labelColor')?.value;
    if (labelColorValue) {
      passJson.labelColor = labelColorValue;
    }

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
    const header_key = 'header';
    const header_index = passJson.storeCard.headerFields.findIndex((field) => field.key === header_key);
    if (header_index !== -1) {
      passJson.storeCard.headerFields[header_index].changeMessage = value.transaction;
    }
    passJson.locations[0].relevantText = value.location;
  }


  if (type == 'location') {
    passJson.locations[0].altitude = value.altitude;
    passJson.locations[0].latitude = value.latitude;
    passJson.locations[0].longitude = value.longitude;
  }

  if (type == 'details') {
    const descriptionObj = value.find((obj) => obj.key == 'description');

    if (descriptionObj) {
      value.splice(value.indexOf(descriptionObj), 1);
      passJson.description = descriptionObj.value;
    }

    value.forEach((input) => {

      const index = passJson.storeCard.backFields.findIndex((field) => field.key === input.key);
      if (index !== -1) {
        if (input.label) {
          passJson.storeCard.backFields[index].label = input.label;
        }
        if (input.value) {
          passJson.storeCard.backFields[index].value = input.value;
        }
        if (input.attributedValue) {
          passJson.storeCard.backFields[index].attributedValue = input.attributedValue;
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
            value: input.value,
            attributedValue: input.attributedValue,
            dataDetectorTypes: ['PKDataDetectorTypeLink'],
          };
          passJson.storeCard.backFields.push(newBackField);
        } else {
          const newBackField = {
            key: input.key,
            label: input.label,
            value: input.value,
          };
          passJson.storeCard.backFields.push(newBackField);
        }
      }
    });
  }

  return passJson;
}
