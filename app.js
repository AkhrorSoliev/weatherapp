// Elements of html
const searchEl = document.getElementById('search')
const searchIconEl = document.getElementById('search-icon')
const locationEl = document.querySelector('.location')
const mainDegEl = document.querySelector('.main-deg')
const aboutEl = document.querySelector('.about')
const dateEl = document.querySelector('.date')
const averageEl = document.querySelector('.average')
const weatherEl = document.querySelector('#weather')
const body = document.querySelector('body')

// API
const api = {
  key: '467143a2e9e1de3de89328bf80dd0625',
  base: 'https://api.openweathermap.org/data/2.5/',
}

searchEl.addEventListener('keypress', setQuery)
searchIconEl.addEventListener('click', () => {
  getResult(searchEl.value)
})

function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchEl.value)
  }
}

function getResult(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json()
    })
    .then(displayResult)
}

function displayResult(weather) {
  let now = new Date()
  locationEl.innerText = `${weather.name}, ${weather.sys.country}`
  dateEl.innerText = dateBuilder(now)
  mainDegEl.innerHTML = `${Math.round(weather.main.temp)}<span>˚c</span>`
  aboutEl.innerText = weather.weather[0].main
  weatherEl.src = `images/${weather.weather[0].main}.svg`
  body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%),
  url('https://source.unsplash.com/1920x1280/?${weather.weather[0].main}')`
  averageEl.innerText = `${Math.round(weather.main.temp_min)}˚c / ${Math.round(
    weather.main.temp_max,
  )} ˚c`
  body.style.backgroundRepeat = 'no-repeat'
  body.style.backgroundSize = 'cover'
  body.style.backgroundPosition = 'center'
}

function dateBuilder(d) {
  let months = [
    'Yanvar',
    'Fevrak',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktiyabr',
    'Noyabr',
    'Dekabr',
  ]
  let days = [
    'Yakshanba',
    'Dushanba',
    'Seshanba',
    'Chorshanba',
    'Payshanba',
    'Juma',
    'Shanba',
  ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
