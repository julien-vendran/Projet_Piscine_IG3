function addTime(heure,duree){
    let heureArray=heure.split(":");
    let dureeArray=duree.split(":");
    let returnMinute=parseInt(heureArray[1])+parseInt(dureeArray[1]);
    let returnHours=parseInt(heureArray[0])+parseInt(dureeArray[0]);

    if(returnMinute>=60){
        returnHours++;
        returnMinute-=60;
    }
    if(returnMinute<10)
        returnMinute = "0" + returnMinute;



    return returnHours+":"+returnMinute+":00";
}
let liste=[]
for (let event of tampon) {
    let data ={};
    //Si c'est le créneaux du groupe contenant l'étdiant qui à chargé la page
    let prof ="";
    for (let i of ProfEvent)
    {
        if(i.id===event.id)
            prof+=i.nom+" "+i.prenom+", ";
    }
    if(prof!=="")
        prof="Jury: "+prof.substring(0,prof.length-2);
    if (event.idGroupeProjet!=null) {
        data = {
            id: event.id,
            title: event.salle + " Clique pour plus d'info " + prof,
            start: event.date.split("T")[0] + "T" + event.heureDebut,
            end: event.date.split("T")[0] + "T" + addTime(event.heureDebut, event.dureeCreneau),
            url: "/creneaux/" + event.id,
        };
    }else {
        data = {
            id: event.id,
            title: event.salle + " " + prof,
            start: event.date.split("T")[0] + "T" + event.heureDebut,
            end: event.date.split("T")[0] + "T" + addTime(event.heureDebut, event.dureeCreneau),
        };
    }
    console.log(event.prof)
    liste.push(data);
}

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        titleFormat:{ year: 'numeric', month: 'long', day: 'numeric' },
        allDaySlot:false,
        slotMinTime:"07:00",
        scrollTime:"08:00",
        slotMaxTime:"22:00",
        weekends:false,
        dayMaxEvents:3,
        views:{
            timeGrid: {
                dayHeaderFormat:{ weekday: 'long',day:'numeric'},
            },
            dayGridMonth: {
                dayHeaderFormat:{ weekday: 'long'},
            }
        },
        buttonText:{
            month:    'Mois',
            week:     'Semaine',
        },
        height:'auto',
        dayHeaderFormat:{ weekday: 'long',day:'numeric'},
        nowIndicator: true,
        themeSystem: 'bootstrap',

        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,next',
        },
        events: liste
    });
    calendar.setOption('locale', 'fr');
    calendar.render();
});



