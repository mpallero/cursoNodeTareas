import { v4 as uuidv4 } from 'uuid';
import { Tareas } from './tareas.js';

class Tarea{
    
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
        
    }
    
}

export { Tarea };