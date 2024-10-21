import { type FC } from "react"
import { TitleBar, Modal } from "@shopify/app-bridge-react"
import { TextField, Checkbox, Thumbnail, Text } from "@shopify/polaris"
import ImageIcon from '../../assets/images/ImageIcon.svg'
import Loader from "../Spinners/Loader"

interface ModalProps {
    openModal: boolean
    checked: string[]
    handleChange: (newChecked: string) => void
    products: any
}

const ModalContent: FC<ModalProps> = ({ openModal, checked, handleChange, products }) => {
    
    return (
        <Modal open={openModal} id="my-modal">
            <TitleBar title="Select product">
                <button variant="primary" disabled={!checked.length}>Select</button>
                <button onClick={() => shopify.modal.hide('my-modal')}>Cancel</button>
            </TitleBar>
            <div className="modal-container">
                <div className="search-bar">
                    <TextField label="" placeholder="Search Products" onChange={() => { }} autoComplete="off" />
                </div>
                <div className="product-list">
                    {!products && <Loader />}
                    {products?.products?.map((product: any) =>
                        <div className="product-item" onClick={() => handleChange(product.node.id)}>
                            <Checkbox
                                label=""
                                checked={checked?.includes(product.node.id)}
                                onChange={() => handleChange(product.node.id)}
                            />
                            <Thumbnail
                                size="small"
                                source={ImageIcon}
                                alt=""
                            />
                            <Text variant="bodyMd" as="p">
                                {product.node.handle}
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
export default ModalContent