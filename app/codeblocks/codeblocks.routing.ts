import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CodeblocksComponent } from "./codeblocks.component";

const codeblocksRoutes: Routes = [
  { path: "codeblocks", component: CodeblocksComponent},
];
export const codeblocksRouting: ModuleWithProviders = RouterModule.forChild(codeblocksRoutes);