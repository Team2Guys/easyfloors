// src/config/sitemap-data.js (CommonJS)

const FETCH_ALL_PRODUCTS_SITE_MAP = `
  query Products {
    products {
      custom_url
      category {
       RecallUrl
      }
      subcategory {
        custom_url
      }
    }
  }
`;

 const FETCH_ALL_CATEGORIES = `
  query Categories {
    categories {
      custom_url
}}
`;
 const FETCH_ALL_SUB_CATEGORIES = `
  query SubCategories {
    subCategories {

      custom_url
    
     category {
      RecallUrl
            }

    }
  }
`;

 const FETCH_ALL_ACCESSORIES = `
  query Accessories {
    accessories {
        custom_url

      category {
  
      RecallUrl
      }
   
    }
  }
`;

const fetchProductsForSitemap = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_ALL_PRODUCTS_SITE_MAP,
      }),
    });

    const json = await response.json();
    return json.data?.products || [];
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
    return [];
  }
};
const fetchcategoryForSitemap = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_ALL_CATEGORIES,
      }),
    });

    const json = await response.json();
    return json.data?.categories || [];
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
    return [];
  }
};

const fetchsubcategoryForSitemap = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_ALL_SUB_CATEGORIES,
      }),
    });

    const json = await response.json();
    return json.data?.subCategories || [];
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
    return [];
  }
};
const fetchAccessoriesForSitemap = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_ALL_ACCESSORIES,
      }),
    });

    const json = await response.json();
    console.log(json, "FETCH_ALL_ACCESSORIES")
    return json.data?.accessories || [];
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
    return [];
  }
};

module.exports = { fetchProductsForSitemap,fetchcategoryForSitemap,fetchsubcategoryForSitemap,fetchAccessoriesForSitemap };
