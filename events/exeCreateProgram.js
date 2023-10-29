import { Alert } from 'react-native';
import { getTemplateData } from '../operations/get';
import { TEMPLATE_DEFAULT_VALUE } from '../K/Templates/templates_array';
import { useContext, useState } from 'react';
import LOCALIZATION from '@context/locales';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../stores/useUserStore';
import { useCardStore } from '../stores/useCardStore';
import { useCreateStore } from '../stores/useCreateStore';
import { addCard } from '../data/add/addCard'

export default function executeCreateProgram() {
  const { cardName, cardColor, cardLogo, setIntroducing } = useCardStore();
  const l = useContext(LOCALIZATION);
  const { uid } = useUserStore();
  const [loading, setLoading] = useState(false)

  const {
    templateId,
    programName,
    programLogo,
    programColor,
    programLogoAvailable,
    programColorDark,
    programColorLight,
    programColorIsDark,
    programLabelColor,
    programTextColor,
  } = useCreateStore();

  const navigation = useNavigation();

  // Fix Below
  const templateData = getTemplateData(templateId);
  const cardCategory = templateData.programId;
  const cardLevels = templateData.levels;
  const cardMaxValue = templateData.maxValue;
  const cardUnit = templateData.unit;
  const initialValue = templateData.value;

  const cardColorCheck = cardColor ? cardColor : TEMPLATE_DEFAULT_VALUE.backgroundColor;

  const handleCreateProgram = async () => {
    const confirmCreation = await new Promise((resolve) => {
      Alert.alert(l.confirm_card_creation, l.confirm_card_creation_1, [
        {
          text: l.cancel,
          style: 'destructive',
          onPress: () => resolve(false),
        },
        {
          text: l.create,
          style: 'default',
          onPress: () => resolve(true),
        },
      ]);
    });

    if (confirmCreation) {
      setLoading(true);
      console.log('TEMPLATES:', templateId);
      console.log('cardCategory:', cardCategory);
      console.log('CardName:', cardName, programName);
      console.log('CardColor:', cardColor);
      console.log('UserID:', uid);
      console.log('cardLogo:', cardLogo, programLogo);
      console.log('cardLevels:', cardLevels);
      console.log('cardMaxValue:', cardMaxValue);
      console.log('cardUnit:', cardUnit);
      console.log('initialValue:', initialValue);
      console.log('cardColorCheck:', cardColorCheck, programColor);
      try {
        if (programLogoAvailable) {
          const card = await addCard(
            uid,
            cardCategory,
            templateId,
            programName,
            programColor,
            programLogo,
            cardLevels,
            cardMaxValue,
            cardUnit,
            initialValue
          );
          navigation.navigate('CardProfileNavigation', { card });
          setIntroducing(true);
        } else {
          Alert.alert(l.program_creation_error, l.program_creation_error_1, [
            {
              text: l.create,
              style: 'default',
              onPress: () => navigation.navigate('PickLogo'),
            },
          ]);
        }
      } catch (error) {
        console.error('Error creating card:', error);
      }
    }
  };

  return { handleCreateProgram, loading };
}
