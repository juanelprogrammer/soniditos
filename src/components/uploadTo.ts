'use server'
import supabase from '../supabase'
import { randomUUID } from 'crypto'

export async function uploadTo(form: FormData) {
  const sound = form.get('sound')
  const name = form.get('name')?.toString().replace('.', '-') // the char '.' gives problem with the extension

  if (!sound) return { error: 'No sound' }

  const fileSize = (sound as File).size / 1024 / 1024 // filesize in MB
  console.log('filesize', fileSize)
  if(fileSize > 20) return { error: 'File too big. It must be 20mb or less' }

  const { data, error } = await supabase.storage
    .from('sounds')
    .upload(name ? `${name} ${randomUUID()}` : `no-name ${randomUUID()}`, sound, {
      contentType: 'sound/mp3',
    })
  if (error) {
    return { error }
  }
  if(!data) return { error: 'Error updating file' }
  const { data: urlData } = await supabase.storage
    .from('sounds')
    .getPublicUrl(data?.path)
  return { publicUrl: urlData.publicUrl }
}
