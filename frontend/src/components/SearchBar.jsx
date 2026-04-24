import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ value, onChange, placeholder = 'Buscar games...' }) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-vault-dark border border-vault-mid rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(57,255,20,0.3)] transition"
      />
    </div>
  )
}
