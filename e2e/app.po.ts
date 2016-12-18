import {browser, element, by} from "protractor";

export class LisaUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lisa-root h1')).getText();
  }
}
