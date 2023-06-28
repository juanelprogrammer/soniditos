'use client'
import React from 'react'
import { useState, ChangeEvent } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { uploadTo } from './uploadTo'
import path from 'path'

const Uploader = () => {
  const [bussy, setBussy] = useState(false)
  const [downloadLinks, setDownloadLinks] = useState({
    original: '',
    converted: '',
  })
  const [converting, setConverting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [audioSrc, setAudioSrc] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const ffmpeg = createFFmpeg({
    // log: true,
    mainName: 'main',
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js', // Would be better to serve this file from own API
  })

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
    return
  }

  function copyToClipboard(url: string) {
    if(!url) return
    navigator.clipboard.writeText(url)
    alert('Copiado al portapapeles')
  }

  async function handleUpload() {
    if (!file) return
    setBussy(true)
    const { convertedSound, error: convertError } = await handleConvert()
    if (!convertedSound) return convertError
    const originalName = path.parse(file.name).name
    // una vez convertido tiene que subir el original (file) y el convertido (convertedSound)
    const { publicUrl, error } = await handleUploadSound(convertedSound, {
      type: 'audio/mp3',
      name: originalName,
    })
    if (!publicUrl) return
    if (error) return
    setUploading(false)
    setAudioSrc(publicUrl) // src to audio tag
    setDownloadLinks({ ...downloadLinks, converted: publicUrl })
    setFile(null)
  }

  async function handleConvert() {
    if (!file) return { error: 'No file selected' }
    if (file.type.split('/')[0] !== 'audio') {
      console.log('Not an audio file')
      return { error: 'Not an audio file' }
    }

    await ffmpeg.load()

    setConverting(true)

    const extension = file.type.split('/')[1]
    ffmpeg.FS('writeFile', `input.${extension}`, await fetchFile(file))
    await ffmpeg.run(
      '-i',
      `input.${extension}`,
      '-c:a',
      'libmp3lame',
      'output.mp3'
    )
    const rawFile = ffmpeg.FS('readFile', 'output.mp3')
    const convertedSound = new File([rawFile], file.name, { type: 'audio/mp3' })
    console.log(new File([convertedSound], file.name, { type: 'audio/mp3' }))
    ffmpeg.exit()
    setConverting(false)
    if (!convertedSound) return { error: 'Error reading sound' }
    return { convertedSound }
  }

  async function handleUploadSound(
    file: File,
    metadata: { type: string; name: string }
  ) {
    setUploading(true)
    const form = new FormData()
    form.append('sound', file, metadata.name)
    form.append('name', metadata.name)
    form.append('type', metadata.type)

    return await uploadTo(form)
  }

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex flex-col items-center'>
        {audioSrc ? <audio className='mb-4' controls src={audioSrc} /> : ''}
        <input
          disabled={bussy}
          onChange={handleFileChange}
          type='file'
          accept='audio/*'
        />
      </div>
      <button
        style={{cursor: bussy ? 'not-allowed' : 'pointer'}}
        disabled={converting || uploading}
        className='bg-[#75aadb] rounded mt-2 p-2'
        onClick={handleUpload}
      >
        {converting ? 'Convirtiendo...' : uploading ? 'Subiendo...' : 'Subir'}
      </button>
      {downloadLinks.converted ? (
        <div className='flex flex-col items-center'>
          <a className='p-2 bg-green-600 bg-opacity-70 rounded mt-2 w-full text-center' href={downloadLinks.converted} download={true}>
            Descargar
          </a>
          <button className='p-2 bg-gray-200 rounded mt-2 w-full text-center' onClick={() => copyToClipboard(downloadLinks.converted)}>
            Copiar link
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Uploader
