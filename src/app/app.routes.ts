import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: "", loadComponent: () => import("./features/pages/home/home").then(m => m.Home), pathMatch: "full" },
    { path: "login", loadComponent: () => import("./features/pages/auth/login/login").then(m => m.Login) },
    { path: "register", loadComponent: () => import("./features/pages/auth/register/register").then(m => m.Register) },

    { path: "dashboard", canActivate: [authGuard], loadComponent: () => import("./features/pages/dashboard/dashboard").then(m => m.Dashboard) },
    { path: "offers", canActivate: [authGuard], loadComponent: () => import("./features/pages/offers/offers").then(m => m.Offers) },
    { path: "new-offer", canActivate: [authGuard], loadComponent: () => import("./features/pages/offers/new-offer/new-offer").then(m => m.NewOffer) },
    { path: "edit-offer/:id", canActivate: [authGuard], loadComponent: () => import("./features/pages/offers/new-offer/new-offer").then(m => m.NewOffer) },
    { path: "view-offer/:id", canActivate: [authGuard], loadComponent: () => import("./features/pages/offers/view-offer/view-offer").then(m => m.ViewOffer) },
    { path: "statistics", canActivate: [authGuard], loadComponent: () => import("./features/pages/statistics/statistics").then(m => m.Statistics) },
    { path: "profile", canActivate: [authGuard], loadComponent: () => import("./features/pages/profile/profile").then(m => m.Profile) },
    { path: "stages", canActivate: [authGuard], loadComponent: () => import("./features/pages/stages/stages").then(m => m.Stages) },

    { path: "cookies", loadComponent: () => import("./features/pages/legal/cookies/cookies").then(m => m.Cookies) },
    { path: "privacy", loadComponent: () => import("./features/pages/legal/privacy/privacy").then(m => m.Privacy) },
    { path: "legal-policy", loadComponent: () => import("./features/pages/legal/legal-policy/legal-policy").then(m => m.LegalPolicy) },

    { path: "not-found", loadComponent: () => import("./features/pages/not-found/not-found").then(m => m.NotFound) },
    { path: "**", redirectTo: "not-found" },
];
