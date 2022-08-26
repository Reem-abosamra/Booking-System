import { useEffect, useState } from "react"
import { getTheStorage } from "../../../scripts/localStorageFunctions"
import {fetchAllFixDeskRequests, fixDeskRequestAction } from "../../../scripts/pureFetchFunctions"
import './desk-requests.scss'



export const DeskRequests = ()=>{
    const
        [fixDeskRequests, setFixDeskRequests] = useState(),
        [adminAction, setAdminAction] = useState(1)

    const {token} = JSON.parse(getTheStorage('userInfo'))

    useEffect(()=>{
        const {token} = JSON.parse(getTheStorage('userInfo'))

        const getAllFixDeskRequests = async()=>{
            await fetchAllFixDeskRequests(token)
            .then(data => setFixDeskRequests(data))
        }

        getAllFixDeskRequests()
    }, [adminAction])

const approveRequest = async(element)=>{
    const requestId = element.target.dataset.requestId



    await fixDeskRequestAction(token, requestId, 'approve')
    .then(data => console.log(data))
    .then(()=> setAdminAction((currentState)=> currentState +1))
}

const declineRequest = async(element)=>{
    const requestId = element.target.dataset.requestId

    await fixDeskRequestAction(token, requestId, 'decline')
    .then(data => console.log(data))
    .then(()=> setAdminAction((currentState)=> currentState +1))
}

    return(
        <section className="fix-desk-requests">
             <h2 className="hidden">Buchungsanfragen</h2>

            <ul className="fix-desk-requests_ul">
                {fixDeskRequests?.map((request, idx)=>{
                    const requestDate=new Date(request.requestedAt.slice(0,10)).toLocaleDateString()
                        
                    return(
                    <li 
                    key={`${request}-${idx}`}
                    >
                      <p className="request_room-desk">{request.desk.office.name} / {request.desk.label}</p>
                      <p className="request_user-name">{request.user.firstname} {request.user.lastname}</p>
                      <p className="request_date">{requestDate}</p>
                        
                        <p className="request_text">{request.comment}</p>

                        <div className="flex-placeholder"></div>

                        <div className="container-buttons">
                            <button 
                            className="approve-request"
                            data-request-id={request.id}
                            onClick={approveRequest}
                            >genehmigen</button>

                            <button 
                            className="approve-request"
                            data-request-id={request.id}
                            onClick={declineRequest}
                            >ablehnen</button>    
                        </div>
                           
                    </li>
                    )
                })}
            </ul>

        </section>
       
    )
}