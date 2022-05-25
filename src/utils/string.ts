import _ from 'underscore';

export const unescapeName = (name: string) => {
  return _.unescape(name);
};
