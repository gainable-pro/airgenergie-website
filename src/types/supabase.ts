export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            leads: {
                Row: {
                    id: number
                    created_at: string
                    full_name: string | null
                    email: string | null
                    phone: string | null
                    city: string | null
                    service_type: string | null
                    message: string | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    city?: string | null
                    service_type?: string | null
                    message?: string | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    city?: string | null
                    service_type?: string | null
                    message?: string | null
                    status?: string | null
                }
            }
            articles: {
                Row: {
                    id: number
                    created_at: string
                    title: string
                    slug: string
                    content: string | null
                    meta_title: string | null
                    meta_desc: string | null
                    city: string | null
                    category: string | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    title: string
                    slug: string
                    content?: string | null
                    meta_title?: string | null
                    meta_desc?: string | null
                    city?: string | null
                    category?: string | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    title?: string
                    slug?: string
                    content?: string | null
                    meta_title?: string | null
                    meta_desc?: string | null
                    city?: string | null
                    category?: string | null
                    status?: string | null
                }
            }
        }
    }
}
