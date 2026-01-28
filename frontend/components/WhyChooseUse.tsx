import { Button } from "./Button";
import { Card } from "./Card";
import Image from "next/image";

export default function WhyChooseUs(){
    return (
        <>
        <div className="mt-10 max-w-7xl bg-white mx-auto rounded-2xl">
            <div className="flex justify-center">
              <Button text="Why Choose Us" className="mt-16"/>
            </div>

            <div className="text-center mt-8">
                <h1 className="text-4xl">Why teams use SyncSpace</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-12">
                <Card className="mb-12" icon={<Image src="/centralizationIcon.png" 
                            alt="Centralized Communication"
                            width={368}
                            height={148} />} title="Centralizing communication" description="Bring all your team conversations into one unified platform." />

                            <Card className="mb-12" icon={<Image src="/Organising.png" 
                            alt="Organizing teams"
                            width={300}
                            height={148} />} title="Multi-workspace organization" description="Create dedicated spaces for different teams and projects to keep everything organized." />

                            <Card className="mb-12" icon={<Image src="/docs.png" 
                            alt="Organizing teams"
                            width={300}
                            height={148} />} title="Enterprise-grade documentation" description="Transform ideas into polished documents with advanced editing tools and seamless team workflows." />
            </div>
        </div>
        </>
    )
}