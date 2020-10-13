const $CONTAINER = document.getElementById('container');
const $APP = document.getElementById('app-div');
const $INPUT_DATE = document.getElementById('getDate');
const $CONTAINER_INPUT_DATE = document.getElementById('dateInputs');
const $CONTAINER_CARDS = document.getElementById('eventsContainer');

const checkboxLay = (day) => {
    const view = `                <br><label class="checkbox">
    <input type="checkbox" id="getRepetition">
    Agendar cada ${day} durante 4 semanas <i id="FAQICON"class="far fa-question-circle"></i> <p id="FAQTEXT">Se limita a 4 semanas para evitar bugs en google calendar</p>
  </label>`
    return view;
}

const cardLay = (card) => {
    const view = ` 
    <div class="card marginCard">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${card.title}</p>
                </div>
            </div>
        </div>
        <div class="content">
            ${card.description}
            <br>
            <time datetime="2016-1-1"><strong>${card.start[0]}/${card.start[1]}/${card.start[2]} a las ${card.start[3]}:${card.start[4]} </strong></time>
        </div>
    </div>`
    return view;
}

$INPUT_DATE.addEventListener('change', () => {
    if ($CONTAINER_INPUT_DATE.childElementCount > 2) {
        $CONTAINER_INPUT_DATE.lastElementChild.remove()
    }
    switch ($INPUT_DATE.valueAsDate.getDay()) {
        case 0:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('lunes')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 1:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('martes')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 2:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('miercoles')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 3:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('jueves')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 4:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('viernes')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 5:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('sabado')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        case 6:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('domingo')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
        default:
            {
                let che = document.createElement('div');
                che.innerHTML += checkboxLay('NO DAY SELECTED')
                $CONTAINER_INPUT_DATE.appendChild(che)
                break;
            }
    }
})

const clearFields = () => {
    document.getElementById('getTitle').value = '';
    document.getElementById('getDesc').value = '';
    document.getElementById('getLink').value = '';
    document.getElementById('getDate').value = '';
    document.getElementById('getRepetition').checked = false;
    document.getElementById('getTimeStart').value = '';
    document.getElementById('getHourDuration').value = '';
    document.getElementById('getMinuteDuration').value = '';
    document.getElementById('getMinutesBefore').value = '';
}

const readData = () => {
    let setDateYear = document.getElementById('getDate').value.split('-')[0];
    let setDateMonth = document.getElementById('getDate').value.split('-')[1];
    let setDateDay = document.getElementById('getDate').value.split('-')[2];
    let setStartHour = document.getElementById('getTimeStart').value.slice(0, 2);
    let setStartMinutes = document.getElementById('getTimeStart').value.slice(3, 5);
    let setDurationHour = document.getElementById('getHourDuration').value;
    let setDurationMinutes = document.getElementById('getMinuteDuration').value;
    let setTitle = document.getElementById('getTitle').value;
    let setDescription = document.getElementById('getDesc').value;
    let setLink = document.getElementById('getLink').value;
    let setAlarmMinutes = document.getElementById('getMinutesBefore').value;
    let setRepetitionDay;
    let setRepetition = false;
    if (!setDateYear || !setDateMonth || !setDateDay || !setStartHour || !setStartMinutes || !setDurationHour || !setDurationMinutes || !setTitle || !setAlarmMinutes) {
        alert('Por favor llena todos los campos');
    } else {
        if (getRepetition.checked === true) {
            setRepetition = true;
            switch ($INPUT_DATE.valueAsDate.getDay()) {
                case 0:
                    {
                        setRepetitionDay = 'MO'
                        break;
                    }
                case 1:
                    {
                        setRepetitionDay = 'TU'
                        break;
                    }
                case 2:
                    {
                        setRepetitionDay = 'WE'
                        break;
                    }
                case 3:
                    {
                        setRepetitionDay = 'TH'
                        break;
                    }
                case 4:
                    {
                        setRepetitionDay = 'FR'
                        break;
                    }
                case 5:
                    {
                        setRepetitionDay = 'SA'
                        break;
                    }
                case 6:
                    {
                        setRepetitionDay = 'SU'
                        break;
                    }
            }
        } else {
            setRepetitionDay = null;
        }

        newEvent(setDateYear, setDateMonth, setDateDay, setStartHour, setStartMinutes, setDurationHour, setDurationMinutes, setTitle, setDescription, setLink, setAlarmMinutes, setRepetition, setRepetitionDay, )
        clearFields();
    }
}