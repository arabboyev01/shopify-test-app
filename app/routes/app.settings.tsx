import { Frame, Navigation } from "@shopify/polaris"
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons'

export default function Settings() {
    return (
        <Frame>
            <Navigation location="/">
                <Navigation.Section
                    items={[
                        {
                            url: '#',
                            label: 'Home',
                            icon: HomeIcon,
                        },
                        {
                            url: '#',
                            excludePaths: ['#'],
                            label: 'Orders',
                            icon: OrderIcon,
                            badge: '15',
                        },
                        {
                            url: '#',
                            excludePaths: ['#'],
                            label: 'Products',
                            icon: ProductIcon,
                        },
                    ]}
                />
            </Navigation>
        </Frame>
    )
}