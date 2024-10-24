import { Card, Divider, Frame, Icon } from "@shopify/polaris"
import Synchronize from "app/components/Setting/Synchronize"
import { settingSidebar } from "app/statics/setting"
import { useState } from "react"

export default function Settings() {
    const [active, setActive] = useState(0)
    return (
        <div className="setting-container">
            <div className="sidebar">
                {settingSidebar.map(({ id, name, icon }) => {
                    return (
                    <div className={`sidebar-item ${active === id && "active-sidebar"}`} key={id} onClick={() => setActive(id)}>
                            {active === id ? <div className="left-stick"></div>: <div></div>}
                            <div className={`item ${active === id && "active-item"}`}>
                                <Icon
                                    source={icon}
                                    tone="textSuccess"
                                />
                                <p className={`item-name ${active === id && "active-name"}`}>{name}</p>
                        </div>
                    </div>
                )
                })}
            </div>
            <div className="sidebar-content">
                {active === 0 && <Synchronize />}
            </div>
        </div>
    )
}