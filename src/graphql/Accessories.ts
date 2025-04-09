import { gql } from "@apollo/client";

export const FETCH_ALL_ACCESSORIES = gql`
  query Accessories {
    accessories {
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
        AdditionalInformation
        FAQS
        boxCoverage
        featureImages
        sizes
      category {
        id
        name
        custom_url
        description
      }
      products {
        id
        name
        colors
      }
    }
  }
`;

export const UPDATE_ACCESSORY_MUTATION = gql`
  mutation UpdateAccessory($input: UpdateAccessoryInput!) {
    updateAccessory(updateAccessoryInput: $input) {
      id
      name
    }
  }
`;
