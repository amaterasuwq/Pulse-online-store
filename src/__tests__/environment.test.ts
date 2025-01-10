test('JSDOM works correctly', () => {
    const div = document.createElement('div');
    div.innerHTML = 'Hello, World!';
    expect(div.innerHTML).toBe('Hello, World!');
  });
  