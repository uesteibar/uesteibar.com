module.exports = function(eleventyConfig) {
  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("css/fonts");

  // Copy any .jpg file to `_site`, via Glob pattern
};
