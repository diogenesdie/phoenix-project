//Header component

import { useState } from "react";
import { Button } from 'primereact/button';
import { useOptionalUser } from '~/utils';
import { TabMenu } from 'primereact/tabmenu';
import PropTypes from 'prop-types';

interface AdminHeaderProps {
    onChooseTab: (tab: number) => void;
}

export default function AdminHeader(props: AdminHeaderProps) {
    const user = useOptionalUser()
    const [activeIndex, setActiveIndex] = useState(0);
    const itemsMenu = [
        {label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', slug: 'dashboard'},
        {label: 'Quadro', icon: 'pi pi-fw pi-map', slug: 'board'},
    ];
    
    return (
        <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between" aria-label="Tabs">
                <div className="flex space-x-4">
                    <p className="text-1xl font-semibold text-gray-900">Olá {user?.email}</p>
                </div>
                <div className="flex justify-between">
                    <TabMenu model={itemsMenu} activeIndex={activeIndex} onTabChange={(e) => {
                        setActiveIndex(e.index);
                        props.onChooseTab(e.index);
                    }}/>
                    <Button label="Ver Denúncias" icon="pi pi-volume-up" className="ml-auto" onClick={() => window.location.href = "/reports"} />
                </div>
            </nav>
        </div>
        </header>
    );
}
AdminHeader.PropTypes = {
    onChooseTab: PropTypes.func.isRequired,
}