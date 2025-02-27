
export const FETCH_ALL_PRODUCTS = `
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
}
}

`;

export const FETCH_ALL_CATEGORIES = `
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
    }
}`