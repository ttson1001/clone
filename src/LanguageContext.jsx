import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = {
    en: {
      logoutButton: "Logout",
      helpLable: "Help",
      searchTxt: "Project number, name, customer name",
      seletectBox: "Project status",
      searchPrjBtn: "Search project",
      resetSearchPrjBtn: "Reset search",
      titlePrjList: "Project List",
      number: "Number",
      name: "Name",
      status: "Status",
      customer: "Customer",
      startDate: "StartDate",
      delete: "Delete",
      new: "New",
      project: "Project",
      supplier: "Supplier",
      newProject: "New Project",
      projectNumber: "Project Number",
      projectName: "Project Name",
      group: "Group",
      members: "Members",
      endDate: "End date",
      updateProject: "Update Project",
      cancel: "Cancel"
    },
    fr: {
      logoutButton: "Se déconnecter",
      helpLable: "Aider",
      searchTxt: "Numéro de projet, nom, nom du client",
      seletectBox: "L'état du projet",
      searchPrjBtn: "Rechercher un projet",
      resetSearchPrjBtn: "Réinitialiser la recherche",
      titlePrjList: "Liste de projets",
      number: "Nombre",
      name: "Nom",
      status: "Statut",
      customer: "Cliente",
      startDate: "Date de début",
      delete: "Supprimer",
      new: "Nouvelle",
      project: "Projet",
      supplier: "Fournisseuse",
      newProject: "Nouveau projet",
      projectNumber: "Numéro de projet",
      projectName: "Nom du projet",
      group: "Groupe",
      members: "Membres",
      endDate: "Date de fin",
      updateProject: "Mettre à jour le projet",
      cancel: "Annuler"
    },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => {
  return useContext(LanguageContext);
};
