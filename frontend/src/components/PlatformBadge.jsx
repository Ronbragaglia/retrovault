const colors = {
  NES: 'bg-red-600', SNES: 'bg-purple-600', GB: 'bg-green-700', GBA: 'bg-indigo-600',
  GBC: 'bg-teal-600', MEGA_DRIVE: 'bg-blue-700', MASTER_SYSTEM: 'bg-blue-500',
  N64: 'bg-yellow-600', PS1: 'bg-gray-600', ARCADE: 'bg-orange-600',
}

export default function PlatformBadge({ platform }) {
  return (
    <span className={`${colors[platform] || 'bg-vault-mid'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
      {platform?.replace('_', ' ')}
    </span>
  )
}
