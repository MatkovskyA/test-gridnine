const container = document.querySelector(".inner")

async function getData() {
  try {
      const response = await fetch("./flights.json")
      if(response.ok) {
        const data = await response.json()
        showTickets(data.result.flights)
      } else {
        console.log("error: " + response.status)
      }
    }
  catch (error) {
    console.log("Ошибка при выполнении запроса " + error.message)
  }
}

function showTickets(flyTickets) {
  flyTickets.forEach((ticket) => {
    const card = `
          <div class='ticket'>
            <div class="ticket-header">
              <div class="ticket-logo">
                <img src="./src/images/logo.png" alt="">
              </div>
              <div class="ticket-price">
                <span>${ticket.flight.price.total.amount} Р</span>
                <span>Стоимость для одного взрослого пассажира</span>
              </div>
            </div>
            <div class="route">
              <div class="route-citys">
                <div class="route-departure">
                  <span>${ticket.flight.legs[0].segments[0].departureCity.caption}, </span>
                  <span>${ticket.flight.legs[0].segments[0].departureAirport.caption}</span> <span>(${ticket.flight.legs[0].segments[0].departureAirport.uid})</span>
                  <span><img src='./src/images/Arrow.svg' class='arrow' /></span>
                </div>
                <div class="route-arrival">
                  <span>${ticket.flight.legs[0].segments[0].arrivalCity.caption}, </span>
                  <span>${ticket.flight.legs[0].segments[0].arrivalAirport.caption}</span> <span>(${ticket.flight.legs[0].segments[0].arrivalAirport.uid})</span>
                </div>
              </div>
              <div class="route-date">
                <span>${ticket.flight.legs[0].segments[0].departureDate}</span> 
                <span>Дата отправления</span> 
                <span>Пересадка ${ticket.flight.legs[0].segments[0].stops}</span> 
                <span>Время прибытия</span>
                <span>${ticket.flight.legs[0].segments[0].arrivalDate}</span>
              </div>
              <div class="airline">
                <p>Рейс выполняет: ${ticket.flight.legs[0].segments[0].airline.uid}, ${ticket.flight.legs[0].segments[0].airline.caption}</p>
              </div>
            </div>

          </div>
    `
    container.insertAdjacentHTML('beforeend', card)
  })
}

getData()
