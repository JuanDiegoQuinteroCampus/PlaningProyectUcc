import HeaderModule from "@/Components/HeaderModule";
import InputSearch from "@/Components/InputSearch";
import DataTable from "@/Components/DataTable";
import { getApi } from "@/utils/generalFunctions";
import { useState, useEffect } from "react";
import StatusBadge from "@/Components/StatusBadge";
import UserForm from "@/Pages/UsersRoleManagement/UserForm";
import { Pencil, Trash2, UserX } from "lucide-react";
const columns = [
    { title: "Nombre", key: "nombreCompleto" },
    { title: "Email", key: "email" },
    {
        title: "Rol",
        key: "roles",
        render: (value) => value?.[0]?.nombre || "Sin rol",
    },
    {
        title: "Estado",
        key: "estado",
        render: (value) => <StatusBadge status={value} />,
    },
    { title: "Último Acceso", key: "ultimoAcceso" },
];


export default function PrincipalUser() {
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    function handleEdit(row) {
        console.log(row);
        setSelectedUser(row);  
        setShowForm(true);   
    }
    
    function handleDeactivate(row) {
        console.log("Desactivando", row);
    }
    
    function handleDelete(row) {
        console.log("Eliminando", row);
    }

    const api = getApi();
    console.log(data);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/user");
                const transformed = response.data.map((user) => ({
                    ...user,
                    rol:
                        user.roles.length > 0
                            ? user.roles.map((r) => r.name).join(", ")
                            : "Sin rol",
                }));
                setData(transformed);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <HeaderModule
                        title="Gestión de Usuarios"
                        description="Añadir, editar o eliminar usuarios del sistema"
                        buttonText="Añadir Nuevo Usuario"
                        onClick={() => setShowForm(true)}
                        showButton={!showForm}
                    />
                    {!showForm ? (
                        <div className="space-y-4">
                            <InputSearch
                                onSearchChange={(val) =>
                                    console.log("Valor desde el padre:", val)
                                }
                            />
                            {loading ? (
                                <p className="text-center text-gray-500">
                                    Cargando usuarios...
                                </p>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    rowActions={(row) => {
                                        const actions = [
                                            {
                                                icon: Pencil,
                                                label: "Editar",
                                                onClick: () => handleEdit(row),
                                            },
                                        ];

                                        if (row.estado === "activo") {
                                            actions.push({
                                                icon: UserX,
                                                label: "Desactivar",
                                                onClick: () =>
                                                    handleDeactivate(row),
                                            });
                                        }

                                        actions.push({
                                            icon: Trash2,
                                            label: "Eliminar",
                                            onClick: () => handleDelete(row),
                                            danger: true,
                                        });

                                        return actions;
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <>
                            <UserForm
                                onCancel={() => {
                                    setShowForm(false);
                                    setSelectedUser(null);
                                }}
                                initialData={selectedUser}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
