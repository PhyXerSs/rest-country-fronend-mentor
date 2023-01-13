import axios from "axios";
//https://restcountries.com/
export async function getAllCountries(){
    let result = await axios.get('https://restcountries.com/v3.1/all');
    return result.data
}

export async function getBorderCountries(borderCountries){
    let result = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${borderCountries.join(',')}`)
    return result.data
}