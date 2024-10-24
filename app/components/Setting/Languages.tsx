import { Card, Divider, Page } from "@shopify/polaris"
import { useNavigate } from "@remix-run/react"

export default function Languages() {
    const navigate = useNavigate()

    const hanleAction = (route: string) => {
        navigate(route)
    }
    return (
        <Page fullWidth>
            <Card padding={{ xs: "600" }}>
                <h1 className="sync-header">Multi-language translations</h1>
                <p className="sync-description">Customize text and translation for your related products.</p>
                <p className="sync-description" style={{ marginTop: "20px", paddingBottom: "15px" }}>English(en) - Default Language</p>
                <Divider borderColor="border" />
                <button className="manage-languages" onClick={() => hanleAction(`https://admin.shopify.com/store/abbos-dev/settings/languages`)}>Manage Language</button>
            </Card>
        </Page>

    )
}