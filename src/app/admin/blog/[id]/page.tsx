'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import BlogEditor from '@/components/admin/BlogEditor';
import { Loader2 } from 'lucide-react';

export default function EditBlogPost({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
            setLoading(false);
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', color: '#64748B' }}>
            <Loader2 className="animate-spin" size={32} />
        </div>
    );

    if (!post) return <div style={{ padding: '2rem', textAlign: 'center' }}>Article non trouvé</div>;

    return <BlogEditor post={post} />;
}
