// __tests__/fetch.test.js
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor} from '@testing-library/react'
import { render, fireEvent, screen } from './test-utils'

import '@testing-library/jest-dom/extend-expect'
import App from './App.js'

const server = setupServer(
    rest.get('/list', (req, res, ctx) => {
        return res(ctx.json(
            {
                "list": [
                    {
                        "id": "5ce27b5b89230f002e13f606",
                        "name": "Duo",
                        "imageUrl": "https://static.streamloots.com/e19c7bf6-ca3e-49a8-807e-b2e9a1a47524/703ea030-8527-4a17-bd6f-23763eabfec9.png",
                        "count": {
                        "total": 0
                        }
                    }
                ]
            }
        ))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const thunk = ({ dispatch, getState }) => next => action => {

    if (typeof action === 'function') {
        return action(dispatch, getState)
    }

    return next(action)
}

const create = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    }
    const next = jest.fn()

    const invoke = action => thunk(store)(next)(action)

    return { store, next, invoke }
}

it('passes through non-function action', () => {
    const { next, invoke } = create()
    const action = { type: 'TEST' }
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
})

it('calls the function', () => {
    const { invoke } = create()
    const fn = jest.fn()
    invoke(fn)
    expect(fn).toHaveBeenCalled()
})

it('passes dispatch and getState', () => {
    const { store, invoke } = create()
    invoke((dispatch, getState) => {
        dispatch('TEST DISPATCH')
        getState()
    })
    expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
    expect(store.getState).toHaveBeenCalled()
})


it('Renders the connected app with initialState', () => {
    render(<App />, { initialState: {} })

    expect(screen.getByText(/redux user/i)).toBeInTheDocument()
})


test('loads and displays greeting', async () => {
    render(<App />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
})

test('handles server error', async () => {
    server.use(
        rest.get('/list', (req, res, ctx) => {
        return res(ctx.status(500))
        })
    )

    render(<App />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('alert'))

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
})
