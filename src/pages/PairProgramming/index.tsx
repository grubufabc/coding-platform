import React from 'react'
import Chat from './Chat'
import IDE, { IDEHandles } from '../../components/IDE'
import FormUser from './FormUser'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import io, { Socket } from 'socket.io-client'
import { API_URL } from '../../api'


interface Environment {
    language: string
    sourceCode: string
    stdin: string
    timestamp: number;
}

export interface Message {
    content: string
    author: string
}

export interface Avatar {
    color: string
    name: string
}

export interface User {
    id: string
    avatar: Avatar
}

export interface Room {
    id: string
    environment: Environment
    messages: Message[]
    users: User[]
}

const PairProgramming: React.FC = () => {
    const IDERef = React.useRef<IDEHandles>(null)
    const [IDRoom, setIDRoom] = React.useState<string>('')
    const [IDRoomInput, setIDRoomInput] = React.useState<string>('')


    // Web Socket
    const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
    const [room, setRoom] = React.useState<Room>()
    const [avatar, setAvatar] = React.useState<Avatar>({ name: 'Anônimo', color: '#000000'})
    const [environment, setEnvironment] = React.useState<Environment>({ sourceCode: '', language: '', stdin: '', timestamp: 0})

    React.useEffect(() => {
        const IDE = IDERef.current
        if(!IDE) return
        const { sourceCode, language, stdin } = environment
        IDE.setCode(sourceCode, environment.timestamp)
        IDE.setLanguage(language)
        IDE.setStdin(stdin, environment.timestamp)
    }, [environment])

    const handleEvents = {
        'room-created': (data: any) => {
            // console.log(`room-created => data:`, data)
            setIDRoom(data.IDRoom)
        },
        'room-updated': (data: any) => {
            // console.log(`room-updated => data:`, data)
            setRoom(data as Room)
            setEnvironment(data.environment as Environment)
        },
        'user-info-updated': (data: any) => {
            if(!room) return
            // console.log(`user-info-updated => data:`, data)
            setRoom({...room, users: (data as User[])})
        },
        'room-changed': (data: any) => {
            // console.log(`room-changed => data:`, data)
            setRoom(data as Room)
        },
        'messages-updated': (data: any) => {
            // console.log(`messages-updated => data:`, data)
            setRoom((room) => {
                if(room === undefined) return undefined
                room.messages = data as Message[]
                return { ...room }
            })
        },
        'environment-updated': (env: Environment) => {
            // console.log(`environment-updated => data:`, data)
            setRoom((room) => {
                if(!room) return room
                room.environment = env
                if(env.timestamp >= environment.timestamp){
                    setEnvironment(room.environment)
                }
                return {...room}
            })
        }
    }

    const connect = (): Socket<DefaultEventsMap, DefaultEventsMap> => {
        if (socket) return socket
        const connection = io(`${API_URL}/`)
        Object.entries(handleEvents).forEach(([observerName, fn]) => {
            connection.on(observerName, fn)
        })
        setSocket(connection)
        return connection
    }

    const handleJoinToTheRoom = () => {
        if(!IDRoomInput.length) return
        connect().emit('enter-room', IDRoomInput)
        setIDRoom(IDRoomInput)
    }

    const handleCreateRoom = () => {
        connect().emit('create-room')
    }

    const handleNewMessage = (content: string) => {
        connect().emit('new-message', { content })
    }

    const handleUpdateUser = (avatar: Avatar) => {
        connect().emit('update-user-info', { avatar })
    }

    const handleUpdateEnvironment = (environment: Environment) => {
        connect().emit('update-environment', environment)
    }

    const handleChangeIDE = (code: string, language: string, stdin: string) => {
        if(!room) return
        handleUpdateEnvironment({ sourceCode: code, language, stdin, timestamp: new Date().getTime()})
    }
  

    return (
        <div className="m-5">
            <h1 className="mb-5">Pair Programming</h1>
            <div className={`w-50 ${IDRoom.length === 0 ? '' : 'visually-hidden'}`}>
                <div className="row mb-3">
                    <div className="col-6 d-grid">
                        <button
                            className="btn btn-outline-dark btn-lg"
                            onClick={handleCreateRoom}
                        >
                            Criar uma sala
                        </button>
                    </div>
                    <div className="col-6 d-grid">
                        <button
                            className="btn btn-outline-dark btn-lg"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".join-room"
                            aria-expanded="false"
                        >
                            Entrar em uma sala
                        </button>
                    </div>
                </div>
                <div className="collapse join-room">
                    <div className="card card-body">
                        <h2 className="card-title mb-5">Quase lá!</h2>
                        <input
                            onChange={({ target }) => setIDRoomInput(target.value)}
                            value={IDRoomInput}
                            type="text"
                            className="form-control mb-5 form-control-lg"
                            placeholder="Digite o id sala"
                        />
                        <button onClick={handleJoinToTheRoom} className="btn btn-dark btn-lg">Entrar</button>
                    </div>
                </div>
            </div>

            <div className={`${IDRoom.length > 0 ? '' : 'visually-hidden'}`}>
                <h5 className="mb-2">ID da Sala: <span className="text-muted">{IDRoom}</span></h5>
                <FormUser
                    avatar={avatar}
                    setAvatar={(avatar: Avatar) => {
                        setAvatar(avatar)
                        handleUpdateUser(avatar)
                    }}
                />
                <div className="row">
                    <div className="col-7">
                        <IDE 
                            ref={IDERef} 
                            onChange={handleChangeIDE}
                        />
                    </div>
                    <div className="col-5">
                        <Chat
                            handleNewMessage={handleNewMessage}
                            users={room?.users || []}
                            messages={room?.messages || []}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PairProgramming
