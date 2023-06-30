import Uploader from '../components/Uploader'
export default function Home() {
  return (
    <main className='flex flex-col items-center'>
      <div className='bg-slate-50 sm:max-w-[80%] lg:max-w-[50%] h-screen p-4 '>
        <div className='bg-[#75aadb] rounded p-2'>
          <p className='text-white'>Compartí y descargá</p>
          <h1 className='font-bold font-sans text-4xl/6 pb-2 uppercase'>
            Soniditos
          </h1>
        </div>
        <div>
          <p className=' text-lg '>
            Seleccioná un archivo .mp3 o .wav y obtené un link de descarga con
            tu archivo bien chiquito con la calidad justa para compartir
          </p>
        </div>
        {/* <p>Seleccioná un archivo .mp3 o .wav y obtené:</p> */}
        {/* <p>- Un link de descarga para tu archivo original (dura 48hs)</p> */}
        {/* <p>- Otro link de descarga con tu archivo bien chiquito con la calidad justa para compartir por ahí (este te lo guardo unas semanas)</p> */}
        <Uploader />
        <div className='text-sm text-gray-400 font-medium'>
          <p >
            Tu archivo se convierte y comprime en el navegador usando el codec
            FFmpeg.
          </p>
          <p >
            Es posible que experimentes problemas o incluso que el sitio se
            congele durante la transformación
          </p>
        </div>
      </div>
    </main>
  )
}
