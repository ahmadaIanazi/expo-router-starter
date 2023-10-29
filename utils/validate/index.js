export function validateColorCode(colorCode) {
  // Check if the input is a valid hex code
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(colorCode)) {
    if (colorCode.charAt(0) !== '#') {
      colorCode = '#' + colorCode;
    }
    return true;
  }

  // Check if the input is a valid RGB format
  const rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  if (rgbRegex.test(colorCode)) {
    return true;
  }

  // Neither a valid hex code nor RGB format
  return false;
}

export function colorIsDark(color) {
  let r, g, b;

  if (color == undefined || color == null || color == '') {
    return '';
  }
  if (color[0] === '#') {
    // HEX color
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (Array.isArray(color) && color?.length === 3) {
    // RGB color
    r = color[0];
    g = color[1];
    b = color[2];
  } else {
    // Invalid color format
    return false;
    throw new Error('Invalid color format. Please provide a valid HEX or RGB color.');
  }

  // Calculate the luminance of the color
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Check if the luminance is below a threshold value
  return luminance <= 128;
}
