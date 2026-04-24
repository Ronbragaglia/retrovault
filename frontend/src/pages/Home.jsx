import { Link } from 'react-router-dom'

const platforms = ['NES', 'SNES', 'GB', 'GBA', 'GBC', 'MEGA DRIVE', 'MASTER SYSTEM', 'N64', 'PS1', 'ARCADE']

export default function Home() {
  return (
    <div>
      <section className="relative py-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vault-darker via-vault-darkest to-vault-darkest" />
        <div className="relative z-10">
          <h1 className="font-pixel text-3xl md:text-4xl text-neon-green neon-text mb-4">RetroVault</h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">Seu catalogo definitivo de games retro</p>
          <Link to="/catalog" className="inline-block px-8 py-3 bg-neon-green text-vault-darkest font-bold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition">
            Explorar Catalogo
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-pixel text-sm text-center text-neon-purple mb-8">Plataformas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {platforms.map((p) => (
            <div key={p} className="bg-vault-dark border border-vault-mid rounded-xl p-4 text-center text-xs font-bold text-gray-300 hover:border-neon-purple hover:text-neon-purple transition cursor-pointer">
              {p}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-pixel text-sm text-center text-neon-green mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Catalogo Completo', desc: 'Navegue por centenas de games classicos de todas as plataformas retro' },
            { title: 'Reviews da Comunidade', desc: 'Avalie seus games favoritos e veja o que outros jogadores acham' },
            { title: 'Colecao Pessoal', desc: 'Monte sua colecao virtual e salve seus favoritos para acessar a qualquer hora' },
          ].map((f) => (
            <div key={f.title} className="bg-vault-dark border border-vault-mid rounded-xl p-6 hover:border-neon-green transition">
              <h3 className="font-bold text-neon-green mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
