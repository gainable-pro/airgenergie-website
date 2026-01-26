import type { Database } from '@/types/supabase';

// Helper types to bypass Supabase's strict typing issues
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Type-safe insert helper
export function createInsert<T extends keyof Database['public']['Tables']>(
    _table: T,
    data: Inserts<T>
): Inserts<T> {
    return data;
}

// Type-safe update helper
export function createUpdate<T extends keyof Database['public']['Tables']>(
    _table: T,
    data: Updates<T>
): Updates<T> {
    return data;
}
