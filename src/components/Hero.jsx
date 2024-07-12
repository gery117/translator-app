import React from 'react'
import { icons } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={icons} alt ="trans_logo" className='w-28 object-contain' />
        <button type="button" onClick={()=> window.open('https://github.com/gery117')} className='black_btn'>
          Github
        </button>
      </nav>
      <h1 className='head_text'>
        Translate Text Super Easy With <br className='max-md:hidden'/>
        <span className='orange_gradient'>Google</span>
      </h1>
      <h2 className='desc'>
        Easily translate any text with this handy translator app, It translates whatever you want, whenever you want.
      </h2>
    </header>
  )
}

export default Hero