'use client';
import { LinkEditor } from '@/components/link-editor/LinkEditor';
import type { Link } from '@/types/types';
import type { LinkGroupFormState } from '@/components/link-editor/LinkEditor';
import { createLinkGroup } from '@/lib/link-groups';
import { auth } from "@/lib/firebase";

type Props = {
  links?: Link[];
};

export default function NewLinkPage({ links = [] }: Props) {

  const handleSave = async (data: LinkGroupFormState) => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const userId = user.uid;
    await createLinkGroup(userId, data);
  };



  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      <div className='mt-8'>
        <h1 className="text-3xl font-bold mb-2">Criar novo grupo de links</h1>
        <p>Organize seus links em coleções e compartilhe tudo com o mundo.</p>
      </div>
      <LinkEditor
        links={links}
        onSave={handleSave} />
    </div>
  );
}
