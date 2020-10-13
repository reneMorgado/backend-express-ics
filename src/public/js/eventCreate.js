var idDownload = [];
var Eventos = [];

function newEvent(setDateYear, setDateMonth, setDateDay, setStartHour, setStartMinutes, setDurationHour, setDurationMinutes, setTitle, setDescription, setLink, setAlarmMinutes, setRepetition, setRepetitionDay) {
    let e = {};
    e.start = [setDateYear, setDateMonth, setDateDay, setStartHour, setStartMinutes];
    e.duration = { hours: setDurationHour, minutes: setDurationMinutes };
    e.title = setTitle;
    if (setLink) {
        e.description = `${setDescription} MEETING LINK: ${setLink} `;
    } else if (!setLink) {
        e.description = setDescription;
    }
    e.alarms = [{ action: 'display', trigger: { hours: 0, minutes: setAlarmMinutes, before: true } }];
    if (setRepetition) {
        switch (setRepetitionDay) {
            case 'MO':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'TU':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=TU;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'WE':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'TH':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=TH;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'FR':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'SA':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=SA;INTERVAL=1;COUNT=4`;
                    break;
                }
            case 'SU':
                {
                    e.recurrenceRule = `FREQ=WEEKLY;BYDAY=SU;INTERVAL=1;COUNT=4`;
                    break;
                }
        }
    }
    Eventos.push(e);
    let card = document.createElement('div');
    card.innerHTML += cardLay(e);
    $CONTAINER_CARDS.appendChild(card)
    console.log(e);
}

const generateDownload = (id) => {
    var download = document.createElement('a');
    download.href = `/download/${id}`;
    download.innerText = "descarga aqui";
    $CONTAINER.appendChild(download);
}

const sendData = () => {
    let dataSend = JSON.stringify(Eventos);
    let formData = new FormData();
    formData.append('datos', dataSend);
    var request = new Request("/add", {
        method: "POST",
        body: formData
    });
    fetch(request)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            let parsed = JSON.parse(data);
            idDownload.push(parsed)
            generateDownload(idDownload[0].randomID)
        })
        .catch(function(err) {
            console.error(err);
        });
};