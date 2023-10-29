import { TEMPLATES_ARRAY_DATA } from "../../K/Templates/templates_array";

export const toNameFromTemplateId = (templateId) => {
  const foundItem = TEMPLATES_ARRAY_DATA.find((item) => item.templateId === templateId);
  if (foundItem) {
    return foundItem.name;
  } else {
    return '';
  }
};
