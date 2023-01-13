import React from 'react'

function CountryCard({country , handleClickCountry}) {
  return (
    <div className="w-[260px] flex flex-col items-start justify-start rounded-lg shadow-md cursor-pointer hover:scale-105 duration-500 bg-white"
        onClick={()=>handleClickCountry(country)}
    >
        <img className="w-full h-[150px] object-cover rounded-t-lg" src={country.flagPicture} alt="" />
        <div className="w-full min-h-[170px] pt-4 px-5 flex flex-col items-start justify-start">
            <h4 className="text-[16px] font-bold">{country.name}</h4>
            <div className="flex flex-col py-3 text-[14px] gap-[2px]">
                <p><span className="font-semibold">Population: </span>{country.population.toLocaleString()}</p>
                <p><span className="font-semibold">Region: </span>{country.region}</p>
                <p><span className="font-semibold">Capital: </span>{country.capital ? country.capital.join(',') : ''}</p>
            </div>
        </div>
    </div>
  )
}

export default CountryCard