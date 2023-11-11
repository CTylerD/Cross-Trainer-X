import React from 'react';
import DeleteModal from '../DeleteModal';
import { render, screen, userEvent } from '@testing-library/react-native'


test('Modal Renders', async () => {

    const user = userEvent.setup();
    render(<DeleteModal exercise="Bench Press" />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    await user.press(screen.getByRole('button'));
    expect(screen.getAllByRole('button')).toHaveLength(3);
    await user.press(screen.getByText('Confirm'));
    expect(screen.getAllByRole('button')).toHaveLength(1);


  });