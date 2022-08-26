import { useEffect, useState } from "react"
import { getTheStorage } from "../../../scripts/localStorageFunctions"
import { bookAFixDesk, bookAFlexDesk, deleteAFavourite, fetchAllBookings, fetchAllFavourites } from "../../../scripts/pureFetchFunctions"
import deleteIcon from '../../../assets/icons/delete-icon.png'
import './favourite-page.scss'




export const FavouritePage = ()=>{
    const 
        [allFavourites, setAllFavourites] = useState(),
        [searchState, setSearchState] = useState(0),
        [searchedDesk, setSearchedDesk] = useState('fixDesk'),
        [choosenStartDay, setChoosenStartDay] = useState(),
        [choosenEndDay, setChoosenEndDay] = useState(),
        [allBookings, setAllBookings] = useState(),
        [deleteState, setDeleteState] = useState(0)


    const
        {token} = JSON.parse(getTheStorage('userInfo')),
        theBlackBackground = document.querySelector('.black-background'),
        theFixButton = document.getElementById('fix-desk-button'),
        theFlexButton = document.getElementById('flex-desk-button'),
        currentDate = new Date().toISOString().slice(0,10),
        endDateInput = document.getElementById('end-date'),
        startDateInput = document.getElementById('start-date')

    let
        theTargetFreeDesks
    

//fetching

        //all favourites
        useEffect( ()=>{
            const {token} = JSON.parse(getTheStorage('userInfo'))
    
            const getAllFavourites = async()=>{
                await fetchAllFavourites(token)
                .then(data => {
                    setAllFavourites(data)
                })
            }
            
            getAllFavourites()
        }, [deleteState])

        //all bookings
        useEffect( ()=>{
            const {token} = JSON.parse(getTheStorage('userInfo'))
    
            const getAllBookings = async()=>{
                await fetchAllBookings(token)
                .then(data=> setAllBookings(data))
            }
    
            getAllBookings()
        }, [searchState])


// filter

    const favouriteFixDeskFilter = ()=>{

        const theFavouriteDesksWithoutFixBookings = allFavourites.filter((favouriteDesk)=>{
            return !favouriteDesk.fixDeskUserId 
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

        return theFavouriteDesksWithoutFixBookings.filter(desk =>{
            return !allBookingsThatShootOut.some(shootOutDesk =>{
                return desk.id === shootOutDesk.desk.id
            })
        })
    }

    const favouriteFlexDeskFilter = ()=>{
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


        const allFavouriteDesksWithoutABookingDateOnTheSearchedDate = allFavourites.filter(desk =>{
            return !allBookingsThatMatchTheChoosenPeriod.some(reservedDesk =>{
                return desk.id === reservedDesk.desk.id
            })
        })

        const allFreeDesks = allFavouriteDesksWithoutABookingDateOnTheSearchedDate.filter(desk=>{
            return !desk.fixDeskUserId
        })

        // console.log('all free desks', allFreeDesks)

        return allFreeDesks
    }

    
// button functions
    const fixDeskButton = ()=>{
        theBlackBackground.style.left = '0'
        theFixButton.style.color = 'white'
        theFlexButton.style.color = 'black'

        setSearchState(0)
        setSearchedDesk('fixDesk')
        endDateInput.disabled = true
        endDateInput.value = '0000-00-00'
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
        console.clear()
        setSearchState(0)
        element.target.value = currentDate
        endDateInput.value = currentDate
  
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

        // console.log('this response field', thisPostBookingAnswer)
        // console.log('deskId', deskId)
        // console.log('token', token)
        // console.log('choosen start day', choosenStartDay)
        // console.log('choosen end day', choosenEndDay)

        searchedDesk === 'fixDesk'
        ?
        await bookAFixDesk(token,deskId, 'Ich würde gerne diesen Tisch buchen' )
        .then(response => {
            console.log(response)
            response.ok
            ? thisPostBookingAnswer.innerHTML = 'Buchungsanfrage gesendet'
            : thisPostBookingAnswer.innerHTML= 'Anfrage konnte nicht gesendet werden'
        })
        :
        await bookAFlexDesk(token,deskId, choosenStartDay, choosenEndDay )
        .then(response => {
            console.log(response)
            response.ok
            ? thisPostBookingAnswer.innerHTML = 'Buchung erfolgreich'
            : thisPostBookingAnswer.innerHTML= 'Buchung konnte nicht durchgeführt werden'
        })

        console.log('is this a fix desk ?', searchedDesk)
    }

    const deleteASpecificFavourite = async(element)=>{
        const deskId = element.target.dataset.deskId
        await deleteAFavourite(token, deskId)
        .then(response =>{
            // console.log(response.ok)
            response.ok
            ? setDeleteState(prevState => prevState +1)
            : console.log('deleting a favourite is failed')
        })
            
    }

// day functions
    const addDays = (date, days)=> {
        let result = new Date(date)
        result.setDate(result.getDate() + days)
        return result.toISOString().slice(0,10)
    }

    const goToEndDay = (element) =>{
        // const endDateInput = document.getElementById('end-date')
        setChoosenStartDay(element.target.value)
        // endDateInput.value = '0000-00-00'

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

// code branches

    if(choosenStartDay){

        let maxDay = addDays(choosenStartDay, 2)
        // console.log('the selected day is', choosenStartDay)
        // console.log('the max date is', maxDay)

        endDateInput.min = `${choosenStartDay}`
        endDateInput.max = `${maxDay}`

    }


    if(choosenStartDay && choosenEndDay && allBookings && searchState){
        searchedDesk === 'flexDesk'
        ? theTargetFreeDesks = favouriteFlexDeskFilter()
        : theTargetFreeDesks = favouriteFixDeskFilter()
    }


// console section

    // console.log('the token is', token)
    // console.log('all Favourites are', allFavourites)
    // console.log('the start day', choosenStartDay)
    // console.log('the end day', choosenEndDay)
    // console.log('all bookings', allBookings)
    // console.log('all bookings that match', allBookingsThatMatchTheWantedPeriod)
    // console.log('the target free desks', theTargetFreeDesks)
    // console.log('delete state', deleteState)


    return(
       <section className="favourite-page">
        <div className="favourite-page_content-flex-container">
            <header className="favourite-page_header">
                <h2 className="hidden">Favoriten</h2>

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

                <input 
                type="date" 
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
            
            <ul className="favourite-page_list">
                {allFavourites && !searchState
                ?allFavourites?.map((favourite, idx) =>{
                    return(
                        <li key={`${favourite}-${idx}-li`}>
                            <p className="office-and-desk">
                                {favourite.office.name} / {favourite.label}
                            </p>

                            <p style={{marginLeft: "0.5rem"}}>
                                {favourite.fixDeskUserId && ' besitzt eine Fix Desk Buchung'}
    
                            </p>

                            <button 
                            className="delete-from-booking"
                            data-desk-id={favourite.id}
                            onClick={deleteASpecificFavourite}>
                                <img 
                                src={deleteIcon} 
                                alt="ein Mülleimaler als Symbol um Eintrag aus Favoriten zu entfernen" 
                                data-desk-id={favourite.id}/>
                            </button>
                        </li>
                    )
                })
            :
            theTargetFreeDesks?.map((desk, idx)=>{
                return(
                    <li key={`${desk}-${idx}-li-free`}>
                        <p className="office-and-desk">
                            {desk.office.name} / {desk.label}
                        </p>

                        {/* <p>
                            {desk.fixDeskUserId
                            ? 'Fix Desk'
                            : 'Flex Desk'}
                        </p> */}

                        <button 
                        className="booking-button-favourite"
                        data-desk-id={desk.id}
                        onClick={deskBooking}>
                                Buchen
                        </button>

                        <p 
                        className="response-booking"
                        data-desk-id={desk.id}>

                        </p>
                    </li>
                )
            })
            }
                 
            </ul>  
            </div>
        </section>
    )
}