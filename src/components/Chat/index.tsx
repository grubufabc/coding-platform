import React,  { forwardRef, useImperativeHandle } from 'react'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { API_URL } from '../../api'
import TextArea from '../Form/TextArea'
import Message, { MessageProps } from './Message'

export interface ChatHandles {
    IDRoom: string
    joinToTheRoom: (IDRoom: string) => void
    createRoom: () => void
}

interface ChatProps {
    username: string
    IDRoom: string
    setIDRoom: React.Dispatch<React.SetStateAction<string>>
}

const Chat: React.ForwardRefRenderFunction<ChatHandles, ChatProps> = ({ username, IDRoom, setIDRoom }, ref) => {
    const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
    const [contentMessage, setContentMessage] = React.useState<string>('')
    const [messages, setMessages] = React.useState<MessageProps[]>([])

    const handleChat = {
        'new-message': (data: any) => {
            setMessages(data as MessageProps[])
        },
        'login': (data: any) => {
            setIDRoom(data.IDRoom)
            setMessages(data.messages)
        },
        'create-room': (data: any) => {
            setIDRoom(data as string)
        },
    }

    const connect = (): Socket<DefaultEventsMap, DefaultEventsMap> => {
        if(socket) return socket
        const connection = io(`${API_URL}/`)
        Object.entries(handleChat).forEach(([observerName, fn]) => {
            connection.on(observerName, fn)
        })
        setSocket(connection)
        return connection
    }

    const createRoom = () => {
        if(socket) return
        connect().emit('create-room')
    }

    const joinToTheRoom = (IDRoom: string) => {
        connect().emit('login', { IDRoom })
    }

    useImperativeHandle(ref, () => {
        return {
            createRoom,
            IDRoom,
            joinToTheRoom
        }
    })

    const handleSendMessage = () => {
        if(!contentMessage.length) return

        connect().emit('new-message', {
            IDRoom,
            message: {
                content: contentMessage,
                author: username
            }
        })
        setContentMessage('')
    }

    return (
        <div className="min-vh-100 border rounded-2 p-4" data-bs-spy="scroll">
            <h1>Chat</h1>
            <div>
                { messages.map(({ content, author }, index) => (
                    <Message key={index} content={content} author={author} />
                ))}
            </div>
            <div>
                <TextArea
                    rows={3}
                    label={{
                        text: 'Digite sua mensagem aqui...',
                        id: 'chat-message'
                    }}
                    placeholder={'Digite sua mensagem aqui...'}
                    value={contentMessage}
                    onChange={setContentMessage}
                    className="my-3"
                />
            </div>
            <div className="d-grid gap-2">
                <button
                    className="btn btn-lg btn-outline-dark"
                    onClick={handleSendMessage}
                >Enviar</button>
            </div>
        </div>
    )
}

export default forwardRef(Chat)