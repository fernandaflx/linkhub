/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  ColumnDef,
  Row,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { GripVertical } from "lucide-react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LinkAccordionForm } from "./LinkAccordionForm";
import type { Link } from "@/types/types";


type Item = Link;

type SortableTableProps = {
  links: Link[];
  onChangeOrder: (links: Link[]) => void;
  onUpdateLink: (id: string, values: { type: string; url: string }) => void;
  onRemoveLink: (id: string) => void;
  autoOpenId?: string | null;
};

type DraggableRowProps = {
  row: Row<Item>;
  onUpdateRow: (id: string, values: { type: string; url: string }) => void;
  onRemoveRow: (id: string) => void;
  isOpen: boolean;
  setOpenId: (id: string | null) => void;
};

function DraggableRow({
  row,
  onUpdateRow,
  onRemoveRow,
  isOpen,
  setOpenId,
}: DraggableRowProps) {
  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: row.original.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  const item = row.original;

  return (
    <TableRow ref={setNodeRef} style={style} className="align-top">
      {row.getVisibleCells().map((cell) => {
        const isDragCell = cell.column.id === "drag";

        return (
          <TableCell
            key={cell.id}
            style={{ width: cell.column.getSize() }}
            className={isDragCell ? "w-10 align-top" : "p-0"}
          >
            {isDragCell ? (
              <button
                {...attributes}
                {...listeners}
                className="flex p-4 items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground"
                aria-label="Move row"
              >
                <GripVertical className="h-5 w-5" />
              </button>
            ) : (
              <LinkAccordionForm
                itemId={item.id}
                defaultType={item.url ? item.platform : undefined}
                defaultUrl={item.url}
                open={isOpen}
                onOpenChange={(open) => setOpenId(open ? item.id : null)}
                onSave={(values) => onUpdateRow(item.id, values)}
                onRemove={() => onRemoveRow(item.id)}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export function SortableTable({
  links,
  onChangeOrder,
  onUpdateLink,
  onRemoveLink,
  autoOpenId,
}: SortableTableProps) {
  const data = useMemo(() => links ?? [], [links]);

  const [openId, setOpenId] = useState<string | null>(autoOpenId ?? null);

  useEffect(() => {
    if (autoOpenId) {
      setOpenId(autoOpenId);
    }
  }, [autoOpenId])

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        id: "drag",
        header: "",
        size: 40,
      },
      {
        id: "content",
        header: "",
        cell: ({ row }) => row.original,
        minSize: 900,
      },
    ],
    []
  );

  const table = useReactTable<Item>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  const items = useMemo(() => data.map((item) => item.id), [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onChangeOrder(arrayMove(data, oldIndex, newIndex));
  }

  const handleUpdateRow = (id: string, values: { type: string; url: string }) => {
    onUpdateLink(id, values);
    setOpenId(null);
  };

  const handleRemoveRow = (id: string) => onRemoveLink(id);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <Table className="w-full bg-muted/40 rounded-sm">
        <TableBody>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow
                key={row.id}
                row={row}
                onUpdateRow={handleUpdateRow}
                onRemoveRow={handleRemoveRow}
                isOpen={openId === row.original.id}
                setOpenId={setOpenId}
              />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
