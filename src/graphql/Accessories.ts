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
        colors
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
