import { create } from 'zustand';
import { hexOrRgbToDarkest } from '../utils/hexOrRgbToDarkest';
import { hexOrRgbToLightest } from '../utils/hexOrRgbToLightest';
import { colorIsDark } from '../utils/colorIsDark';
import { formatColorCode } from '../utils/formatColorCode';
import { validateColorCode } from '../utils/validate';

import { TEMPLATES_ARRAY, TEMPLATES_ARRAY_DATA } from '../K/Templates/templates_array';
import { PROGRAMS } from '../K/Templates/programs';
import { INDUSTRIES } from '../K/Templates/industries';

export const useCreateStore = create((set, get) => ({
  designs: TEMPLATES_ARRAY,
  templates: TEMPLATES_ARRAY_DATA,
  programs: PROGRAMS,
  industries: INDUSTRIES,

  templateId: '',
  programId: 'stamps',
  industryId: '',

  setSelectedTemplate: (templateId) => {
    const filteredDesigns = TEMPLATES_ARRAY.filter((design) => design.templateId === templateId);
    set({
      designs: filteredDesigns, // Update designs array based on selected template
      templateId: templateId,
    });
  },

  setSelectedIndustry: (industryId) => {
    const programId = get().programId;

    const ProgramTemplates = TEMPLATES_ARRAY_DATA.filter(
      (template) => template.programId === programId
    );

    const filteredTemplates = ProgramTemplates.filter(
      (template) => template.industryId === industryId
    );

    const templateId = filteredTemplates[0].templateId

    const designs = TEMPLATES_ARRAY.filter((design) => design.templateId === templateId )

    set({
      industryId: industryId,
      templates: filteredTemplates, // Update programs array based on selected industry
      templateId,
      designs,
    });
  },

  setSelectedProgram: (programId) => {

    const filteredTemplates = TEMPLATES_ARRAY_DATA.filter(
      (template) => template.programId === programId
    );

    /** Extract UNIQUE industryIds from templates */
    const industryIds = [...new Set(filteredTemplates.map((template) => template.industryId))];

    /** FILTER industries that have industryIds */
    const filteredIndustries = INDUSTRIES.filter((industry) =>
      industryIds.includes(industry.industryId)
    );

    set({
      programId: programId,
      templates: filteredTemplates,
      industries: filteredIndustries,
    });
  },

  resetProgram: () => {
    set({
      designs: TEMPLATES_ARRAY,
      templates: TEMPLATES_ARRAY_DATA,
      programs: PROGRAMS,
      industries: INDUSTRIES,
      templateId: 'stamps-a7',
      programId: '',
      industryId: '',
    });
  },

  programName: 'Brand Name',
  setProgramName: (res) => {
    set({ programName: res });
  },
  programLogo: '',
  programLogoAvailable: false,
  setProgramLogo: (res) => {
    if(res?.length > 0){
      set({ programLogo: res, programLogoAvailable: true });
    } else {
      set({ programLogo: '', programLogoAvailable: false });
    }
  },
  programColor: '#FFCC00',
  programColorDark: '#2e2e2e',
  programColorLight: '#ffffff',
  programColorIsDark: false,
  programLabelColor: '#999999',
  programTextColor: '#111111',
  setProgramColor: (res) => {
    const validateColor = validateColorCode(res);
    if (validateColor) {
      const formatedColor = formatColorCode(res);
      const darkColor = hexOrRgbToDarkest(formatedColor);
      const lightColor = hexOrRgbToLightest(formatedColor);
      const isDark = colorIsDark(formatedColor);
      set({ programColor: formatedColor });
      set({ programColorDark: darkColor });
      set({ programColorLight: lightColor });
      set({ programColorIsDark: isDark });
      set({ programLabelColor: isDark ? lightColor : darkColor });
      set({ programTextColor: isDark ? '#FFFFFF' : '#000000' });
    }
  },
}));
