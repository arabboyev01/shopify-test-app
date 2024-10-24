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

export const singleProductQuery = (id: string) => {
  return`
    #graphql
      query {
        product(id: ${id}) {
          id
          handle
          media(first: 1) {
            nodes{
              preview{
                image {
                  url
                }
              }
            }
          }
        }
      }
  `
}
