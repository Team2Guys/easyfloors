import { gql } from '@apollo/client';


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
    colors
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
     category {
            id
            name
}
            subcategory {
            id
            name
            }
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
        subcategories {
            id
            name
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
            colors
            custom_url
            waterproof
            plankWidth
            ResidentialWarranty
            CommmericallWarranty
            thickness
        }
    }
}`
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
            colors
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
            categoryId
        }
        category {
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
            short_description
        }
    }
}

    `


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
`