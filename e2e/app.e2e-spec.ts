import { AngularSchoolDojoPage } from './app.po';

describe('angular-school-dojo App', () => {
  let page: AngularSchoolDojoPage;

  beforeEach(() => {
    page = new AngularSchoolDojoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
