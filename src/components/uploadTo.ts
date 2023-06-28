'use server'
import supabase from '../supabase'
import { randomUUID } from 'crypto'
export async function uploadTo(form: FormData) {
  const sound = form.get('sound')
  const name = form.get('name')
  // validate sound
  if (!sound) return { error: 'No sound' }
  console.log('sound', sound)

  const { data, error } = await supabase.storage
    .from('sounds')
    .upload(name ? name + randomUUID() : 'noname' + randomUUID(), sound, {
      contentType: 'sound/mp3',
    })
  if (error) {
    console.log(error)
    return { error }
  }
  if(!data) return { error: 'No data' }
  const { data: urlData } = await supabase.storage
    .from('sounds')
    .getPublicUrl(data?.path)
  return { publicUrl: urlData.publicUrl }
}
