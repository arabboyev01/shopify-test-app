import { Card } from "@shopify/polaris";

export default function Synchronize() {
    return (
        <Card >
            <h1 className="sync-header">Synchronize Related Products</h1>
            <p className="sync-description">We normally run synchronization every day to keep your related products up to date. However, you may want your changes appear immediately after products SEO update.</p>
            <button className="select-product">Synchronize</button>
        </Card >
    )
}