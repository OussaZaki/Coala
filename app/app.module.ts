import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { MainModule } from "./main/main.module";
import { CodeblocksModule } from "./codeblocks/codeblocks.module";

@NgModule({
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        MainModule,
        CodeblocksModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule { }
