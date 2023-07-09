import { NextResponse } from 'next/server'
import supabase from '../supabase'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  const formData = await request.formData()
  const sound = formData.get('sound')
  const name = formData.get('name')?.toString().replace('.', '-') // the char '.' gives problem with the extension
  if(!sound) return NextResponse.json({ error: 'No sound input' }, { status: 400 })


  const fileSize = (sound as File).size / 1024 / 1024 // filesize in MB
  if(fileSize > 20) return NextResponse.json({ error: 'File too big. It must be 20mb or less' }, { status: 400 })

  const { data, error } = await supabase.storage
    .from('sounds')
    .upload(name ? `${name} ${randomUUID()}` : `no-name ${randomUUID()}`, sound, {
      contentType: 'sound/mp3',
    })
  if (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error uploading' }, { status: 400 })
  }
  if(!data) return NextResponse.json({ error: 'Error updating file' }, { status: 400 })
  const { data: urlData } = await supabase.storage
    .from('sounds')
    .getPublicUrl(data?.path)

  return NextResponse.json({ sound: { url: urlData.publicUrl } })
}