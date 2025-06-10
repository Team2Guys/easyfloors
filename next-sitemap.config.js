/** @type {import('next-sitemap').IConfig} */
//eslint-disable-next-line
const { fetchProductsForSitemap ,fetchcategoryForSitemap, fetchsubcategoryForSitemap, fetchAccessoriesForSitemap} = require('./src/config/sitemap-data');
module.exports = {
  siteUrl: 'https://easyfloors.ae/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  outDir: './public', // Will be generated after build
  exclude: ['/dashboard/*'], // optional


    additionalPaths: async () => {
 const [products, categories, subcategories, accessories] = await Promise.all([
      fetchProductsForSitemap(),
      fetchcategoryForSitemap(),
      fetchsubcategoryForSitemap(),
      fetchAccessoriesForSitemap()
    ])



       const categoryPaths = categories.map((category) => ({
      loc: `/${category.custom_url}`,
      lastmod: new Date().toISOString(),
    }));
    
    const subcategoryPaths = subcategories.map((subcategory) => ({
      loc: `/${subcategory.category?.RecallUrl}/${subcategory.custom_url}`,
      lastmod: new Date().toISOString(),
    }));

   const productPaths = products.map((product) => ({
      loc: `/${product.category?.RecallUrl}/${product.subcategory?.custom_url}/${product.custom_url}`,
      lastmod: new Date().toISOString(),
    })); 
   const accessoriesPaths = accessories.map((product) => ({
      loc: `/${product.category?.RecallUrl}/${product.custom_url}`,
      lastmod: new Date().toISOString(),
    })); 

        return [...categoryPaths, ...subcategoryPaths, ...productPaths,...accessoriesPaths];

  },
};
