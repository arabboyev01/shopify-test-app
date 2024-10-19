import { type FC } from "react"
import { TitleBar, Modal } from "@shopify/app-bridge-react"
import { TextField, Checkbox, Thumbnail, Text } from "@shopify/polaris"
import ImageIcon from '../../assets/images/ImageIcon.svg'

interface ModalProps {
    openModal: boolean
    checked: boolean
    handleChange: (newChecked: boolean) => void
    setChecked: (newChecked: boolean) => void
}

const ModalContent: FC<ModalProps> = ({ openModal, checked, handleChange, setChecked }) => {

    const handleItemClick = () => {
        setChecked(!checked)
    }
    return (
        <Modal open={openModal} id="my-modal">
            <TitleBar title="Select product">
                <button variant="primary" disabled>Select</button>
                <button onClick={() => shopify.modal.hide('my-modal')}>Cancel</button>
            </TitleBar>
            <div className="modal-container">
                <div className="search-bar">
                    <TextField label="" placeholder="Search Products" onChange={() => { }} autoComplete="off" />
                </div>
                <div className="product-list">
                    <div className="product-item" onClick={handleItemClick}>
                        <Checkbox
                            label=""
                            checked={checked}
                            onChange={handleChange}
                        />
                        <Thumbnail
                            size="small"
                            source={ImageIcon}
                            alt=""
                        />
                        <Text variant="bodyMd" as="p">
                            T-Shirt
                        </Text>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ModalContent