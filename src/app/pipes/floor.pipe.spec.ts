import { FloorPipe } from './floor.pipe';

describe('FloorPipe', () => {
  it('create an instance', () => {
    const pipe = new FloorPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
