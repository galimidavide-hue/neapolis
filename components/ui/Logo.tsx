import Image from 'next/image'

interface LogoProps {
  color?: 'white' | 'black'
  className?: string
}

export default function Logo({ color = 'white', className = '' }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Neapolis Pizzeria Verace Napoletana"
      width={240}
      height={96}
      className={`w-full h-auto ${color === 'white' ? 'brightness-0 invert' : ''} ${className}`.trim()}
    />
  )
}
