'use client';

import { LinkEditor } from '@/components/link-editor/LinkEditor';
import type { Link } from '@/types/types';

type Props = {
  initialLinks?: Link[];
};

export default function NewLinkPage({ initialLinks = [] }: Props) {
  const handleSave = (links: Link[]) => {
    // aqui POST/PUT para API
    console.log('links salvos', links);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      <div className='mt-8'>
        <h1 className="text-3xl font-bold mb-2">Criar novo grupo de links</h1>
        <p>Organize seus links em coleções e compartilhe tudo com o mundo.</p>
      </div>
      <LinkEditor initialLinks={initialLinks} onSave={handleSave} />
    </div>
  );
}
