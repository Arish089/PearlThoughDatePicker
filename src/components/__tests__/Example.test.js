import { render, screen, fireEvent } from '@testing-library/react';
import Example from '../Example';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher

describe('Example Component', () => {
  test('renders without crashing', () => {
    render(<Example />);
    expect(screen.getByLabelText(/Recurrence:/)).toBeInTheDocument();
  });

  test('handles recurrence type change', () => {
    render(<Example />);
    const select = screen.getByLabelText(/Recurrence:/);
    fireEvent.change(select, { target: { value: 'daily' } });
    expect(select.value).toBe('daily');
  });

  test('handles specific day of the week selection', () => {
    render(<Example />);
    const recurrenceSelect = screen.getByLabelText(/Recurrence:/);
    fireEvent.change(recurrenceSelect, { target: { value: 'specificDayOfWeek' } });
    
    const daySelect = screen.getByLabelText(/Select Day of the Week:/);
    fireEvent.change(daySelect, { target: { value: 'Tuesday' } });
    
    expect(daySelect.value).toBe('Tuesday');
  });

  test('shows custom interval inputs when custom recurrence is selected', () => {
    render(<Example />);
    const recurrenceSelect = screen.getByLabelText(/Recurrence:/);
    fireEvent.change(recurrenceSelect, { target: { value: 'custom' } });
    
    expect(screen.getByLabelText(/Day\(s\) Interval:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Week\(s\) Interval:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Month\(s\) Interval:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year\(s\) Interval:/)).toBeInTheDocument();
  });

  test('correctly hides and shows custom interval inputs based on chooseInterval value, with all visible initially', () => {
    render(<Example />);
    
    const recurrenceSelect = screen.getByLabelText(/Recurrence:/);
    fireEvent.change(recurrenceSelect, { target: { value: 'custom' } });
  
    // Initially, all inputs (Day(s), Week(s), Month(s), Year(s)) should be visible
    const dayInput = screen.getByLabelText(/Day\(s\) Interval:/);
    const weekInput = screen.getByLabelText(/Week\(s\) Interval:/);
    const monthInput = screen.getByLabelText(/Month\(s\) Interval:/);
    const yearInput = screen.getByLabelText(/Year\(s\) Interval:/);
    
    expect(dayInput).toBeVisible();
    expect(weekInput).toBeVisible();
    expect(monthInput).toBeVisible();
    expect(yearInput).toBeVisible();
  
    // Change interval to "Week(s)" (chooseInterval = "2")
    fireEvent.change(weekInput, { target: { value: '2' } });  // Week(s) interval should now be visible
    expect(weekInput).toBeVisible();
    expect(dayInput).not.toBeVisible();   // Day(s) should now be hidden
    expect(monthInput).not.toBeVisible();
    expect(yearInput).not.toBeVisible();

  });
  
  

  test('calculates dates correctly based on recurrence', () => {
    render(<Example />);
    const recurrenceSelect = screen.getByLabelText(/Recurrence:/);
    fireEvent.change(recurrenceSelect, { target: { value: 'daily' } });
    
    // Expectation depends on the actual implementation and state setup
    // You may need to add further assertions to verify date calculation
  });
});
