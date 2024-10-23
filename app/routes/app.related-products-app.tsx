import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useCallback, useEffect, useState } from "react"
import { useLoaderData } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import ModalContent from "app/components/ModalContent/ModalContent"
import shopify, { authenticate } from "app/shopify.server"
import { productsSchema } from "app/api/schemas/schemas"
import { useAppBridge } from "@shopify/app-bridge-react"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    console.log(shopify)
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

    const shopify = useAppBridge()

    const products = useLoaderData<typeof loader>()
    console.log(products)

    const [openModal, setOpenModal] = useState(false)
    const [checked, setChecked] = useState<string>('')

    const handleOpenModal = () => setOpenModal(!openModal)

    const handleChange = (id: string) => {
        if (checked === id) {
            setChecked("")
        } else {
            setChecked(id)
        }
    }

    const getSingleProduct = useCallback(async () => {
        const res = await fetch(`https://${shopify.config.shop}/admin/api/2024-10/graphql.json`, {
            method: 'GET',
        });
        const { data } = await res.json();
        console.log(data);
    }, [shopify])

    useEffect(() => {
        getSingleProduct()
    }, [getSingleProduct])

    return (
        <div className="related-app-container">
            <Page title="Related Products" fullWidth>
                <div className="related-product-content">
                    <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="empty" width="128" height="128" />
                    <Text as="p" variant="bodyLg">You do not have any related products</Text>
                    <button onClick={handleOpenModal} className="select-product">Select your First Product </button>
                </div>
            </Page>
            <ModalContent 
                openModal={openModal} 
                checked={checked} 
                handleChange={handleChange} 
                products={products}
            />
        </div>
    )
}