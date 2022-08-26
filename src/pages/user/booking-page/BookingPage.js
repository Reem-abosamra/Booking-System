import { useEffect, useState } from 'react'
import { getTheStorage } from '../../../scripts/localStorageFunctions'
import { bookAFixDesk, bookAFlexDesk, fetchAllBookings, fetchAllComments, fetchAllDesks } from '../../../scripts/pureFetchFunctions'
import './booking.scss'


export const BookingPage = ()=>{

//states

    const 
        [choosenStartDay, setchoosenStartDay] = useState(),
        [choosenEndDay, setChoosenEndDay] = useState(),
        [allDesks, setAllDesks] = useState(),
        [allBookings, setAllBookings] = useState(),
        [searchedDesk, setSearchedDesk] = useState('fixDesk'),
        [searchState, setSearchState] = useState(0),
        [searchedComments, setSearchedComments] = useState()

//variables

    const 
        currentDate = new Date().toISOString().slice(0,10),
        endDateInput = document.getElementById('end-date'),
        startDateInput = document.getElementById('start-date'),
        {token} = JSON.parse(getTheStorage('userInfo')),
        theBlackBackground = document.querySelector('.black-background'),
        theFixButton = document.getElementById('fix-desk-button'),
        theFlexButton = document.getElementById('flex-desk-button')
    

    let 
        theTargetFreeDesks,
        theComments

//fetch all desks

    useEffect( ()=>{
        const {token} = JSON.parse(getTheStorage('userInfo'))

        const getAllDesks = async()=>{
            await fetchAllDesks(token)
            .then(data => {
                setAllDesks(data)
            })
        }
        
        getAllDesks()
    }, [])

    
//fetch all the bookings

    useEffect( ()=>{
        const {token} = JSON.parse(getTheStorage('userInfo'))

        const getAllBookings = async()=>{
            await fetchAllBookings(token)
            .then(data=> setAllBookings(data))
        }

        getAllBookings()
    }, [searchState])



//filter the fetch results and find the free deks for the choosen period and desk type

     const fixDeskRequestFilter = ()=>{
        const theDesksWithoutFixBookings = allDesks.filter((desk)=>{
            return !desk.fixDeskUserId 
        })
       
        const theBookingsWithoutFixDesks = allBookings.filter((booking)=>{
            return !booking.fixDeskUserId
        })

        const allBookingsThatShootOut = theBookingsWithoutFixDesks.filter(booking =>{
            const 
             theRightDateFormatOfThisBooking = new Date(booking.dateEnd).getTime(),
             theChoosenTime = new Date(choosenStartDay).getTime()

            // console.log('booking time', theRightDateFormatOfThisBooking)
            // console.log('start day time', theChoosenTime)

            return(
               theRightDateFormatOfThisBooking > theChoosenTime
            )

        })

        // console.log('desks without fix bookings', theDesksWithoutFixBookings)
        // console.log('the bookings without fix desks',theBookingsWithoutFixDesks)
        // console.log('all bookings that shoot out', allBookingsThatShootOut)

        return theDesksWithoutFixBookings.filter(desk =>{
            return !allBookingsThatShootOut.some(shootOutDesk =>{
                return desk.id === shootOutDesk.desk.id
            })
        })
    }

    const flexDeskRequestFilter = ()=>{
        const allBookingsThatMatchTheChoosenPeriod = allBookings.filter(booking =>{
            const {dateStart, dateEnd} = booking

            let 
                middleDayBooking,
                middleDayChoosen

            choosenStartDay === choosenEndDay
            ? middleDayChoosen = choosenStartDay
            :  middleDayChoosen = addDays(choosenStartDay, 1)

            dateStart === dateEnd
            ? middleDayBooking = dateStart
            : middleDayBooking = addDays(dateStart, 1)
               

            // console.log('booking start day', dateStart)
            // console.log('booking middle day', middleDayBooking)
            // console.log('booking end day', dateEnd)
            // console.log('---')
            // console.log('the user wish start day', choosenStartDay)
            // console.log('the user wish middle day', middleDayChoosen)
            // console.log('the user wish end day', choosenEndDay)
            
            return (
                dateStart === choosenStartDay
                || dateStart ===  middleDayChoosen
                || dateStart === choosenEndDay

                || middleDayBooking === choosenStartDay
                || middleDayBooking === middleDayChoosen
                || middleDayBooking === choosenEndDay

                || dateEnd === choosenStartDay
                || dateEnd === middleDayChoosen
                || dateEnd === choosenEndDay
            )
            
        })


        const allDesksWithoutABookingDateOnTheSearchedDate = allDesks.filter(desk =>{
            return !allBookingsThatMatchTheChoosenPeriod.some(reservedDesk =>{
                return desk.id === reservedDesk.desk.id
            })
        })

        const allFreeDesks = allDesksWithoutABookingDateOnTheSearchedDate.filter(desk=>{
            return !desk.fixDeskUserId
        })

        // console.log('all free desks', allFreeDesks)

        return allFreeDesks
    }

 
//day functions

    const addDays = (date, days)=> {
        let result = new Date(date)
        result.setDate(result.getDate() + days)
        return result.toISOString().slice(0,10)
    }

    const goToEndDay = (element) =>{
        setchoosenStartDay(element.target.value)

        searchedDesk === 'flexDesk' 
        ? endDateInput.disabled = false  
        : endDateInput.disabled = true

        searchedDesk === 'flexDesk'
        ? setSearchState(0)
        : itIsAFlexDesk(element)
    }

    const setTheEndDay = (element)=> {
        setChoosenEndDay(element.target.value)
        setSearchState(1)
    }

    const itIsAFlexDesk = (element)=>{
        setChoosenEndDay(element.target.value)
        setSearchState(1)
    }
  
    
//button functions

    //buttons to choose desk and time

    const fixDeskButton = ()=>{
        theBlackBackground.style.left = '0'
        theFixButton.style.color = 'white'
        theFlexButton.style.color = 'black'

        setSearchState(0)
        setSearchedDesk('fixDesk')
        endDateInput.disabled = true
        endDateInput.value = ''
        startDateInput.value = currentDate
    }
   
    const flexDeskButton = ()=>{
        theBlackBackground.style.left = '50%'
        theFixButton.style.color = 'black'
        theFlexButton.style.color = 'white'

        setSearchState(0)
        setSearchedDesk('flexDesk')
    }

    const refreshTheSearch = (element)=>{
        setSearchState(0)
        element.target.value = currentDate
        endDateInput.value = ''
    }

    
    //buttons for desk card actions

    const showTheContent = async(element)=>{
        const 
            theRoomOverviewSections = document.querySelectorAll('.more-informations_room-overview'),
            theEquipmentSections = document.querySelectorAll('.more-informations_equipment'),
            theCommentsSections = document.querySelectorAll('.more-informations_comments'), 
            thisButton = element.target

        let 
            theSearchedSection,
            selectedSection = element.target.dataset.section

            switch (selectedSection){
                case 'room-overview':
                    theRoomOverviewSections.forEach( item =>{
                        if(item.dataset.deskId === thisButton.dataset.deskId){
                            theSearchedSection = item

                        }
                    })
                    break

                case 'equipment':
                    theEquipmentSections.forEach( item =>{
                        if(item.dataset.deskId === thisButton.dataset.deskId){
                            theSearchedSection = item
                        }
                    })
                    break

                case 'comments':
                        theCommentsSections.forEach( item =>{
                        if(item.dataset.deskId === thisButton.dataset.deskId){
                            theSearchedSection = item
                        }
                        })

                        theComments = await fetchAllComments(thisButton.dataset.deskId, token)
                        setSearchedComments(theComments)
                    break

                default:
                    break
            }
        
        // console.log(theSearchedSection)
        // console.log(element.target.checked)

        // theSearchedSection.style.display = 'block'

        element.target.checked === true
        ? theSearchedSection.style.display = 'block'
        : theSearchedSection.style.display = 'none'
    }

    const deskBooking = async(element)=>{
        const 
            deskId = element.target.dataset.deskId,
            postBookingAnswers = document.querySelectorAll('.response-booking')

        let 
            thisPostBookingAnswer
        
        postBookingAnswers.forEach( element =>{
            if(element.dataset.deskId === deskId){
                thisPostBookingAnswer = element
            }
        })

        // console.log(thisPostBookingAnswer)

        // console.log('deskId', deskId)
        // console.log('token', token)
        // console.log('choosen start day', choosenStartDay)
        // console.log('choosen end day', choosenEndDay)

        // console.log('fix desk ?', searchedDesk)

        searchedDesk === 'fixDesk'
        ?
        await bookAFixDesk(token,deskId, 'Ich würde gerne diesen Tisch buchen' )
        .then(response => {
            // console.log(response)
            response.ok
            ? thisPostBookingAnswer.innerHTML = 'Buchungsanfrage gesendet'
            : thisPostBookingAnswer.innerHTML= 'Anfrage konnte nicht gesendet werden'
        })
        :
        await bookAFlexDesk(token,deskId, choosenStartDay, choosenEndDay )
        .then(response => {
            response.ok
            ? thisPostBookingAnswer.innerHTML = 'Buchung erfolgreich'
            : thisPostBookingAnswer.innerHTML= 'Buchung konnte nicht durchgeführt werden'
        })
    }
 
        
// code branches

    if(choosenStartDay){

        let maxDay = addDays(choosenStartDay, 2)
        // console.log('the selected day is', choosenStartDay)
        // console.log('the max date is', maxDay)

        endDateInput.min = `${choosenStartDay}`
        endDateInput.max = `${maxDay}`
    }

    if(choosenStartDay && choosenEndDay && allBookings){
        flexDeskRequestFilter()

        searchedDesk === 'flexDesk'
        ? theTargetFreeDesks = flexDeskRequestFilter()
        : theTargetFreeDesks = fixDeskRequestFilter()
    }


//console section

    // console.log('the current date', currentDate)
    // console.log('the start day', choosenStartDay)
    // console.log('the end day', choosenEndDay)
    // console.log('all the desks ', allDesks)
    // console.log('all bookings', allBookings)
    // console.log('all bookings that match the choosen period', allBookingsThatMatchTheChoosenPeriod)
    // console.log('all free desks', theFreeDesks)
    // console.log('all free flex desks', theFreeFlexDesks)
    // console.log('all free fixdesks', theFreeFixDesks)
    // console.log('all target free desks', theTargetFreeDesks)
    // console.log('the comments on a specifix desk', searchedComments)
    // console.log('all bookings without fix desks', bookingsWithoutFixDesks)


//return section

    return(
       <section className="booking-page">
        <div className="booking-page_content-flex-container">
            <header className='booking-page_header'>
                <h2 className='hidden'>Tisch und Zeitauswahl</h2>
                <div className='fixDesk-flexDesk-container'>
                    <button  
                    id="fix-desk-button"
                    className='loginOn'
                    onClick={fixDeskButton}>Fix Desk</button>

                    <button  
                    id="flex-desk-button" 
                    className='signUpOn'
                    onClick={flexDeskButton}>Flex Desk</button>

                    <div className='black-background' />
                </div>
                
                    <input type="date" 
                    id="start-date" 
                    min={currentDate}
                    onChange={goToEndDay}
                    onClick={refreshTheSearch}/>

                    <input 
                    type="date" 
                    id="end-date" 
                    className="booking-page_end-date-initial" 
                    disabled
                    onChange={setTheEndDay}
                    />
            </header>
            

                {searchState?  
                theTargetFreeDesks?.map( (desk, idx) =>{
                    return (
                        <div className='container-article' key={`${desk}-${idx}`}>
                            <article  className="free-desk">
                                <header>
                                    <h3>{desk.office.name} / {desk.label}</h3>
                                
                                    <button 
                                    className='user-controll_button booking-button' 
                                    data-desk-id={`${desk.id}`}
                                    onClick={deskBooking}
                                    >Buchen</button>

                                    <p 
                                    className='response-booking'
                                    data-desk-id={`${desk.id}`} ></p>
                                </header>
                            

                                <details>
                                    <summary>Informationen anzeigen</summary>

                                    <section className='more-informations'>
                                        <h4 className="hidden">More Informations</h4>

                                        <div className='user-controll'>

                                            <input type="checkbox" 
                                            className='user-controll_button' 
                                            data-desk-id={`${desk.id}`}
                                            data-section='room-overview'
                                            onClick={showTheContent}
                                            id={`${desk.id}-room-overview`} />

                                            <label htmlFor={`${desk.id}-room-overview`}>Raumübersicht</label>

                                            <input type="checkbox" 
                                            className='user-controll_button' 
                                            data-desk-id={`${desk.id}`}
                                            data-section='equipment'
                                            onClick={showTheContent}
                                            id={`${desk.id}-equipment`} />

                                            <label htmlFor={`${desk.id}-equipment`}>Equipment</label>

                                            <input type="checkbox" 
                                            className='user-controll_button' 
                                            data-desk-id={`${desk.id}`}
                                            data-section='comments'
                                            onClick={showTheContent}
                                            id={`${desk.id}-comments`} />

                                            <label htmlFor={`${desk.id}-comments`}>Kommentare</label>

                                        </div>

                                        <section 
                                        className='more-informations_room-overview hidden'
                                        data-desk-id={`${desk.id}`}>

                                            <h4 className='hidden'>Raumübersicht</h4>
                                            <img src={desk.office.map} alt="eine Übersicht des Raumes" />
                                        </section>

                                        <section 
                                        className='more-informations_equipment hidden'
                                        data-desk-id={`${desk.id}`}>
                                            <h4 className='hidden'>Equipment</h4>

                                            <ul 
                                                className='eqipment-list'
                                                data-desk-id={`${desk.id}`}>

                                                { desk.equipment?.map((item)=>{
                                                        return (
                                                            <li key={`${desk}-${idx}-${item}`}>{item}</li>
                                                        )
                                                    }) }

                                            </ul>  
                                        </section>

                                        <section 
                                        className='more-informations_comments hidden'
                                        data-desk-id={`${desk.id}`}>
                                            <h4 className='hidden'>Kommentare</h4>

                                            {searchedComments?.map(comment=>{
                                                const {commentedAt} = comment

                                                const time = new Date(commentedAt.slice(0,10)).toLocaleDateString()

                                                return(
                                                <div className='comment-card'>
                                                        <p className='comment-card_meta-info'>
                                                        {`${comment.user.firstname} ${comment.user.lastname}  schrieb am ${time}`} </p>

                                                        <p>{comment.comment}</p>
                                                </div> 
                                                )
                                            })}
                                        
                                        </section>

                                    </section>
                                </details>
                                
                            </article>
                        </div>
                    )
                })
            :null}
        
            </div>
        </section> 
    )
}