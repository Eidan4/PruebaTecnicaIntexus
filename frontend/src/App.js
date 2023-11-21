import { useEffect, useState } from 'react';
import './App.css';
import TableCiudad from './components/TableCiudad';
import TablePais from './components/TablePais';
import axios from 'axios';
import baseUrl from './utils/baseUrl';

function App() {
  const [ciudad, setCiudad] = useState([]);
  const [pais ,SetPais] = useState([])

  const getPais = async() => {
      try {
          const url = `${baseUrl}/api/paises/`
          const response = await axios.get(url)
          SetPais(response.data)
      } catch (error) {
          console.log(error);
      }
  }

  const getCiudad = async() =>{
      try {
          const url = `${baseUrl}/api/ciudades/`
          const response = await axios.get(url)
          setCiudad(response.data)
      } catch (error) {
          console.log(error);
      }
  } 

  useEffect(() => {
    getPais()
    getCiudad()
  }, [])
  

  return (
    <div className="App">
      <TablePais pais={pais} SetPais={SetPais} />
      <TableCiudad pais={pais} ciudad={ciudad} setCiudad={setCiudad} />
    </div>
  );
}

export default App;
