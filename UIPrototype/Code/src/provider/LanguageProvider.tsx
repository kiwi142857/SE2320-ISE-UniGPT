import React, { useState, useEffect, FC } from 'react';
import i18n from '../i18n';

interface LanguageContextProps {
    language: string;
    changeLanguage: (lng: string) => void;
}

export const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
    children: React.ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
    const initialLanguage = localStorage.getItem('language') || i18n.language;
    const [language, setLanguage] = useState<string>(initialLanguage);

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setLanguage(lng);
            localStorage.setItem('language', lng);
        };

        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    console.log('language', language);
    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};