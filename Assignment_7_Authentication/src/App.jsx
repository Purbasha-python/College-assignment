import {useEffect,useState} from "react";
import "./styles.css";

const strength=(p)=>{
  if(!p)return "";
  let n=0;
  if(p.length>=6)n++;
  if(p.length>=10)n++;
  if(/[A-Z]/.test(p))n++;
  if(/[0-9]/.test(p))n++;
  if(/[^A-Za-z0-9]/.test(p))n++;
  return n<=2?"Weak":n<=4?"Medium":"Strong";
};

const jwt=(u)=>btoa(JSON.stringify({alg:"HS256",typ:"JWT"}))+"."+btoa(JSON.stringify({username:u,iat:Date.now(),simulated:true}))+"."+btoa("assignment-7-demo");

export default function App(){
  const [user,setUser]=useState(null),[username,setUsername]=useState(""),[password,setPassword]=useState(""),[remember,setRemember]=useState(false),[error,setError]=useState("");
  const [tasks,setTasks]=useState(()=>JSON.parse(localStorage.getItem("a7tasks")||"[]")),[task,setTask]=useState("");
  useEffect(()=>{const x=localStorage.getItem("authUser")||sessionStorage.getItem("authUser");if(x)try{setUser(JSON.parse(x))}catch{}},[]);
  useEffect(()=>localStorage.setItem("a7tasks",JSON.stringify(tasks)),[tasks]);

  const login=e=>{
    e.preventDefault();setError("");
    if(!username.trim())return setError("Username is required.");
    if(!password)return setError("Password is required.");
    if(password.length<6)return setError("Password must contain at least 6 characters.");
    const u={username:username.trim(),token:jwt(username.trim()),loginTime:new Date().toLocaleString()};
    setUser(u);
    if(remember){localStorage.setItem("authUser",JSON.stringify(u));sessionStorage.removeItem("authUser")}
    else{sessionStorage.setItem("authUser",JSON.stringify(u));localStorage.removeItem("authUser")}
  };
  const logout=()=>{localStorage.removeItem("authUser");sessionStorage.removeItem("authUser");setUser(null);setUsername("");setPassword("")};
  const add=e=>{e.preventDefault();if(!task.trim())return;setTasks([...tasks,{id:Date.now(),title:task.trim(),completed:false}]);setTask("")};
  if(!user)return <div className="login-page"><div className="login-card"><div className="icon">🔐</div><h1>Authentication System</h1><p className="muted">Assignment 7 • Task Manager</p>
    <form onSubmit={login}><label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter username" autoComplete="username"/>
    <label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password"/>
    {password&&<p className={"strength "+strength(password).toLowerCase()}>Password Strength: <b>{strength(password)}</b></p>}
    <label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember User</label>
    {error&&<p className="error">{error}</p>}<button className="primary">Login</button></form>
    <div className="features"><b>Features</b><p>✓ Login & Logout</p><p>✓ Protected Dashboard</p><p>✓ Remember User</p><p>✓ JWT Token Simulation</p><p>✓ Username & Password Validation</p><p>✓ Password Strength</p></div>
  </div></div>;

  return <div className="app"><header><div><h1>📋 Task Manager</h1><p>Welcome, {user.username}</p></div><button className="logout" onClick={logout}>Logout</button></header>
  <main><section className="card"><span className="badge">🔒 Protected Dashboard</span><h2>Dashboard</h2><p>You are successfully authenticated.</p><div className="info"><b>Logged in as:</b> {user.username}<br/><b>Login time:</b> {user.loginTime}</div><details><summary>View JWT Token Simulation</summary><code>{user.token}</code></details></section>
  <section className="card"><div className="heading"><div><h2>My Tasks</h2><p>Add, complete and delete your tasks.</p></div><span>{tasks.length} tasks</span></div>
  <form className="task-form" onSubmit={add}><input value={task} onChange={e=>setTask(e.target.value)} placeholder="Enter a new task..."/><button className="primary">Add Task</button></form>
  {tasks.length===0?<div className="empty">📝<h3>No tasks yet</h3><p>Add your first task above.</p></div>:<div>{tasks.map(t=><div className="task" key={t.id}><button className="check" onClick={()=>setTasks(tasks.map(x=>x.id===t.id?{...x,completed:!x.completed}:x))}>{t.completed?"✓":"○"}</button><span className={t.completed?"done":""}>{t.title}</span><button className="delete" onClick={()=>setTasks(tasks.filter(x=>x.id!==t.id))}>Delete</button></div>)}</div>}
  </section></main><footer>Assignment 7 — Authentication System</footer></div>;
}