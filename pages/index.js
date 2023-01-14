import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import { getAllCountries } from './api/webAPI'
import CountryCard from '../components/CountryCard'
import CountryDetail from '../components/CountryDetail'

const inter = Inter({ subsets: ['latin'] })

const RegionList = [ 'Africa' , 'America' , 'Asia' , 'Europe' , 'Oceania' ]

export default function Home() {
  const [ inputSearch , setInputSearch ] = useState('');
  const [ filterSelected , setFilterSelected ] = useState('Filter by Region');
  const [ isFilterClick , setIsFilterClick ] = useState(false);
  const [ isHoverDropdown , setIsHoverDropdown ] = useState(-1);
  const dropDownRef = useRef(null);
  const [ countriesData , setCountriesData ] = useState([]);
  const [ countrySelectedForDetail , setCountrySelectedForDetail ] = useState({});
  const [ isDarkMode , setIsDarkMode ] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsFilterClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  useEffect(()=>{
    (async function (){
      let resultAllCountry = await getAllCountries();
      // console.log(resultAllCountry);
      let resultNormalizeList = []
      resultAllCountry.forEach(country => {
        let resultNormalizeObject = {};
        resultNormalizeObject.name = country.name.official;
        resultNormalizeObject.commonName = country.name.common;
        resultNormalizeObject.nativeName = '';
        if(country.name.nativeName){
          let nativeNameKeys = Object.keys(country.name.nativeName)
          for( let key in country.name.nativeName){
            if(nativeNameKeys.length === 1){
              resultNormalizeObject.nativeName = country.name.nativeName[key].official;
            }
            else if(key !== 'eng'){
              resultNormalizeObject.nativeName = country.name.nativeName[key].official;
            }
          }
        }
        resultNormalizeObject.topLevelDomain = country.tld;
        resultNormalizeObject.population = country.population;
        resultNormalizeObject.currencies = [];
        if(country.currencies){
          let currenciesKey = Object.keys(country.currencies);
          currenciesKey.forEach(key=>{
            resultNormalizeObject.currencies.push(country.currencies[key].name);
          })
        }
        resultNormalizeObject.region = country.region
        resultNormalizeObject.languages = [];
        if(country.languages){
          let languagesKey = Object.keys(country.languages);
          languagesKey.forEach(key=>{
            resultNormalizeObject.languages.push(country.languages[key]);
          })
        }
        resultNormalizeObject.subregion = country.subregion;
        resultNormalizeObject.capital = country.capital;
        resultNormalizeObject.borders = country.borders;
        resultNormalizeObject.flagPicture = country.flags.svg;
        resultNormalizeList.push(resultNormalizeObject)
      });
      setCountriesData(resultNormalizeList)
    }())
  },[])


  const filterData = countriesData.filter(country=>{
    if(filterSelected === 'Filter by Region'){
      return country.name.toLowerCase().includes(inputSearch.toLowerCase())
    }else{
      return country.name.toLowerCase().includes(inputSearch.toLowerCase()) &&
             country.region.toLowerCase().includes(filterSelected.toLowerCase())
    }
  });
  function handleClickCountry(country){
    setCountrySelectedForDetail(country)
  } 

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`w-screen h-screen flex flex-col justify-start items-center overflow-y-auto max-h-screen ${isDarkMode ? ' text-white bg-[#202d36]': 'text-black bg-[#fafafa]'}`} style={{fontFamily:"'Nunito', sans-serif"}}>
        <div className={`w-full flex justify-center shadow-sm ${isDarkMode ? 'bg-[#2b3743]': 'bg-white'}`}>
          <div className="w-full max-w-[1440px] flex justify-between items-center px-5 sm:px-20 py-4 ">
            <h1 className="text-[22px] font-extrabold">Where in the world?</h1>
            <div className="flex items-center gap-2 w-[140px] justify-end cursor-pointer"
              onClick={()=>setIsDarkMode(!isDarkMode)}
            >
              <div className="w-[18px] h-[18px]">
                <svg className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Moon</title><path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z" fill={`${isDarkMode ? 'currentColor': 'none'}`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
              </div>
              <p className="text-[17px] w-fit font-semibold">Dark Mode</p>
            </div>
          </div>
        </div>
        {Object.keys(countrySelectedForDetail).length === 0 ? 
          <>
            <div className="w-full max-w-[1440px] flex justify-start sm:justify-between items-start sm:items-center py-10 px-5 sm:px-20 flex-col sm:flex-row gap-8 sn:gap-0">
              <div className={`w-full sm:w-[450px] flex items-center justify-start gap-5 pl-6 pr-4 py-3 rounded-md shadow-md ${isDarkMode ? 'bg-[#2b3743]': 'bg-white text-gray-400 '}`}>
                <div className={`w-[18px] h-[18px]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Search</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/></svg>
                </div>
                <input
                  className="w-10/12 outline-none text-[16px] bg-transparent"
                  placeholder='Search for a country...'
                  value={inputSearch}
                  onChange={(e)=>{setInputSearch(e.target.value)}}
                />
              </div>
              <div className={`w-[200px] flex flex-col gap-2 relative`}>
                <div className={`w-full flex justify-between items-center rounded-md shadow-md pl-6 pr-4 py-3 outline-none border-none cursor-pointer ${isDarkMode ? 'bg-[#2b3743]': 'bg-white'}`}
                  onClick={()=>setIsFilterClick(!isFilterClick)}
                >
                  <p className="text-[15px] font-semibold">{filterSelected}</p>
                  <div className="h-[16px] w-[16px]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Chevron Down</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"/></svg>
                  </div>
                  
                </div>
                {isFilterClick &&
                <div ref={dropDownRef} className={`w-full flex flex-col rounded-md shadow-lg absolute top-14 z-[10]`}>
                  {RegionList.map((region,index)=>(
                    <div key={`regionListDropdowm${index}`} className={`w-full py-3 pl-6 pr-4 ${index === 0 && 'rounded-t-md'} ${index === RegionList.length - 1 && 'rounded-b-md'} ${isHoverDropdown === index || filterSelected === region ? 'bg-blue-500 text-white': `${isDarkMode? 'bg-[#2b3743] text-white': 'bg-white text-black'} `} cursor-pointer `} onClick={(e)=>{setFilterSelected(region); setIsFilterClick(false) }} onMouseEnter={(e)=>setIsHoverDropdown(index)} onMouseLeave={()=>setIsHoverDropdown(-1)}>{region}</div>
                  ))}
                </div>}
              </div>
            </div>
            
            <div className="w-full max-w-[1440px] px-20 pb-5">
              <div className='grid grid-cols-1 ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-10 justify-items-center'>
                {filterData.map((country,index)=>(
                  <CountryCard key={`countryCard${index}`} country={country} handleClickCountry={handleClickCountry} isDarkMode={isDarkMode}/>
                ))}
              </div>
            </div>
          </>
          :<>
            <CountryDetail handleClickCountry={handleClickCountry} country={countrySelectedForDetail} isDarkMode={isDarkMode}/>
          </>
        }
      </main>
    </>
  )
}
