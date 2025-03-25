import { gql } from '@apollo/client';

export const FILE_UPLOAD_MUTATION = `
  mutation UploadFile($file: Upload!) {
    createFileUploading(file: $file) {
     imageUrl
     public_id
    }
  }
`;



export const FILE_DELETION_MUTATION = `
          mutation DeleteImage($public_id: String!) {
            DeleteImage(RemoveUImage: { public_id: $public_id })
          }
        `


export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
      Recall_Cat
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
      Recall_Cat
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export const REMOVE_ACCESSORY = gql`
  mutation RemoveAccessory($id: Int!) {
    removeAccessory(id: $id) {
      id
    }
  }
`;


export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubCategory($input: CreateSubCategoryInput!) {
    createSubCategory(createSubCategoryInput: $input) {
      id
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubCategory($input: UpdateSubCategoryInput!) {
    updateSubCategory(updateSubCategoryInput: $input) {
      id
    }
  }
`;


export const REMOVE_SUBCATEGORY = gql`
  mutation RemoveSubCategory($id: Int!) {
    removeSubCategory(id: $id) {
      id
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`;




export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(AdminLogin: { email: $email, password: $password }) {
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
      token
    }
  }
`;
export const super_admin_ADMIN_LOGIN = gql`
  mutation superAdminLogin($email: String!, $password: String!) {
    superAdminLogin(superAdminLogin: { email: $email, password: $password }) {
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
      token
    }
  }
`;



export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(updateProductInput: $input) {
    id
    name
  }
}
`;

export const CREATE_PRODUCT = gql`
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
    id
    name
  }
}
`;

export const CREATE_ACCESSORIES = gql`
mutation Add_Accessories($input: CreateAccessoryInput!) {
  add_Accessories(createAccessoryInput: $input) {
    id
    name
  }
}

`
;

export const CREATE_APPOINTMENT = gql`
mutation Created_appointments($input: CreateAppointmentInput!) {
    Created_appointments( createAppointmentInput: $input ) {
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
    }
}
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($input: UpdateAdminInput!) {
    updateAdmin(updateAdminInput: $input) {
      id
      fullname
      email
      role
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
    }
  }
`;


export const CREATE_ADMIN = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(createAdminInput: $input) {
      id
      fullname
      email
      role
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
    }
      
  }
`;



export const CONTACT_US_EMAIL_MUTATION = gql`
  mutation ContactEmail($contactUsEmail: contactUsEmailInput!) {
    Contact_email(contactUsEmail: $contactUsEmail) {
      message
    }
  }
`;


export const INITIATE_PAYMENT = gql`
mutation CreateSalesProduct($createSalesProductInput: CreateOrderInput!) {
  createSalesProduct(createSalesProductInput: $createSalesProductInput) {
    paymentKey
  }
}`
