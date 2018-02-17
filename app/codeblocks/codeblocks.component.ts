import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { AnimationCurve } from "ui/enums";
import { topmost } from "ui/frame";
import { isIOS } from "platform";
import { View } from "ui/core/view";
import { TextView } from "ui/text-view";
import { Layout } from "ui/layouts/layout";
import { Label } from "ui/label";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import * as timer from "timer";
import { TextField } from "ui/text-field";

import * as statusBar from "../utils/status-bar.util";

const LEFT_MARGIN = 8;
const LEFT_OFFSET = 20;
const TOP_OFFSET = 50;
const TOP_MARGIN = 8;

@Component({
  selector: "co-codeblocks",
  moduleId: module.id,
  templateUrl: "./codeblocks.component.html",
  styleUrls: ["./codeblocks-common.css", "./codeblocks.component.css"],
})
export class CodeblocksComponent implements OnInit {

  @ViewChild("logoContainer") logoContainerRef: ElementRef;
  @ViewChild("headerContainer") headerContainerRef: ElementRef;
  @ViewChild("demoContainer") demoContainerRef: ElementRef;
  @ViewChild("tipContainer") tipContainerRef: ElementRef;
  @ViewChild("buttonContainer") buttonContainerRef: ElementRef;
  @ViewChild("introContainer") introContainerRef: ElementRef;
  @ViewChild("objectiveLabel") objectiveLabelRef: ElementRef;
  @ViewChild("gameContainer") gameContainerRef: ElementRef;
  @ViewChild("dropContainer") dropContainerRef: ElementRef;

  private leftOffset: number;
  private topOffset: number;
  private screenSize: number;

  private logoContainer: View;
  private headerContainer: View;
  private demoContainer: View;
  private tipContainer: View;
  private buttonContainer: View;
  private introContainer: View;
  private objectiveLabel: TextView;
  private gameContainer: View;
  private dropContainer: Layout;

  constructor(
    private router: Router,
    private page: Page
  ) {
  }

  ngOnInit() {
    statusBar.hide();

    this.logoContainer = <View>this.logoContainerRef.nativeElement;
    this.headerContainer = <View>this.headerContainerRef.nativeElement;
    this.demoContainer = <View>this.demoContainerRef.nativeElement;
    this.tipContainer = <View>this.tipContainerRef.nativeElement;
    this.buttonContainer = <View>this.buttonContainerRef.nativeElement;
    this.introContainer = <View>this.introContainerRef.nativeElement;
    this.objectiveLabel = <TextView>this.objectiveLabelRef.nativeElement;
    this.gameContainer = <View>this.gameContainerRef.nativeElement;
    this.dropContainer = <Layout>this.dropContainerRef.nativeElement;

    this.objectiveLabel.style.visibility = "collapse";
    this.gameContainer.style.visibility = "collapse";
    this.animateMainContentIn(500);
    this.leftOffset = 20;
    this.topOffset = 28;
    this.screenSize = this.page.getMeasuredWidth();
  }

  start() {
    this.animateMainContentOut(1000)
      .then(() => this.animateGameContentIn(300));
  }

  animateGameContentIn(speed: number) {
    this.objectiveLabel.style.visibility = "visible";

    this.objectiveLabel.animate({ translate: { x: 0, y: -240 }, duration: speed })
      .then(() => this.objectiveLabel.animate({ translate: { x: 0, y: -270 }, duration: speed * 5 }))
      .then(() => this.objectiveLabel.animate({ translate: { x: 0, y: -480 }, duration: speed }))
      .then(() => this.gameContainer.animate({ opacity: 1, duration: speed / 2, delay: speed / 2 }))
      .then(() => this.gameContainer.style.visibility = "visible");
  }

  animateMainContentOut(fadeOutSpeed: number): Promise<any> {
    let animations = [];

    animations.push({
      target: this.logoContainer,
      translate: { x: 0, y: -200 },
      duration: fadeOutSpeed
    }, {
        target: this.headerContainer,
        translate: { x: 0, y: -200 },
        duration: fadeOutSpeed
      }, {
        target: this.tipContainer,
        translate: { x: 0, y: 200 },
        duration: fadeOutSpeed
      }, {
        target: this.buttonContainer,
        translate: { x: 0, y: 200 },
        duration: fadeOutSpeed
      }
    );

    return new Animation(animations, false).play()
      .then(() => this.demoContainer.animate({ opacity: 0, duration: fadeOutSpeed }))
      .then(() => this.introContainer.style.visibility = "collapse");
  }

  animateMainContentIn(fadeInSpeed) {
    let animations = [];

    animations.push({
      target: this.logoContainer,
      translate: { x: 0, y: 10 },
      duration: fadeInSpeed,
      curve: AnimationCurve.spring
    }, {
        target: this.headerContainer,
        translate: { x: 0, y: 10 },
        duration: fadeInSpeed,
        curve: AnimationCurve.spring
      }, {
        target: this.demoContainer,
        translate: { x: 50, y: 0 },
        duration: fadeInSpeed + 400,
        curve: AnimationCurve.spring
      }, {
        target: this.tipContainer,
        translate: { x: 0, y: -10 },
        duration: fadeInSpeed,
        curve: AnimationCurve.spring
      }, {
        target: this.buttonContainer,
        translate: { x: 0, y: -10 },
        duration: fadeInSpeed,
        curve: AnimationCurve.spring
      });

    new Animation(animations, false).play();
  }

  addBlock(arg: any) {
    const inputLabel: Label = arg.view;
    inputLabel.opacity = 0;

    const outputLabel = new Label();
    outputLabel.text = inputLabel.text;
    outputLabel.effectiveTop = this.topOffset;
    outputLabel.effectiveLeft = this.leftOffset;
    outputLabel.setInlineStyle(`color: white;
      background-color: rgb(0, 0, 0, 0.3);
      border-radius: 2;
      font-size: 14;
      padding: 2 2;
      margin: 2;`
    );

    this.dropContainer.addChild(outputLabel);

    timer.setTimeout(() => {
      let offsets = this.updateOffset();
      if (offsets[0] === 0) {
        this.leftOffset += offsets[1] + LEFT_MARGIN;
      } else {
        this.topOffset += TOP_OFFSET + TOP_MARGIN;
        this.leftOffset = LEFT_OFFSET;
        outputLabel.effectiveTop = this.topOffset;
        outputLabel.effectiveLeft = this.leftOffset;
      }
    }, 500);
  }

  updateOffset(): number[] {
    const renderedLabel = <Label>this.dropContainer.getChildAt(this.dropContainer.getChildrenCount() - 1);
    console.log(renderedLabel.text, renderedLabel.effectiveLeft, renderedLabel.getMeasuredWidth());
    if (renderedLabel.effectiveLeft + renderedLabel.getMeasuredWidth() > this.screenSize) {
      return [1, 0];
    }
    return [0, renderedLabel.getMeasuredWidth()];
  }
}
