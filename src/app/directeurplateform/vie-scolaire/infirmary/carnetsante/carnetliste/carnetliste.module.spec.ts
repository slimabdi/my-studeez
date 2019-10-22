import { CarnetlisteModule } from './carnetliste.module';

describe('CarnetlisteModule', () => {
  let carnetlisteModule: CarnetlisteModule;

  beforeEach(() => {
    carnetlisteModule = new CarnetlisteModule();
  });

  it('should create an instance', () => {
    expect(carnetlisteModule).toBeTruthy();
  });
});
