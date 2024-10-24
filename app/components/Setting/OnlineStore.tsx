import { Card, Page } from "@shopify/polaris"
import { TextField } from '@shopify/polaris'

export default function OnlineStore() {

    return (
        <Page fullWidth>
            <Card padding={{ xs: "600" }}>
                <h1 className="sync-header">AJAX cart callback function (for developers)</h1>
                <div className="text-field">
                    <TextField
                        label="Enter your code to trigger ajax cart"
                        value={""}
                        onChange={console.log}
                        multiline={6}
                        autoComplete="off"
                    />
                </div>
                <button className="select-product">Save</button>
            </Card>
        </Page>

    )
}