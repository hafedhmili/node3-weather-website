
// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//      response.json().then((data)=>{
//         if (data.error) {
//             // print error message
//             console.log('Error: ' + data.error)
//         } else{
//             // print data
//             console.log('Location: ' + data.location)
//             console.log('Forecast: ' + data.forecastData)
//         }
//      })
//  })

 const weatherForm = document.querySelector('form')

 const search = document.querySelector('input')

 const errorMessage = document.querySelector('#error-message')

 const dataMessage = document.querySelector('#data-message')

//  errorMessage.textContent = 'Error message'
//  dataMessage.textContent = 'Data message'

 weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()

     const locationName = search.value

     errorMessage.textContent = 'Loading ...'

     dataMessage.textContent = ''

     fetch('/weather?address='+locationName).then((response)=>{
     response.json().then((data)=>{
        dataMessage.textContent = ''
        if (data.error) {
            // print error message
            errorMessage.textContent = 'Error: ' + data.error
        } else{
            // print data
            errorMessage.textContent = 'Location: ' + data.location
            dataMessage.textContent =  'Forecast: ' + data.forecastData
        }
     })
 })
})