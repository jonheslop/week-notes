---
title: Swain’s Lane
date: 2019-02-26
tags: 
  - notes
  - photos
layout: layouts/post.njk
image: photo.jpg
imageCaption: 'Hoxton in the snow'
---
God help us, we're in the hands of engineers. God help us, we're in the hands of engineers. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!

```js
  // Just a lil code block y’know
  const { DateTime } = require('luxon');
  const fs = require('fs');
  const pluginRss = require('@11ty/eleventy-plugin-rss');
  const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

  module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  }
```
