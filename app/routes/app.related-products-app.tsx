import { Modal, TitleBar } from "@shopify/app-bridge-react"
import { Page, TextField } from "@shopify/polaris"
import { useState } from "react"

export default function Products() {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <div className="related-app-container">
            <Page title="Related Products" fullWidth>
                <div className="relaated-product-content">
                    <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="empty" width="128" height="128" />
                    <p className="paragraph">You do not have any related products</p>
                    <button onClick={handleOpenModal} className="select-product">Select your First Product </button>
                </div>

                <Modal open={openModal} id="my-modal">
                    <TitleBar title="Select product">
                    <button variant="primary" disabled>Select</button>
                    <button onClick={() => shopify.modal.hide('my-modal')}>Cancel</button>
                    </TitleBar>
                    <div className="modal-container">
                        <TextField label="" placeholder="Search Products" onChange={() => {}} autoComplete="off" />
                            <div className="product-list"></div>
                    </div>
                </Modal>
            </Page>
        </div>
    )
}