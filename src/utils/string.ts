const HTML_ENTITIES: { [key: string]: string } = {
  nbsp: String.fromCharCode(160),
  amp: '&',
  quot: '"',
  lt: '<',
  gt: '>',
  reg: '©',
  copy: '®',
  trade: '™',
  apos: "'",
  egrave: 'è',
};

export const unescapeName = (name: string) => {
  try {
    return name.replace(
      /&(nbsp|amp|quot|lt|gt|reg|copy|trade|apos|egave);/g,
      (a, b) => HTML_ENTITIES[b],
    );
  } catch (e) {
    return '';
  }
};
