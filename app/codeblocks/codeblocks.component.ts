import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

@Component({
  selector: "co-codeblocks",
  moduleId: module.id,
  templateUrl: "./codeblocks.component.html",
  styleUrls: ["./codeblocks-common.css", "./codeblocks.component.css"],
})
export class CodeblocksComponent implements OnInit {
  isNewGame = false;

  @ViewChild("infoContainer") infoContainer: ElementRef;
  @ViewChild("gameContainer") gameContainer: ElementRef;

  constructor(
    private router: Router,
    private page: Page
  ) {
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
