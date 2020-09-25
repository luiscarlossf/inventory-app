import { EquipamentPipe } from './equipament.pipe';

describe('EquipamentPipe', () => {
  it('create an instance', () => {
    const pipe = new EquipamentPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
