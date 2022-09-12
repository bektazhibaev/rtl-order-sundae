import { screen, render, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('summary form testing', () => {
  it('verify checkbox to be unchecked initially', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test('checkbox disables button on first click and enables on second click', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    const button = screen.getByRole('button', { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
