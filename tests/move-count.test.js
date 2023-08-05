import axios from './__mocks__/axios';
import count from '../src/modules/movies-count';

describe('Count total movies', () => {
  let movieCountElement;

  beforeEach(() => {
    // Create a dummy movieCount element in the document body
    movieCountElement = document.createElement('div');
    movieCountElement.className = 'movie-count';
    document.body.appendChild(movieCountElement);
  });

  afterEach(() => {
    // Remove the movieCount element from the document body after each test
    movieCountElement.remove();
  });

  it('test_api_call_failure', async () => {
    const mockAxios = jest.spyOn(axios, 'get').mockRejectedValue(new Error('API call failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await count();
    expect(mockAxios).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');
    expect(consoleSpy).toHaveBeenCalledWith('Error:', new Error('API call failed'));
  });

  it('test_api_response_data_not_in_expected_format', async () => {
    const response = { data: {} };
    jest.spyOn(axios, 'get').mockResolvedValue(response);
    await count();
    expect(console.error).toHaveBeenCalledWith('Error:', expect.anything());
  });
});
