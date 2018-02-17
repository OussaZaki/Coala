import * as utils from "utils/utils";

function getApp() {
    return utils.ios.getter(UIApplication, UIApplication.sharedApplication);
}

export function show() {
    getApp().setStatusBarHiddenWithAnimation(false, UIStatusBarAnimation.Slide);
}

export function hide() {
    getApp().setStatusBarHiddenWithAnimation(true, UIStatusBarAnimation.Slide);
}