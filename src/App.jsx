import { useState } from "react"
import deleteIcon from "./assets/delete.svg"

function App() {
  const [list, setList] = useState([
    { id: 1, title: "For what reason would it be advisable.", status: false },
    { id: 2, title: "For what reason would it be advisable for me to think.", status: true },
    { id: 3, title: "It be advisable for me to think about business content?", status: true },
    { id: 4, title: "Print Statements all", status: false },
    { id: 5, title: "Call Rampbo", status: true },
    { id: 6, title: "Print bills", status: false },
  ]);
  const [displayIncomplete, setDisplayIncomplete] = useState(false);
  const [newTask, setNewTask] = useState("")

  const onChangeInput = (e) => {
    setNewTask(e.target.value)
  }

  const addNewTask = (e) => {
    e.preventDefault();
    if (newTask) {
      const task = {
        id: list.length + 1,
        title: newTask,
        status: 0
      };
      setList([...list, task]);
      setNewTask("");
    }
  }

  const deleteTask = (itemId) => {
    setList(list.filter((task) => task.id !== itemId))
  }

  const changeStatus = (itemId, status) => {
    setList(list.map(task => {
      if (task.id === itemId) {
        return {...task, status}
      }
      return task;
    }))
  }

  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Awesome Todo list</h4>
                  <form onSubmit={addNewTask}>
                    <div className="add-items d-flex">
                      <input id="addNew" name="addNew" type="text" className="form-control todo-list-input" value={newTask} onChange={onChangeInput} placeholder="What do you need to do today?" />
                      <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button>
                    </div>
                  </form>
                  <div className="list-wrapper">
                    <ul className="d-flex flex-column todo-list">
                      {list.filter(task => task && (displayIncomplete ? !task.status : true))
                        .map((task) => (
                          <li key={task.id} className={task.status ? "completed" : ""}>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input className="checkbox" type="checkbox" checked={Boolean(task.status)} onChange={(e) => changeStatus(task.id, e.target.checked)}/>
                                {task.title}
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <img className="remove mdi mdi-close-circle-outline" src={deleteIcon} alt="" onClick={() => deleteTask(task.id)} />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="filter">
                    <input type="checkbox" id="filter" checked={displayIncomplete} onChange={() => setDisplayIncomplete(!displayIncomplete)} />

                    <label htmlFor="filter">Show incompleted only</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
