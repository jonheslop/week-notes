const { DateTime } = require('luxon');
const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLLL yyyy');
  });

  eleventyConfig.addFilter('readableWeek', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('W');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if ( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter('widont', string => {
    return string.replace(/\s([^\s<]+)\s*$/,'&nbsp;$1')
  });

  eleventyConfig.addCollection('tagList', require('./_11ty/get-tag-list'));

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');

  /* Markdown Plugins */
  const markdownIt = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });
  const markdownItAnchor = require('markdown-it-anchor');
  const opts = {
    permalink: true,
    permalinkClass: 'link accent',
    permalinkSymbol: '#'
  };

  markdownIt.renderer.rules.image = tokens => {
    const src = tokens[0].attrs[tokens[0].attrIndex('src')][1];
    const alt = tokens[0].attrs[tokens[0].attrIndex('alt')][1] || tokens[0].content;
    return `<figure class="mv4 mr0 ml0 mr6-l pa0 w-70-l ba bw4 bw5-ns b--highlight border-box bg-highlight">
      <img class="db" src="${src}" alt="${alt}"/>
    </figure>`
  };

  eleventyConfig.setLibrary('md', markdownIt
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, browserSync) => {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
      'md',
      'njk',
      'html',
      'liquid'
    ],

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};
