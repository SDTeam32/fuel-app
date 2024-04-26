import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/server";
import { useUser } from "../hooks/useUser";
import Profile from "../app/(pages)/profile/page"; // Adjust import path as needed

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the useUser hook
jest.mock("../hooks/useUser", () => ({
  useUser: jest.fn(),
}));

// Mock supabase with different query behaviors for select and update
jest.mock("../utils/supabase/server", () => {
  const mockSelect = jest.fn().mockResolvedValue({
    data: [{ id: 1, state_abbreviation: "CA" }],
    error: null,
  });

  const mockUpdate = jest.fn().mockResolvedValue({
    data: { id: 1, name: "John Doe" },
    error: null,
  });

  const mockFrom = (tableName: string) => {
    if (tableName === "states") {
      return { select: mockSelect };
    }
    if (tableName === "customers") {
      return { update: mockUpdate, match: jest.fn().mockReturnThis() };
    }
  };

  return {
    __esModule: true,
    supabase: { from: mockFrom },
  };
});

describe("Profile Component Tests", () => {
  const mockRouterPush = jest.fn();
  const mockUser = {
    isLoggedIn: true,
    userName: "John Doe",
    userAddress1: "123 Main St",
    userAddress2: "",
    userCity: "Metropolis",
    userState: "CA",
    userZip: "12345",
    userNumber: 1,
    logoutUser: jest.fn(),
    setUserName: jest.fn(),
    setUserAddress1: jest.fn(),
    setUserAddress2: jest.fn(),
    setUserCity: jest.fn(),
    setUserState: jest.fn(),
    setUserZip: jest.fn(),
  };

  beforeEach(() => {
    (useUser as unknown as jest.Mock).mockReturnValue(mockUser);
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("renders the Profile component in view mode", () => {
    render(<Profile />);
    expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument();
  });

  it("transitions to edit mode and submits the form", async () => {
    render(<Profile />);

    // Enter edit mode
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();

    // Modify the name field and submit
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "Jane Doe" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check if update was called with expected data
    await waitFor(() => {
      expect(supabase.from("customers").update).toHaveBeenCalledWith({
        name: "Jane Doe",
        address1: "123 Main St",
        address2: "",
        city: "Metropolis",
        state: "CA",
        zip: "12345",
      });
    });

    expect(mockUser.setUserName).toHaveBeenCalledWith("Jane Doe");
  });

  it("redirects to home if user is not logged in", async () => {
    (useUser as unknown as jest.Mock).mockReturnValue({
      ...mockUser,
      isLoggedIn: false,
    });

    render(<Profile />);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });
  });


});
