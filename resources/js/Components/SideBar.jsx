import React from 'react';
import OptionSideBar from '@/Components/OptionSideBar';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    MapPin, Users, BookOpen, Settings, Building,
    Briefcase, Calendar, Layers, Clock, SendToBack,
    LayoutGrid, UserRoundCheck
} from 'lucide-react';

const sections = [
    {
        title: 'Administración',
        basePath: '/admin/city',
        options: [
            { text: 'Usuarios y Roles', icon: Users, to: '/admin/users' },
            { text: 'Gestión de Ciudades', icon: MapPin },
            { text: 'Sedes y Entidades', icon: Building },
            { text: 'Especialidad y Profesionales', icon: Briefcase },
            { text: 'Gestión Diaria', icon: Calendar },
            { text: 'Gestión por Lotes', icon: Layers },
            { text: 'Gestión de Programas', icon: BookOpen },
            { text: 'Gestión de slots', icon: Clock },
            { text: 'Gestión de Procesos', icon: SendToBack },
            { text: 'Gestión de Aula', icon: LayoutGrid },
        ],
    },
    {
        title: 'Cursos',
        basePath: '/courses/create',
        options: [
            { text: 'Gestión de Cursos', icon: BookOpen, to: '/courses' },
            { text: 'Misión Profesional', icon: UserRoundCheck },
            { text: 'Gestión del Dia del Curso', icon: Calendar },
        ],
    },
    {
        title: 'Sistema',
        basePath: '/courses/create',
        options: [
            { text: 'Ajustes', icon: Settings },
        ],
    },
];

export default function SideBar({ isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                />
            )}

            <aside className={`
                fixed top-0 left-0 h-full md:h-auto w-64 bg-white shadow-lg z-40
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:block
                `}>
                <div className="h-full  p-4 overflow-y-auto scroll-smooth">
                    <div className="md:hidden flex justify-between items-center mb-6 flex-col gap-2">
                        <ApplicationLogo textColor="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent" />
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">✕</button>
                    </div>

                    <nav className="space-y-6 h-full ">
                        {sections.map(({ title, options, basePath }, i) => (
                            <div key={i}>
                                <h3 className="text-xs font-semibold text-gray-600 px-2 mb-1 uppercase">{title}</h3>
                                <ul className="space-y-1">
                                    {options.map(({ text, icon, to }, j) => (
                                        <OptionSideBar
                                            key={j}
                                            icon={icon}
                                            text={text}
                                            to={to || basePath}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}
