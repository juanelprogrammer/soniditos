import React from 'react'
import supabase from '../api/supabase'
export default function page() {

  async function login(form: FormData){
    'use server'
    const email = form.get('email')
    const {data, error} =  await supabase.auth.signInWithOtp({
      email: email as string,
      options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })
    if(error) {
      console.log(error)
      return
    }
    if(!data) {
      console.log('No data')
      return
    }
    console.log(data)
    
  }

  return (
    <>
    <p className='text-lg'>Ingresá sin crear una cuenta para conservar tus sonidos</p>
      <form action={login}>
        <label className='flex flex-col mt-2' htmlFor="email">
          Email
          <input type="email" name='email' placeholder='juanlopez@gmail.com'/>
          <p className='text-sm text-gray-400 font-medium'>Vas a recibir un mail con un enlace para loguearte en este equipo</p>
          <button className='p-2 font-medium bg-[#75aadb]/50 rounded mt-2' type="submit">Enviar enlace</button>
        </label>
      </form>
    </>
  )
}
