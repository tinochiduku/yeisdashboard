'use client'
import { Form } from "../ui/form"
import { useState } from "react"
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { submit } from "./on-submit";
import { FieldGenerator } from "./field-generator";
import { FieldConfig } from "./field-config";

export default function DynamicForm(
    {   
        id,
        edit,
        defaultValues,
        formConfig,
        pageTitle,
        apiBasePath,
        formSchema
    }
    :
    {   id?: string
        edit?: boolean
        defaultValues:any
        formConfig: FieldConfig[]
        pageTitle: string
        apiBasePath: string
        formSchema: any
    }
) {
    const [ loading, setLoading ] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

     async function onSubmit(values: z.infer<typeof formSchema>) {
                 
        await submit({
        values,
        id,
        edit,
        apiBasePath,
        messages: {
            editTitle: pageTitle,
            addTitle: pageTitle
        },
        onLoadingChange: setLoading
        });
    
    }

    return (
        <Form {...form}>
            <form className='space-y-8'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {
                        formConfig.map((config: FieldConfig) => (
                            <FieldGenerator
                                key={config.name}
                                config={config}
                                form={form}
                            />
                    ))}
                </div>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>{ pageTitle }</Button>
            </form>
        </Form>
    )
}