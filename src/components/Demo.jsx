import React from 'react'
import { useState, useEffect } from 'react'
import {copy, linkIcon, loader, tick, deleteIcon} from '../assets'
import { useGetTranslationMutation } from '../services/text'
import { Result } from 'postcss'

const Demo = () => {
  const [text, setText] = useState({
    text:'',
    translation:'',
  });

  const [allTranslations, setAllTranslations] = useState([]);

  const [copied, setCopied] = useState("")

  const [getTranslation, { data, isLoading, error }] = useGetTranslationMutation();

  useEffect(() => {
    const translationFromLocalStorage = JSON.parse(
      localStorage.getItem('translation')
    )

    if (translationFromLocalStorage) {
      setAllTranslations(translationFromLocalStorage)
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const result = await getTranslation({ from: 'auto', to: 'en', text: text.text });
      const newText = { ...text, translation: result.data.trans};
      const updatedAlltext = [newText, ...allTranslations]
      
      setText(newText);
      setAllTranslations(updatedAlltext)

      console.log(result.data.trans);

      localStorage.setItem('translation', JSON.stringify(updatedAlltext));
    } 
    catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedTranslations = allTranslations.filter(
      (item, index) => index !== indexToDelete
    );
    setAllTranslations(updatedTranslations);
  };

const handleCopy = (copyText) => {
  setCopied(copyText);
  navigator.clipboard.writeText(copyText);
  setTimeout(()=>setCopied(false), 3000);
}

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
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {allTranslations.map((item, index) => (
              <div 
                key={index}
                onClick={()=> setText(item)}
                className='link_card'
              >
                <div className='copy_btn' onClick={()=>handleCopy(item.text)}>
                  <img
                    src={copied === item.text? tick: copy}
                    alt="copy_icon"
                    className='w-[40%] h-[40%] object-contain'
                  />
                </div>
                <p 
                  className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'
                >
                  {item.text}
                </p>
                <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete(index);
                    }}
                    className='delete_btn text-red-500'
                >
                  <img
                        src={deleteIcon}
                        alt="delete_icon"
                        className='w-[40%] h-[40%] object-contain'
                  />
            </button>
              </div>
            )
          )}
        </div>
      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
          {isLoading ? (
            <img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
          ) 
          : error ? (
            <p className='font-inter font-bold text-black text-center'>
                That was not supposed to happen...
                <br/>
                <span className='font-satoshi font-normal text-gray-700'>
                  {error?.data?.error}
                </span>
            </p>
          ) : (
            text.translation && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                  text <span className='blue_gradient'> translation</span>
                </h2>
                <div className='summary_box'>
                    <p className="font-inter font-medium text-sm text-gray-700">
                      {text.translation}
                    </p>
                </div>
              </div>
            )
          )}
      </div>
    </section>
  )
}

export default Demo