import { useState } from 'react'
import { BiCalendarPlus } from 'react-icons/bi'

function AddWrite({ toggleForm, formData, setFormData, formDataPublish }){
  if(!toggleForm){
    return null
  }
  return(
    <>
      <ul>
        <li>
          <label htmlFor="userName">집사명</label>
            <input type="text" id="userName" onChange={event => {
              setFormData({...formData,ownerName:event.target.value})
            }}/>
        </li>
        <li>
          <label htmlFor="userChildren">애기명</label>
            <input type="text" id="userChildren" onChange={event => {
              setFormData({...formData,petName:event.target.value})
            }}/>
        </li>
        <li>
          <label htmlFor="userDate">예약일</label>
            <input type="date" id="userDate" onChange={event => {
              setFormData({...formData,aptDate:event.target.value})
            }}/>
        </li>
        <li>
          <label htmlFor="userTime">예약시간</label>
            <input type="time" id="userTime" onChange={event => {
              setFormData({...formData,aptTime:event.target.value})
            }}/>
        </li>
        <li>
          <label htmlFor="userDes">기타설명</label>
            <textarea cols="30" rolse="10" id="userDes" onChange={event => {
              setFormData({...formData,aptNotes:event.target.value})
            }}></textarea>
        </li>
      </ul>
      <p>
        <button type="submit" onClick={formDataPublish}>제출</button>
      </p>
    </>
  )
}

function AddAppointment({onSendAppointment, lastId}){
  const clearData = {
    petName: '',
    ownerName: '',
    aptNotes: '',
    aptDate: ''
  }
  const [ toggleForm, setToggleForm ] = useState(false)  
  const [formData, setFormData] = useState(clearData)
  function formDataPublish(){
    const appointmentInfo = {
      id: lastId + 1,
      petName:formData.petName,
      ownerName:formData.ownerName,
      aptNotes:formData.aptNotes,
      aptDate:formData.aptDate + ' ' + formData.aptTime,
    }
    onSendAppointment(appointmentInfo)
    // 토글
    setToggleForm(!toggleForm)
    setFormData(clearData)
  }

  return(
    <div id="appoint">
      <h4 onClick={() => setToggleForm(!toggleForm)}><BiCalendarPlus/>예약하기</h4>
      <AddWrite 
        toggleForm={toggleForm} 
        formData={formData}        
        formDataPublish={formDataPublish}
        setFormData={setFormData}
      />
    </div>
  )
}
export default AddAppointment