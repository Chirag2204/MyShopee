import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            console.log('keyword found : ' + keyword)
            history.push(`/search/${keyword}`)
        } else {
            console.log('no keyword found  ')
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control controlId='search' tyep='search' name='q' placeholder='Search' onChange={(e) => setKeyword(e.target.value)} ></Form.Control>
            <Button className='mx-3 btn' variant='outline-success' type='submit' >Search</Button>
        </Form>
    )
}
