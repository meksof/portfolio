export function getBrowserLanguage() {
  // Get browser language from navigator.language
  const browserLang = navigator.language.split('-')[0];
  return browserLang;
}

export function shouldRedirect(currentLang) {
  // If we're already on a language-specific page, no need to redirect
  if (currentLang) return false;
  
  // Get browser language
  const browserLang = getBrowserLanguage();
  
  // Check if browser language is supported
  const supportedLanguages = ['en', 'fr'];
  const targetLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';
  
  return targetLang;
} 