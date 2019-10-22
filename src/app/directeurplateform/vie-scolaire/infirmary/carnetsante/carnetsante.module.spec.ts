import { CarnetsanteModule } from './carnetsante.module';

describe('CarnetsanteModule', () => {
  let carnetsanteModule: CarnetsanteModule;

  beforeEach(() => {
    carnetsanteModule = new CarnetsanteModule();
  });

  it('should create an instance', () => {
    expect(carnetsanteModule).toBeTruthy();
  });
});
