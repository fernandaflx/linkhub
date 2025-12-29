import { LinkGroup } from "@/types/types";
import { Link2, Plus } from "lucide-react";
import { ActionsMenu } from "./Menu";

type Props = {
  groups?: LinkGroup[];
  onEdit?: (group: LinkGroup) => void;
  onCopy?: (group: LinkGroup) => void;
  onDelete?: (group: LinkGroup) => void;
}

export default function LinkGroupsGrid({
  groups,
  onEdit,
  onCopy,
  onDelete,
}: Props) {

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <a href="/new-link">
        <button
          className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all h-full w-full group"
        >
          <div className="h-14 w-14 rounded-full border flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <Plus />
          </div>
          <h3 className="text-lg font-bold mb-2">Create New Group</h3>
          <p className="text-sm max-w-[200px]">Start a new collection for a different audience or project.</p>
        </button>
      </a>

      {groups?.map((group) => (
        <div
          key={group.id}
          className="group flex h-full flex-col rounded-xl border border-transparent bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
        >
          <div className="mb-4 flex items-start justify-between">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <span className="text-2xl font-semibold">{group.icon}</span>
            </div>


            <ActionsMenu
              group={group}
              onEdit={onEdit}
              onCopy={onCopy}
              onDelete={onDelete}
            />
          </div>

          <h3 className="mb-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {group.title}
          </h3>

          <div className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link2 className="h-4 w-4" />
            <span className="truncate">devlinks.com/{group.slug}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

