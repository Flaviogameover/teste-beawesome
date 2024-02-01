'use client';
import { TitleHeader } from "@/components/TitleHeader";


const DashboardPage = () => {

    const action = () => {
        console.log('opa')
    }

    return (
        <div>
            <TitleHeader
                label="Painel"
                description="Gerencie suas matrizes"
            />
        </div>
    )

};


export default DashboardPage;