// si parte!
// fase iniziale: capire in che mese siamo, in modo da stampare nell'h1 il titolo corretto e da creare correttamente
// il giusto numero di celle per il calendario. Ogni mese potenzialmente ha un diverso numero di celle.

// occupiamoci di stampare il mese corrente nel titolo h1

const now = new Date() // un oggetto di tipo "data". Quest'oggetto comprende TUTTE le informazioni temporali relative
// a questo preciso momento nella storia

console.log(Date.now()) // :)

const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

// PARTE 2
// ogni giorno del calendario dovrà poter contenere eventi del tipo "18:00 - Aperitivo"
// ogni giorno del calendario dovrà poter contenere INFINITI eventi
// quindi gli eventi di ogni giorno dovranno venire salvati dentro un array di stringhe
// es. giorno 25 ["12:00 - Pranzo di Natale", "18:00 - Incontro con i parenti", "23:00 - Panettone Time"]

// ARRAY DI ARRAY (cassettiera)
// [
//     [], [], [], [], [],
//     [], [], [], [], [],
//     [], [], [], [], [],
//     [], [], [], [], [],
//     [], [], [], [], [],
//     [], [], [], [], [],
// ]

// inizializziamo la cassettiera:
const events = []

const printCurrentMonthInH1 = function () {
  // getMonth torna l'indice del mese in corso, da 0 a 11. Lo usiamo come indice per l'array monthNames, in modo da ottenere il NOME
  // del mese corrente

  const indexOfTheCurrentMonth = now.getMonth() // 11 se siamo a dicembre
  const currentMonth = monthNames[indexOfTheCurrentMonth] // "Dicembre"
  console.log('il currentMonth è', currentMonth)
  // troviamo un riferimento per quell'h1
  //   const h1Title = document.querySelector('h1')
  const h1Title = document.getElementsByTagName('h1')[0]
  // riempiamo il contenuto di h1Title con currentMonth
  h1Title.innerText = currentMonth
}

// next step: capire QUANTI GIORNI ci sono nel mese corrente. Ci servirà per creare tot numero di celle nel calendario.
// JS NON ha un metodo integrato per dirci il numero di giorni di un determinato mese.
// Quindi faremo così: dato il mese corrente, raggiungiamo il PRIMO giorno del mese successivo, e ci sottraiamo 1 giorno.
// Questo giorno ritrovato (es. 31 dicembre) rappresenta anche il NUMERO DI GIORNI del mese corrente (31).

const numberOfDaysInThisMonth = function () {
  // il costruttore new Date() permette di trovare anche una qualsiasi data nel corso della storia, è sufficiente fornirgli
  // un parametro
  // calcoliamoci questa data utilizzando il costruttore new Date()
  // prima di tutto troviamo l'ANNO CORRENTE
  const currentYear = now.getFullYear() // 2023, perchè getFullYear() torna l'anno in corso
  const currentMonth = now.getMonth() // 11, perchè getMonth() torna l'indice del mese corrente da 0 a 11

  // quello di cui ho bisogno è ottenere l'ULTIMO GIORNO del mese corrente
  // per ottenere tale numero, mi genero una data in cui fornisco a new Date() l'anno corrente, ma anche il mese SUCCESSIVO
  // e poi TOLGO un giorno
  const lastDayOfThisMonth = new Date(currentYear, currentMonth + 1, 0)
  // mese successivo, giorno 0 === ultimo giorno del mese corrente
  console.log(lastDayOfThisMonth)
  // oggi, 7 dicembre, abbiamo ottenuto il 31 dicembre! quindi 31 è il numero dei giorni di dicembre
  // ora basta trovare che numero del giorno del mese è il 31 dicembre, --> 31
  const lastNumericDayOfThisMonth = lastDayOfThisMonth.getDate() // 31
  // ecco il numero di giorno del mese corrente, ovvero il numero di celle che dovremo creare!
  return lastNumericDayOfThisMonth // in questo caso 31
}

const unselectPreviousDays = function () {
  // approccio BULLDOZER
  // seleziono TUTTE LE CELLE e nel dubbio tolgo "selected" a TUTTE :)
  //   const allTheDayCells = document.getElementsByClassName('day') // tutte le celle
  //   for (let i = 0; i < allTheDayCells.length; i++) {
  //     allTheDayCells[i].classList.remove('selected')
  //   }

  // approccio chirurgico
  const previousSelected = document.getElementsByClassName('selected')[0] // precedente cella con "selected", se c'è!
  if (previousSelected) {
    // sarebbe come dire if (typeof previousSelected !== undefined) {
    // solo se previousSelected NON è undefined...
    // se il click non è il primo
    previousSelected.classList.remove('selected') // toglie la classe CSS "selected" dall'elemento
  }
}

