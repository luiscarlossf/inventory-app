import { BrandPipe } from './brand.pipe';

describe('BrandPipe', () => {
  it('create an instance', () => {
    const pipe = new BrandPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
