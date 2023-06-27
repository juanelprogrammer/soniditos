'use client'
import React from 'react'
import { useState, ChangeEvent } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { uploadTo } from './uploadTo'
import { UUID } from 'crypto'

const Uploader = () => {
  const [bussy, setBussy] = useState<boolean>(false)
  const [downloadLinks, setDownloadLinks] = useState<string[]>()
  const [converting, setConverting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [audioSrc, setAudioSrc] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const ffmpeg = createFFmpeg({
    log: true,
    mainName: 'main',
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
  })

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      console.log(e.target.files[0])
      setFile(e.target.files[0])
    }
    return
  }

  async function handleUpload() {
    if (!file) return
    setBussy(true)
    const { convertedSound, error: convertError } = await handleConvert()
    if (!convertedSound) return convertError
    // una vez convertido tiene que subir el original (file) y el convertido (convertedSound)
    const {publicUrl, error} = await handleUploadSound(convertedSound.buffer, {
      type: 'audio/mp3',
      name: file.name,
    })
    if(!publicUrl) return
    if(error) return
    setUploading(false)
    setAudioSrc(publicUrl)
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
    const convertedSound: Uint8Array = ffmpeg.FS('readFile', 'output.mp3')
    ffmpeg.exit()
    setConverting(false)
    if (!convertedSound) return { error: 'Error reading sound' }
    return { convertedSound }
  }

  async function handleUploadSound(
    file: ArrayBuffer,
    metadata: { type: string; name: string }
  ) {
    setUploading(true)
    const form = new FormData()
    form.append('sound', new Blob([file]), metadata.name)
    return await uploadTo(form)
  }

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex flex-col items-center'>
        {audioSrc ? <audio controls src={audioSrc} /> : ''}
        <input
          disabled={bussy}
          onChange={handleFileChange}
          type='file'
          accept='audio/*'
        />
      </div>
      <button className='bg-[#75aadb] rounded mt-2' onClick={handleUpload}>
        {converting ? 'Convirtiendo...' : uploading ? 'Subiendo...':'Subir'}
      </button>
    </div>
  )
}

export default Uploader
