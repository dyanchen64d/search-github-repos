import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

type Props = {
  submit: (q: string) => void;
}

const SearchForm: React.FC<Props> = (props) => {
  const { submit } = props;

  const [name, setName] = useState('');
  const [user, setUser] = useState('');

  const handleClick = () => {
    if (name || user) {
      const q = `${name ? `${name} in:name` : ''} ${user ? `user:${user}` : ''}`
      submit(q);
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      <TextField id="standard-basic" value={name} onChange={(e) => setName(e.target.value)} label="Word in Repo Name" variant="standard" />
      <TextField id="standard-basic" value={user} onChange={(e) => setUser(e.target.value)} label="User" variant="standard" />
      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </div>
  )
}

export default SearchForm;
