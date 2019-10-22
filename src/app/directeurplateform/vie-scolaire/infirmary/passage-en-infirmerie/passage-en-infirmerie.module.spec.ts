import { PassageEnInfirmerieModule } from './passage-en-infirmerie.module';

describe('PassageEnInfirmerieModule', () => {
  let passageEnInfirmerieModule: PassageEnInfirmerieModule;

  beforeEach(() => {
    passageEnInfirmerieModule = new PassageEnInfirmerieModule();
  });

  it('should create an instance', () => {
    expect(passageEnInfirmerieModule).toBeTruthy();
  });
});
