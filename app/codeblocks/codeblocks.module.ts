import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { codeblocksRouting } from "./codeblocks.routing";
import { CodeblocksComponent } from "./codeblocks.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    codeblocksRouting
  ],
  declarations: [
    CodeblocksComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CodeblocksModule {}
