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
      thickness
      FAQS
        boxCoverage
        featureImages
      category {
        id
        name
        RecallUrl
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

  posterImageUrl }
    }
  }
`;




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
      subcategories {
        id
        name
        custom_url
        posterImageUrl
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


