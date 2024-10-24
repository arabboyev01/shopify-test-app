import type { LoaderFunction } from "@remix-run/node"
import { useEffect, useState } from "react"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import ModalContent from "app/components/ModalContent/ModalContent"
import { apiVersion, authenticate } from "app/shopify.server"
import { productsSchema, singleProductQuery } from "app/api/schemas/schemas"
import { useAppBridge } from "@shopify/app-bridge-react"

export const loader: LoaderFunction = async ({ request }) => {
    const { session, admin } = await authenticate.admin(request)
    const { shop, accessToken } = session
    const url = new URL(request.url)
    const checkedParam = url.searchParams.get('checked')
    try {

        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/graphql",
                "X-Shopify-Access-Token": accessToken!
            },
            body: productsSchema
        })

        let singleProductData = null

        if(checkedParam){
            const match = checkedParam.match(/(\d+)$/); // Matches digits at the end of the string
            const productId = match ? match[0] : null

            const singleProductResponse = await admin.rest.resources.Product.find({
                session: session,
                id: Number(productId) as number,
            })
            if (singleProductResponse){
                singleProductData = singleProductResponse
            }
        }

        if (response.ok){
            const data = await response.json()
            const { data: { products: { edges } }  } = data
            return { edges, singleProduct: singleProductData || null }
        }

        return null

    } catch (error: unknown) {
        return { error: (error as Error).message || "An unexpected error occurred." }
    }
}

export default function Products() {

    const products = useLoaderData<typeof loader>()

    const [singleProducts, setSingleProducts] = useState<any[]>([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

    const [checked, setChecked] = useState<string>('')

    const handleChange = (id: string) => {
        if (checked === id) {
            setChecked("")
        } else {
            setChecked(id)
        }
    }

    useEffect(() => {
        if (products?.singleProduct) {
            const productId = products.singleProduct.id

            if (!addedIds.has(productId)) {
                setSingleProducts((prev) => [products.singleProduct]);
                setAddedIds((prev) => new Set(prev).add(productId))
                
            } else {
                console.log(`Product with ID ${productId} already added.`)
                setSingleProducts([products.singleProduct])
            }
        }
    }, [products])

    const handleSingleRequest = () => {
        setSearchParams({ checked })
        shopify.modal.hide('my-modal')
    }

    console.log(singleProducts)

    return (
        <div className="related-app-container">
            <Page title="Related Products" fullWidth>
                <div className="related-product-content">
                    <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="empty" width="128" height="128" />
                    <Text as="p" variant="bodyLg">You do not have any related products</Text>
                    <button onClick={() => shopify.modal.show('my-modal')} className="select-product">Select your First Product </button>
                </div>
            </Page>
            <ModalContent 
                checked={checked} 
                handleChange={handleChange} 
                products={products?.edges}
                handleSingleRequest={handleSingleRequest}
            />
        </div>
    )
}