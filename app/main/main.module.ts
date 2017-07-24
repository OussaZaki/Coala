import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { mainRouting } from "./main.routing";
import { MainComponent } from "./main.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mainRouting
  ],
  declarations: [
    MainComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainModule { }
