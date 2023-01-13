import React, { useEffect, useState } from 'react'
import { getBorderCountries } from '../pages/api/webAPI';

function CountryDetail({country,handleClickCountry}) {
  
    const [ borderCountriesList , setBorderCountriesList ] = useState([])

    useEffect(()=>{
        (async function(){
           
            if(country.borders){
                console.log(country.borders);
                let resultBorder = await getBorderCountries(country.borders);
                let resultNormalizeList = []
                resultBorder.forEach(country => {
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
                setBorderCountriesList(resultNormalizeList)
            }else{
                setBorderCountriesList([]);
            }
        }())
    },[country])

    return (
        <div className='w-full max-w-[1440px] px-20 flex flex-col'>
            <div className="w-[120px] mt-10 flex justify-center items-center gap-2 py-3 pl-3 pr-4 rounded-md shadow-md cursor-pointer bg-white"
                onClick={()=>handleClickCountry({})}
            >
                <div className="w-[18px] h-[18px]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Arrow Back</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                </div>
                <p>Back</p>
            </div>
            <div className={`w-full flex gap-28 items-center pt-20`}>
                <img className={`w-[600px]`} src={country.flagPicture} alt=""/>
                <div className="flex flex-col">
                    <h2 className={`text-[24px] font-bold py-6`}>{country.commonName}</h2>
                    <div className="flex items-start gap-20">
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] gap-1"><span className="font-semibold">Native Name: </span>{country.nativeName}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Population: </span>{country.population}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Region: </span>{country.region}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Sub Region:</span>{country.subregion}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Capital: </span>{country.capital ? country.capital.join(',') : ''}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] gap-1"><span className="font-semibold">Top Level Domain: </span>{country.topLevelDomain ? country.topLevelDomain.join(',') : ''}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Currencies: </span>{country.currencies ? country.currencies.join(',') : ''}</p>
                            <p className="text-[14px] gap-1"><span className="font-semibold">Languages: </span>{country.languages ? country.languages.join(',') : ''}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 pt-[60px]`}>
                        <p className="text-[14px] font-semibold">Border Countries:</p>
                        <div className={`flex items-center gap-2 flex-wrap w-[400px]`}>
                            {borderCountriesList.map((country, index)=>(
                                <div key={`borderCountry${index}`} className="py-1 px-4 rounded-sm bg-white text-[14px] w-[80px] flex justify-center items-center overflow-hidden text-gray-600 font-[500] cursor-pointer"
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    onClick={()=>{handleClickCountry(country)}}
                                >{country.commonName}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetail