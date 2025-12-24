/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { ChevronsUpDown, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINK_TYPES, LinkType } from "@/types/types";

const linkSchema = z.object({
  type: z.string().min(1, "Selecione um tipo."),
  url: z
    .string()
    .min(1, "Informe o link.")
    .url("Informe uma URL válida."),
});

type LinkFormValues = z.infer<typeof linkSchema>;


type LinkAccordionFormProps = {
  itemId: string;
  defaultType?: LinkType;
  defaultUrl?: string;
  onSave: (values: LinkFormValues) => void;
  onRemove: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};


export function LinkAccordionForm({
  itemId,
  defaultType,
  defaultUrl,
  onSave,
  onRemove,
  open,
  onOpenChange,
}: LinkAccordionFormProps) {

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      type: defaultType ?? "",
      url: defaultUrl ?? "",
    },
    mode: "onChange",
  });

  const selectedType = LINK_TYPES.find((t) => t.value === form.watch("type"));

  const isValid = form.formState.isValid;

  function handleSubmit(values: LinkFormValues) {
    onSave(values);
  }

  const [openCombo, setOpenCombo] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      value={open ? itemId : ""}
      onValueChange={(val) => onOpenChange(val === itemId)}
    >
      <AccordionItem value={itemId} className="border-0">
        <AccordionTrigger className="p-4 text-left text-sm font-medium hover:font-bold hover:no-underline">
          {selectedType ? selectedType.label : "Novo link"}
        </AccordionTrigger>

        <AccordionContent className="px-4 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">

                      <Popover open={openCombo} onOpenChange={setOpenCombo}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-12 w-full justify-between rounded-[8px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {selectedType ? (
                                <span className="flex items-center gap-2">
                                  <selectedType.icon className="h-4 w-4" />
                                  {selectedType.label}
                                </span>
                              ) : (
                                "Selecionar plataforma"
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0 w-(--radix-popover-trigger-width) max-w-full rounded-[8px]">
                          <Command>
                            <CommandInput placeholder="Buscar plataforma..." />
                            <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {LINK_TYPES.map((type) => (
                                  <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={(value) => {
                                      form.setValue("type", value as LinkType, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                      setOpenCombo(false);
                                    }}
                                  >
                                    <type.icon className="mr-2 h-4 w-4" />
                                    <span>{type.label}</span>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === type.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-12 rounded-[8px]"
                        type="url"
                        placeholder="https://..."
                        {...field}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={onRemove}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Remover
                </Button>

                {isValid && (
                  <Button type="submit">
                    Salvar
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
