import { CategoryPipe } from './category.pipe';

describe('CategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
