import Image from 'next/image'
import suffer from '../../public/images/suffer.png'

export default function Home() {
  return (
    <main className="grid grid-cols-2 justify-items-center gap-2">
      <div className="size-96 bg-red-300">
        <Image src="/images/suffer.png" alt="suffer" width={96} height={96} priority className="size-48" />
      </div>
      <div className="size-96 bg-red-300">
        <Image src={suffer} alt="suffer" width={192} height={192} priority className="size-48" />
      </div>

      <div>
        <div className="size-96 bg-red-300">
          <Image
            src="https://images.pexels.com/photos/459601/pexels-photo-459601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="suffer"
            width={192}
            height={192}
            priority
            className="size-48"
          />
        </div>
      </div>
    </main>
  )
}
