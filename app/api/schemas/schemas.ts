export const productsSchema = `
#graphql
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          hasOutOfStockVariants
          priceRangeV2{
            maxVariantPrice{
              amount
            }
          }
          compareAtPriceRange{
            maxVariantCompareAtPrice{
              amount
            }
          }
          media(first: 1){
            edges {
              node {
              id
              preview {
                image {
                    id
                    url
                  }
              }
            }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
}`

export const singleProductQuery = `
#graphql
query getProductById($id: ID!) {
  product(id: $id) {
    id
    title
    handle
    descriptionHtml
  }
}
`;
