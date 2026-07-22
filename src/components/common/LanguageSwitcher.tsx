import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language.startsWith('kn') ? 'en' : 'kn';
    i18n.changeLanguage(nextLanguage);
  };

  const currentLangLabel = i18n.language.startsWith('kn') ? 'ಕನ್ನಡ' : 'English';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-amber-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-amber-600 shadow-sm"
      title="Switch Language / ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ"
    >
      <Globe size={16} />
      <span>{currentLangLabel}</span>
    </button>
  );
};

export default LanguageSwitcher;