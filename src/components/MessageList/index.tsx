import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

interface MessageProps {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

function MessageList() {
    const [messages, setMessages] = useState<MessageProps[]>([]);

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get<MessageProps[]>('/messages/last3');
            setMessages(response.data)
        }

        loadMessages();
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(message => (
                    <li className={styles.message} key={message.id}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { MessageList }