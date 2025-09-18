import { toast } from 'sonner'

export const  getData = async ({ title, url}: {title: string, url: string}) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
            toast.success(`${title} Successful`)
        }

        return res.json()
    } catch (error) {
        toast.error(`${title} Failed`)
    } 
}

export const  postData = async ({ title, url, values }: {title: string, url: string, values: {}}) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })

        if (res.ok) {
            toast.success(`${title} Successful`)
        }

        return res.json()

    } catch (error) {
        toast.error(`${title} Failed`)
    } 
}

export const  putData = async ({ title, url, values }: {title: string, url: string, values: {}}) => {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })

        if (res.ok) {
            toast.success(`${title} Successful`)
        }

        return res.json()

    } catch (error) {
        toast.error(`${title} Failed`)
    } 
}

export const  deleteData = async ({ title, url, values }: {title: string, url: string, values: {}}) => {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })

        if (res.ok) {
            toast.success(`${title} Successful`)
        }

        return res.json()

    } catch (error) {
        toast.error(`${title} Failed`)
    } 
}