const createCalendarCells = function (days) {
  // questa funzione è dedicata alla creazione delle celle nella sezione del calendario
  // ha bisogno di capire quante celle creare!
  // days darà il numero di celle da creare, ovvero il limite superiore del mio ciclo for!

  // prendiamo un riferimento alla sezione vuota dove andranno a finire le caselle dei giorni
  const calendarDiv = document.getElementById('calendar')

  // ciclo for su "days" per generare un numero corrispondente di celle
  for (let i = 0; i < days; i++) {
    // si parte da zero, e questo mese ci si ferma dopo i = 30, un totale di 31 volte

    // creo una cella
    const dayCellDiv = document.createElement('div')
    // <div></div>
    dayCellDiv.classList.add('day') // rendo la cella cliccabile, alta tot, larga tot, con bordo arrotondato etc. etc. (vedi css)
    // <div class="day"></div>

    // rendiamo le celle cliccabili!
    dayCellDiv.addEventListener('click', function (e) {
      // cosa deve succedere su una cella quando ci clicco sopra?
      // prima di tutto, la vorrei impostare come "selezionata"
      // ma devo anche togliere la classe "selected" da un eventuale elemento che già la possiede

      unselectPreviousDays()

      dayCellDiv.classList.add('selected')

      // utilizziamo il numero della cella su cui ho cliccato
      // come nuovo valore dell'elemento in basso a sx "Meeting Day"
      // seleziono quello span
      const selectedDaySpan = document.getElementById('newMeetingDay')
      selectedDaySpan.innerText = i + 1 // lo stesso valore che aveva la cella su cui ho cliccato
      selectedDaySpan.classList.add('hasDay') // ingrandisce un po' il font-size dello span...
    })

    // creo il contenuto della cella, un h3 con valore i + 1
    const cellValue = document.createElement('h3')
    // <h3></h3>
    cellValue.innerText = i + 1
    // <h3>1</h3>

    // dopo aver applicato il contenuto testuale, cerchiamo di trovare tra tutte le celle quella che rappresenta
    // la giornata di oggi

    const today = now.getDate() // oggi torna 7

    if (i + 1 === today) {
      // una delle celle deve colorarsi in modo diverso: quella di oggi!
      cellValue.classList.add('color-epic') // coloriamo in viola la cella del numero di oggi!
    }

    // ora appendo il contenuto della cella nella cella stessa

    // setTimeout(() => {
    dayCellDiv.appendChild(cellValue) // appendo l'h3 dentro la cella "day"
    calendarDiv.appendChild(dayCellDiv) // appendo la cella "day" alla sezione vuota con id "calendar"
    // }, 1000 * (i + 1))

    // creo anche il mini-array dentro events per la giornata corrente (il "cassettino")
    events.push([])
  }
}

// FLUSSO OPERATIVO: esecuzioni delle funzioni
// si stampa il mese corrente
printCurrentMonthInH1()

// si calcola il numero dei giorni
const numberOfDays = numberOfDaysInThisMonth() // 31

// ora il prossimo passo è creare "numberOfDays" volte una cella per il calendario
// si creano le celle
createCalendarCells(numberOfDays) // qui dentro riempio anche la cassettiera, che era nata vuota!

// calendario "base" completo! ora inseriamo la feature di "aggiunta eventi"
console.log(events) // vediamo dopo il ciclo for dei giorni quanti cassettini ha la cassettiera

// ora occupiamoci di lavorare con il form per il new meeting: dobbiamo raccogliere giorno, ora e nome
// per salvare un evento nel "cassettino" giusto!

const formReference = document.getElementsByTagName('form')[0]
// const formReference = document.querySelector('form')
formReference.addEventListener('submit', function (e) {
  e.preventDefault() // altrimenti la pagina si aggiorna!
  // ora possiamo lavorarci :)

  // devo comporre la stringa che salverò nel cassettino giusto
  // recupero il giorno selezionato
  const selectedDay = document.getElementById('newMeetingDay').innerText // '24', '31', '4', etc.
  // recuperiamo il valore dell'input time
  const meetingTime = document.getElementById('newMeetingTime').value // .value perchè è un input! non un h1, span, p, etc. -> "12:00"
  const meetingName = document.getElementById('newMeetingName').value // "Pranzo di Natale!"

  // abbiamo tutti i pezzi! ora componiamo la stringa da salvare:
  const meetingString = meetingTime + ' - ' + meetingName // "12:00 - Pranzo di Natale!"
  //   const meetingString = `${meetingTime} - ${meetingName}` // "12:00 - Pranzo di Natale!"
  //   const meetingString = meetingTime.concat(' - ').concat(meetingName) // "12:00 - Pranzo di Natale!"

  // ora devo solamente inserire la mia stringa dentro il "cassettino" giusto!
  // il cassettino giusto me lo dice selectedDay! però attenzione che dovrò sottrarci 1

  const rightCassettinoIndex = parseInt(selectedDay) - 1 // '25' -> diventa 24
  events[rightCassettinoIndex].push(meetingString)

  // ecco come si mostra la cassettiera dopo ogni push in un cassettino!
  console.log('EVENTS DOPO', events)

  // svuoto il form al termine del salvataggio
  document.getElementById('newMeetingTime').value = ''
  document.getElementById('newMeetingName').value = ''

  // controllo se su questa cella è già presente un elemento "dot"
  const isDot = dayCellNode.querySelector('.dot')
  // nel caso nella cella non ci sia già presente un elemento "dot", non la creeremo di nuovo
  if (!isDot) {
    // solo se nella cella non è già stato creato un elemento "dot"

    // evidenziamo il giorno selezionato nel calendario per mostrare che ha almeno un evento!
    const dot = document.createElement('span')
    dot.classList.add('dot')
    // trovo la cella "day" selected
    // const selectedCell = document.querySelector('.selected') <-- RIP orsi polari
    const selectedCell = document.getElementsByClassName('selected')[0]
    selectedCell.appendChild(dot)
  }
})
