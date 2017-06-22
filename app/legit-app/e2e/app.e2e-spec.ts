import { LegitAppPage } from './app.po';

describe('legit-app App', () => {
  let page: LegitAppPage;

  beforeEach(() => {
    page = new LegitAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
