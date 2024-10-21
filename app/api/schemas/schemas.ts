export const productsSchema = `
#graphql
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          media(first: 1){
            edges {
              node {
              id
              preview {
                image {
                    id
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