import React, {useState} from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorMatricula, setErrorMatricula] = useState('');
  const [errorMateria, setErrorMateria] = useState('');
  const [errorCalificacion, setErrorCalificacion] = useState('');

  const [estudiantes, setEstudiantes] = useState([]);
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);

  const validarLetras = (texto) => /^[a-zA-Z\s]+$/.test(texto.trim());
  const validarNumeros = (texto) => /^[0-9]*$/.test(texto.trim());

  const handleRegistro = (e) => {
    e.preventDefault();
    let esValido = true;

    if (!validarLetras(nombre)){
      setErrorNombre('Solamente letras');
      esValido = false;
    } else {
      setErrorNombre('');
    }

    if (!validarNumeros(matricula)){
      setErrorMatricula('Solamente numeros');
      esValido = false;
    } else {
      setErrorMatricula('');
    }

    if (!validarLetras(materia)){
      setErrorMateria('Solamente letras');
      esValido = false;
    } else{
      setErrorMateria('');
    }

    const califNum = parseInt(calificacion, 10);
    if (!validarNumeros(calificacion) || califNum < 0 || califNum > 10){
      setErrorCalificacion('Solo de 0-10 y numeros');
      esValido = false;
    } else {
      setErrorCalificacion('');
    }

    if (esValido) {
      setEstudiantes([...estudiantes, {nombre: nombre.trim(), matricula: matricula.trim(), materia: materia.trim(), calificacion: calificacion.trim()}]);
      setNombre('');
      setMatricula('');
      setMateria('');
      setCalificacion('');
      alert('Estudiante registrado exitosamente');
    } else {
      alert('Error: Revisa los mensajes en rojo. No se puede registrar hasta corregirlos');
    }
  };

  const handleBusqueda = () => {
    if (!nombreBusqueda.trim()) return;

    const estudianteEncontrado = estudiantes.find(
      (est) => est.nombre.toLowerCase() === nombreBusqueda.toLowerCase()
    );
    setResultado(estudianteEncontrado || 'No encontrado'); 
  };

  return (
    <div className="Estudiantes">
      <header className="App-header">
        <h1>Registro de Estudiantes</h1>

        {/* Formulario de Ingreso */}
        <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBotton: '30px'}}>
          <div>
            <label>Introduce Nombre: </label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            {errorNombre && <span style={{ color: 'red', marginLeft: '10px'}}>{errorNombre}</span>}
          </div>

          <div>
            <label>Introduce Matricula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} />
            {errorMatricula && <span style={{color: 'red', marginLeft: '10px'}}>{errorMatricula}</span>}
          </div>
            
          <div>
            <label>Introduce Materia</label>
            <input value={materia} onChange={(e) => setMateria(e.target.value)} />
            {errorMateria && <span style={{color: 'red', marginLeft: '10px'}}>{errorMateria}</span>}
          </div>

          <div>
            <label>Introduce Calificacion</label>
            <input value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
            {errorCalificacion && <span style={{color: 'red', marginLeft: '10px'}}>{errorCalificacion}</span>}
          </div>

          <button type="submit" style={{marginTop: '10px' }}>Registar</button>
        </form>

        <hr style={{ marginTop: '20px'}} />

        {/*Muestreo temporal*/}
        {estudiantes.lenght > 0 && (
          <div style ={{ marginBottom: '20px', fontSize: '14px', color: 'lightgreen'}}>
            <p>Total de registrados en memoria: {estudiantes.lenght}</p>
          </div>
        )}

        {/*Sección de Búsqueda*/}
        <div style={{ marginTop:'20px'}}>
          <h3>Nombre que buscas:</h3>
          <input
            value={nombreBusqueda}
            onChange={(e) => setNombreBusqueda(e.target.value)}
            placeholder="Buscar por nombre..."
          />
          <button onClick={handleBusqueda} style={{marginLeft: '10px'}}>Buscar</button>

          {resultado && resultado !== 'No encontrado' && (
            <div style={{marginTop: '20px', textAlign: 'left', border: '1px solid white', padding: '10px'}}>
              <p><strong>Matricula:</strong> {resultado.matricula}</p>
              <p><strong>Materia:</strong> {resultado.materia}</p>
              <p><strong>Calificacion:</strong> {resultado.calificacion}</p>
            </div>
          )}
          {resultado ==='No encontrado' && (
            <p style={{ color: 'orange' }}>No se encontro un estudiante con ese nombre.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
