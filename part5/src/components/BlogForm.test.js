import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test for the new blog form', () => {
    const createNote = jest.fn()

    render(<BlogForm createNote={createNote}/>)

    const input = screen.getByPlaceholderText('write here the blog title content')
    const sendButton = screen.getByText('create')

    userEvent.type(input, 'testing a form... plz work')
    userEvent.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
})