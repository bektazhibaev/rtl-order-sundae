import {
  screen,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('summary form testing', () => {
  it('verify checkbox to be unchecked initially', () => {
    render( < SummaryForm / > );
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
    render( < SummaryForm / > );
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    const button = screen.getByRole('button', {
      name: /confirm order/i
    });

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  /**
   * Useful commands to use ByQueryType:
   *    - get: expect element to be in DOM
   *    - query: expect element not to be in DOM
   *    - find: expect element to appear async
   * QueryTypes:
   *    - Role [most preferred]
   *    - AltText [images]
   *    - Text [display elements]
   *    Form elements:
   *        - PlaceholderText
   *        - LabelText
   *        - DisplayValue
   */

  test('popover responds to hover', async () => {
    render( < SummaryForm / > );
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndContidions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndContidions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndContidions);
    // const nullPopoverAgain = screen.getByText(/no ice cream will actually be delivered/i);
    // expect(nullPopoverAgain).not.toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
    // userEvent.unhover(termsAndContidions);
    // waitForElementToBeRemoved().then(() => {
    //   screen.queryByText(/no ice cream will actually be delivered/i);
    // });
  });
});