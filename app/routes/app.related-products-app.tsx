import { type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import { products } from "app/api/loaders/products"
import { singleProduct } from "app/api/loaders/singlepProduct"
import ModalContent from "app/components/ModalContent/ModalContent"
import { authenticate } from "app/shopify.server"
import { useState } from "react"

const loader = async ({ request }: LoaderFunctionArgs) => {
   return products(request, authenticate)
}
const action = async ({ request }: LoaderFunctionArgs) => {
    return singleProduct(request, authenticate)
}

export default function Products() {
    const products = useLoaderData<typeof loader>()
    // const singleProduct = useLoaderData<typeof action>()
    // console.log("singleProduct", singleProduct)

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