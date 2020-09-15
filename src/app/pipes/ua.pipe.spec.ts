import { UaPipe } from './ua.pipe';

describe('UaPipe', () => {
  it('create an instance', () => {
    const pipe = new UaPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
