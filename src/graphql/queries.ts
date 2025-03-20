import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      price
      discountPrice
      description
      stock
      posterImageUrl
      hoverImageUrl
      productImages
      createdAt
      updatedAt
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
      waterproof
      AdditionalInformation
      plankWidth
      ResidentialWarranty
      CommmericallWarranty
      colorCode
      thickness
      FAQS
        boxCoverage
        featureImages
      category {
        id
        name
        RecallUrl
        custom_url
      }
      subcategory {
        id
        name
        custom_url
      }
       acessories {
  id
   name
   price
   discountPrice
   custom_url

  posterImageUrl }
    }
  }
`;
export const FETCH_HEADER_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      price
      discountPrice
      description
      stock
      posterImageUrl
      custom_url
      category {
        id
        name
        RecallUrl
        custom_url
      }
      subcategory {
        id
        name
        custom_url
      }
       acessories {
        id
        name
        price
        discountPrice
        custom_url

        posterImageUrl
         }
          }
        }`;


export const FETCH_ALL_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      description
      posterImageUrl
      createdAt
      updatedAt
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
      Recall_Cat
      whatAmiImageBanner
      topHeading
      RecallUrl
        recalledSubCats {
            id
            name
            custom_url
              category {
                RecallUrl
            }
        }
      subcategories {
        id
        name
        posterImageUrl
        custom_url
      }
      products {
        id
        name
        price
        discountPrice
        description
        stock
        posterImageUrl
        hoverImageUrl
        custom_url
        waterproof
        plankWidth
        colorCode
        ResidentialWarranty
        CommmericallWarranty
        thickness
        subcategory {
          id
          name
          custom_url
        }
          
      }
    }
  }
`;
export const FETCH_ALL_SUB_CATEGORIES = gql`
  query SubCategories {
    subCategories {
      id
      name
      description
      posterImageUrl
      createdAt
      updatedAt
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
      Recall_subCat
      short_description
      whatAmiImage
      whatamIdetails
      whatAmiTopHeading
      whatAmiImage
      whatAmiImageBanner
      homePageImage
      Heading
      BannerImage

      products {
        id
        name
      }
      category {
        id
        name

      }
        recalledByCategories{
            id
            name
              RecallUrl
        }
    }
  }
`;
export const GET_ADMIN_DETAILS = gql`
  query GetAdmin {
    admin {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_ALL_ADMINS = gql`
  query Admins {
    admins {
      id
      fullname
      email
      password
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
      role
    }
  }
`;
export const FETCH_HEADER_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      custom_url
      RecallUrl
        accessories {
      id
      name
      custom_url 
      }
      subcategories {
        id
        name
        custom_url
        posterImageUrl
      }
         products {
        id
        name
        price
        discountPrice
        stock
        posterImageUrl

      }
       recalledSubCats {
            id
            name
            custom_url
              posterImageUrl
              category {
                RecallUrl
                
            }
      }
      }
    }
`;
export const FETCHSUBCAT = gql`
  query SubCategories {
    subCategories {
      id
      name
      posterImageUrl
      custom_url
      products {
        id
        name
      }
      category {
        id
        name
        custom_url
        RecallUrl
      }
    }
  }
`;

export const FIND_ONE_CATEGORY = gql`
query GetCategory($customUrl: String!) {
  category(customUrl: $customUrl) {
    id
    name
         Canonical_Tag
        Meta_Description
        Meta_Title
            posterImageUrl
            custom_url
  }}

`

export const FIND_ONE_Accessory = gql`
 query GetCategory($customUrl: String!, $accessoryFlag: Boolean) {
    category(customUrl: $customUrl, accessoryFlag: $accessoryFlag) {
   id
        name
        description
        Meta_Title
        Canonical_Tag
        whatAmiImageBanner
        accessories {
            id
            name
            price
            discountPrice
            stock
            posterImageUrl
            custom_url
        }
  }}

`

export const FIND_ONE_SUB_CATEGORY = gql`
query SubCategory($customUrl: String!) {
  subCategory(customUrl: $customUrl) {
    id
    name
         Canonical_Tag
        Meta_Description
        Meta_Title
            posterImageUrl
            custom_url
              category {
            custom_url
        }
  }}

`



export const FIND_ONE_PRODUCT = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  product(custom_url: $custom_url, ,category:$category,subCategory:$subCategory) {
    id
    name
        posterImageUrl
        Meta_Title
        Meta_Description
        Canonical_Tag

          category {
            RecallUrl
        }
        subcategory {
            custom_url
        }
  }}

`


export const GET_ADMIN_DATA = gql`
  query Admin {
    admin {
    id
        fullname
        email
        canAddProduct
        canEditProduct
        canDeleteProduct
        canAddCategory
        canDeleteCategory
        canEditCategory
        canCheckProfit
        canCheckRevenue
        canCheckVisitors
        canViewUsers
        canViewSales
        canVeiwAdmins
        canVeiwTotalproducts
        canVeiwTotalCategories
        posterImageUrl
        role
    }
  }
`;
