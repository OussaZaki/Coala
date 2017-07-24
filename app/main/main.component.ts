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
  selector: "co-main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main-common.css", "./main.component.css"],
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private page: Page
  ) {
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  play() {
    this.router.navigate(["/codeblocks"]);
    console.log("play");
  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: {
        x: 1.0,
        y: 1.0
      },
      duration: 5000
    });
  }
}
