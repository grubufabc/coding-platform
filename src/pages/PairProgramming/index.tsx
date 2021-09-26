import React from 'react'
import Chat, { ChatHandles } from '../../components/Chat'
import IDE, { IDEHandles } from '../../components/IDE'


const PairProgramming: React.FC = () => {
    const IDERef = React.useRef<IDEHandles>(null)
    const chatRef = React.useRef<ChatHandles>(null)
    const [username, setUsername] = React.useState<string>('Anônimo')
    const [IDRoom, setIDRoom] = React.useState<string>('')
    const [IDRoomInput, setIDRoomInput] = React.useState<string>('')


    const handleJoinToTheRoom = () => {
        const chat = chatRef.current
        if (!chat || !IDRoomInput.length) return
        chat.joinToTheRoom(IDRoomInput)
    }

    const handleCreateRoom = () => {
        const chat = chatRef.current
        if (!chat) return
        chat.createRoom()
    }

    return (
        <div className="m-5">
            <h1 className="mb-5">Pair Programming</h1>

            <div className={`w-50 ${IDRoom.length === 0 ? '' : 'd-none'}`}>
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

            <div className={`${IDRoom.length > 0 ? '' : 'd-none'}`}>
                <input
                    type="text"
                    className="form-control w-50 mb-5"
                    placeholder="Digite seu come"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />

                <h5 className="mb-5">ID da Sala: <span className="text-muted">{IDRoom}</span></h5>
                <div className="row">
                    <div className="col-7">
                        <IDE ref={IDERef} />
                    </div>
                    <div className="col-5">
                        <Chat
                            setIDRoom={setIDRoom}
                            IDRoom={IDRoom}
                            username={username}
                            ref={chatRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PairProgramming
