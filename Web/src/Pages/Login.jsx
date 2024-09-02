import React, { useState } from 'react'
import { doLogin } from '../State'

import { Card, Button, Input, Flex, Spinner, Text } from '../Components'

export default function Login ({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = async () => {
    setWaiting(true);
    const res = await doLogin({ strategy: 'local', username, password });
    setWaiting(false);
    res && handleLogin?.();
  }
  return (
    <Flex fw fh>
      <form>
        <Card fadeIn style={{ padding: 20, maxWidth: 600 }}>

          <Flex fw jb height={220}>
            <Text value='Orion Expo Update Server Dashboard' bold size={28} />

            <Input autofocus autoComplete='username' placeholder='Username' useState={[username, setUsername]} />
            <Input password useState={[password, setPassword]} onEnter={handleSubmit} />
            {waiting ? <Spinner /> : <Button label='LOGIN' icon='sign-in-alt' onClick={handleSubmit} style={{ width: '100%' }} />}
          </Flex>
        </Card>
      </form>
    </Flex>
  )
}
