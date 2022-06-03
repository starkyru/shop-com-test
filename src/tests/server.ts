import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const handlers = [
  rest.get(
    'http://test/categories?publisherId=publisherId&locale=locale',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            name: 'Mint chip',
            image: 'data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASw',
          },
          {
            name: 'Vanilla',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASw',
          },
        ]),
      );
    },
  ),
];

export const server = setupServer(...handlers);
