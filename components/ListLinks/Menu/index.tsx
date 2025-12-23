"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, MoreVertical, PencilLine, Trash2 } from "lucide-react";
import type { LinkGroup } from "@/types/types";

type ActionsProps = {
  group: LinkGroup;
  onEdit?: (group: LinkGroup) => void;
  onCopy?: (group: LinkGroup) => void;
  onDelete?: (group: LinkGroup) => void;
};

export function ActionsMenu({
  group,
  onEdit,
  onCopy,
  onDelete,
}: ActionsProps) {

  const items = [
    {
      key: "edit",
      label: "Edit",
      icon: PencilLine,
      onClick: onEdit,
    },
    {
      key: "copy",
      label: "Copy link",
      icon: Copy,
      onClick: onCopy,
    },
  ] as const;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 bg-card border">
        {items.map(({ key, label, icon: Icon, onClick }) => (
          <DropdownMenuItem
            key={key}
            onSelect={(e) => {
              e.preventDefault();
              onClick?.(group);
            }}
            className="flex items-center"
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center text-destructive focus:bg-destructive/10"
          onSelect={(e) => {
            e.preventDefault();
            onDelete?.(group);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  );
}
