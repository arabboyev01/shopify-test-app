import { Spinner } from '@shopify/polaris'

function Loader() {
    return <div className="loader-wrapper">
        <Spinner accessibilityLabel="Spinner example" size="large" />
    </div>
}
export default Loader