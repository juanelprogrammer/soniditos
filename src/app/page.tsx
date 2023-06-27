import Uploader from '../components/Uploader'
export default function Home() {


  return (
    <main className='flex flex-col items-center'>
      <div className='bg-slate-50 w-auto min-w-[70%] h-screen pt-8 px-4'>
        <div className=' bg-[#75aadb] rounded p-2'>
          <p className='text-white'>Compartí y descargá</p>
          <h1 className='font-bold font-sans text-4xl uppercase'>Soniditos</h1>
        </div>
        <p>Seleccioná un archivo .mp3 o .wav y obtené:</p>
        <p>- Un link de descarga para tu archivo original (dura 48hs)</p>
        <p>- Otro link de descarga con tu archivo bien chiquito con la calidad justa para compartir por ahí (este te lo guardo unas semanas)</p>
        <Uploader />
      </div>
    </main>
  )
}
