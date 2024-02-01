import { Button } from "@/components/ui/button";

const MainLayout = ({children}:{children:React.ReactNode}) => {


    return (
        <>
            <div
                className="p-2 px-10 flex justify-between items-center bg-muted-foreground"  
            >
                <h1>Home</h1>
                <Button size={'sm'} variant={"ghost"}>Sair</Button>
            </div>
            <div className="p-10">
            {children}
            </div>
        </>
    )

}

export default MainLayout;