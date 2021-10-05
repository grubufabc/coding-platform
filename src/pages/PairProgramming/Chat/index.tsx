import React from 'react'
import { Message as IMessage, User } from '..'
import TextArea from '../../../components/Form/TextArea'
import Message from './Message'


interface ChatProps {
    messages: IMessage[]
    users: User[]
    handleNewMessage: (content: string) => void
}

const Chat: React.FC<ChatProps> = ({ messages, users, handleNewMessage }) => {
    
    const [content, setContent] = React.useState<string>('')

    const handleSendMessage = () => {
        if (!content.length) return
        handleNewMessage(content)
        setContent('')
    }

    return (
        <div className="min-vh-100 border rounded-2 p-4">
            <h1>Chat</h1>
            <div>
                { messages.map(({ content, author }, index) => (
                    <Message 
                        key={index} 
                        content={content} 
                        author={users.find((user) => user.id === author)} 
                    />
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
                    value={content}
                    onChange={setContent}
                    className="my-3"
                    onKeyDown={(event) => {
                        if(event.ctrlKey && event.code === "Enter"){
                            handleSendMessage()
                        }
                    }}
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

export default Chat