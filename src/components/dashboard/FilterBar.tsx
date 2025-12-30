import { Icons } from "@/components/ui/Icons";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  viewMode: 'grid' | 'kanban';
  onViewChange: (mode: 'grid' | 'kanban') => void;
  isCreating: boolean;
  onToggleCreate: () => void;
}

export function FilterBar({ searchTerm, onSearchChange, viewMode, onViewChange, isCreating, onToggleCreate }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      <div className="relative w-full md:w-96 group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">{Icons.Search}</div>
        <input 
          type="text" 
          placeholder="Buscar por erro..." 
          value={searchTerm} 
          onChange={e => onSearchChange(e.target.value)} 
          className="w-full bg-[#0B1121] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600" 
        />
      </div>

      <div className="flex gap-3 w-full md:w-auto items-center">
        {/* TOGGLE BUTTONS */}
        <div className="bg-[#0B1121] border border-slate-800 rounded-lg p-1 flex items-center">
          <button 
            onClick={() => onViewChange('grid')}
            className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            title="Visualização em Grade"
          >
            {Icons.LayoutGrid}
          </button>
          <button 
            onClick={() => onViewChange('kanban')}
            className={`p-2 rounded transition-all ${viewMode === 'kanban' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            title="Visualização Kanban"
          >
            {Icons.LayoutKanban}
          </button>
        </div>

        <button 
          onClick={onToggleCreate}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20"
        >
          {Icons.Plus} {isCreating ? "Cancelar" : "Novo Registro"}
        </button>
      </div>
    </div>
  );
}