import { SidebarCarnetSanteModule } from './sidebar-carnet-sante.module';

describe('SidebarCarnetSanteModule', () => {
  let sidebarCarnetSanteModule: SidebarCarnetSanteModule;

  beforeEach(() => {
    sidebarCarnetSanteModule = new SidebarCarnetSanteModule();
  });

  it('should create an instance', () => {
    expect(sidebarCarnetSanteModule).toBeTruthy();
  });
});
