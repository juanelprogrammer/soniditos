'use server'
import supabase from '../supabase'

export async function uploadTo(form: FormData) {
  const sound = form.get('sound')
  // validate sound
  if(!sound) return { error: 'No sound' }
  console.log('sound', sound)

  const { data, error } = await supabase.storage.from('sounds').upload('prueba123', sound, {contentType: 'sound/wav'})
  if(error) console.log(error)
  // get url
  const { data: urlData } = await supabase.storage.from('sounds').getPublicUrl('prueba123')
  return {publicUrl: urlData.publicUrl}
}