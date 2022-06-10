import './style.css'
import useAxios from './../../hooks/useAxios';
const { useState, useRef, useEffect } = require("react")

class ResponseComponent {
    data = null;
    type = "text";

    constructor(data="", type="text") {
        this.data = data;
        this.type = type;
    }
}

const App = () => {
    const newRow = (data, type) => {
        return new ResponseComponent(data, type)
    }

    const {create} = useAxios();
    const logRef = useRef();
    const [lock, setlock] = useState(false);
    const [server, setServer] = useState("https://api-test.upn164.edu.mx/api/test");
    const [queryShow, setQueryShow] = useState("10650149");
    const [paramMessage, setParamMessage] = useState("Hola mundo!");
    const [log, setLog] = useState([
        newRow("The system has been initialized successfully", "message")
    ]);


    const scrollLog = () => {
        let e = logRef.current;
        e.scrollTop = e.scrollHeight - e.clientHeight;
        e.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollLog()
    }, [log]);
    

    const processResponse = (label, url, response, callback = () => {}) => {

        if(response.status >= 200 && response.status < 300) {
            const output = []
            let date = new Date();
            const dateNow = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            output.push(newRow(null, "blank"));
            output.push(newRow(label, "message"));
            output.push(newRow("RESPONSE DATE: " + dateNow, "date"));
            output.push(newRow(url, "url"));
            output.push(newRow(response.status, "status"));
            output.push(newRow(response.statusText, "status-text"));
            output.push(newRow(response.data, "json"));
            output.push(newRow(null, "blank"));
            output.push(newRow(null, "end"));
            setLog((prevState => {
                return [...prevState, ...output]
            }))
            callback()
            return
        }

        const output = []
        let date = new Date();
        const dateNow = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        output.push(newRow(null, "blank"));
        output.push(newRow(label, "message"));
        output.push(newRow("RESPONSE DATE: " + dateNow, "date"));
        output.push(newRow(url, "url"));
        output.push(newRow(response.response.status, "status"));
        output.push(newRow(response.response.statusText, "status-text"));
        output.push(newRow(response.message, "text"));

        output.push(newRow(null, "blank"));
        output.push(newRow(null, "end"));
        setLog([...log, ...output])
        callback()
    }

    const clearLog = () => {
        setLog([newRow("The system has been reinitialized successfully", "message") ])
    }

    const handleRunGet = (callback = () => {}) => {
        const url = server
        setlock(true)
        setTimeout(() => {
            create(server).get("").then((response) => {
                processResponse("Executing GET test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing GET test", url, err, callback)
            })
        }, 250);
    }

    const handleRunShow = (callback = () => {}) => {
        const url = server + "/" +queryShow
        setlock(true)
        setTimeout(() => {
            create(server).get("/"+queryShow).then((response) => {
                processResponse("Executing SHOW test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing SHOW test", url, err, callback)
            })
        }, 250);
    }

    const handleRunPost = (callback = () => {}) => {
        const url = server
        setlock(true)
        setTimeout(() => {
            create(server).post("/", {message: paramMessage}).then((response) => {
                processResponse("Executing POST test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing POST test", url, err, callback)
            })
        }, 250);
    }

    const handleRunPut = (callback = () => {}) => {
        const url = server+"/"+queryShow
        setlock(true)
        setTimeout(() => {
            create(server).put("/"+queryShow, {message: paramMessage}).then((response) => {
                processResponse("Executing PUT test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing PUT test", url, err, callback)
            })
        }, 250);
    }

    const handleRunPatch = (callback = () => {}) => {
        const url = server+"/"+queryShow
        setlock(true)
        setTimeout(() => {
            create(server).patch("/"+queryShow, {message: paramMessage}).then((response) => {
                processResponse("Executing PATCH test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing PATCH test", url, err, callback)
            })
        }, 250);
    }

    const handleRunDelete = (callback = () => {}) => {
        const url = server+"/"+queryShow
        setlock(true)
        setTimeout(() => {
            create(server).delete("/"+queryShow).then((response) => {
                processResponse("Executing DELETE test", url, response, callback)
                setlock(false)
            }).catch(err => {
                setlock(false)
                processResponse("Executing DELETE test", url, err, callback)
            })
        }, 250);
    }

    const handleRunAll = (callback = () => {}) => {
        handleRunGet(() =>{
            handleRunShow(()=>{
                handleRunPost(()=>{
                    handleRunPut(()=>{
                        handleRunPatch(()=>{
                            handleRunDelete()
                        })
                    })
                })
            })
        })
    }


    return <div className="flex items-center justify-start flex-row w-full h-screen select-none bg-gray-800 text-white">
        <div className={["top flex  flex-col justify-start items-center h-full w-1/2", (lock ? 'opacity-30' : '')].join(" ")}>
            <div className="mt-4 w-10/12">
                <h1 className="text-2xl text-center">React API TESTER</h1>
                <p className="text-md text-center">Este proyecto permite realizar pruebas funcionales a una API publica en sus metodos GET, POST, PUT, PATCH, DELETE</p>
            </div>
            <div className="mt-4 w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-1/2 mt-4">
                    <label htmlFor="server" className="font-bold uppercase mb-2">Dirección del servidor de pruebas</label>
                    <input id="server" name="server" className="py-2 px-4 shadow w-full text-black text-center" value={server} onChange={(e)=>{setServer(e.target.value)}}/>
                </div>

                <div className="flex flex-col items-center justify-center w-1/2 mt-4">
                    <label htmlFor="server" className="font-bold uppercase mb-2">Query Show</label>
                    <input id="server" name="server" className="py-2 px-4 shadow w-full text-black text-center" value={queryShow} onChange={(e)=>{setQueryShow(e.target.value)}}/>
                </div>

                <div className="flex flex-col items-center justify-center w-1/2 mt-4">
                    <label htmlFor="server" className="font-bold uppercase mb-2">Parameter Message</label>
                    <input id="server" name="server" className="py-2 px-4 shadow w-full text-black text-center" value={paramMessage} onChange={(e)=>{setParamMessage(e.target.value)}}/>
                </div>
            </div>
            <div className={["mt-4 w-9/12 flex flex-col items-center justify-center", (lock ? 'opacity-30' : '')].join(" ")}>
                <div className="grid grid-col grid-cols-3 flex-row items-center justify-between w-full my-4">
                    <button className="bg-blue-400 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunGet}>GET</button>
                    <button className="bg-blue-300 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunShow}>SHOW</button>
                    <button className="bg-green-500 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunPost}>POST</button>
                    <button className="bg-orange-400 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunPut}>PUT</button>
                    <button className="bg-yellow-400 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunPatch}>PATCH</button>
                    <button className="bg-red-400 hover:scale-105 active:scale-95 py-1 px-2 rounded font-bold shadow flex-1 m-2 " type="button" onClick={handleRunDelete}>DELETE</button>
                </div>
                <div className="flex flex-row items-center justify-around w-full mt-4">
                    <button className="bg-cyan-500 py-1 px-4 hover:scale-105 active:scale-95 rounded font-bold shadow h-10" type="button" onClick={handleRunAll}>Ejecutar todas las pruebas</button>
                    <button className="bg-purple-500 py-1 px-4 hover:scale-105 active:scale-95 rounded font-bold shadow h-10" type="button" onClick={clearLog}>Limpiar Registros</button>
                </div>
            </div>
        </div>
        <div className={["top bg-white h-full w-1/2"].join(" ")} >
            <pre className="h-full overflow-y-auto text-xs pb-10" ref={logRef}>
                {
                    log.map((item, key) => {
                        switch(item.type){
                            case "cancel":
                                return <span key={key}>Proceso cancelado.</span>
                            case "end":
                                return <span key={key}>Proceso finalizado.</span>
                            case "blank":
                                return <span key={key}></span>
                            case "message":
                                return <span key={key}>
                                    <p className="inline-block font-bold text-yellow-400">--- {item.data} ---</p>
                                </span>
                            case "date":
                                return <span key={key}>
                                    <p className="inline-block font-bold text-red-500">{item.data}</p>
                                </span>
                            case "url":
                                return <span key={key}>
                                    <p className="inline-block">SERVER URL: </p>
                                    <p className="inline-block font-bold text-green-500">{item.data}</p>
                                </span>
                            case "status":
                                return <span key={key}>
                                    <p className="inline-block">STATUS OPERATION: </p>
                                    <p className="inline-block font-bold text-yellow-500">{item.data}</p>
                                </span>
                            case "status-text":
                                return <span key={key}>
                                    <p className="inline-block">STATUS TEXT: </p>
                                    <p className="inline-block font-bold text-cyan-500">{item.data}</p>
                                </span>
                            case "json":
                                return <span className="text-sm text-red-400" key={key}>
                                    <p className="inline-block">RESPONSE DATA: </p>
                                    <div className="pl-10 w-full">
                                        {
                                            JSON.stringify(item.data, null, 4)
                                        }
                                    </div>
                                </span>
                            case "text":
                                return <span key={key}>{item.data}</span>
                            default:
                                return <span key={key}>UNKNONWN</span>
                        }
                    })
                }
            </pre>
        </div>
    </div>
}

export default App