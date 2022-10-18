//Header component

import { useState } from "react";
import { Button } from 'primereact/button';
import { useOptionalUser } from '~/utils';
import { TabMenu } from 'primereact/tabmenu';

export default function AdminHeader() {
    const user = useOptionalUser();

    const [activeIndex, setActiveIndex] = useState(0);

    const itemsMenu = [
        {label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar'},
        {label: 'Quadro', icon: 'pi pi-fw pi-map'}
    ];
     
    return (
        <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between" aria-label="Tabs">
                <TabMenu model={itemsMenu} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
                <Button label="Ver Denúncias" icon="pi pi-volume-up" className="ml-auto" onClick={() => window.location.href = "/reports"} />
            </nav>
        </div>
        </header>
    );
}