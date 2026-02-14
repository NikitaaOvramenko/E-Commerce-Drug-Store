import type { CountryOfOrigin, DrugInfo } from "@/api/types/drug.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LangContextType {
  language: CountryOfOrigin;
  changeLang: (lang: CountryOfOrigin) => void;
  findByLang: (lang: CountryOfOrigin, infos: DrugInfo[]) => DrugInfo | null;
}

const LangContext = createContext<LangContextType | null>(null);

export const LangContextProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<CountryOfOrigin>("ENG");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const changeLang = useCallback((lang: CountryOfOrigin) => {
    setLang(lang);
  }, []);

  const findByLang = useCallback((lang: CountryOfOrigin, infos: DrugInfo[]) => {
    return infos.find((info) => info.lang === lang) ?? null;
  }, []);

  return (
    <LangContext.Provider
      value={{ language: lang, changeLang: changeLang, findByLang: findByLang }}
    >
      {children}
    </LangContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("No Lang Context !");
  }
  return context;
};
