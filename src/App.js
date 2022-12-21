import AddAppointment from './Component/AddAppointment';
import Search from './Component/Search';
import AddInfo from './Component/AddInfo';
import { useCallback, useEffect, useState } from 'react';

import { BiArchive } from 'react-icons/bi'
import './App.css';

function App() {  
  const [appointList, setAppointList] = useState([])
  const [query, setQuery] = useState('')
  const [sortBy,setSortBy] = useState('petName')
  const [orderBy,setOrderBy] = useState('asc')

  const filterAppointment = appointList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLowerCase()) || 
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )  
    }
  ).sort((a,b) => {
    let order = (orderBy === 'asc' ? 1 : -1)
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })
  const fetchData = useCallback(() => {
    fetch('/data.json',{
      headers:{
        Accept:{
          Accept:'application/json'
        }
      }
    })
    .then(response => response.json())
    .then(data => setAppointList(data))
  },[])
  useEffect(() => {
    fetchData()
  },[fetchData])

  const onDeleteAppoint = (id) => {
    setAppointList(appointList.filter(appointment => id !== appointment.id))
  }
  

  return (
    <article>
      <h3><BiArchive style={{color:'#4495f7'}}/>예약 시스템</h3>
      <AddAppointment 
        onSendAppointment = {
          myAppintment => setAppointList([...appointList, myAppintment])
        }
        lastId = {
          appointList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)
        }
      />
      <Search
        query={query}
        onQueryChange={ myQuery => setQuery(myQuery)}
        sortBy={sortBy}
        onSortChange={ mySort => setSortBy(mySort)}
        orderBy={orderBy}
        onOrderChange={ myOrder => setOrderBy(myOrder)}
      />
      <div id="list">
        <ul>
          {filterAppointment.map(appointment => 
            <AddInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppoint={onDeleteAppoint}
            />
          )}
        </ul>        
      </div>      
    </article>
  );
}

export default App;
