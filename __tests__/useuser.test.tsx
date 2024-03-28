import { renderHook, act } from '@testing-library/react-hooks';
import { useUser } from '../hooks/useUser';

describe('useUser', () => {
  it('initializes with undefined values', () => {
    const { result } = renderHook(() => useUser());
    const { userID, userCode, userName, userAddress1, userAddress2, userCity, userState, userZip } = result.current;

    expect(userID).toBeUndefined();
    expect(userCode).toBeUndefined();
    expect(userName).toBeUndefined();
    expect(userAddress1).toBeUndefined();
    expect(userAddress2).toBeUndefined();
    expect(userCity).toBeUndefined();
    expect(userState).toBeUndefined();
    expect(userZip).toBeUndefined();
  });

  it('updates state properties correctly', () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.setUserID('123');
      result.current.setUserCode('ABC');
      result.current.setUserName('John Doe');
      result.current.setUserAddress1('123 Main St');
      result.current.setUserAddress2('Apt 101');
      result.current.setUserCity('New York');
      result.current.setUserState('NY');
      result.current.setUserZip('12345');
    });

    const { userID, userCode, userName, userAddress1, userAddress2, userCity, userState, userZip } = result.current;

    expect(userID).toBe('123');
    expect(userCode).toBe('ABC');
    expect(userName).toBe('John Doe');
    expect(userAddress1).toBe('123 Main St');
    expect(userAddress2).toBe('Apt 101');
    expect(userCity).toBe('New York');
    expect(userState).toBe('NY');
    expect(userZip).toBe('12345');
  });
});
