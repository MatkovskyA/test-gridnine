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
    // создаем объект для разделения даты и времени, приходящей с json
    const receivedDateTime = ticket.flight.legs[0].segments[0].departureDate;
    // дата и время вылета
    const dateTime = new Date(receivedDateTime);
    // Форматируем время как ЧЧ:ММ
    const time = dateTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    // Форматируем дату как ДД МММ день_недели
    const options = {day: 'numeric', month: 'short', weekday: 'short'};
    const date = dateTime.toLocaleDateString('ru-RU', options);

    //дата прибытия
    const arrivalTimeDate = ticket.flight.legs[0].segments[0].arrivalDate;
    const arrivalDateTime = new Date(arrivalTimeDate);
    // Форматируем время как ЧЧ:ММ
    const arrivelTime = arrivalDateTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    // Форматируем дату как ДД МММ день_недели
    const arrivalOptions = {day: 'numeric', month: 'short', weekday: 'short'};
    const arrivalDate = arrivalDateTime.toLocaleDateString('ru-RU', arrivalOptions);

    //Высчитываем итоговую сумму билетов
    const sumDeparture = parseFloat(ticket.flight.price.total.amount);
    const sumArrival = parseFloat(ticket.flight.price.total.amount);

    const finalSum = sumArrival + sumDeparture
    const arrival = ticket.flight.legs[0].segments[0].arrivalCity.caption; 
    const departure = ticket.flight.legs[0].segments[0].departureCity.caption; 
    if(arrival.includes("ПАРИЖ") && departure.includes("Москва")) {
      console.log(departure)
    }
   


    const card = `
          <div class='ticket'>
            <div class="ticket-header">
              <div class="ticket-logo">
                <img src="./src/images/logo.png" alt="">
              </div>
              <div class="ticket-price">
                <span>${finalSum} Р</span>
                <span>Стоимость для одного взрослого пассажира</span>
              </div>
            </div>
            <div class="route">
              <div class="route-citys">
                <div class="route-departure">
                  <span>${ticket.flight.legs[0].segments[0].departureCity.caption},</span> 
                  <span>${ ticket.flight.legs[0].segments[0].departureAirport.caption}</span> <span> (${ticket.flight.legs[0].segments[0].departureAirport.uid})</span>
                  <span><img src='./src/images/Arrow.svg' class='arrow' /></span>
                </div>
                <div class="route-arrival">
                  <span>${ticket.flight.legs[0].segments[0].arrivalCity.caption}, </span>
                  <span>${ticket.flight.legs[0].segments[0].arrivalAirport.caption}</span> <span>(${ticket.flight.legs[0].segments[0].arrivalAirport.uid})</span>
                </div>
              </div>
              <div class="route-date">
                <span>${time} ${date}</span> 
                <span>Дата отправления</span> 
                <span>Пересадка ${ticket.flight.legs[0].segments[0].stops}</span> 
                <span>Время прибытия</span>
                <span>${arrivelTime} ${arrivalDate}</span>
              </div>
              <div class="airline">
                <p>Рейс выполняет: ${ticket.flight.legs[0].segments[0].airline.uid}, ${ticket.flight.legs[0].segments[0].airline.caption}</p>
              </div>
            </div>
            
            <div class="route">
              <div class="route-citys">
                <div class="route-arrival">
                  <span>${ticket.flight.legs[0].segments[0].arrivalCity.caption}, </span>
                  <span>${ticket.flight.legs[0].segments[0].arrivalAirport.caption}</span> <span>(${ticket.flight.legs[0].segments[0].arrivalAirport.uid})</span>
                  <span><img src='./src/images/Arrow.svg' class='arrow' /></span>
                </div>
                <div class="route-departure">
                  <span>${ticket.flight.legs[0].segments[0].departureCity.caption},</span> 
                  <span>${ ticket.flight.legs[0].segments[0].departureAirport.caption}</span> <span> (${ticket.flight.legs[0].segments[0].departureAirport.uid})</span>
                </div>
              </div>
              <div class="route-date">
                <span>${time} ${date}</span> 
                <span>Дата отправления</span> 
                <span>Пересадка ${ticket.flight.legs[0].segments[0].stops}</span> 
                <span>Время прибытия</span>
                <span>${arrivelTime} ${arrivalDate}</span>
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


