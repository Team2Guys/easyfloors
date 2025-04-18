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
      colors
      thickness
      sizes
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
        stock
        posterImageUrl
        sizes
        featureImages
        productImages
      }
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
        stock
        discountPrice
        custom_url
        posterImageUrl
        hoverImageUrl
        productImages
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
      price
        recalledSubCats {
            id
            name
            custom_url
            sizes
              category {
                RecallUrl
            }
                
        }
      subcategories {
        id
        name
        posterImageUrl
        custom_url
        description
        sizes
        BannerImage
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
        productImages
        custom_url
        waterproof
        plankWidth
        colorCode
        colors
        ResidentialWarranty
        CommmericallWarranty
        thickness
        boxCoverage
        sizes
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
           category {
                RecallUrl
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
      whatAmiImageBanner
      homePageImage
      Heading
      BannerImage
      price
      sizes
      whatIamEndpoint
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

export const FETCH_ALL_WHAT_AM_I = gql`
  query SubCategories {
    subCategories {
      id
      name
      whatAmiImage
      whatamIdetails
      whatAmiTopHeading
      whatAmiImageBanner
      homePageImage
      whatIamEndpoint    
    }
  }
`;




export const FETCH_ALL_APPOINTMENTS = gql`
  query appointments {
    appointments {
      firstname
      email
      phoneNumber
      whatsappNumber
      area
      selectRooms
      preferredTime
      findUs
      comment
      contactMethod
      preferredDate
      AppointsType
    }
  }
`;

export const FETCH_ALL_ORDERS = gql`
query AllOrders {
    AllOrders {
        firstName
        lastName
        email
        country
        city
        address
        note
        phone
        emirate
        orderId
        transactionDate
        shipmentFee
        totalPrice
        checkout
        paymentStatus
        isRefund
        success
        pending
        currency
        is3DSecure
        checkoutDate
        shippingMethod
        products {
            id
            name
            price
            stock
            image
            subcategories
            category
            boxCoverage
            totalPrice
            pricePerBox
            squareMeter
            requiredBoxes
        }
    }
}
`

export const GET_ORDER_HISTORY = gql`
query UsersOrders($email: String!) {
    usersOrders(email: $email) {
        firstName
        lastName
        email
        country
        city
        address
        note
        phone
        emirate
        orderId
        transactionDate
        shipmentFee
        totalPrice
        pay_methodType
        paymethod_sub_type
        cardLastDigits
        checkout
        paymentStatus
        isRefund
        success
        pending
        currency
        is3DSecure
        checkoutDate
        shippingMethod
        products {
            id
            name
            price
            stock
            image
            subcategories
            category
            boxCoverage
            totalPrice
            pricePerBox
            squareMeter
            requiredBoxes
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
`;
export const FETCH_HEADER_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      custom_url
      RecallUrl
      price
        accessories {
      id
      name
      custom_url 
      posterImageUrl
      }
      subcategories {
        id
        name
        custom_url
        posterImageUrl
        price
        sizes
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
             sizes
              price
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
      price
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
              sizes
        }
  }}

`

export const FIND_ONE_SUB_CATEGORY = gql`
query SubCategory($customUrl: String!, $category: String!) {
  subCategory(customUrl: $customUrl, category: $category) {
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
  product(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
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

export const FIND_QUICK_VIEW_PRODUCT = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!, $acessories: Boolean!) {
  product(custom_url: $custom_url, category:$category,subCategory:$subCategory , acessories:$acessories) {
    id
    name
    price
    discountPrice
    description
    stock
    posterImageUrl
    hoverImageUrl
    productImages
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
    sizes
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
}

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

export const GET_ALL_RECORDS = gql`
  query GET_ALL_RECORDS {
    GET_ALL_RECORDS {
    totalSubCategories
        totalProducts
        totalCategories
        totalAdmins
        totalRevenue
        totalSales
        totalUsers
        Total_abandant_order
    }
  }
`;



export const FIND_ONE_USER = gql`
  query FindOne($email: String!) {
    find_one(email: $email) {
      id
      name
      email
      token
      userImageUrl
    }
  }
`;