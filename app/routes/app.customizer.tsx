import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Card, Text } from "@shopify/polaris"
import { productsSchema } from "app/api/schemas/schemas"
import { authenticate } from "app/shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const { admin } = await authenticate.admin(request)
        if (admin) {
            const response = await admin.graphql(productsSchema)
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`)
            }

            const data: any = await response.json()

            return json({ products: data?.data?.products?.edges })
        } else {
            throw new Error('Admin authentication failed.')
        }
    } catch (error: unknown) {
        return { error: (error as Error).message || "An unexpected error occurred." }
    }
}

export default function Customizer() {
    const products: any = useLoaderData<typeof loader>()
    return (
        <div className="customizer-container">
            <h1 className="header">Recommended Products</h1>
            <div className="cart-container">
                {products?.products?.map((product: any) => {
                    return (
                        <div className="cart-content">
                            <img src={product.node.media.edges[0].node.preview.image.url} alt="" width={244} height={300} />
                            <h2 >{product.node.handle}</h2>
                            <div className="price-container">
                                <p className="current-price">UZS {product.node.priceRangeV2.maxVariantPrice.amount}</p>
                                <p className="prev-price">
                                    <del>{product.node.compareAtPriceRange.maxVariantCompareAtPrice.amount}</del>
                                </p>
                            </div>
                            <button className="add-cart" disabled={product.node.hasOutOfStockVariants}> 
                                {product.node.hasOutOfStockVariants ? "Out of stock" : "Add to cart"}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}