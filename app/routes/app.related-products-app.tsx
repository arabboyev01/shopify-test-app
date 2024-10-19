import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Page, Text } from "@shopify/polaris"
import ModalContent from "app/components/ModalContent/ModalContent"
import { authenticate } from "app/shopify.server"
import { useCallback, useState } from "react"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate.admin(request)
    console.log("Headers:", [...request.headers.entries()])
    const apiKey = request.headers.get('x-api-key')

    return json({ apiKey })

}


export default function Products() {
    const [openModal, setOpenModal] = useState(false)
    const [checked, setChecked] = useState(false)

    const data = useLoaderData<typeof loader>()
    console.log(data)

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const handleChange = useCallback(
        (newChecked: boolean) => setChecked(newChecked),
        [],
    )

    return (
        <div className="related-app-container">
            <Page title="Related Products" fullWidth>
                <div className="related-product-content">
                    <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="empty" width="128" height="128" />
                    <Text as="p" variant="bodyMd">You do not have any related products</Text>
                    <button onClick={handleOpenModal} className="select-product">Select your First Product </button>
                </div>
            </Page>
            <ModalContent openModal={openModal} checked={checked} handleChange={handleChange} setChecked={setChecked} />
        </div>
    )
}