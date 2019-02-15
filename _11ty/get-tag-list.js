module.exports = function (collection) {
  const tagSet = new Set();
  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      let {tags} = item.data;

      tags = tags.filter(item => {
        switch (item) {
          // This list should match the `filter` list in tags.njk
          case 'all':
          case 'nav':
          case 'post':
          case 'posts':
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // Returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
};
