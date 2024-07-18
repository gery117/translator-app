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

  const [targetLanguage, setTargetLanguage] = useState('en')

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
      const result = await getTranslation({ from: 'auto', to: targetLanguage, text: text.text });
      const newText = { ...text, translation: result.data.trans};
      const updatedAlltext = [newText, ...allTranslations]
      
      setText({ text: '', translation: newText.translation });
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
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'
        >
          <option value="af">Afrikaans</option>
          <option value="sq">Albanian</option>
          <option value="am">Amharic</option>
          <option value="ar">Arabic</option>
          <option value="hy">Armenian</option>
          <option value="as">Assamese</option>
          <option value="ay">Aymara</option>
          <option value="az">Azerbaijani</option>
          <option value="bm">Bambara</option>
          <option value="eu">Basque</option>
          <option value="be">Belarusian</option>
          <option value="bn">Bengali</option>
          <option value="bho">Bhojpuri</option>
          <option value="bs">Bosnian</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="ceb">Cebuano</option>
          <option value="zh">Chinese (Simplified)</option>
          <option value="zh-cn">Chinese (Simplified, PRC)</option>
          <option value="zh-tw">Chinese (Traditional, Taiwan)</option>
          <option value="zh-sg">Chinese (Simplified, Singapore)</option>
          <option value="zh-hk">Chinese (Traditional, Hong Kong)</option>
          <option value="co">Corsican</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="dv">Dhivehi</option>
          <option value="doi">Dogri</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="eo">Esperanto</option>
          <option value="et">Estonian</option>
          <option value="ee">Ewe</option>
          <option value="fil">Filipino (Tagalog)</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="fy">Frisian</option>
          <option value="gl">Galician</option>
          <option value="ka">Georgian</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="gn">Guarani</option>
          <option value="gu">Gujarati</option>
          <option value="ht">Haitian Creole</option>
          <option value="ha">Hausa</option>
          <option value="haw">Hawaiian</option>
          <option value="he">Hebrew</option>
          <option value="iw">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="hmn">Hmong</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="ig">Igbo</option>
          <option value="ilo">Ilocano</option>
          <option value="id">Indonesian</option>
          <option value="ga">Irish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="jv">Javanese</option>
          <option value="jw">Javanese</option>
          <option value="kn">Kannada</option>
          <option value="kk">Kazakh</option>
          <option value="km">Khmer</option>
          <option value="rw">Kinyarwanda</option>
          <option value="gom">Konkani</option>
          <option value="ko">Korean</option>
          <option value="kri">Krio</option>
          <option value="ku">Kurdish</option>
          <option value="ckb">Kurdish (Sorani)</option>
          <option value="ky">Kyrgyz</option>
          <option value="lo">Lao</option>
          <option value="la">Latin</option>
          <option value="lv">Latvian</option>
          <option value="ln">Lingala</option>
          <option value="lt">Lithuanian</option>
          <option value="lg">Luganda</option>
          <option value="lb">Luxembourgish</option>
          <option value="mk">Macedonian</option>
          <option value="mai">Maithili</option>
          <option value="mg">Malagasy</option>
          <option value="ms">Malay</option>
          <option value="ml">Malayalam</option>
          <option value="mt">Maltese</option>
          <option value="mi">Maori</option>
          <option value="mr">Marathi</option>
          <option value="mni-mtei">Meiteilon (Manipuri)</option>
          <option value="lus">Mizo</option>
          <option value="mn">Mongolian</option>
          <option value="my">Myanmar (Burmese)</option>
          <option value="ne">Nepali</option>
          <option value="no">Norwegian</option>
          <option value="ny">Nyanja (Chichewa)</option>
          <option value="or">Odia (Oriya)</option>
          <option value="om">Oromo</option>
          <option value="ps">Pashto</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese (Portugal, Brazil)</option>
          <option value="pa">Punjabi</option>
          <option value="qu">Quechua</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sm">Samoan</option>
          <option value="sa">Sanskrit</option>
          <option value="gd">Scots Gaelic</option>
          <option value="nso">Sepedi</option>
          <option value="sr">Serbian</option>
          <option value="st">Sesotho</option>
          <option value="sn">Shona</option>
          <option value="sd">Sindhi</option>
          <option value="si">Sinhala (Sinhalese)</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="so">Somali</option>
          <option value="es">Spanish</option>
          <option value="su">Sundanese</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="tl">Tagalog (Filipino)</option>
          <option value="tg">Tajik</option>
          <option value="ta">Tamil</option>
          <option value="tt">Tatar</option>
          <option value="te">Telugu</option>
          <option value="th">Thai</option>
          <option value="ti">Tigrinya</option>
          <option value="ts">Tsonga</option>
          <option value="tr">Turkish</option>
          <option value="tk">Turkmen</option>
          <option value="ak">Twi (Akan)</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="ug">Uyghur</option>
          <option value="uz">Uzbek</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
          <option value="xh">Xhosa</option>
          <option value="yi">Yiddish</option>
          <option value="yo">Yoruba</option>
          <option value="zu">Zulu</option>
        </select>

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