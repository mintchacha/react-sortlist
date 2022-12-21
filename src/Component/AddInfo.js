import { BiTrash } from 'react-icons/bi'

function AddInfo({appointment, onDeleteAppoint}){
  return(
    <li>
      <dl>
        <dt>{appointment.petName}</dt>
        <dd className="owner">
          <dfn>예약자명</dfn>
          {appointment.ownerName}
          </dd>
        <dd>{appointment.aptNotes}</dd>
        <dd className="date">{appointment.aptDate}</dd>
      </dl>
      <p>
        <button type="button" onClick={() => onDeleteAppoint(appointment.id)}><BiTrash/></button>
      </p>
    </li>
  )
}
export default AddInfo