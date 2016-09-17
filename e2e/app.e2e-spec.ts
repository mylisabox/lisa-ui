import { LisaUiPage } from './app.po';

describe('lisa-ui App', function() {
  let page: LisaUiPage;

  beforeEach(() => {
    page = new LisaUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
