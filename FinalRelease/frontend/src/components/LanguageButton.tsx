import { LanguageContext } from "../provider/LanguageProvider";
import { useContext, useEffect } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function LanguageButton() {
    const context = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleLanguageChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
        context?.changeLanguage(newLanguage);
    };

    return (
        <ToggleButtonGroup 
            style={{borderRadius: '20px'}}
            value={context?.language}
            exclusive
            onChange={handleLanguageChange}
            aria-label="language"
        >
            <ToggleButton style={{ border:'none' }} value="zh" aria-label="chinese">
                中
            </ToggleButton>
            <ToggleButton style={{ border:'none' }} value="en" aria-label="english">
                EN
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default LanguageButton;