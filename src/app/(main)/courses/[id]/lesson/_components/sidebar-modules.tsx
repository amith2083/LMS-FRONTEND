"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  import { CheckCircle } from "lucide-react";
  import { PlayCircle } from "lucide-react";
  import { Lock } from "lucide-react";
  import Link from "next/link";
import { SidebarLessons } from "./sidebar-lessons";
import { useSearchParams } from "next/navigation";

export const SidebarModules = ({modules,courseId}) => {
    const seachParams = useSearchParams
    ();

  const allModules= modules.sort((a,b)=>a.order-b.order)
   const query = seachParams.get('name');

     const expandModule = allModules.find((module) => {
    return module.lessonIds.find((lesson) => {
      return lesson.slug === query;
    });
  });

  const exapndModuleId = expandModule?.id ?? allModules[0].id;

   

    return (
        <Accordion
        defaultValue={exapndModuleId}
        type="single"
        collapsible
        className="w-full px-6"
      >
        {/* item */}
        {allModules.map((module)=>
         <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger>{module.title} </AccordionTrigger>

          <SidebarLessons courseId={courseId} lessons={module.lessonIds} module={module.slug}/>

        </AccordionItem>)
       
}
        {/* item ends */}

        
      </Accordion>
    )
    
}