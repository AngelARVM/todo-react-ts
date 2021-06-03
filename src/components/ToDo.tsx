import React, {useState, ChangeEvent, MouseEvent} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IInputs {
    description: string,
    status: 'pending' | 'in progress' | 'completed'
}

interface ITodo extends IInputs{
    id: string,
}

const ToDo = ():JSX.Element => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [inputs, setInputs] = useState<IInputs>({
        description: "",
        status: "pending"
    })
    const status: ('pending' | 'in progress' | 'completed')[] = ['pending', 'in progress', 'completed']

    const handleChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        const {name, value}:  { name: string; value: string } = e.target
        const input = {
            ...inputs,
            [name]: value
        } 
        
        console.log(input)

        setInputs(input)
    }

    const handleClick = ():void => {
        const todo: ITodo =  {
            id: uuidv4(),
            ...inputs,
            }
        
        setTodos([...todos, todo ])
    }
    
    const handleStatus = (e:any):void => {
        const id = e.target.name


        const newTodos: ITodo[] = todos.map(todo => {
            if (todo.id === id){
                let index: number = status.indexOf(todo.status)
                index = index + 1 > 2 ? 0 : index+1
                todo.status = status[index]
            }
            return todo
        })
        
        setTodos(newTodos)
    }

    return (
        <div>
            <input type="input" onChange={handleChange} name="description" value={inputs.description} />
            <select defaultValue={status[0]} name="status" onChange={handleChange} >
                {status?.map((s,i) => <option key={i} value={s}>{s}</option>)}
            </select>
            <button onClick={handleClick}>Add</button>
            {todos?.map(todo => (
                <div key={todo.id}>
                    <h3>{todo.description}</h3>
                    <h4>{todo.status}</h4>
                    <button name={todo.id} onClick={handleStatus}>check</button>
                </div>
            ))}
        </div>
    );
}

export default ToDo;
