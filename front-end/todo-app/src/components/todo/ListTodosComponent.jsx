import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllTodosForUsernameApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export default function ListTodosComponent(){
    const today = new Date();
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    useEffect(() => refreshTodos(), [])

    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error));
    }

    function deleteTodo(id){
        deleteTodoApi(username, id)
            .then(() => {
                    setMessage(`Deleted ${id}`)
                    refreshTodos()
                })
            .catch(error => console.log(error));
    }

    function updateTodo(id){
        navigate(`/todo/${id}`);
    }

    function addNewTodo(){
        navigate('/todo/-1')
    }

    return(
        <div className="container">
            <h1>Todos</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            currentTodo => (
                                <tr key={currentTodo.id}>
                                    <td>{currentTodo.description}</td>
                                    <td>{currentTodo.done.toString()}</td>
                                    <td>{currentTodo.targetDate.toString()}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => deleteTodo(currentTodo.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => updateTodo(currentTodo.id)}>Update</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}
