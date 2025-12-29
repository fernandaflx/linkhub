'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Link, Platform } from '@/types/types';
import { SortableTable } from './SortableTable';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Button } from '../ui/button';
import { GroupCategories, GroupCategoriesValue } from './group-categories';



export type LinkGroupFormState = {
  linkTitle: string;
  linkCategory: GroupCategoriesValue | "";
  links: Link[];
};

type LinkEditorProps = {
  initialLinks?: Link[];
  onSave: (data: LinkGroupFormState) => void;
};

export function LinkEditor({ initialLinks = [], onSave }: LinkEditorProps) {
  const [formState, setFormState] = useState<LinkGroupFormState>({
    linkTitle: "",
    linkCategory: "",
    links: initialLinks,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [autoOpenId, setAutoOpenId] = useState<string | null>(null);

  const [openCategory, setOpenCategory] = useState(false);

  const currentCategory = GroupCategories.find(
    (type) => type.value === formState.linkCategory
  );

  const handleAddLink = () => {
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      platform: Platform.GITHUB,
      url: "",
    };

    setFormState((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));
    setAutoOpenId(newLink.id);
  };

  const handleRemoveLink = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l.id !== id),
    }));
    if (autoOpenId === id) setAutoOpenId(null);
  };

  const handleUpdateLink = (id: string, values: { type: string; url: string }) => {
    setAutoOpenId(null);
    setFormState((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === id
          ? { ...l, platform: values.type as Platform, url: values.url }
          : l
      ),
    }));
  };

  const handleChangeOrder = (ordered: Link[]) => {
    setFormState((prev) => ({
      ...prev,
      links: ordered,
    }));
  };

  const hasValidLink = useMemo(
    () =>
      formState.links.length > 0 &&
      formState.links.every(
        (link) => link.platform && link.url.trim().length > 0
      ),
    [formState.links]
  );

  const handleSave = () => {
    if (!hasValidLink) return;
    setIsSaving(true);
    setTimeout(() => {
      onSave(formState);
      setIsSaving(false);
      alert("Changes saved successfully!");
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

        {formState.links.length > 0 && (
          <div className='mb-6 space-y-6'>
            <Input
              className="h-12 rounded-[8px]"
              placeholder="Título do grupo"
              value={formState.linkTitle}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, linkTitle: e.target.value }))
              }
            />

            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "h-12 w-full justify-between rounded-[8px]",
                    !formState.linkCategory && "text-muted-foreground"
                  )}
                >
                  {currentCategory ? (
                    <span className="flex items-center gap-2">
                      <currentCategory.icon className="h-4 w-4" />
                      {currentCategory.label}
                    </span>
                  ) : (
                    "Selecionar categoria"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-(--radix-popover-trigger-width) max-w-full rounded-[8px]">
                <Command>
                  <CommandInput placeholder="Buscar categoria..." />
                  <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {GroupCategories.map((type) => (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={(value) => {
                            setFormState((prev) => ({
                              ...prev,
                              linkCategory: value as GroupCategoriesValue,
                            }));
                            setOpenCategory(false);
                          }}

                        >
                          <type.icon className="mr-2 h-4 w-4" />
                          <span>{type.label}</span>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              formState.linkCategory === type.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

          </div>
        )}

        <SortableTable
          links={formState.links}
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
