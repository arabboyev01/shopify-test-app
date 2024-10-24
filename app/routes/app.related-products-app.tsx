import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useState } from "react"
import { useLoaderData } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import ModalContent from "app/components/ModalContent/ModalContent"
import { authenticate } from "app/shopify.server"
import { productsSchema } from "app/api/schemas/schemas"

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

export default function Products() {

    const products = useLoaderData<typeof loader>()

    const [checked, setChecked] = useState<string>('')

    const handleChange = (id: string) => {
        if (checked === id) {
            setChecked("")
        } else {
            setChecked(id)
        }
    }


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
                products={products}
            />
        </div>
    )
}