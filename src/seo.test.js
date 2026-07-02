// src/seo.test.js
const fs = require('fs');
const path = require('path');

test('index.html has SEO meta tags and Person JSON-LD', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  expect(html).toMatch(/Full-Stack Software Developer/);
  expect(html).toMatch(/property="og:title"/);
  expect(html).toMatch(/name="twitter:card"/);
  expect(html).toMatch(/application\/ld\+json/);
  expect(html).toMatch(/"@type":\s*"Person"/);
  expect(html).toMatch(/rel="canonical"/);
});

test('sitemap.xml, robots.txt, and llms.txt exist with expected content', () => {
  const sitemap = fs.readFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), 'utf8');
  expect(sitemap).toMatch(/<urlset/);
  expect(sitemap).toMatch(/tomasferrari\.onrender\.com/);

  const robots = fs.readFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), 'utf8');
  expect(robots).toMatch(/Sitemap:/);
  expect(robots).toMatch(/Allow: \//);

  const llms = fs.readFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), 'utf8');
  expect(llms).toMatch(/Tomas Ferrari/);
  expect(llms).toMatch(/Full-Stack Software Developer/);
});
