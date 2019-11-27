const greeter = (name = 'Anonymous', {country = 'Senegal', address} = {}) => {
  console.log('Hello', name, country, address)
}

greeter('Mohamed')
greeter()
