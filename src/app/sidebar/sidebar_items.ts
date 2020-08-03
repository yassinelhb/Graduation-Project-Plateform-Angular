import {Roles} from '../Models/roles';

export const items = [
    {
        path: "/dashboard",
        title: "Dashboard",
        icon: "menu-icon mdi mdi-television",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/admins",
        title: "Administrateurs",
        icon: "menu-icon fa fa-user-o",
        roles: [Roles.SuperAdmin],
        queryParams: ""
    },
    {
        path: "/ecole",
        title: "Ecole",
        icon: "menu-icon fa fa-institution",
        roles: [Roles.Admin],
        queryParams: ""
    },
    {
        path: "/sites",
        title: "Sites",
        icon: "menu-icon fa fa-building",
        roles: [Roles.Admin],
        queryParams: ""
    },
    {
        path: "/enseignants",
        title: "Enseignants",
        icon: "menu-icon fa fa-user-o",
        roles: [Roles.Admin],
        queryParams: ""
    },
    {
        path: '/soutenanceNonNote',
        title: 'Suivi',
        icon: 'menu-icon fa fa-file-text-o',
        roles: 'All'
    },
    {
        path: "/forms",
        title: "Form elements",
        icon: "menu-icon mdi mdi-notification-clear-all",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/buttons",
        title: "Buttons",
        icon: "menu-icon mdi mdi-dna",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/progressbar",
        title: "Progress bar",
        icon: "menu-icon mdi mdi-trackpad",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/carousel",
        title: "Carousel",
        icon: "menu-icon mdi mdi-texture",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tooltips",
        title: "Tooltip",
        icon: "menu-icon mdi mdi-content-copy",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tabs",
        title: "Tabs",
        icon: "menu-icon mdi mdi-lightbulb-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/dropdowns",
        title: "Dropdown",
        icon: "menu-icon mdi mdi-backup-restore",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/sheet",
        title: "Fiche PFE",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.DirecteurDesStages, Roles.Enseignant, Roles.Etudiant],
        queryParams: ""
    },
    {
        path: "/sheet",
        title: "Fiche accepter",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.ChefDeDepartement],
        queryParams: { q: '_accepted' }
    },
    {
        path: "/sheet",
        title: "Attente d'encadreur",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.ChefDeDepartement],
        queryParams: { q: '_encadreur' }
    },
    {
        path: "/sheet",
        title: "Attente de rapporteur",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.ChefDeDepartement],
        queryParams: { q: '_rapporteur' }
    },
    {
        path: "/sheet",
        title: "Attente de note",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.ChefDeDepartement, Roles.Enseignant],
        queryParams: { q: '_note' }
    },
    {
        path: "/sheet",
        title: "Attente de planification",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.DirecteurDesStages],
        queryParams: { q: '_planning' }
    },

    {
        path: "/sheet",
        title: "Modification majeur",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.Enseignant],
        queryParams: { q: '_modify' }
    },

    {
      path: '/soutenanceNonNote',
      title: 'Suivi',
      icon: 'menu-icon fa fa-file-text-o',
      roles: 'All'
    },

    {
        path: "etudiant/nosheet",
        title: "Etudiant sans fiche pfe",
        icon: "menu-icon fa fa-file-text-o",
        roles: [Roles.DirecteurDesStages]
    },
    {
        path: "/internship",
        title: "Convention de stage",
        icon: "menu-icon fa fa-address-card-o",
        roles: [Roles.DirecteurDesStages, Roles.Etudiant],
        queryParams: ""
    },
    {
        path: "/breadcrumbs",
        title: "Breadcrumb",
        icon: "menu-icon mdi mdi-flag-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/pagination",
        title: "Pagination",
        icon: "menu-icon mdi mdi-loupe",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tables",
        title: "Tables",
        icon: "menu-icon mdi mdi-table",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/alerts",
        title: "Alerts",
        icon: "menu-icon mdi mdi-shield-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/accordions",
        title: "Accordion",
        icon: "menu-icon mdi mdi-altimeter",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/badges",
        title: "Badges",
        icon: "menu-icon mdi mdi-checkbox-multiple-blank-circle-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/icons",
        title: "Icons",
        icon: "menu-icon mdi mdi-chart-bubble",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/categorie",
        title: "Categorie",
        icon: "menu-icon mdi mdi-content-copy",
        roles: "All",
    },
    {
        path: "/forum",
        title: "Forum",
        icon: "menu-icon fa fa-address-card-o",
        roles: [Roles.Etudiant]
    },
    {
        path: "/typography",
        title: "Typography",
        icon: "menu-icon mdi mdi-format-italic",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/soutenance",
        title: "Soutenance",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: ""
    },
]
