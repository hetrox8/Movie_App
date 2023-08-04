import commentCounter from '../src/modules/commentCount';

describe('commentCounter', () => {
  test('displays the correct comment count', () => {
    document.body.innerHTML = '<span class="counter"></span><div class="commentDiv"><p>Comment 1</p><p>Comment 2</p></div>';
    commentCounter();

    const counterElement = document.querySelector('.counter');
    expect(counterElement.textContent).toBe('(2)');
  });

  test('displays the correct comment count when no comments', () => {
    document.body.innerHTML = '<span class="counter"></span><div class="commentDiv"></div>';
    commentCounter();

    const counterElement = document.querySelector('.counter');
    expect(counterElement.textContent).toBe('(0)');
  });
});
