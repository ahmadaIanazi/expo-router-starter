export function convertURLsToAttributedValue(text) {
  // Regular expression pattern to match URLs
  const urlPattern =
    /((?:https?:\/\/|www\.)(?:[\w-]+(?:\.[\w-]+)+)(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))/gi;

  // Replace URLs with attributed values
  const attributedText = text.replace(urlPattern, function (match) {
    // Check if the URL starts with "http://", "https://", or "www."
    if (match.startsWith('http://') || match.startsWith('https://') || match.startsWith('www.')) {
      // Add "http://" if the URL starts with "www."
      const url = match.startsWith('www.') ? 'http://' + match : match;

      // Create the attributed value for the URL
      return `<a href='${url}'>${match}</a>`;
    }

    // Return the original match if it doesn't start with a recognized protocol
    return match;
  });

  return attributedText;
}
