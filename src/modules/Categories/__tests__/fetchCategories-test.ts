import { buildFetchCategoriesURL } from '../fetchCategories';

const TEST_BASE_URL = 'http://test';

describe('buildFetchCategoriesURL', () => {
  it('builds URL correctly', () => {
    expect(
      buildFetchCategoriesURL(
        {
          publisherId: 'publisherId',
          locale: 'locale',
          site: 'site',
          shipCountry: 'US',
          onlyMaProducts: true,
        },
        TEST_BASE_URL,
      ),
    ).toBe(
      'http://test/categories?publisherId=publisherId&locale=locale&site=site&shipCountry=US&onlyMaProducts=true',
    );
  });
  it('builds URL with onlyMaProducts=false correctly', () => {
    expect(
      buildFetchCategoriesURL(
        {
          publisherId: 'publisherId',
          locale: 'locale',
          site: 'site',
          shipCountry: 'US',
          onlyMaProducts: false,
        },
        TEST_BASE_URL,
      ),
    ).toBe(
      'http://test/categories?publisherId=publisherId&locale=locale&site=site&shipCountry=US&onlyMaProducts=false',
    );
  });
  it('builds URL with no onlyMaProducts correctly', () => {
    expect(
      buildFetchCategoriesURL(
        {
          publisherId: 'publisherId',
          locale: 'locale',
          site: 'site',
          shipCountry: 'US',
        },
        TEST_BASE_URL,
      ),
    ).toBe(
      'http://test/categories?publisherId=publisherId&locale=locale&site=site&shipCountry=US',
    );
  });
  it('builds URL with only publisherId and locale correctly', () => {
    expect(
      buildFetchCategoriesURL(
        {
          publisherId: 'publisherId',
          locale: 'locale',
        },
        TEST_BASE_URL,
      ),
    ).toBe('http://test/categories?publisherId=publisherId&locale=locale');
  });
});

describe('fetchCategories', () => {
  it('fetches URL correctly', () => {});
});
