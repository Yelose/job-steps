import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", loadComponent: () => import("./features/pages/home/home").then(m => m.Home), pathMatch: "full" },
    { path: "login", loadComponent: () => import("./features/pages/auth/login/login").then(m => m.Login) },
    { path: "register", loadComponent: () => import("./features/pages/auth/register/register").then(m => m.Register) },
    { path: "dashboard", loadComponent: () => import("./features/pages/dashboard/dashboard").then(m => m.Dashboard) },
    { path: "not-found", loadComponent: () => import("./features/pages/not-found/not-found").then(m => m.NotFound) },
    { path: "offers", loadComponent: () => import("./features/pages/offers/offers").then(m => m.Offers) },
    { path: "new-offer", loadComponent: () => import("./features/pages/offers/new-offer/new-offer").then(m => m.NewOffer) },
    { path: "edit-offer/:id", loadComponent: () => import("./features/pages/offers/new-offer/new-offer").then(m => m.NewOffer) },
    { path: "view-offer/:id", loadComponent: () => import("./features/pages/offers/view-offer/view-offer").then(m => m.ViewOffer) },
    { path: "statistics", loadComponent: () => import("./features/pages/statistics/statistics").then(m => m.Statistics) },
    { path: "profile", loadComponent: () => import("./features/pages/profile/profile").then(m => m.Profile) },
    { path: "**", redirectTo: "not-found" },
];
