import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./main.component";

const mainRoutes: Routes = [
  { path: "main", component: MainComponent },
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);