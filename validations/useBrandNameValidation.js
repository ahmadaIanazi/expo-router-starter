import { useState, useEffect } from 'react';

export function useBrandNameValidation(brandNameInput) {
  const [errorText, setErrorText] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateBrandNameInput(brandNameInput));
  }, [brandNameInput]);

  function validateBrandNameInput(brandNameInput) {
    // Check if input is not empty
    if (!brandNameInput || brandNameInput.trim().length === 0) {
      setErrorText('Brand name is empty');
      return false;
    }

    // Check if input is not more than 36 characters
    if (brandNameInput.length > 36) {
      setErrorText('Brand name must not exceed 36 characters');
      return false;
    }

    // Check if input contains no symbols except the single quote (')
    if (/[^a-zA-Z0-9\s\u0600-\u06FF\s']/.test(brandNameInput)) {
      setErrorText('Brand name must not contain symbols');
      return false;
    }

    // If all checks pass, reset error text and return true
    setErrorText('');
    return true;
  }

  return { brandNameInput, errorText, isValid };
}
