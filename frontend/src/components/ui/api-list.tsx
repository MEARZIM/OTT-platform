"use client"

import { ApiAlert } from "./api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList = ({
    entityName,
    entityIdName
}: ApiListProps) => {
    const origin = import.meta.env.VITE_BACKEND_URL;;

    const baseUrl = `${origin}/api`;

    return (
        <>
            <ApiAlert
                title={"GET"}
                description={`${baseUrl}/${entityName}`}
                variant={"public"}
            />

            <ApiAlert
                title={"GET"}
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant={"public"}
            />

            <ApiAlert
                title={"POST"}
                description={`${baseUrl}/${entityName}`}
                variant={"superAdmin"}
            />

            <ApiAlert
                title={"PATCH"}
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant={"superAdmin"}
            />

            <ApiAlert
                title={"DELETE"}
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant={"superAdmin"}
            />
        </>
    )
}