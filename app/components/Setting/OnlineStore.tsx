import { Card, Page } from "@shopify/polaris"

export default function OnlineStore() {
  
    return (
        <Page fullWidth>
            <Card padding={{ xs: "600" }}>
                <h1 className="sync-header">AJAX cart callback function (for developers)</h1>
                <p className="sync-description" style={{ marginTop: "20px"}}>Enter your code to trigger ajax cart</p>
                <button className="manage-languages">Save</button>
            </Card>
        </Page>

    )
}