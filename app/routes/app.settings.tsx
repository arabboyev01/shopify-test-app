import { Frame, Icon } from "@shopify/polaris"
import { settingSidebar } from "app/statics/setting"

export default function Settings() {
    return (
        <div className="setting-container">
            <div className="sidebar">
                {settingSidebar.map(({ id, name, icon }) => {
                    return (
                    <div className="sidebar-item" key={id}>
                        <div className="left-stick"></div>
                        <div className="item">
                                <Icon
                                    source={icon}
                                    tone="base"
                                />
                            <p className="item-name">{name}</p>
                        </div>
                    </div>
                )
                })}
            </div>
        </div>
    )
}