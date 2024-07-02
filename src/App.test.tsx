import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('End to end test', async () => {
    const user = userEvent.setup();
    const app = render(<App/>);
    const textAreaFrom = app.getByPlaceholderText('Introducir texto');
    await user.type(textAreaFrom, 
        'Era la mejor de las épocas, era la peor de las épocas.');
    const result = await app.findByDisplayValue(/best/i, {}, {timeout:15000});

    expect(result).toBeTruthy();
})