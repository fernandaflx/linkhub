'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Link, Platform } from '@/types/types';
import { SortableTable } from './SortableTable';

type LinkEditorProps = {
  initialLinks?: Link[];
  onSave: (links: Link[]) => void;
};

export function LinkEditor({ initialLinks = [], onSave }: LinkEditorProps) {
  const [localLinks, setLocalLinks] = useState<Link[]>(initialLinks);
  const [isSaving, setIsSaving] = useState(false);
  const [autoOpenId, setAutoOpenId] = useState<string | null>(null);

  const handleAddLink = () => {
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      platform: Platform.GITHUB,
      url: '',
    };
    setLocalLinks((prev) => [...prev, newLink]);
    setAutoOpenId(newLink.id);
  };

  const handleRemoveLink = (id: string) => {
    setLocalLinks((prev) => prev.filter((l) => l.id !== id));
    if (autoOpenId === id) setAutoOpenId(null);
  };

  const handleUpdateLink = (id: string, values: { type: string; url: string }) => {
    setAutoOpenId(null);
    setLocalLinks((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, platform: values.type as Platform, url: values.url }
          : l,
      ),
    );
  };

  const handleChangeOrder = (ordered: Link[]) => {
    setLocalLinks(ordered);
  };

  const hasValidLink = useMemo(
    () =>
      localLinks.length > 0 &&
      localLinks.every(
        (link) => link.platform && link.url.trim().length > 0,
      ),
    [localLinks],
  );

  const handleSave = () => {
    if (!hasValidLink) return;
    setIsSaving(true);
    setTimeout(() => {
      onSave(localLinks);
      setIsSaving(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  return (
    <div className="w-full bg-card rounded-lg border my-8">
      <div className="p-6 md:p-10">
        <button
          onClick={handleAddLink}
          className="w-full group relative flex items-center justify-center gap-2 h-14 border-2 border-dashed border-primary/30 rounded-sm bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all mb-8"
        >
          <span className="text-card bg-primary group-hover:scale-110 transition-transform rounded-full p-1">
            <Plus />
          </span>
          <span className="text-primary font-bold">Adicionar link</span>
        </button>

        <SortableTable
          links={localLinks}
          onChangeOrder={handleChangeOrder}
          onUpdateLink={handleUpdateLink}
          onRemoveLink={handleRemoveLink}
          autoOpenId={autoOpenId}
        />

        {hasValidLink && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save links'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
