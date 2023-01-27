import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar, mostrarListadoCheckList } from './helpers/inquirer.js';

import { Tareas } from './models/tareas.js';


 
const main = async () => {
  
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if( tareasDB ){
                  //establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);

  }

  // await pausa();

  do {
    // Esto imprime el menu
    opt = await inquirerMenu();
    // console.log( {opt });

    switch (opt){
       case '1':
            // Crear opcion
            const desc = await leerInput('Descripción:');
            tareas.crearTarea( desc );
        break;

       case '2':
        // Lista las tareas y muestra lo ingresado
        tareas.listadoCompleto(); 
        break;  
        
      case '3': //listar completadas
      tareas.listarPendientesCompletadas(true);
      break;

      case '4': //listar pendientes
      tareas.listarPendientesCompletadas(false);
      break;

      case '5':  //completado | pendiente
          const ids = await mostrarListadoCheckList( tareas.listadoArr )
          tareas.toggleCompletadas( ids );
      break;

      case '6': //borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
          if(id !== '0'){
        const ok = await confirmar('¿Está seguro?');
        if(ok){
              tareas.borrarTarea( id );
              console.log('Tarea borrada');
        }
      }
      break;
    }
  

    guardarDB( tareas.listadoArr );
    
// Llama a la funcion Pausa que inserta una pausa en el do whiles
    await pausa();

  } while (opt !== '0');
};
 
main();