import React from 'react'
import { useState, useEffect } from 'react'
import {copy, linkIcon, loader, tick} from '../assets'
import { useGetTranslationMutation } from '../services/text'
import { Result } from 'postcss'

const Demo = () => {
  const [text, setText] = useState({
    text:'',
    translation:'',
  });

  const [getTranslation, { data, isLoading, error }] = useGetTranslationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const result = await getTranslation({ from: 'auto', to: 'en', text: text.text });
      setText({ ...text, translation: result.data.translation });
      console.log(result.data.trans)
    } 
    catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form 
          className='relative flex justify-center items-center' 
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link_icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input type="text" 
              placeholder='Enter text' 
              value={text.text}
              onChange={(e)=>setText({...text, text: e.target.value})} 
              required 
              className='url_input peer'
          />
          <button 
            type='submit' 
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-blue-700'>
              ↵ Enter
          </button>
        </form>

      </div>
    </section>
  )
}

export default Demo