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
