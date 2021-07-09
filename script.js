const key = '4c48921fe1b4195ea01286559d9a319f'
const lang = "pt_br"

let form = document.getElementById('formulario')
let cidade = document.getElementById('cidade')
let pesquisar = document.getElementById('pesquisar')

const Modal = {
    open(){
        document
        .querySelector('.modal-overlay')
        .classList.add('active');
    },

    close(){
        document
        .querySelector('.modal-overlay')
        .classList.remove('active');
        cidade.value = '';
    }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let city = cidade.value
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
  getCity(url, 0).then(value => {
    document.querySelector('.cidade').innerHTML = value.cidade,
    document.querySelector('.temperatura').innerHTML = value.temperatura.toFixed(0) + '°',
    document.querySelector('.descricao').innerHTML = value.descricao,
    document.querySelector('.minima span').innerHTML = value.minima.toFixed(0) + '°',
    document.querySelector('.maxima span').innerHTML = value.maxima.toFixed(0) + '°',
    document.querySelector('.sensacao span').innerHTML = value.sensacao.toFixed(0) + '°',
    document.querySelector('.vento span').innerHTML = value.vento.toFixed(1) + 'Km/h',
    document.querySelector('.umidade span').innerHTML = value.umidade + '%'
  });
})

const getCity = (url, number) => {
  const promiseCallback = (resolve, reject) => {
    fetch(url)
      .then((response) => {
        let resultJson = response.json();
        return resultJson
      })
      .then((resultJson) => {
        let result
        
        if (number === 0) {
        result = {
              cidade: resultJson.name,
              temperatura: resultJson.main.temp,
              descricao: resultJson.weather[0].description,
              minima: resultJson.main.temp_min,
              maxima: resultJson.main.temp_max,
              sensacao: resultJson.main.feels_like,
              vento: resultJson.wind.speed,
              umidade: resultJson.main.humidity
          }
        }
        else if(number === 1){
          result = resultJson.main.temp_min.toFixed(0)
        }
        else if(number === 2){
          result = resultJson.main.temp_max.toFixed(0)
        }
        return result
      })
      .then(resolve)
      .catch(reject)
  }
  return new Promise(promiseCallback)
}

const capitais = {
  saoPaulo : document.querySelector('.saoPaulo').innerHTML,
  rio : document.querySelector('.rio').innerHTML,
  maceio : document.querySelector('.maceio').innerHTML,
  beloHorizonte: document.querySelector('.beloHorizonte').innerHTML,
  brasilia: document.querySelector('.brasilia').innerHTML,

  getSaoPaulo(){
    const city = capitais.saoPaulo
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
    getCity(url, 1).then(value => document.querySelector('#saoPaulo .min').innerHTML = value + '°')
    getCity(url, 2).then(value => document.querySelector('#saoPaulo .max').innerHTML = value + '°')
  },

  getRioDeJaneiro(){
    const city = capitais.rio
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
    getCity(url, 1).then(value => document.querySelector('#rio .min').innerHTML = value + '°')
    getCity(url, 2).then(value => document.querySelector('#rio .max').innerHTML = value + '°')
  },

  getBeloHorizonte(){
    const city = capitais.beloHorizonte
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
    getCity(url, 1).then(value => document.querySelector('#beloHorizonte .min').innerHTML = value + '°')
    getCity(url, 2).then(value => document.querySelector('#beloHorizonte .max').innerHTML = value + '°')
  },

  getBrasilia(){
    const city = capitais.brasilia
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
    getCity(url, 1).then(value => document.querySelector('#brasilia .min').innerHTML = value + '°')
    getCity(url, 2).then(value => document.querySelector('#brasilia .max').innerHTML = value + '°')
  },

  getMaceio(){
    const city = capitais.maceio
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&APPID=${key}`
    getCity(url, 1).then(value => document.querySelector('#maceio .min').innerHTML = value + '°')
    getCity(url, 2).then(value => document.querySelector('#maceio .max').innerHTML = value + '°')
  }
}

capitais.getSaoPaulo();
capitais.getRioDeJaneiro();
capitais.getBeloHorizonte();
capitais.getBrasilia();
capitais.getMaceio();