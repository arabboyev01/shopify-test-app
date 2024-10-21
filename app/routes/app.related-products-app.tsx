import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import { productsSchema } from "app/api/schemas/schemas"
import ModalContent from "app/components/ModalContent/ModalContent"
import { authenticate } from "app/shopify.server"
import { useState } from "react"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const { admin } = await authenticate.admin(request)
        if (admin) {
            const response = await admin.graphql(productsSchema)
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`)
            }

            const data: any = await response.json()

            return { products: data?.data?.products?.edges }
        } else {
            throw new Error('Admin authentication failed.')
        }
    } catch (error: unknown) {
        return { error: (error as Error).message || "An unexpected error occurred." }
    }
}

export default function Products() {
    const products = useLoaderData<typeof loader>()

    const [openModal, setOpenModal] = useState(false)
    const [checked, setChecked] = useState<string[]>([])

    const handleOpenModal = () => setOpenModal(!openModal)

    const handleChange = (id: string) => {
        if (checked.includes(id)) {
            setChecked(checked.filter(checkedId => checkedId !== id))
        } else {
            setChecked([...checked, id])
        }
    }

    return (
        <div className="related-app-container">
            <Page title="Related Products" fullWidth>
                <div className="related-product-content">
                    <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="empty" width="128" height="128" />
                    <Text as="p" variant="bodyMd">You do not have any related products</Text>
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