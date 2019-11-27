const weatherForm = document.querySelector('form')
const forecast = document.querySelector('#forecast')
const loc = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  loc.style.display = 'none'
  forecast.innerText = 'loading...'
  fetch('http://localhost:3000/weather?address=' + e.target.children[0].value)
    .then(response => {
      response.json().then((data) => {
        if(data.error) {
          forecast.innerText = data.error
        } else {
          loc.style.display = 'block'
          loc.innerText = data.location
          forecast.innerText = data.forecast
        }
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
