import { type FC } from "react"
import { TitleBar, Modal } from "@shopify/app-bridge-react"
import { TextField, Checkbox, Thumbnail, Text } from "@shopify/polaris"
import Loader from "../Spinners/Loader"

interface ModalProps {
    checked: string
    handleChange: (newChecked: string) => void
    products: any
    handleSingleRequest: () => void
}

const ModalContent: FC<ModalProps> = ({ checked, handleChange, products, handleSingleRequest }) => {
    return (
        <Modal id="my-modal">
            <TitleBar title="Select product">
                <button variant="primary" disabled={!checked.length} onClick={handleSingleRequest}>Select</button>
                <button onClick={() => shopify.modal.hide('my-modal')}>Cancel</button>
            </TitleBar>
            <div className="modal-container">
                <div className="search-bar">
                    <TextField label="" placeholder="Search Products" onChange={() => { }} autoComplete="off" />
                </div>
                <div className="product-list">
                    {!products ? <Loader /> : (
                        products?.map((product: any) => {
                            const isActive = checked === product.node.id
                            const className = checked
                                ? isActive ? 'product-item' : 'product-item active'
                                : 'product-item';
                            return <div className={className} onClick={() => handleChange(product.node.id)} key={product.node.id}>
                                <Checkbox
                                    label=""
                                    checked={isActive}
                                    onChange={() => handleChange(product.node.id)}
                                />
                                <Thumbnail
                                    size="small"
                                    source={product.node.media.edges[0].node.preview.image.url}
                                    alt=""
                                />
                                <Text variant="bodyMd" as="p">
                                    {product.node.handle}
                                </Text>
                            </div>
                        })
                    )}
                </div>
            </div>
        </Modal>
    )
}
export default ModalContent