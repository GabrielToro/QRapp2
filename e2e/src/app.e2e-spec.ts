import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  browser.waitForAngularEnabled(false); 

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be blank', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Start with Ionic UI Components');
  });
});


